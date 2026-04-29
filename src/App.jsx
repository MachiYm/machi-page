import React, { useEffect, useRef, useState } from "react";
import machiLogo from "./machi.png";

const navItems = [
  { label: "O mne", href: "#o-mne" },
  { label: "Vibe coder", href: "#vibe-coder" },
  { label: "Tvorba", href: "#tvorba" },
  { label: "Výučba", href: "#vyucba" },
  { label: "Mimo kódu", href: "#mimo-kodu" },
  { label: "Kontakt", href: "#kontakt" },
];

const stats = [
  ["Vibe coding", "nápad rýchlo premieňam na funkčný prototyp"],
  ["Frontend", "rozhrania, ktoré sú čisté, rýchle a čitateľné"],
  ["Výučba", "informatiku vysvetľujem ľudsky a cez prax"],
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
    type: "Vzdelávanie",
    title: "Materiály a vysvetlenia",
    text: "Pripravujem príklady, cvičenia a krátke návody, ktoré pomáhajú pochopiť informatiku bez zbytočného chaosu.",
  },
];

const lessons = [
  ["01", "Programovanie od základov", "Premenné, podmienky, cykly a funkcie vysvetľujem na príkladoch, ktoré dávajú zmysel."],
  ["02", "Web cez prax", "HTML, CSS, JavaScript a React beriem cez malé zadania, úpravy a reálne obrazovky."],
  ["03", "Myslenie vývojára", "Učím rozkladať problém, testovať nápady a písať kód, ku ktorému sa dá vrátiť."],
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

const identitySignals = [
  {
    label: "VIBE",
    detail: "nápad + atmosféra",
    color: "91, 231, 196",
    type: "spark",
  },
  {
    label: "WEB",
    detail: "React a čistý frontend",
    color: "143, 199, 255",
    type: "code",
  },
  {
    label: "AI",
    detail: "prompting a prototypy",
    color: "255, 184, 107",
    type: "network",
  },
  {
    label: "UČÍM",
    detail: "informatika cez prax",
    color: "91, 231, 196",
    type: "book",
  },
  {
    label: "HUDBA",
    detail: "spev, rytmus, prejav",
    color: "255, 111, 97",
    type: "wave",
  },
  {
    label: "GAMING",
    detail: "reakcie a spolupráca",
    color: "143, 199, 255",
    type: "target",
  },
  {
    label: "ZÁHRADKA",
    detail: "pokoj mimo obrazovky",
    color: "255, 184, 107",
    type: "leaf",
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

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const ease = (value) => {
      const progress = clamp(value);
      return progress * progress * (3 - 2 * progress);
    };
    const lerp = (from, to, amount) => from + (to - from) * amount;

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
      context.strokeStyle = `rgba(91, 231, 196, ${alpha})`;
      context.lineWidth = 1;

      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
        context.beginPath();
        context.moveTo(x + offset, -height * 0.2);
        context.lineTo(x + offset, height * 1.2);
        context.stroke();
      }

      context.strokeStyle = `rgba(255, 184, 107, ${alpha * 0.75})`;

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
        context.strokeStyle = `rgba(${index % 2 === 0 ? "91, 231, 196" : "255, 111, 97"}, ${0.16 - index * 0.026})`;
        context.lineWidth = 1.2;
        context.stroke();
      }
    };

    const drawRoundedRect = (x, y, rectWidth, rectHeight, radius) => {
      const safeRadius = Math.min(radius, rectWidth / 2, rectHeight / 2);

      context.beginPath();
      context.moveTo(x + safeRadius, y);
      context.lineTo(x + rectWidth - safeRadius, y);
      context.quadraticCurveTo(x + rectWidth, y, x + rectWidth, y + safeRadius);
      context.lineTo(x + rectWidth, y + rectHeight - safeRadius);
      context.quadraticCurveTo(
        x + rectWidth,
        y + rectHeight,
        x + rectWidth - safeRadius,
        y + rectHeight,
      );
      context.lineTo(x + safeRadius, y + rectHeight);
      context.quadraticCurveTo(x, y + rectHeight, x, y + rectHeight - safeRadius);
      context.lineTo(x, y + safeRadius);
      context.quadraticCurveTo(x, y, x + safeRadius, y);
      context.closePath();
    };

    const drawSignalIcon = (type, x, y, size, color, alpha) => {
      const half = size / 2;

      context.save();
      context.strokeStyle = `rgba(${color}, ${alpha})`;
      context.fillStyle = `rgba(${color}, ${alpha})`;
      context.lineWidth = Math.max(1.2, size / 18);
      context.lineCap = "round";
      context.lineJoin = "round";

      if (type === "code") {
        context.font = `900 ${Math.max(15, size * 0.48)}px Inter, ui-sans-serif, system-ui`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("</>", x, y + 1);
      }

      if (type === "network") {
        const nodes = [
          [x - half * 0.46, y - half * 0.1],
          [x, y - half * 0.44],
          [x + half * 0.48, y + half * 0.02],
          [x - half * 0.08, y + half * 0.42],
        ];

        context.beginPath();
        context.moveTo(nodes[0][0], nodes[0][1]);
        context.lineTo(nodes[1][0], nodes[1][1]);
        context.lineTo(nodes[2][0], nodes[2][1]);
        context.lineTo(nodes[3][0], nodes[3][1]);
        context.lineTo(nodes[0][0], nodes[0][1]);
        context.stroke();

        for (const [nodeX, nodeY] of nodes) {
          context.beginPath();
          context.arc(nodeX, nodeY, size * 0.095, 0, Math.PI * 2);
          context.fill();
        }
      }

      if (type === "book") {
        context.beginPath();
        context.moveTo(x, y - half * 0.42);
        context.lineTo(x, y + half * 0.42);
        context.moveTo(x, y - half * 0.34);
        context.quadraticCurveTo(x - half * 0.5, y - half * 0.5, x - half * 0.72, y - half * 0.16);
        context.lineTo(x - half * 0.72, y + half * 0.42);
        context.quadraticCurveTo(x - half * 0.4, y + half * 0.22, x, y + half * 0.42);
        context.moveTo(x, y - half * 0.34);
        context.quadraticCurveTo(x + half * 0.5, y - half * 0.5, x + half * 0.72, y - half * 0.16);
        context.lineTo(x + half * 0.72, y + half * 0.42);
        context.quadraticCurveTo(x + half * 0.4, y + half * 0.22, x, y + half * 0.42);
        context.stroke();
      }

      if (type === "wave") {
        context.beginPath();

        for (let step = 0; step <= 36; step += 1) {
          const ratio = step / 36;
          const waveX = x - half * 0.82 + ratio * size * 0.82 * 2;
          const waveY = y + Math.sin(ratio * Math.PI * 4) * size * 0.18;

          if (step === 0) context.moveTo(waveX, waveY);
          else context.lineTo(waveX, waveY);
        }

        context.stroke();
      }

      if (type === "target") {
        context.beginPath();
        context.arc(x, y, half * 0.5, 0, Math.PI * 2);
        context.moveTo(x - half * 0.78, y);
        context.lineTo(x - half * 0.24, y);
        context.moveTo(x + half * 0.24, y);
        context.lineTo(x + half * 0.78, y);
        context.moveTo(x, y - half * 0.78);
        context.lineTo(x, y - half * 0.24);
        context.moveTo(x, y + half * 0.24);
        context.lineTo(x, y + half * 0.78);
        context.stroke();
      }

      if (type === "leaf") {
        context.beginPath();
        context.moveTo(x - half * 0.58, y + half * 0.34);
        context.bezierCurveTo(
          x - half * 0.2,
          y - half * 0.62,
          x + half * 0.5,
          y - half * 0.56,
          x + half * 0.64,
          y + half * 0.14,
        );
        context.bezierCurveTo(
          x + half * 0.16,
          y + half * 0.38,
          x - half * 0.2,
          y + half * 0.42,
          x - half * 0.58,
          y + half * 0.34,
        );
        context.moveTo(x - half * 0.5, y + half * 0.3);
        context.quadraticCurveTo(x - half * 0.02, y + half * 0.08, x + half * 0.48, y - half * 0.26);
        context.stroke();
      }

      if (type === "spark") {
        for (let index = 0; index < 8; index += 1) {
          const angle = (index / 8) * Math.PI * 2 + time * 0.5;
          const inner = half * 0.24;
          const outer = half * (index % 2 === 0 ? 0.78 : 0.5);

          context.beginPath();
          context.moveTo(x + Math.cos(angle) * inner, y + Math.sin(angle) * inner);
          context.lineTo(x + Math.cos(angle) * outer, y + Math.sin(angle) * outer);
          context.stroke();
        }

        context.beginPath();
        context.arc(x, y, half * 0.2, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
    };

    const drawSignalLabel = (signal, position, active, completed) => {
      const showLabel = active > 0.32 || (width > 980 && completed > 0.98);
      const alpha = clamp(active * 0.75 + completed * 0.16, 0, 0.82);

      if (!showLabel || alpha <= 0.04) return;

      const panelWidth = width < 560 ? 168 : 194;
      const panelHeight = 64;
      const side = position.x > width * 0.56 ? -1 : 1;
      const panelX = clamp(position.x + side * 38 - (side < 0 ? panelWidth : 0), 14, width - panelWidth - 14);
      const panelY = clamp(position.y - 32, 16, height - panelHeight - 18);

      context.save();
      drawRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
      context.fillStyle = `rgba(9, 10, 13, ${0.24 + alpha * 0.44})`;
      context.fill();
      context.strokeStyle = `rgba(${signal.color}, ${0.18 + alpha * 0.28})`;
      context.stroke();

      context.font = "900 13px Inter, ui-sans-serif, system-ui";
      context.textAlign = "left";
      context.textBaseline = "top";
      context.fillStyle = `rgba(${signal.color}, ${0.58 + alpha * 0.36})`;
      context.fillText(signal.label, panelX + 14, panelY + 12);

      context.font = "600 12px Inter, ui-sans-serif, system-ui";
      context.fillStyle = `rgba(251, 247, 238, ${0.46 + alpha * 0.34})`;
      context.fillText(signal.detail, panelX + 14, panelY + 34);
      context.restore();
    };

    const drawWordReveal = () => {
      const word = "MACHIYM";
      const fontSize = clamp(width * 0.13, 64, 172);
      const wordX = width * 0.5;
      const wordY = height * (width < 700 ? 0.58 : 0.64);
      const reveal = ease(clamp(scrollProgress * 1.18));

      context.save();
      context.font = `900 ${fontSize}px Inter, ui-sans-serif, system-ui`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.lineWidth = 1;
      context.strokeStyle = `rgba(251, 247, 238, ${0.028 + reveal * 0.035})`;
      context.strokeText(word, wordX, wordY);

      const textWidth = context.measureText(word).width;
      context.beginPath();
      context.rect(wordX - textWidth / 2, wordY - fontSize * 0.6, textWidth * reveal, fontSize * 1.08);
      context.clip();
      context.fillStyle = `rgba(91, 231, 196, ${0.025 + reveal * 0.05})`;
      context.fillText(word, wordX, wordY);
      context.restore();
    };

    const drawPersonalSignal = () => {
      const signalCount = identitySignals.length;
      const travel = scrollProgress * (signalCount - 1);
      const radiusX = width < 720 ? width * 0.38 : Math.min(width * 0.34, 430);
      const radiusY = width < 720 ? height * 0.24 : Math.min(height * 0.34, 310);
      const centerX = width < 720 ? width * 0.5 : width * 0.63;
      const centerY = height * 0.52;
      const positions = identitySignals.map((signal, index) => {
        const ratio = index / Math.max(signalCount - 1, 1);
        const angle = -Math.PI * 0.86 + ratio * Math.PI * 1.72 + scrollProgress * 0.7;
        const breathe = Math.sin(time * 1.15 + index * 1.7) * 11;
        const spiral = 1 + Math.sin(scrollProgress * Math.PI * 2 + index * 0.72) * 0.08;

        return {
          ...signal,
          x: centerX + Math.cos(angle) * radiusX * spiral,
          y: centerY + Math.sin(angle) * radiusY * spiral + breathe,
        };
      });

      context.save();
      context.globalCompositeOperation = "screen";
      drawWordReveal();

      for (let index = 0; index < positions.length - 1; index += 1) {
        const first = positions[index];
        const second = positions[index + 1];
        const segmentProgress = ease(clamp(travel - index));

        if (segmentProgress <= 0) continue;

        const endX = lerp(first.x, second.x, segmentProgress);
        const endY = lerp(first.y, second.y, segmentProgress);
        const gradient = context.createLinearGradient(first.x, first.y, second.x, second.y);
        gradient.addColorStop(0, `rgba(${first.color}, ${0.1 + segmentProgress * 0.2})`);
        gradient.addColorStop(1, `rgba(${second.color}, ${0.08 + segmentProgress * 0.24})`);

        context.beginPath();
        context.moveTo(first.x, first.y);
        context.bezierCurveTo(
          lerp(first.x, centerX, 0.22),
          lerp(first.y, centerY, 0.22),
          lerp(second.x, centerX, 0.22),
          lerp(second.y, centerY, 0.22),
          endX,
          endY,
        );
        context.strokeStyle = gradient;
        context.lineWidth = 1.8 + Math.abs(scrollVelocity) * 0.9;
        context.stroke();
      }

      positions.forEach((position, index) => {
        const completed = ease(clamp(travel - index + 0.42));
        const active = ease(1 - clamp(Math.abs(travel - index) / 0.9));
        const nodeAlpha = 0.08 + completed * 0.22 + active * 0.32;
        const radius = 8 + active * 13 + completed * 3;

        context.beginPath();
        context.arc(position.x, position.y, radius * 2.4, 0, Math.PI * 2);
        context.fillStyle = `rgba(${position.color}, ${0.018 + active * 0.07})`;
        context.fill();

        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(9, 10, 13, ${0.2 + completed * 0.24})`;
        context.fill();
        context.strokeStyle = `rgba(${position.color}, ${nodeAlpha})`;
        context.lineWidth = 1.4;
        context.stroke();

        drawSignalIcon(position.type, position.x, position.y, 30 + active * 14, position.color, nodeAlpha + 0.22);
        drawSignalLabel(position, position, active, completed);
      });

      const currentIndex = clamp(Math.round(travel), 0, signalCount - 1);
      const current = positions[currentIndex];
      const next = positions[Math.min(currentIndex + 1, signalCount - 1)] || current;
      const cometProgress = ease(clamp(travel - Math.floor(travel)));
      const cometX = lerp(current.x, next.x, cometProgress);
      const cometY = lerp(current.y, next.y, cometProgress);

      context.beginPath();
      context.arc(cometX, cometY, 4 + Math.abs(scrollVelocity) * 5, 0, Math.PI * 2);
      context.fillStyle = `rgba(251, 247, 238, ${0.28 + Math.abs(scrollVelocity) * 0.24})`;
      context.fill();
      context.restore();
    };

    const draw = () => {
      time += 0.012 + Math.abs(scrollVelocity) * 0.008;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;
      scrollVelocity *= 0.92;

      context.clearRect(0, 0, width, height);
      drawGrid();
      drawRings();
      drawPersonalSignal();

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
        context.fillStyle = `rgba(91, 231, 196, ${0.46 + Math.abs(scrollVelocity) * 0.28})`;
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
            context.strokeStyle = `rgba(255, 184, 107, ${0.2 - distance / 860 + Math.abs(scrollVelocity) * 0.08})`;
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
        gradient.addColorStop(0, "rgba(91, 231, 196, 0)");
        gradient.addColorStop(0.45, `rgba(91, 231, 196, ${stream.alpha})`);
        gradient.addColorStop(1, `rgba(255, 184, 107, ${stream.alpha + 0.14})`);

        context.beginPath();
        context.moveTo(stream.x, stream.y - stream.length);
        context.lineTo(stream.x + scrollVelocity * 48, stream.y);
        context.strokeStyle = gradient;
        context.lineWidth = 1.4;
        context.stroke();
      }

      const scanY = (height * ((time * 0.12 + scrollProgress * 1.8) % 1));
      const scanGradient = context.createLinearGradient(0, scanY - 34, 0, scanY + 34);
      scanGradient.addColorStop(0, "rgba(255, 184, 107, 0)");
      scanGradient.addColorStop(0.5, `rgba(91, 231, 196, ${0.08 + Math.abs(scrollVelocity) * 0.12})`);
      scanGradient.addColorStop(1, "rgba(255, 111, 97, 0)");
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
            <p className="eyebrow">Študent informatiky / učiteľ / vibe coder</p>
            <h1 id="hero-title">MachiYm</h1>
            <p className="hero-text">
              Tvorím weby, prototypy a učím informatiku tak, aby technológie mali
              rytmus, jasný smer a trochu osobnosti.
            </p>

            <div className="hero-actions" aria-label="Hlavné odkazy">
              <a className="button primary" href="#vibe-coder">
                Čo je môj vibe
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
              <strong>Vibe coder</strong>
              <span>AI + frontend + vlastný cit pre atmosféru stránky.</span>
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
              Som MachiYm, študent informatiky a učiteľ informatiky. Zaujímam sa
              o webové technológie, programovanie, AI nástroje a praktické digitálne
              riešenia.
            </p>
            <p>
              Pri tvorbe hľadám rovnováhu medzi funkčnosťou a pocitom. Stránka má
              fungovať, ale má mať aj charakter, ktorý si človek zapamätá.
            </p>
          </div>
        </section>

        <section className="section vibe-section" id="vibe-coder">
          <SectionHeading eyebrow="Vibe coder" title="Rýchlo nachádzam smer a potom ho dotiahnem." />
          <div className="vibe-layout">
            <div className="vibe-copy">
              <p>
                Byť vibe coder pre mňa znamená spojiť nápad, AI asistenciu, cit pre
                dizajn a praktické programovanie. Nejde len o prompt, ale o schopnosť
                rozpoznať, čo funguje, čo je navyše a čo potrebuje doladiť.
              </p>
            </div>
            <div className="vibe-flow" aria-label="Proces vibe codingu">
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
          <SectionHeading eyebrow="Výučba" title="Učenie má byť jasné, praktické a trochu hravé." />
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
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2 id="contact-title">Máš nápad na web, prototyp alebo výučbu?</h2>
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
        <p>© {new Date().getFullYear()} MachiYm. Vibe coder, študent informatiky a učiteľ, ktorý rád mení nápady na web.</p>
      </footer>
    </>
  );
}
