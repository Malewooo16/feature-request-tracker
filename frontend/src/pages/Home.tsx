import { useState, useEffect } from "react";
import { Github, ArrowRight, Sparkles, Server, Database, Code, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOffset = offset * 0.3;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center" style={{ transform: `translateY(${heroOffset}px)` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Sparkles className="h-4 w-4 animate-pulse" />
            Feature Request Tracker
          </div>
          
          <h1 className={`text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent transition-all duration-1000 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Track Your Ideas
          </h1>
          
          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            A beautiful way to manage and track your product feature requests.
            <br />
            <span className="text-sm">
              Presented by{" "}
              <a href="https://github.com/Malewooo16" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                Elijah Malewo
              </a>
            </span>
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* <Button size="lg" className="gap-2 text-lg px-8 hover:scale-105 transition-transform" onClick={() => navigate("/features")}>
              Get Started <ArrowRight className="h-5 w-5" />
            </Button> */}
            <a href="https://github.com/Malewooo16/feature-request-tracker" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 text-lg px-8 hover:scale-105 transition-transform">
                <Github className="h-5 w-5" /> View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-16 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Built with Modern Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl border bg-card text-card-foreground hover:scale-105 hover:shadow-lg transition-all duration-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><Sparkles className="h-6 w-6 text-primary" /></div>
              <h3 className="text-xl font-semibold mb-2">React.js</h3>
              <p className="text-muted-foreground">Modern frontend library</p>
            </div>
            <div className={`p-6 rounded-xl border bg-card text-card-foreground hover:scale-105 hover:shadow-lg transition-all duration-500 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4"><Server className="h-6 w-6 text-blue-500" /></div>
              <h3 className="text-xl font-semibold mb-2">Node.js + Express</h3>
              <p className="text-muted-foreground">Fast backend framework</p>
            </div>
            <div className={`p-6 rounded-xl border bg-card text-card-foreground hover:scale-105 hover:shadow-lg transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4"><Database className="h-6 w-6 text-purple-500" /></div>
              <h3 className="text-xl font-semibold mb-2">PostgreSQL</h3>
              <p className="text-muted-foreground">Relational database</p>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Instructions Section */}
      <section className="relative py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-16 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Quick Start
          </h2>
          <div className="grid md:grid-cols-1 gap-8">
            <div className={`p-6 rounded-xl border bg-card text-card-foreground transition-all duration-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Frontend</h3>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`# 1. Clone the repository
git clone https://github.com/malew/feature-request-traker.git
cd feature-request-traker/frontend

# 2. Install dependencies
npm install

# 3. Configure your API URL in .env (point to your backend)
# VITE_API_URL=http://localhost:3000

# 4. Start the frontend development server
npm run dev`}
              </pre>
            </div>
            <div className={`p-6 rounded-xl border bg-card text-card-foreground transition-all duration-500 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-semibold">Backend</h3>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`# 1. Clone the repository
git clone https://github.com/malew/feature-request-traker.git
cd feature-request-traker/backend

# 2. Install dependencies
npm install

# 3. Set up your PostgreSQL database URL in .env
# DATABASE_URL=postgresql://user:password@localhost:5432/feature_tracker

# 4. Push the database schema
npx drizzle-kit push

# 5. Start the backend server
npm run dev`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative py-32 bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-card border shadow-lg transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Avatar/Image Area */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary via-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <img src="https://media.audubon.org/nas_birdapi_hero/sfw_fixed_01-29-2011-223.jpg" alt="Developer Avatar" className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md" />
            </div>
            
            {/* Bio Content */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About the Developer</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Creative and detail-oriented <span className="text-primary font-semibold">Web Developer</span> and <span className="text-primary font-semibold">UI Designer</span> with over 3 years of experience building intuitive, responsive, and user-centric applications. Proficient in <span className="text-blue-500 font-semibold">React</span>, <span className="text-blue-500 font-semibold">Express</span>, <span className="text-blue-500 font-semibold">Node.js</span>, <span className="text-blue-500 font-semibold">Spring Boot</span>, and <span className="text-blue-500 font-semibold">TypeScript</span>. Passionate about crafting seamless user experiences with clean, maintainable code and modern design practices to deliver high-quality, scalable products.
              </p>
              
              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="https://github.com/Malewooo16" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </a>
                <a href="https://malewooo16.github.io/personal-portfolio/" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Portfolio
                  </Button>
                </a>
              </div>
            </div>
          </div>
           <div className="w-full text-center text-primary mt-20">
            <a target="_blank" href="https://icons8.com/icon/6R735OAB4eCV/project" className="">Project</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
           </div>
        </div>
      </section>
    </div>
  );
}