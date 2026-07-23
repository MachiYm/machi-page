import React, { useCallback, useEffect, useRef, useState } from "react";
import machiLogo from "./machi.png";

const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function useKonamiCode(onUnlock) {
  useEffect(() => {
    let index = 0;

    const handleKey = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (key === konamiSequence[index]) {
        index += 1;

        if (index === konamiSequence.length) {
          index = 0;
          onUnlock();
        }
      } else {
        index = key === konamiSequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onUnlock]);
}

const memoryPads = [
  { key: "violet", color: "124, 108, 255" },
  { key: "blue", color: "91, 157, 255" },
  { key: "cyan", color: "34, 211, 238" },
  { key: "pink", color: "236, 114, 209" },
];

const navItems = [
  { label: "O mne", href: "#o-mne" },
  { label: "Ako pracujem", href: "#proces" },
  { label: "Tvorba", href: "#tvorba" },
  { label: "Mentoring", href: "#vyucba" },
  { label: "Mimo kódu", href: "#mimo-kodu" },
  { label: "Kontakt", href: "#kontakt" },
];

const stats = [
  ["Prototypy", "nápad rýchlo premieňam na funkčný prototyp"],
  ["Frontend", "rozhrania, ktoré sú čisté, rýchle a čitateľné"],
  ["Mentoring", "o to, čo viem, sa delím ľudsky a cez prax"],
];

const focusAreas = [
  {
    type: "Web",
    title: "Osobné a prezentačné stránky",
    text: "Navrhujem a skladám moderné weby s jasnou štruktúrou, responzívnym layoutom a vlastnou atmosférou.",
  },
  {
    type: "Prototypy",
    title: "Nápady bez dlhého čakania",
    text: "S AI nástrojmi rýchlo skladám prvé verzie, testujem smer a potom dopracujem detaily, ktoré rozhodujú.",
  },
  {
    type: "Mentoring",
    title: "Podelím sa o to, čo viem",
    text: "Rád ukážem príklady, kód a krátke návody, ktoré pomáhajú pochopiť informatiku bez zbytočného chaosu.",
  },
];

const lessons = [
  ["01", "Programovanie od základov", "Premenné, podmienky, cykly a funkcie ukazujem na príkladoch, ktoré dávajú zmysel."],
  ["02", "Web cez prax", "HTML, CSS, JavaScript a React beriem cez malé zadania, úpravy a reálne obrazovky."],
  ["03", "Myslenie vývojára", "Rád poradím, ako rozložiť problém, otestovať nápad a písať kód, ku ktorému sa dá vrátiť."],
];

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Python",
  "Git",
  "Algoritmy",
  "Mentoring",
  "AI nástroje",
  "Prompting",
];

const principles = [
  {
    title: "Najprv pocit",
    text: "Stránka musí mať jasný dojem hneď po otvorení. Až potom riešim drobnosti.",
  },
  {
    title: "Potom štruktúra",
    text: "Každý nápad skladám do jednoduchých blokov: čo má používateľ vidieť, pochopiť a spraviť.",
  },
  {
    title: "Nakoniec polish",
    text: "Doladím texty, rozostupy, responzivitu a malé interakcie, aby výsledok nepôsobil ako draft.",
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

const vibeFlow = [
  {
    label: "Prompt",
    title: "Nápad poviem jasne",
    text: "Začínam tým, čo má používateľ cítiť, čo má stránka riešiť a aký má mať tón.",
  },
  {
    label: "Prototype",
    title: "Rýchlo skladám verziu",
    text: "Vytvorím funkčný základ, ktorý sa dá vidieť, skúšať a hneď upravovať.",
  },
  {
    label: "Polish",
    title: "Ladím detail",
    text: "Prejdem layout, kontrast, texty, mobil a interakcie, aby bol výsledok použiteľný.",
  },
];

const gameRanks = [
  { min: 360, label: "Aim legend" },
  { min: 240, label: "Rýchle reflexy" },
  { min: 120, label: "Warm-up hotový" },
  { min: 0, label: "Ešte jeden run?" },
];

function GamingMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [target, setTarget] = useState({ x: 50, y: 50, size: 72 });
  const [message, setMessage] = useState("Traf ciele skôr, než zmiznú.");

  const placeTarget = () => {
    setTarget({
      x: 12 + Math.random() * 76,
      y: 16 + Math.random() * 68,
      size: 52 + Math.random() * 34,
    });
  };

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(20);
    setMessage("Focus mode zapnutý.");
    placeTarget();
    setIsPlaying(true);
  };

  const hitTarget = () => {
    if (!isPlaying) return;

    const nextCombo = combo + 1;
    const comboBonus = Math.min(nextCombo * 2, 18);
    setScore((current) => current + 10 + comboBonus);
    setCombo(nextCombo);
    setMessage(nextCombo >= 5 ? "Combo beží, ruky sú zahriate." : "Nice hit.");
    placeTarget();
  };

  const missTarget = () => {
    if (!isPlaying) return;

    setCombo(0);
    setScore((current) => Math.max(0, current - 5));
    setMessage("Ups, klik mimo. Combo reset.");
  };

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timerId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setIsPlaying(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) return;

    setBestScore((current) => Math.max(current, score));

    if (timeLeft === 0) {
      const rank = gameRanks.find((item) => score >= item.min);
      setMessage(`Koniec kola: ${rank?.label ?? gameRanks.at(-1).label}.`);
    }
  }, [isPlaying, score, timeLeft]);

  return (
    <article className="mini-game" aria-labelledby="mini-game-title">
      <div className="mini-game-copy">
        <p className="card-kicker">Minihra</p>
        <h3 id="mini-game-title">Reflex Rush</h3>
        <p>
          Krátky aim-check pre návštevníkov: 20 sekúnd, rýchle ciele a trochu
          zdravého chaosu medzi scrollovaním.
        </p>
      </div>

      <div className="game-hud" aria-label="Skóre minihry">
        <span>
          Skóre <strong>{score}</strong>
        </span>
        <span>
          Čas <strong>{timeLeft}s</strong>
        </span>
        <span>
          Combo <strong>x{combo}</strong>
        </span>
        <span>
          Best <strong>{bestScore}</strong>
        </span>
      </div>

      <button
        className="game-arena"
        type="button"
        onClick={missTarget}
        aria-label="Herné pole Reflex Rush"
      >
        <span className="arena-grid" aria-hidden="true" />
        <span
          className={`game-target${isPlaying ? " is-live" : ""}`}
          style={{
            "--target-x": `${target.x}%`,
            "--target-y": `${target.y}%`,
            "--target-size": `${target.size}px`,
          }}
          onClick={(event) => {
            event.stopPropagation();
            hitTarget();
          }}
          role="presentation"
        >
          <span />
        </span>
      </button>

      <div className="game-controls">
        <button className="button primary" type="button" onClick={startGame}>
          {isPlaying ? "Reštart kola" : "Spustiť hru"}
        </button>
        <p aria-live="polite">{message}</p>
      </div>
    </article>
  );
}

function MemoryGame() {
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [bestLevel, setBestLevel] = useState(0);
  const [message, setMessage] = useState("Zapamätaj si poradie a klikaj podľa neho.");
  const timeouts = useRef([]);

  const clearTimers = () => {
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];
  };

  useEffect(() => clearTimers, []);

  const playSequence = (seq) => {
    setPhase("showing");
    clearTimers();

    seq.forEach((pad, index) => {
      timeouts.current.push(window.setTimeout(() => setActivePad(pad), index * 620 + 300));
      timeouts.current.push(window.setTimeout(() => setActivePad(null), index * 620 + 640));
    });

    timeouts.current.push(
      window.setTimeout(() => {
        setPhase("input");
        setUserStep(0);
      }, seq.length * 620 + 380),
    );
  };

  const nextRound = (prev) => {
    const next = [...prev, Math.floor(Math.random() * memoryPads.length)];
    setSequence(next);
    setMessage(`Úroveň ${next.length}. Sleduj sekvenciu...`);
    playSequence(next);
  };

  const startGame = () => {
    clearTimers();
    setSequence([]);
    setUserStep(0);
    nextRound([]);
  };

  const handlePad = (padIndex) => {
    if (phase !== "input") return;

    setActivePad(padIndex);
    window.setTimeout(() => setActivePad(null), 200);

    if (sequence[userStep] !== padIndex) {
      setPhase("over");
      setMessage(`Sekvencia praskla na úrovni ${sequence.length}. Skús to znova.`);
      return;
    }

    const nextStep = userStep + 1;

    if (nextStep === sequence.length) {
      setBestLevel((best) => Math.max(best, sequence.length));
      setMessage(`Úroveň ${sequence.length} zvládnutá. Ideme vyššie!`);
      setPhase("showing");
      timeouts.current.push(window.setTimeout(() => nextRound(sequence), 760));
    } else {
      setUserStep(nextStep);
    }
  };

  const isBusy = phase === "showing";

  return (
    <article className="mini-game memory-game" aria-labelledby="memory-game-title">
      <div className="mini-game-copy">
        <p className="card-kicker">Minihra 02</p>
        <h3 id="memory-game-title">Sekvencia</h3>
        <p>
          Pamäťová výzva pre vývojára: zapamätaj si poradie farieb a zopakuj ho.
          Každé kolo pridá jeden krok navyše.
        </p>
      </div>

      <div className="game-hud" aria-label="Skóre pamäťovej hry">
        <span>
          Úroveň <strong>{sequence.length}</strong>
        </span>
        <span>
          Best <strong>{bestLevel}</strong>
        </span>
      </div>

      <div className="memory-board" aria-label="Pole pamäťovej hry">
        {memoryPads.map((pad, index) => (
          <button
            key={pad.key}
            type="button"
            className={`memory-pad${activePad === index ? " is-active" : ""}`}
            style={{ "--pad-color": pad.color }}
            onClick={() => handlePad(index)}
            disabled={phase !== "input"}
            aria-label={`Farebné pole ${index + 1}`}
          />
        ))}
      </div>

      <div className="game-controls">
        <button className="button primary" type="button" onClick={startGame} disabled={isBusy}>
          {phase === "idle" ? "Spustiť hru" : "Nové kolo"}
        </button>
        <p aria-live="polite">{message}</p>
      </div>
    </article>
  );
}

function ScrollBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const palette = [
      [124, 108, 255],
      [91, 157, 255],
      [34, 211, 238],
    ];

    const signals = [
      { label: "Web", color: [124, 108, 255] },
      { label: "Frontend", color: [91, 157, 255] },
      { label: "AI + prototypy", color: [34, 211, 238] },
      { label: "Stack", color: [124, 108, 255] },
      { label: "Mentoring", color: [91, 157, 255] },
      { label: "Hudba a spev", color: [34, 211, 238] },
      { label: "Gaming", color: [124, 108, 255] },
      { label: "Záhradka", color: [91, 157, 255] },
    ];

    const particles = [];
    const orbs = [];
    let width = 0;
    let height = 0;
    let animationId = 0;
    let time = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const currentY = window.scrollY;
      targetScrollProgress = clamp(currentY / maxScroll);
      scrollVelocity = clamp((currentY - lastScrollY) / 60, -1, 1);
      lastScrollY = currentY;

      if (reduceMotion.matches) {
        scrollProgress = targetScrollProgress;
        scrollVelocity = 0;
        drawFrame();
      }
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

      particles.length = 0;
      const count = Math.max(40, Math.floor((width * height) / 26000));

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.26,
          r: Math.random() * 1.4 + 0.7,
          depth: 0.4 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          color: palette[index % palette.length],
        });
      }

      orbs.length = 0;

      for (let index = 0; index < 4; index += 1) {
        orbs.push({
          x: (0.18 + Math.random() * 0.64) * width,
          y: Math.random() * height,
          radius: 220 + Math.random() * 260,
          depth: 0.18 + index * 0.14,
          drift: Math.random() * Math.PI * 2,
          color: palette[index % palette.length],
        });
      }

      updateScroll();
    };

    const drawConstellation = () => {
      const total = signals.length;
      const centerX = width * 0.5 + scrollVelocity * 24;
      const centerY = height * 0.5;
      const radiusX = Math.min(width * 0.34, 440);
      const radiusY = Math.min(height * 0.32, 300);
      const rotation = time * 0.05;
      const revealed = clamp(scrollProgress) * total;

      const nodes = signals.map((signal, index) => {
        const angle = -Math.PI / 2 + (index / total) * Math.PI * 2 + rotation;
        const breathe = Math.sin(time * 0.9 + index * 1.4) * 6;

        return {
          ...signal,
          x: centerX + Math.cos(angle) * radiusX,
          y: centerY + Math.sin(angle) * radiusY + breathe,
        };
      });

      // Jemná vodiaca elipsa
      context.beginPath();
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      context.strokeStyle = "rgba(148, 163, 194, 0.06)";
      context.lineWidth = 1;
      context.stroke();

      // Rastúce spoje medzi odomknutými bodmi
      for (let index = 0; index < total - 1; index += 1) {
        const fill = clamp(revealed - (index + 1));
        if (fill <= 0) continue;

        const first = nodes[index];
        const second = nodes[index + 1];
        const endX = first.x + (second.x - first.x) * fill;
        const endY = first.y + (second.y - first.y) * fill;
        const gradient = context.createLinearGradient(first.x, first.y, second.x, second.y);
        gradient.addColorStop(0, `rgba(${first.color.join(", ")}, 0.3)`);
        gradient.addColorStop(1, `rgba(${second.color.join(", ")}, 0.3)`);

        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(endX, endY);
        context.strokeStyle = gradient;
        context.lineWidth = 1.6 + Math.abs(scrollVelocity);
        context.stroke();
      }

      // Body – postupne pribúdajú
      nodes.forEach((node, index) => {
        const reveal = clamp(revealed - index);
        const [r, g, b] = node.color;

        context.beginPath();
        context.arc(node.x, node.y, 14 + reveal * 12, 0, Math.PI * 2);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.02 + reveal * 0.1})`;
        context.fill();

        context.beginPath();
        context.arc(node.x, node.y, 6 + reveal * 4, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.1 + reveal * 0.4})`;
        context.lineWidth = 1.2;
        context.stroke();

        context.beginPath();
        context.arc(node.x, node.y, 2.4 + reveal * 3.2, 0, Math.PI * 2);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.12 + reveal * 0.72})`;
        context.fill();
      });

      // Popisok práve pribúdajúceho bodu
      const activeIndex = clamp(Math.floor(revealed - 0.0001), 0, total - 1);
      const active = nodes[activeIndex];
      const activeReveal = clamp(revealed - activeIndex);

      if (active && activeReveal > 0.12) {
        const [r, g, b] = active.color;
        const side = active.x > width * 0.5 ? -1 : 1;
        context.font = "700 13px Inter, ui-sans-serif, system-ui";
        context.textAlign = side < 0 ? "right" : "left";
        context.textBaseline = "middle";
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${activeReveal * 0.5})`;
        context.fillText(active.label, active.x + side * 18, active.y);
      }

      // Kométa obiehajúca podľa scrollu
      const cometAngle = -Math.PI / 2 + clamp(scrollProgress) * Math.PI * 2 + rotation;
      const cometX = centerX + Math.cos(cometAngle) * radiusX;
      const cometY = centerY + Math.sin(cometAngle) * radiusY;

      context.beginPath();
      context.arc(cometX, cometY, 3.4 + Math.abs(scrollVelocity) * 4, 0, Math.PI * 2);
      context.fillStyle = `rgba(238, 241, 248, ${0.4 + Math.abs(scrollVelocity) * 0.3})`;
      context.fill();
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      for (const orb of orbs) {
        orb.x += Math.sin(time * 0.3 + orb.drift) * 0.2;
        orb.y += -scrollVelocity * orb.depth * 26 + Math.cos(time * 0.24 + orb.drift) * 0.16;

        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const [r, g, b] = orb.color;
        const gradient = context.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.08 + Math.abs(scrollVelocity) * 0.05})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        context.fill();
      }

      for (const point of particles) {
        point.x += point.vx + Math.sin(time + point.phase) * 0.12;
        point.y += point.vy - scrollVelocity * point.depth * 7;

        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;

        const [r, g, b] = point.color;
        context.beginPath();
        context.arc(point.x, point.y, point.r + Math.abs(scrollVelocity), 0, Math.PI * 2);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
        context.fill();
      }

      const linkDistance = 132;

      for (let a = 0; a < particles.length; a += 1) {
        for (let b = a + 1; b < particles.length; b += 1) {
          const first = particles[a];
          const second = particles[b];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < linkDistance) {
            const alpha = (1 - distance / linkDistance) * (0.14 + Math.abs(scrollVelocity) * 0.12);
            const [r, g, b] = first.color;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      drawConstellation();

      context.globalCompositeOperation = "source-over";
    };

    const draw = () => {
      time += 0.008 + Math.abs(scrollVelocity) * 0.01;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;
      scrollVelocity *= 0.9;

      drawFrame();
      animationId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      resize();

      if (reduceMotion.matches) {
        drawFrame();
        return;
      }

      draw();
    };

    const handleMotionChange = () => {
      window.cancelAnimationFrame(animationId);
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

  return <canvas className="scroll-bg" ref={canvasRef} aria-hidden="true" />;
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
  const [cheatOn, setCheatOn] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const firstCheatRender = useRef(true);

  const showToast = useCallback((text) => {
    setToast(text);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  const handleKonami = useCallback(() => setCheatOn((on) => !on), []);
  useKonamiCode(handleKonami);

  useEffect(() => {
    document.body.classList.toggle("cheat-mode", cheatOn);

    if (firstCheatRender.current) {
      firstCheatRender.current = false;
      return undefined;
    }

    showToast(
      cheatOn
        ? "🎮 Cheat mód ON — ↑↑↓↓←→←→ B A · 30 životov odomknutých"
        : "Cheat mód OFF — späť do reality.",
    );

    return () => document.body.classList.remove("cheat-mode");
  }, [cheatOn, showToast]);

  useEffect(() => {
    console.log(
      "%cMachiYm %c// programátor",
      "color:#5be7c4;font-size:22px;font-weight:900;",
      "color:#ffb86b;font-size:14px;font-weight:700;",
    );
    console.log(
      "%cPozeráš do konzoly? 👀 Skús na stránke Konami kód:  ↑ ↑ ↓ ↓ ← → ← → B A",
      "color:#b9b4a8;font-size:13px;",
    );
  }, []);

  return (
    <>
      <ScrollBackground />
      <Header />

      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}

      {cheatOn ? (
        <div className="cheat-badge" aria-hidden="true">
          🎮 CHEAT MÓD
        </div>
      ) : null}

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Študent informatiky / programátor</p>
            <h1 id="hero-title">MachiYm</h1>
            <p className="hero-text">
              Tvorím weby, prototypy a delím sa o to, čo viem, tak, aby technológie
              mali rytmus, jasný smer a trochu osobnosti.
            </p>

            <div className="hero-actions" aria-label="Hlavné odkazy">
              <a className="button primary" href="#proces">
                Ako pracujem
              </a>
              <a className="button secondary" href="#kontakt">
                Kontakt
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Profil MachiYm">
            <div className="profile-visual">
              <img src={machiLogo} alt="Logo MachiYm" />
            </div>
            <div className="signal-card">
              <p className="signal-label">Aktuálny mód</p>
              <strong>Web &amp; AI</strong>
              <span>Frontend, AI nástroje a vlastný cit pre atmosféru stránky.</span>
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
          <SectionHeading eyebrow="O mne" title="Kód beriem ako nástroj na tvorbu, nie ako samoúčel." />
          <div className="split">
            <p>
              Som MachiYm, študent informatiky a programátor. Zaujímam sa o webové
              technológie, programovanie, AI nástroje a praktické digitálne riešenia.
            </p>
            <p>
              Pri tvorbe hľadám rovnováhu medzi funkčnosťou a pocitom. Stránka má
              fungovať, ale má mať aj charakter, ktorý si človek zapamätá.
            </p>
          </div>
        </section>

        <section className="section vibe-section" id="proces">
          <SectionHeading eyebrow="Ako pracujem" title="Nápady premieňam na weby, ktoré majú štýl aj funkciu." />
          <div className="vibe-layout">
            <div className="vibe-copy">
              <p>
                Spájam nápad, AI asistenciu, cit pre dizajn a praktické programovanie.
                Nejde len o prompt, ale o schopnosť rozpoznať, čo funguje, čo je navyše
                a čo potrebuje doladiť.
              </p>
            </div>
            <div className="vibe-flow" aria-label="Môj pracovný proces">
              {vibeFlow.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="tvorba">
          <SectionHeading eyebrow="Tvorba" title="Weby, prototypy a vzdelávanie v jednom toku." />
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
            eyebrow="Stack"
            title="Nástroje, ktoré používam pri tvorbe."
            id="tech-title"
          />
          <div className="tech-list" aria-label="Technológie a zručnosti">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>

        <section className="section learning-band" id="vyucba">
          <SectionHeading eyebrow="Mentoring" title="O to, čo viem, sa delím jasne, prakticky a trochu hravo." />
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
            title="Ako rozmýšľam pri tvorbe."
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

        <section className="section hobbies-section" id="mimo-kodu">
          <SectionHeading eyebrow="Mimo kódu" title="Rytmus, hry a pokoj mimo obrazovky." />
          <div className="hobbies-grid">
            {hobbies.map((hobby) => (
              <article key={hobby.title}>
                <h3>{hobby.title}</h3>
                <p>{hobby.text}</p>
              </article>
            ))}
          </div>
          <div className="mini-game-stack">
            <GamingMiniGame />
            <MemoryGame />
          </div>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 id="contact-title">Máš nápad na web, prototyp alebo mentoring?</h2>
            <p>
              Ozvi sa, keď chceš niečo rozbehnúť, zlepšiť alebo len premeniť dobrý
              nápad na prvú použiteľnú verziu.
            </p>
          </div>

          <div className="contact-actions">
            <a className="button primary" href="mailto:erik.machacek19@gmail.com">
              erik.machacek19@gmail.com
            </a>
            <a className="button secondary" href="https://github.com/MachiYm" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="button secondary" href="https://www.instagram.com/erik_machacek/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} MachiYm. Študent informatiky a programátor, ktorý rád mení nápady na web.</p>
      </footer>
    </>
  );
}
