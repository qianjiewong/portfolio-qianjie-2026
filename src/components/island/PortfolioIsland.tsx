import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import tasktap from "../../assets/tasktap-mockup.png.asset.json";
import odm from "../../assets/odm-mockup.png.asset.json";
import agentSales from "../../assets/agent-sales-mockup.png.asset.json";
import lyricPanel from "../../assets/lyric-screen-mockup.png.asset.json";
import weatherApp from "../../assets/weather-mockup.png.asset.json";
import eggTimer from "../../assets/egg-timer-mockup.png.asset.json";
import chibi from "../../assets/chibi-workspace.png.asset.json";

const projects = [
  {
    number: "01",
    title: "TaskTap",
    description:
      "A service marketplace web application that connects customers with local service providers. Users can browse and request services such as plumbing, repairs, and home maintenance, while service providers can list and manage the services they offer; awarded University Prize for Best Final Year Project (2024/2025)",
    stack: "React · Next.js · TypeScript · Marketplace · Google Geolocation API · Full Stack · Responsive Design",
    image: tasktap.url,
    imageWidth: 1672,
    imageHeight: 941,
    github: "https://github.com/qianjiewong/Tasktap-Service-Booking-System",
    className: "project-wide",
  },
  {
    number: "02",
    title: "Open Data Maturity AI Framework",
    description:
      "An AI-powered (LLM) retrieval-augmented generation (RAG) framework for retrieving evidence, evaluating open data maturity, and generating structured country-level assessments aligned with benchmark criteria.",
    stack: "Python · LLM · RAG · ChromaDB · Streamlit · Prompt Engineering",
    image: odm.url,
    imageWidth: 1122,
    imageHeight: 1402,
    github: "https://github.com/qianjiewong/odm-rag-llm",
    className: "project-tall",
  },
  {
    number: "03",
    title: "Agent Sales Tracking System",
    description:
      "A full-stack sales tracking system designed to monitor agent performance, manage sales records, and surface useful business insights.",
    stack: "Full Stack · Database · Analytics · Angular · Firebase",
    image: agentSales.url,
    imageWidth: 1672,
    imageHeight: 941,
    github: "#work",
    className: "project-wide",
  },
  {
    number: "04",
    title: "Karaoke Lyric Panel",
    description:
      "An interactive lyric-focused application designed to display and manage song lyrics in a clean, engaging interface for a smoother music experience.",
    stack: "Electron · UI/UX · Front End · Firebase · TCP/IP Networking",
    image: lyricPanel.url,
    imageWidth: 1672,
    imageHeight: 941,
    github: "#work",
    className: "project-wide",
  },
  {
    number: "05",
    title: "Weather Web App",
    description:
      "A responsive weather application that provides current conditions and forecast information through a clean and easy-to-use interface.",
    stack: "JavaScript · API Integration · Front End",
    image: weatherApp.url,
    imageWidth: 1672,
    imageHeight: 941,
    github: "https://github.com/qianjiewong/My-Weather-App",
    className: "project-wide",
  },
  {
    number: "06",
    title: "Egg Timer",
    description:
      "A lightweight desktop timer application built with Electron, designed for simple time tracking with a clean interface and native desktop behaviour.",
    stack: "Electron · JavaScript · HTML · CSS · Desktop App · Cross-Platform",
    image: eggTimer.url,
    imageWidth: 1122,
    imageHeight: 1402,
    github: "#work",
    className: "project-tall",
  },
];

export function PortfolioIsland() {
  return (
    <main className="editorial-portfolio">
      <nav className="editorial-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Qian Jie Wong, home"><span>QJ</span> Qian Jie Wong</a>
        <div className="nav-links">
          <a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="editorial-hero" id="top">
        <div className="hero-stage">
          <div className="hero-copy">
            <p className="folio-label">Software engineer · Portfolio 2026</p>
            <h1>Qian Jie<br />Wong</h1>
            <p className="hero-role">Software Engineer &amp; AI Developer</p>
            <p className="hero-intro">I build intelligent software systems, AI-powered applications, and thoughtful digital products that solve real-world problems.</p>
          </div>
          <img
            className="hero-chibi"
            src={chibi.url}
            alt="Illustration of a developer working at a desk with two screens"
          />
        </div>
        <div className="hero-meta">
          <dl><div><dt>Experience</dt><dd>1+ years</dd></div><div><dt>Selected work</dt><dd>06 projects</dd></div></dl>
          <div className="hero-actions">
            <a className="primary-action" href="#work">Explore work <ArrowDownRight size={16} /></a>
          </div>
        </div>
      </header>

      <section className="statement" id="about">
        <p>Based in Kuala Lumpur</p>
        <h2>Building useful software with clarity, care, and a strong point of view.</h2>
        <div>
          <span>Python / AI / RAG</span>
          <span>TypeScript / JavaScript</span>
          <span>Java / C / C++</span>
          <span>SQL / Data Processing</span>

          <span>Angular / Next.js</span>
          <span>Streamlit / Electron</span>

          <span>Firebase / MongoDB</span>
          <span>Supabase / ChromaDB</span>

          <span>LLMs / Semantic Search</span>
          <span>Sentence Embeddings / SBERT</span>
          <span>Vector Databases / Vector Search</span>
          <span>TF-IDF / Cosine Similarity</span>

          <span>REST APIs / API Integration</span>
          <span>Real-Time Data Synchronisation</span>

          <span>Git / Version Control</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading"><p>Selected work / 01—06</p><span>Scroll to explore</span></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project ${project.className}`} key={project.title}>
            <a className="project-image" href={project.github} target={project.github.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
              <img src={project.image} alt={`${project.title} project preview`} width={project.imageWidth} height={project.imageHeight} loading="lazy" />
              <span>{project.number} / Featured</span>
            </a>
            <div className="project-title-row">
              <h3>{project.title}</h3>
              <a className="project-github" href={project.github} target={project.github.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <Github size={15} /> GitHub
              </a>
            </div>
            <p>{project.description}</p><small>{project.stack}</small>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div><p>Have an interesting problem?</p><h2>Let’s make<br />something useful.</h2></div>
        <div className="footer-links"><a href="mailto:qianjiewong@gmail.com"><Mail size={16} /> qianjiewong@gmail.com</a><a href="https://github.com/qianjiewong"><Github size={16} /> GitHub</a><a href="https://www.linkedin.com/in/qian-jie-wong"><Linkedin size={16} /> LinkedIn</a></div>
        <p className="copyright">© 2026 Qian Jie Wong · Kuala Lumpur</p>
      </footer>
    </main>
  );
}
