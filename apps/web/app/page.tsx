'use client';

import { Button } from '@repo/ui/button';
import {
  Pencil,
  Users,
  Zap,
  Cloud,
  Lock,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Pencil className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">DrawFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Button variant="outline">Sign In</Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">Real-time collaboration made simple</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Draw Together,
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Create Better
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              A collaborative whiteboard platform that brings your team together.
              Sketch, brainstorm, and visualize ideas in real-time with unlimited possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg h-14 px-8">
                Start Drawing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Unlimited boards</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl -z-10"></div>
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 sm:p-8">
              <div className="aspect-video bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-200/50">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(100, 150, 200, 0.05) 25%, rgba(100, 150, 200, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 150, 200, 0.05) 75%, rgba(100, 150, 200, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(100, 150, 200, 0.05) 25%, rgba(100, 150, 200, 0.05) 26%, transparent 27%, transparent 74%, rgba(100, 150, 200, 0.05) 75%, rgba(100, 150, 200, 0.05) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}></div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Pencil className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-slate-500 font-medium text-lg mb-2">Canvas Preview</p>
                  <p className="text-slate-400 text-sm">Your collaborative whiteboard awaits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Everything you need to collaborate
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed for seamless teamwork and creative expression
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Collaboration</h3>
              <p className="text-slate-600 leading-relaxed">
                Work together with your team in real-time. See cursors, changes, and updates instantly as they happen.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors">
                <Zap className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Built for speed and performance. No lag, no waiting. Just instant creative flow.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                <Cloud className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Auto-save & Sync</h3>
              <p className="text-slate-600 leading-relaxed">
                Never lose your work. Everything is automatically saved and synced across all devices.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <Lock className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
              <p className="text-slate-600 leading-relaxed">
                Your data is encrypted and secure. Share boards with confidence using permission controls.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <Pencil className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Infinite Canvas</h3>
              <p className="text-slate-600 leading-relaxed">
                Limitless space for your ideas. Pan, zoom, and explore without boundaries.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors">
                <Sparkles className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rich Toolset</h3>
              <p className="text-slate-600 leading-relaxed">
                Shapes, arrows, text, images, and more. Everything you need to bring ideas to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to start creating?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of teams already collaborating on DrawFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg h-14 px-8">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg h-14 px-8">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">DrawFlow</span>
              </div>
              <p className="text-sm">
                Collaborative drawing made simple and beautiful.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <p>&copy; 2024 DrawFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
