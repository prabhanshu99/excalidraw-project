"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      ExcaliDraw Landing page
    </div>
  );
}
