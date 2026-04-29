import React, { useEffect, useRef, useState } from "react";
import machiLogo from "./machi.png";

const navItems = [
  { label: "O mne", href: "#o-mne" },
  { label: "Zameranie", href: "#zameranie" },
  { label: "Výučba", href: "#vyucba" },
  { label: "Voľný čas", href: "#volny-cas" },
  { label: "Kontakt", href: "#kontakt" },
];

const stats = [
  ["Web", "responzívne stránky a rozhrania"],
  ["Kód", "Python, JavaScript a logika"],
  ["Výučba", "jasné vysvetlenia a prax"],
];

const focusAreas = [
  {
    type: "Frontend",
    title: "Moderné webové stránky",
    text: "Tvorba čistých, rýchlych a prehľadných webov pre osobné aj školské projekty.",
  },
  {
    type: "Programovanie",
    title: "Praktické aplikácie",
    text: "Malé nástroje, skripty a webové aplikácie, ktoré riešia konkrétne úlohy.",
  },
  {
    type: "Vzdelávanie",
    title: "Materiály pre výučbu",
    text: "Krátke príklady, cvičenia a vysvetlenia pre lepšie pochopenie informatiky.",
  },
];

const lessons = [
  ["01", "Základy programovania", "Premenné, podmienky, cykly a funkcie vysvetlené jednoducho."],
  ["02", "Webové technológie", "HTML, CSS, JavaScript a React cez praktické zadania."],
  ["03", "Algoritmické myslenie", "Postupné riešenie problémov, testovanie a čitateľný kód."],
];

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Python",
  "Git",
  "Algoritmy",
  "Výučba",
];

const principles = [
  {
    title: "Jednoduchosť",
    text: "Texty, rozhrania aj kód majú byť zrozumiteľné na prvý pohľad.",
  },
  {
    title: "Prax",
    text: "Najlepšie sa učí na malých úlohách, ktoré majú jasný výsledok.",
  },
  {
    title: "Rast",
    text: "Každý projekt je príležitosť naučiť sa niečo nové a použiť to lepšie.",
  },
];

const hobbies = [
  {
    title: "Hudba a spev",
    text: "Vo voľnom čase sa venujem hudbe a spevu. Je to priestor na kreativitu, rytmus a vlastný prejav.",
  },
  {
    title: "Gaming",
    text: "Hry beriem ako oddych, zábavu aj tréning rýchleho rozhodovania a spolupráce.",
  },
  {
    title: "Záhradka",
    text: "Rád trávim čas aj mimo obrazovky. Starostlivosť o záhradku je pokojná protiváha k technológiám.",
  },
];

function TechCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points = [];
    const streams = [];
    let width = 0;
    let height = 0;
    let animationId = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let time = 0;

    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const currentScrollY = window.scrollY;
      targetScrollProgress = currentScrollY / maxScroll;
      scrollVelocity = Math.max(-1, Math.min(1, (currentScrollY - lastScrollY) / 70));
      lastScrollY = currentScrollY;
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      points.length = 0;
      streams.length = 0;
      const count = Math.max(54, Math.floor((width * height) / 17000));
      const streamCount = Math.max(8, Math.floor(width / 150));

      for (let index = 0; index < count; index += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.42,
          vy: (Math.random() - 0.5) * 0.42,
          r: Math.random() * 1.6 + 0.8,
          phase: Math.random() * Math.PI * 2,
        });
      }

      for (let index = 0; index < streamCount; index += 1) {
        streams.push({
          x: (index / Math.max(streamCount - 1, 1)) * width + (Math.random() - 0.5) * 80,
          y: Math.random() * height,
          length: 120 + Math.random() * 260,
          speed: 1.2 + Math.random() * 2.4,
          alpha: 0.18 + Math.random() * 0.22,
        });
      }

      updateScroll();
    };

    const drawGrid = () => {
      const gridSize = 44 + scrollProgress * 34;
      const offset = (time * 18 + scrollProgress * 260) % gridSize;
      const alpha = 0.06 + Math.abs(scrollVelocity) * 0.08;

      context.save();
      context.translate(width / 2, height / 2);
      context.rotate((scrollProgress - 0.5) * 0.18);
      context.translate(-width / 2, -height / 2);
      context.strokeStyle = `rgba(53, 211, 255, ${alpha})`;
      context.lineWidth = 1;

      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
        context.beginPath();
        context.moveTo(x + offset, -height * 0.2);
        context.lineTo(x + offset, height * 1.2);
        context.stroke();
      }

      context.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.75})`;

      for (let y = -gridSize; y < height + gridSize; y += gridSize) {
        context.beginPath();
        context.moveTo(-width * 0.2, y - offset);
        context.lineTo(width * 1.2, y - offset);
        context.stroke();
      }

      context.restore();
    };

    const drawRings = () => {
      const centerX = width * (0.74 - scrollProgress * 0.18);
      const centerY = height * (0.28 + scrollProgress * 0.34);
      const pulse = Math.sin(time * 2.4) * 16 + Math.abs(scrollVelocity) * 42;

      for (let index = 0; index < 4; index += 1) {
        const radius = 80 + index * 76 + scrollProgress * 150 + pulse;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${index % 2 === 0 ? "53, 211, 255" : "139, 92, 246"}, ${0.16 - index * 0.026})`;
        context.lineWidth = 1.2;
        context.stroke();
      }
    };

    const draw = () => {
      time += 0.012 + Math.abs(scrollVelocity) * 0.008;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;
      scrollVelocity *= 0.92;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRings();

      for (const point of points) {
        const drift = Math.sin(time + point.phase + scrollProgress * Math.PI * 4);
        point.x += point.vx + drift * 0.22 + scrollVelocity * 2.4;
        point.y += point.vy + Math.cos(time * 0.8 + point.phase) * 0.18 + scrollProgress * 0.12;

        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        if (point.x < -12) point.x = width + 12;
        if (point.x > width + 12) point.x = -12;
        if (point.y < -12) point.y = height + 12;
        if (point.y > height + 12) point.y = -12;

        context.beginPath();
        context.arc(point.x, point.y, point.r + Math.abs(scrollVelocity) * 1.2, 0, Math.PI * 2);
        context.fillStyle = `rgba(53, 211, 255, ${0.46 + Math.abs(scrollVelocity) * 0.28})`;
        context.fill();
      }

      for (let a = 0; a < points.length; a += 1) {
        for (let b = a + 1; b < points.length; b += 1) {
          const first = points[a];
          const second = points[b];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < 132) {
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = `rgba(139, 92, 246, ${0.2 - distance / 860 + Math.abs(scrollVelocity) * 0.08})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      for (const stream of streams) {
        stream.y += stream.speed + scrollProgress * 2.2 + Math.abs(scrollVelocity) * 12;
        stream.x += Math.sin(time * 1.4 + stream.y * 0.01) * 0.8;

        if (stream.y - stream.length > height + 80) {
          stream.y = -stream.length - Math.random() * height * 0.5;
          stream.x = Math.random() * width;
        }

        const gradient = context.createLinearGradient(stream.x, stream.y - stream.length, stream.x, stream.y);
        gradient.addColorStop(0, "rgba(53, 211, 255, 0)");
        gradient.addColorStop(0.45, `rgba(53, 211, 255, ${stream.alpha})`);
        gradient.addColorStop(1, `rgba(125, 211, 168, ${stream.alpha + 0.14})`);

        context.beginPath();
        context.moveTo(stream.x, stream.y - stream.length);
        context.lineTo(stream.x + scrollVelocity * 48, stream.y);
        context.strokeStyle = gradient;
        context.lineWidth = 1.4;
        context.stroke();
      }

      const scanY = (height * ((time * 0.12 + scrollProgress * 1.8) % 1));
      const scanGradient = context.createLinearGradient(0, scanY - 34, 0, scanY + 34);
      scanGradient.addColorStop(0, "rgba(139, 92, 246, 0)");
      scanGradient.addColorStop(0.5, `rgba(53, 211, 255, ${0.08 + Math.abs(scrollVelocity) * 0.12})`);
      scanGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      context.fillStyle = scanGradient;
      context.fillRect(0, scanY - 34, width, 68);

      animationId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (reduceMotion.matches) return;
      resize();
      draw();
    };

    const handleMotionChange = () => {
      window.cancelAnimationFrame(animationId);
      context.clearRect(0, 0, width, height);
      start();
    };

    start();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    reduceMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      reduceMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas className="tech-canvas" ref={canvasRef} aria-hidden="true" />;
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="MachiYm domov">
        <span className="brand-mark" aria-hidden="true">
          <img src={machiLogo} alt="" />
        </span>
        <span>MachiYm</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Otvoriť menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav className="nav" aria-label="Hlavná navigácia">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

export default function App() {
  return (
    <>
      <TechCanvas />
      <Header />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Študent informatiky / učiteľ informatiky</p>
            <h1 id="hero-title">MachiYm</h1>
            <p className="hero-text">
              Tvorím moderné webové stránky, učím informatiku a mením nápady na
              jednoduché digitálne riešenia.
            </p>

            <div className="hero-actions" aria-label="Hlavné odkazy">
              <a className="button primary" href="#zameranie">
                Pozrieť zameranie
              </a>
              <a className="button secondary" href="#kontakt">
                Kontakt
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Krátky profil">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="terminal-lines">
              <p>
                <span>&gt;</span> meno: MachiYm
              </p>
              <p>
                <span>&gt;</span> zameranie: web, kód, výučba
              </p>
              <p>
                <span>&gt;</span> mimo kódu: hudba, spev, gaming
              </p>
            </div>
          </div>
        </section>

        <section className="intro-strip" aria-label="Rýchle zhrnutie">
          {stats.map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </section>

        <section className="section" id="o-mne">
          <SectionHeading eyebrow="O mne" title="Informatiku prepájam s praxou." />
          <div className="split">
            <p>
              Som MachiYm, študent informatiky a učiteľ informatiky. Zaujímam sa
              o webové technológie, programovanie a praktické využitie digitálnych
              nástrojov.
            </p>
            <p>
              Pri učení aj tvorbe sa sústredím na jednoduchosť. Zložité témy
              vysvetľujem krátko, ľudsky a cez príklady, ktoré sa dajú hneď použiť.
              Popri technológiách sa venujem hudbe, spevu, gamingu a záhradke.
            </p>
          </div>
        </section>

        <section className="section" id="zameranie">
          <SectionHeading eyebrow="Zameranie" title="Tvorba, programovanie a vzdelávanie." />
          <div className="project-grid">
            {focusAreas.map((area) => (
              <article className="project-card" key={area.title}>
                <p className="card-kicker">{area.type}</p>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section tech-section" aria-labelledby="tech-title">
          <SectionHeading
            eyebrow="Technológie"
            title="Nástroje, s ktorými pracujem."
            id="tech-title"
          />
          <div className="tech-list" aria-label="Technológie a zručnosti">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        <section className="section learning-band" id="vyucba">
          <SectionHeading eyebrow="Výučba" title="Učenie má byť jasné a praktické." />
          <div className="focus-list">
            {lessons.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section principles-section" aria-labelledby="principles-title">
          <SectionHeading
            eyebrow="Prístup"
            title="Ako rozmýšľam pri práci."
            id="principles-title"
          />
          <div className="principles-grid">
            {principles.map((principle) => (
              <article key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section hobbies-section" id="volny-cas">
          <SectionHeading eyebrow="Voľný čas" title="Technológie dopĺňam kreativitou a oddychom." />
          <div className="hobbies-grid">
            {hobbies.map((hobby) => (
              <article key={hobby.title}>
                <h3>{hobby.title}</h3>
                <p>{hobby.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 id="contact-title">Otvorený projektom aj spolupráci.</h2>
            <p>
              Ak potrebuješ web, pomoc s programovaním alebo chceš prebrať výučbu
              informatiky, ozvi sa cez dostupný kontakt.
            </p>
          </div>

          <div className="contact-actions">
            <a className="button primary" href="mailto:erik.machacek19@gmail.com">
              erik.machacek19@gmail.com
            </a>
            <a className="button secondary" href="https://github.com/MachiYm" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button secondary" href="https://www.instagram.com/erik_machacek/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} MachiYm. Osobná stránka pre informatiku, tvorbu a výučbu.</p>
      </footer>
    </>
  );
}
