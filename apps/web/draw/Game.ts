import { Tool } from "../components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: "pencil",
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShape: Shape[];
    private roomId: string;
    private clicked: boolean;
    private drawing: boolean;
    private startX = 0;
    private startY = 0;
    private endX = 0;
    private endY = 0;
    private selectedTool: Tool = "circle";
    socket: WebSocket;

    private camera = {
        x: 0,
        y: 0,
        zoom: 1
    };

    private isPanning = false;
    private lastPanX = 0;
    private lastPanY = 0;


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!; // need to figure out why ! is present here
        this.existingShape = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.drawing = false;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.init().then(() => this.clearCanvas());
        this.initHandlers();
        this.initMouseHandlers();

        window.addEventListener("resize", () => {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.clearCanvas();
        });
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }


    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShape = await getExistingShapes(this.roomId);
    
        this.camera.zoom = 1;
        this.camera.x = 0;
        this.camera.y = 0;
    
        if (this.existingShape.length > 0) {
            const first = this.existingShape[0];

            if(!first){
                return
            }
    
            if (first.type === "rect") {
                this.camera.x = this.canvas.width / 2 - first.x;
                this.camera.y = this.canvas.height / 2 - first.y;
            }
            else if (first.type === "circle") {
                this.camera.x = this.canvas.width / 2 - first.centerX;
                this.camera.y = this.canvas.height / 2 - first.centerY;
            }
            else if (first.type === "pencil") {
                this.camera.x = this.canvas.width / 2 - first.startX;
                this.camera.y = this.canvas.height / 2 - first.startY;
            }
        }
    
        // Render everything
        this.clearCanvas();
    }
    

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShape.push(parsedShape.shape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        // reset transform
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    
        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // background
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        // apply camera
        this.ctx.setTransform(
            this.camera.zoom, 0,
            0, this.camera.zoom,
            this.camera.x, this.camera.y
        );
    
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
    
        for (const shape of this.existingShape) {
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(
                    shape.centerX,
                    shape.centerY,
                    Math.abs(shape.radius),
                    0,
                    Math.PI * 2
                );
                this.ctx.stroke();
            }
            else if (shape.type === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
            }
        }
    }
    

    getWorldPoint(clientX: number, clientY: number) {
        return {
            x: (clientX - this.camera.x) / this.camera.zoom,
            y: (clientY - this.camera.y) / this.camera.zoom
        };
    }

    // @ts-ignore
    mouseDownHandler = (e) => {
        if (this.selectedTool === "cursor") {
            this.isPanning = true;
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
            return;
        }

        const pos = this.getWorldPoint(e.clientX, e.clientY);

        this.clicked = true;
        this.startX = pos.x;
        this.startY = pos.y;
        this.drawing = true;

    }
    // @ts-ignore
    mouseUpHandler = (e) => {
        const pos = this.getWorldPoint(e.clientX, e.clientY);
        this.isPanning = false;
        this.clicked = false;
        this.drawing = false;
        const width = pos.x - this.startX;
        const height = pos.y - this.startY;
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (this.selectedTool === "cursor") return;

        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius,
            }
        } else if (selectedTool === "pencil") {
            shape = {
                type: "pencil",
                startX: this.startX,
                startY: this.startY,
                endX: this.endX,
                endY: this.endY,
            }
        }

        if (!shape) {
            return;
        }


        this.existingShape.push(shape)

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }), roomId: this.roomId
        }))
    }
    // @ts-ignore
    mouseMoveHandler = (e) => {

        if (this.selectedTool === "cursor" && this.isPanning) {
            const dx = e.clientX - this.lastPanX;
            const dy = e.clientY - this.lastPanY;
        
            this.camera.x += dx;
            this.camera.y += dy;
        
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
        
            this.clearCanvas();
            return;
        }
        
        if (this.selectedTool === "cursor") return;

        const pos = this.getWorldPoint(e.clientX, e.clientY);

        if (this.clicked) {
            const width = pos.x - this.startX;
            const height = pos.y - this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255,255,255)"
            const selectedTool = this.selectedTool;
            console.log(selectedTool)
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (selectedTool === "pencil") {
                if (!this.drawing) return;

                // starting point for your shape
                this.endX = pos.x;
                this.endY = pos.y;

                const shape: Shape = {
                    type: "pencil",
                    startX: this.startX,
                    startY: this.startY,
                    endX: this.endX,
                    endY: this.endY,
                };

                this.existingShape.push(shape);

                this.socket.send(JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape }),
                    roomId: this.roomId
                }));

                // this creates the flow of lines
                this.startX = this.endX;
                this.startY = this.endY;

                this.clearCanvas();
            }
        }

    }
//@ts-ignore
    mouseWheelHandler = (e) => {
        if (this.selectedTool !== "cursor") return;
        e.preventDefault();
        const zoomSpeed = 0.1;
        const oldZoom = this.camera.zoom;

        if (e.deltaY < 0) {
            this.camera.zoom *= (1 + zoomSpeed);
        } else {
            this.camera.zoom *= (1 - zoomSpeed);
        }

        this.camera.zoom = Math.max(0.2, Math.min(5, this.camera.zoom));

        // zoom to cursor
        const mouse = this.getWorldPoint(e.clientX, e.clientY);

        this.camera.x -= mouse.x * (this.camera.zoom - oldZoom);
        this.camera.y -= mouse.y * (this.camera.zoom - oldZoom);

        this.clearCanvas();
    }


    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)

        this.canvas.addEventListener("wheel", this.mouseWheelHandler);
    }
}