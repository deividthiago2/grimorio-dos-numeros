(() => {
  "use strict";

  const STORAGE_KEY = "grimorio-dos-numeros-v1";
  const PORTAL_THEME_KEY = "theme";

  function postToPortal(message) {
    try {
      window.parent.postMessage(message, "*");
    } catch (error) {
      // Sem portal: o jogo continua funcionando sozinho.
    }
  }

  const GRADES = [
    { id: 1, label: "1º ano", skills: "Somas e subtrações até 20", blurb: "Contas pequenas, grandes descobertas." },
    { id: 2, label: "2º ano", skills: "Até 100, dobro e metade", blurb: "Some, subtraia e descubra os dobros." },
    { id: 3, label: "3º ano", skills: "Tabuadas e divisão", blurb: "Multiplique, divida e atravesse centenas." },
    { id: 4, label: "4º ano", skills: "Multiplicação e frações simples", blurb: "Frações de quantidades e contas com vírgula." },
    { id: 5, label: "5º ano", skills: "Frações, porcentagem e decimais", blurb: "Porcentagens, frações e números decimais." },
    { id: 6, label: "6º ano", skills: "Porcentagem, negativos e equações", blurb: "Sinais, potências, expressões e incógnitas." }
  ];

  const STAGES = [
    {
      name: "Bruma, a Vaga-lume",
      title: "Guardião do Primeiro Selo",
      hp: 64,
      damage: 8,
      boss: false,
      core: [50, 38],
      points: [[50, 10], [62, 20], [69, 36], [64, 54], [50, 65], [35, 59], [25, 44], [29, 28], [41, 20], [54, 30], [57, 44], [48, 52], [40, 44]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 4], [1, 9]]
    },
    {
      name: "Musgo, o Golem",
      title: "Guardião das Raízes",
      hp: 80,
      damage: 9,
      boss: false,
      core: [49, 48],
      points: [[50, 8], [63, 16], [72, 32], [74, 54], [68, 72], [54, 82], [36, 79], [24, 66], [20, 45], [27, 26], [38, 14], [40, 42], [59, 43], [50, 59]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0], [11, 12], [12, 13], [13, 11], [2, 12], [8, 11]]
    },
    {
      name: "Vidro, o Corvo",
      title: "Guardião dos Ecos",
      hp: 96,
      damage: 10,
      boss: false,
      core: [56, 47],
      points: [[26, 36], [40, 30], [54, 38], [66, 32], [76, 24], [82, 34], [92, 36], [80, 42], [70, 46], [60, 54], [66, 64], [54, 60], [44, 68], [34, 60], [20, 70], [28, 56], [22, 46], [34, 48]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 0], [1, 17], [8, 17]]
    },
    {
      name: "Tinta, a Serpente",
      title: "Guardiã dos Riscos",
      hp: 112,
      damage: 12,
      boss: false,
      core: [78, 20],
      points: [[18, 82], [30, 74], [42, 64], [52, 52], [64, 44], [76, 36], [84, 24], [76, 14], [62, 16], [52, 26], [42, 36], [34, 46], [26, 56], [18, 64], [16, 74], [24, 80]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 0], [6, 9]]
    },
    {
      name: "Eclipse, o Espectro",
      title: "Guardião da Sombra",
      hp: 130,
      damage: 14,
      boss: false,
      core: [50, 56],
      points: [[50, 8], [64, 18], [72, 36], [68, 56], [76, 78], [60, 70], [52, 82], [42, 70], [26, 78], [32, 56], [28, 36], [36, 18], [42, 42], [58, 42]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0], [2, 13], [13, 3], [10, 12], [12, 2]]
    },
    {
      name: "Astral, o Dragão",
      title: "Guardião da Coroa",
      hp: 168,
      damage: 16,
      boss: true,
      core: [52, 42],
      points: [[50, 18], [38, 26], [28, 22], [32, 34], [20, 32], [26, 44], [16, 56], [30, 54], [36, 68], [48, 58], [54, 72], [62, 58], [74, 62], [78, 48], [90, 50], [82, 36], [88, 24], [74, 30], [62, 24], [30, 42], [44, 48], [58, 42], [70, 38]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 0], [3, 19], [19, 7], [1, 20], [20, 9], [17, 21], [21, 11], [15, 22], [22, 13]]
    }
  ];

  const NODE_POINTS = [
    [112, 320],
    [292, 190],
    [470, 300],
    [650, 150],
    [828, 280],
    [700, 64]
  ];

  const svgNS = "http://www.w3.org/2000/svg";
  const $ = (selector, root = document) => root.querySelector(selector);

  const ui = {
    screens: [...document.querySelectorAll("[data-screen]")],
    starfield: $("#starfield"),
    astroTicks: $("#astro-ticks"),
    astroDigits: $("#astro-digits"),
    astroLines: $("#astro-lines"),
    btnStart: $("#btn-start"),
    btnContinue: $("#btn-continue"),
    saveNote: $("#save-note"),
    btnYearsBack: $("#btn-years-back"),
    yearGrid: $("#year-grid"),
    hudGrade: $("#hud-grade"),
    hudLevel: $("#hud-level"),
    hudXpFill: $("#hud-xp-fill"),
    hudXpText: $("#hud-xp-text"),
    btnMapGrade: $("#btn-map-grade"),
    btnMapSound: $("#btn-map-sound"),
    btnBattleSound: $("#btn-battle-sound"),
    journeyLines: $("#journey-lines"),
    journeyNodes: $("#journey-nodes"),
    reviewEmpty: $("#review-empty"),
    reviewList: $("#review-list"),
    statCorrect: $("#stat-correct"),
    statWrong: $("#stat-wrong"),
    btnLeave: $("#btn-leave"),
    battleGrade: $("#battle-grade"),
    battleStage: $("#battle-stage"),
    battleDifficulty: $("#battle-difficulty"),
    enemyArt: $("#enemy-art"),
    enemyName: $("#enemy-name"),
    enemyTitle: $("#enemy-title"),
    enemyHpFill: $("#enemy-hp-fill"),
    enemyHpText: $("#enemy-hp-text"),
    enemyMeter: $(".meter--enemy"),
    feedback: $("#feedback"),
    skillTag: $("#skill-tag"),
    comboTag: $("#combo-tag"),
    questionText: $("#question-text"),
    choices: $("#choices"),
    runePanel: $("#rune-panel"),
    player: $("#player"),
    playerName: $("#player-name"),
    playerLevel: $("#player-level"),
    playerHpFill: $("#player-hp-fill"),
    playerHpText: $("#player-hp-text"),
    playerMeter: $(".meter--player"),
    btnPotion: $("#btn-potion"),
    potionCount: $("#potion-count"),
    overlay: $("#overlay"),
    overlayEyebrow: $("#overlay-eyebrow"),
    overlayTitle: $("#overlay-title"),
    overlayBody: $("#overlay-body"),
    overlayActions: $("#overlay-actions"),
    spellLayer: $("#spell-layer"),
    toast: $("#toast")
  };

  let profile = loadProfile();
  let battle = null;
  let audioContext = null;
  let toastTimer = null;

  function defaultProfile() {
    return {
      grade: null,
      unlocked: 1,
      level: 1,
      xp: 0,
      muted: false,
      misses: {},
      correct: 0,
      wrong: 0
    };
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProfile();
      const data = JSON.parse(raw);
      return { ...defaultProfile(), ...data, misses: data.misses || {} };
    } catch {
      return defaultProfile();
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      return;
    }
  }

  function gradeInfo(id) {
    return GRADES.find((grade) => grade.id === id) || GRADES[0];
  }

  function xpForLevel(level) {
    return 100 + (level - 1) * 60;
  }

  function rankName(level) {
    if (level >= 7) return "Guardião da Coroa";
    if (level >= 5) return "Arquimago";
    if (level >= 3) return "Conjurador";
    return "Aprendiz";
  }

  function playerMaxHp() {
    return 80 + (profile.level - 1) * 6;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function roundTo(value, decimals) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
  }

  function formatNumber(value) {
    const normalized = Object.is(value, -0) ? 0 : value;
    const text = Number.isInteger(normalized)
      ? String(normalized)
      : normalized.toFixed(1).replace(".", ",");
    return text.replace("-", "−");
  }

  function buildChoices(answer, options) {
    const allowNegative = Boolean(options.allowNegative);
    const decimal = Boolean(options.decimal);
    const answerText = formatNumber(answer);
    const texts = new Set([answerText]);
    const magnitude = Math.abs(answer);
    const steps = decimal
      ? [0.1, 0.2, 0.5, 1, 2]
      : magnitude >= 1000
        ? [10, 50, 100, 200, 500]
        : magnitude >= 100
          ? [5, 10, 20, 50]
          : magnitude >= 20
            ? [1, 2, 5, 10]
            : [1, 2, 3, 4];

    let guard = 0;
    while (texts.size < 4 && guard < 100) {
      guard += 1;
      const delta = pick(steps) * pick([-1, 1]);
      const candidate = roundTo(answer + delta, decimal ? 1 : 0);
      if (candidate === answer) continue;
      if (!allowNegative && candidate < 0) continue;
      if (!decimal && !Number.isInteger(candidate)) continue;
      texts.add(formatNumber(candidate));
    }

    let extra = 1;
    while (texts.size < 4 && extra < 50) {
      const candidate = allowNegative ? answer + extra : Math.max(0, answer + extra);
      if (candidate !== answer) texts.add(formatNumber(candidate));
      extra += 1;
    }

    return { choices: shuffle([...texts]), answerText };
  }

  function createProblem(prompt, rawAnswer, skill, options = {}) {
    const decimal = options.decimal ?? !Number.isInteger(rawAnswer);
    const answer = roundTo(rawAnswer, decimal ? 1 : 0);
    const { choices, answerText } = buildChoices(answer, { allowNegative: options.allowNegative, decimal });
    return { prompt, answer, answerText, choices, skill };
  }

  function arithmetic(expression, answer, skill, options = {}) {
    return createProblem(`${expression} = ?`, answer, skill, options);
  }

  function generateProblem(grade, difficulty) {
    if (grade === 1) return generateFirstGrade(difficulty);
    if (grade === 2) return generateSecondGrade(difficulty);
    if (grade === 3) return generateThirdGrade(difficulty);
    if (grade === 4) return generateFourthGrade(difficulty);
    if (grade === 5) return generateFifthGrade(difficulty);
    return generateSixthGrade(difficulty);
  }

  function generateFirstGrade(difficulty) {
    const max = [10, 15, 20][difficulty - 1];
    if (Math.random() < 0.5) {
      const a = randomInt(1, max - 1);
      const b = randomInt(1, max - a);
      return arithmetic(`${a} + ${b}`, a + b, "Soma");
    }
    const a = randomInt(2, max);
    const b = randomInt(1, a);
    return arithmetic(`${a} − ${b}`, a - b, "Subtração");
  }

  function generateSecondGrade(difficulty) {
    const max = [40, 70, 100][difficulty - 1];
    const kind = pick(["add", "sub", "double", "half", "missing"]);

    if (kind === "double") {
      const n = randomInt(5, [20, 30, 50][difficulty - 1]);
      return arithmetic(`2 × ${n}`, n * 2, "Dobro e metade");
    }

    if (kind === "half") {
      const n = randomInt(4, [15, 25, 40][difficulty - 1]);
      return arithmetic(`${n * 2} ÷ 2`, n, "Dobro e metade");
    }

    if (kind === "missing") {
      const total = randomInt(10, max);
      const a = randomInt(2, total - 2);
      return createProblem(`${a} + ? = ${total}`, total - a, "Números faltando");
    }

    if (kind === "add") {
      const a = randomInt(10, max - 10);
      const b = randomInt(5, max - a);
      return arithmetic(`${a} + ${b}`, a + b, "Soma");
    }

    const a = randomInt(20, max);
    const b = randomInt(5, a - 1);
    return arithmetic(`${a} − ${b}`, a - b, "Subtração");
  }

  function generateThirdGrade(difficulty) {
    const kind = pick(["multiply", "divide", "add", "sub"]);

    if (kind === "multiply") {
      const a = randomInt(2, [5, 7, 9][difficulty - 1]);
      const b = randomInt(2, [6, 8, 10][difficulty - 1]);
      return arithmetic(`${a} × ${b}`, a * b, "Multiplicação");
    }

    if (kind === "divide") {
      const b = randomInt(2, [5, 7, 9][difficulty - 1]);
      const q = randomInt(2, [5, 7, 9][difficulty - 1]);
      return arithmetic(`${b * q} ÷ ${b}`, q, "Divisão");
    }

    const max = [500, 800, 999][difficulty - 1];
    if (kind === "add") {
      const a = randomInt(100, max - 100);
      const b = randomInt(100, max - a);
      return arithmetic(`${a} + ${b}`, a + b, "Soma");
    }
    const a = randomInt(200, max);
    const b = randomInt(100, a - 50);
    return arithmetic(`${a} − ${b}`, a - b, "Subtração");
  }

  function generateFourthGrade(difficulty) {
    const kind = pick(["multiply", "divide", "fraction", "decimal"]);

    if (kind === "multiply") {
      const a = randomInt(11, [25, 40, 60][difficulty - 1]);
      const b = randomInt([3, 4, 6][difficulty - 1], [6, 8, 9][difficulty - 1]);
      return arithmetic(`${a} × ${b}`, a * b, "Multiplicação");
    }

    if (kind === "divide") {
      const b = randomInt(3, [6, 8, 9][difficulty - 1]);
      const q = randomInt(3, [12, 20, 30][difficulty - 1]);
      return arithmetic(`${b * q} ÷ ${b}`, q, "Divisão");
    }

    if (kind === "fraction") {
      const denominator = pick([2, 3, 4, 5]);
      const whole = denominator * randomInt(2, [4, 6, 8][difficulty - 1]);
      return arithmetic(`${1}/${denominator} de ${whole}`, whole / denominator, "Frações");
    }

    const a = randomInt(11, [25, 50, 70][difficulty - 1]) / 10;
    const b = randomInt(11, [25, 50, 70][difficulty - 1]) / 10;
    return arithmetic(`${formatNumber(roundTo(a, 1))} + ${formatNumber(roundTo(b, 1))}`, roundTo(a + b, 1), "Decimais", { decimal: true });
  }

  function generateFifthGrade(difficulty) {
    const kind = pick(["percentage", "fraction", "decimal", "multiply"]);

    if (kind === "percentage") {
      const percentage = pick([10, 25, 50, 75]);
      const base = randomInt(2, [6, 10, 14][difficulty - 1]) * 20;
      return arithmetic(`${percentage}% de ${base}`, (base * percentage) / 100, "Porcentagem");
    }

    if (kind === "fraction") {
      const denominator = pick([3, 4, 5]);
      const numerator = randomInt(1, denominator - 1);
      const whole = denominator * randomInt(2, [5, 8, 12][difficulty - 1]);
      return arithmetic(`${numerator}/${denominator} de ${whole}`, (whole * numerator) / denominator, "Frações");
    }

    if (kind === "decimal") {
      const a = randomInt(15, [40, 70, 90][difficulty - 1]) / 10;
      const b = randomInt(5, [30, 50, 60][difficulty - 1]) / 10;
      return arithmetic(`${formatNumber(roundTo(a, 1))} + ${formatNumber(roundTo(b, 1))}`, roundTo(a + b, 1), "Decimais", { decimal: true });
    }

    const a = randomInt(12, [20, 30, 40][difficulty - 1]);
    const b = randomInt(11, [18, 25, 30][difficulty - 1]);
    return arithmetic(`${a} × ${b}`, a * b, "Multiplicação");
  }

  function generateSixthGrade(difficulty) {
    const kind = pick(["percentage", "negative", "equation", "expression", "power", "fraction"]);

    if (kind === "percentage") {
      const percentage = pick([10, 20, 25, 40, 50, 60, 75, 80]);
      const base = randomInt(1, [5, 10, 20][difficulty - 1]) * 20;
      return arithmetic(`${percentage}% de ${base}`, (base * percentage) / 100, "Porcentagem");
    }

    if (kind === "negative") {
      const limit = [9, 15, 25][difficulty - 1];
      const a = randomInt(-limit, -1);
      const b = randomInt(1, limit);
      const operation = pick(["+", "−"]);
      const answer = operation === "+" ? a + b : a - b;
      return arithmetic(`${formatNumber(a)} ${operation} ${formatNumber(b)}`, answer, "Números negativos", { allowNegative: true });
    }

    if (kind === "equation") {
      const x = randomInt(2, [6, 10, 15][difficulty - 1]);
      if (Math.random() < 0.5) {
        const a = randomInt(2, [10, 20, 30][difficulty - 1]);
        return createProblem(`x + ${a} = ${x + a}, x = ?`, x, "Equações");
      }
      const a = randomInt(2, [4, 6, 8][difficulty - 1]);
      return createProblem(`${a}x = ${a * x}, x = ?`, x, "Equações");
    }

    if (kind === "expression") {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const c = randomInt(2, [4, 6, 8][difficulty - 1]);
      return arithmetic(`(${a} + ${b}) × ${c}`, (a + b) * c, "Expressões");
    }

    if (kind === "power") {
      const n = randomInt(2, [9, 12, 15][difficulty - 1]);
      return arithmetic(`${n}²`, n * n, "Potências");
    }

    const denominator = pick([4, 5, 6, 8]);
    const numerator = randomInt(1, denominator - 1);
    const whole = denominator * randomInt(2, [5, 10, 15][difficulty - 1]);
    return arithmetic(`${numerator}/${denominator} de ${whole}`, (whole * numerator) / denominator, "Frações");
  }

  function buildStars() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 120; i += 1) {
      const star = document.createElement("span");
      const cross = Math.random() < 0.1;
      const size = cross ? randomInt(3, 5) : randomInt(1, 3);
      star.className = cross ? "star star--cross" : "star";
      star.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `--size:${size}px`,
        `--opacity:${(Math.random() * 0.55 + 0.2).toFixed(2)}`,
        `--dur:${(Math.random() * 5 + 3).toFixed(1)}s`,
        `--delay:-${(Math.random() * 8).toFixed(1)}s`,
        `color:${cross ? "#e3b664" : "#f3e6c8"}`
      ].join(";");
      fragment.appendChild(star);
    }
    ui.starfield.appendChild(fragment);
  }

  function buildAstrolabe() {
    const center = 230;
    for (let i = 0; i < 48; i += 1) {
      const angle = (i / 48) * Math.PI * 2;
      const major = i % 4 === 0;
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", center + Math.cos(angle) * 100);
      line.setAttribute("y1", center + Math.sin(angle) * 100);
      line.setAttribute("x2", center + Math.cos(angle) * (major ? 112 : 105));
      line.setAttribute("y2", center + Math.sin(angle) * (major ? 112 : 105));
      line.setAttribute("class", "astro-tick");
      line.setAttribute("opacity", major ? "0.5" : "0.22");
      ui.astroTicks.appendChild(line);
    }

    for (let i = 0; i < 10; i += 1) {
      const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", center + Math.cos(angle) * 168);
      text.setAttribute("y", center + Math.sin(angle) * 168);
      text.setAttribute("class", "astro-digit");
      text.textContent = String(i);
      ui.astroDigits.appendChild(text);
    }

    const constellation = [[54, 168], [100, 126], [156, 142], [196, 96], [250, 118], [286, 76], [330, 112]];
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", constellation.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" "));
    path.setAttribute("class", "astro-line");
    path.setAttribute("fill", "none");
    ui.astroLines.appendChild(path);

    constellation.forEach(([x, y], index) => {
      const star = document.createElementNS(svgNS, "circle");
      star.setAttribute("cx", x);
      star.setAttribute("cy", y);
      star.setAttribute("r", index === 4 ? 2.4 : 1.6);
      star.setAttribute("class", "astro-star");
      ui.astroLines.appendChild(star);
    });
  }

  function showScreen(name) {
    ui.screens.forEach((screen) => {
      screen.hidden = screen.dataset.screen !== name;
    });
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function refreshTitle() {
    const hasProfile = Boolean(profile.grade);
    ui.btnContinue.hidden = !hasProfile;
    ui.saveNote.hidden = !hasProfile;
    if (hasProfile) {
      const info = gradeInfo(profile.grade);
      ui.saveNote.textContent = `Jornada salva · ${info.label} · Nível ${profile.level}`;
    }
  }

  function renderYears() {
    ui.yearGrid.innerHTML = GRADES.map((grade) => `
      <button class="year-card" type="button" data-grade="${grade.id}" ${profile.grade === grade.id ? 'aria-current="true"' : ""}>
        <span class="year-card__year">${grade.label}</span>
        <span class="year-card__skills">${grade.skills}</span>
        <span class="year-card__blurb">${grade.blurb}</span>
      </button>
    `).join("");
  }

  function selectYear(gradeId) {
    const info = gradeInfo(gradeId);
    const changed = profile.grade !== null && profile.grade !== gradeId;
    profile.grade = gradeId;
    if (changed) profile.unlocked = 1;
    saveProfile();
    renderYears();
    showMap();
    if (changed) showToast(`Trilha reiniciada no ${info.label}. Seu nível continua.`);
  }

  function showYears() {
    renderYears();
    showScreen("years");
  }

  function showTitle() {
    refreshTitle();
    showScreen("title");
  }

  function clearBattleTimers() {
    if (!battle || !battle.timers) return;
    battle.timers.forEach((timer) => clearTimeout(timer));
    battle.timers = [];
  }

  function showMap() {
    clearBattleTimers();
    battle = null;
    hideOverlay();
    ui.spellLayer.innerHTML = "";
    if (!profile.grade) {
      showYears();
      return;
    }
    renderMap();
    showScreen("map");
  }

  function nodeStatus(index) {
    if (index < profile.unlocked - 1) return "done";
    if (index === profile.unlocked - 1 && profile.unlocked <= STAGES.length) return "current";
    return "locked";
  }

  function renderMap() {
    const info = gradeInfo(profile.grade);
    const need = xpForLevel(profile.level);
    ui.hudGrade.textContent = info.label;
    ui.hudLevel.textContent = `Nível ${profile.level} · ${rankName(profile.level)}`;
    ui.hudXpFill.style.width = `${Math.min(100, (profile.xp / need) * 100)}%`;
    ui.hudXpText.textContent = `${profile.xp} / ${need} XP`;
    updateSoundButtons();

    const pathData = NODE_POINTS.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
    const ornaments = NODE_POINTS.map(([x, y], index) => {
      const status = nodeStatus(index);
      return `
        <circle class="journey__halo" cx="${x}" cy="${y}" r="${status === "current" ? 38 : 32}"></circle>
        <circle class="journey__dot" cx="${x}" cy="${y}" r="1.6"></circle>
      `;
    }).join("");
    ui.journeyLines.innerHTML = `<path class="journey__path" d="${pathData}"></path>${ornaments}`;

    ui.journeyNodes.innerHTML = STAGES.map((stage, index) => {
      const status = nodeStatus(index);
      const label = status === "done" ? "Selo conquistado" : status === "current" ? "Desafio atual" : "Selado";
      return `
        <button class="node ${status === "done" ? "is-done" : ""} ${status === "current" ? "is-current" : ""} ${status === "locked" ? "is-locked" : ""} ${stage.boss ? "is-boss" : ""}"
          type="button" data-stage="${index}" style="left:${(NODE_POINTS[index][0] / 10).toFixed(2)}%;top:${(NODE_POINTS[index][1] / 4.6).toFixed(2)}%"
          ${status === "locked" ? "disabled" : ""} aria-label="${stage.name}, ${label}">
          <span class="node__ring">${nodeGlyph(status)}</span>
          <span class="node__text">
            <span class="node__sub">${index + 1}º selo${stage.boss ? " · chefe" : ""}</span>
            <span class="node__label">${stage.name}</span>
          </span>
        </button>
      `;
    }).join("");

    const entries = Object.entries(profile.misses).sort((a, b) => b[1] - a[1]).slice(0, 5);
    ui.reviewEmpty.hidden = entries.length > 0;
    ui.reviewList.hidden = entries.length === 0;
    ui.reviewList.innerHTML = entries.map(([skill, count]) => `
      <li><span>${skill}</span><span class="review-list__count">${count}×</span></li>
    `).join("");
    ui.statCorrect.textContent = String(profile.correct);
    ui.statWrong.textContent = String(profile.wrong);
  }

  function nodeGlyph(status) {
    if (status === "done") {
      return '<svg class="node__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    if (status === "locked") {
      return '<svg class="node__glyph" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
    }
    return '<svg class="node__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 14.4 9 21 12l-6.6 3L12 21.5 9.6 15 3 12l6.6-3L12 2.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>';
  }

  function beastSvg(stage) {
    const figure = stage.points.map(([x, y], index) => `<circle class="beast__star" cx="${x}" cy="${y}" r="${index === 0 ? 2 : 1.3}"></circle>`).join("");
    const lines = stage.edges.map(([a, b]) => {
      const [x1, y1] = stage.points[a];
      const [x2, y2] = stage.points[b];
      return `M${x1} ${y1} L${x2} ${y2}`;
    }).join(" ");
    return `
      <svg class="beast" viewBox="-4 -4 108 108" role="img" aria-label="${stage.name}">
        <circle class="beast__ring" cx="50" cy="50" r="47"></circle>
        <path class="beast__line" d="${lines}"></path>
        ${figure}
        <circle class="beast__core" cx="${stage.core[0]}" cy="${stage.core[1]}" r="2.5"></circle>
      </svg>
    `;
  }

  function schedule(callback, delay) {
    if (!battle) return;
    const timer = setTimeout(() => {
      if (!battle) return;
      callback();
    }, delay);
    battle.timers.push(timer);
  }

  function startBattle(stageIndex) {
    const stage = STAGES[stageIndex];
    const maxHp = playerMaxHp();
    hideOverlay();
    ui.spellLayer.innerHTML = "";
    battle = {
      stageIndex,
      stage,
      startedAt: Date.now(),
      reported: false,
      enemyMaxHp: stage.hp,
      enemyHp: stage.hp,
      playerMaxHp: maxHp,
      playerHp: maxHp,
      potions: 2,
      difficulty: Math.min(3, Math.floor(stageIndex / 2) + 1),
      combo: 0,
      correct: 0,
      wrong: 0,
      streakCorrect: 0,
      streakWrong: 0,
      misses: {},
      locked: false,
      over: false,
      current: null,
      timers: []
    };

    ui.battleGrade.textContent = gradeInfo(profile.grade).label;
    ui.battleStage.textContent = `Selo ${stageIndex + 1} de ${STAGES.length}`;
    ui.enemyName.textContent = stage.name;
    ui.enemyTitle.textContent = stage.title;
    ui.enemyArt.innerHTML = beastSvg(stage);
    ui.playerName.textContent = rankName(profile.level);
    ui.playerLevel.textContent = `Nível ${profile.level}`;
    ui.feedback.textContent = "";
    ui.feedback.className = "feedback";
    ui.player.classList.remove("is-hit");
    ui.skillTag.textContent = "Feitiço";
    ui.comboTag.textContent = "Combo 0";
    ui.comboTag.classList.remove("is-hot");
    ui.questionText.textContent = "Prepare o feitiço…";
    ui.choices.innerHTML = "";

    renderDifficulty();
    renderEnemyHp();
    renderPlayerHp();
    updateSoundButtons();
    showScreen("battle");
    refreshPotion();

    schedule(nextQuestion, 320);
  }

  function renderDifficulty() {
    ui.battleDifficulty.textContent = `Desafio ${battle.difficulty}`;
  }

  function renderEnemyHp() {
    const percent = Math.max(0, (battle.enemyHp / battle.enemyMaxHp) * 100);
    ui.enemyHpFill.style.width = `${percent}%`;
    ui.enemyHpText.textContent = `${Math.max(0, battle.enemyHp)} / ${battle.enemyMaxHp}`;
    ui.enemyMeter.setAttribute("aria-valuenow", String(Math.round(percent)));
  }

  function renderPlayerHp() {
    const percent = Math.max(0, (battle.playerHp / battle.playerMaxHp) * 100);
    ui.playerHpFill.style.width = `${percent}%`;
    ui.playerHpText.textContent = `${Math.max(0, battle.playerHp)} / ${battle.playerMaxHp}`;
    ui.playerMeter.setAttribute("aria-valuenow", String(Math.round(percent)));
  }

  function refreshPotion() {
    if (!battle) return;
    ui.potionCount.textContent = String(battle.potions);
    ui.btnPotion.disabled = battle.over || battle.locked || battle.potions <= 0 || battle.playerHp >= battle.playerMaxHp;
  }

  function updateCombo() {
    ui.comboTag.textContent = `Combo ${battle.combo}`;
    ui.comboTag.classList.toggle("is-hot", battle.combo >= 3);
  }

  function nextQuestion() {
    if (!battle || battle.over) return;
    battle.locked = false;
    battle.current = generateProblem(profile.grade, battle.difficulty);
    ui.skillTag.textContent = battle.current.skill;
    ui.questionText.textContent = battle.current.prompt;
    ui.feedback.textContent = "";
    ui.feedback.className = "feedback";
    ui.choices.innerHTML = battle.current.choices.map((choice, index) => `
      <button class="choice" type="button" data-key="${index + 1}" data-value="${choice}">${choice}</button>
    `).join("");
    updateCombo();
    refreshPotion();
  }

  function handleAnswer(button) {
    if (!battle || battle.locked || battle.over || !battle.current) return;
    battle.locked = true;
    const correct = button.dataset.value === battle.current.answerText;
    const buttons = [...ui.choices.querySelectorAll(".choice")];
    buttons.forEach((choice) => {
      choice.disabled = true;
      if (choice.dataset.value === battle.current.answerText) {
        choice.classList.add("is-correct");
      } else if (choice === button) {
        choice.classList.add("is-wrong");
      } else {
        choice.classList.add("is-dim");
      }
    });
    refreshPotion();

    if (correct) {
      battle.correct += 1;
      battle.streakCorrect += 1;
      battle.streakWrong = 0;
      battle.combo += 1;
      profile.correct += 1;
      const damage = 16 + Math.min(battle.combo, 6) * 3 + randomInt(0, 4);
      battle.enemyHp = Math.max(0, battle.enemyHp - damage);
      playSfx("correct");
      castSpell(damage);
      setFeedback(
        battle.combo >= 3
          ? `Acerto! Combo ${battle.combo}: ${damage} de dano.`
          : `Acerto! ${damage} de dano no guardião.`,
        "good"
      );
      renderEnemyHp();
      updateCombo();
      saveProfile();

      if (battle.enemyHp <= 0) {
        winBattle();
        return;
      }

      if (battle.streakCorrect >= 4 && battle.difficulty < 3) {
        battle.difficulty += 1;
        battle.streakCorrect = 0;
        renderDifficulty();
      }

      schedule(nextQuestion, 950);
      return;
    }

    battle.wrong += 1;
    battle.streakWrong += 1;
    battle.streakCorrect = 0;
    battle.combo = 0;
    profile.wrong += 1;
    battle.misses[battle.current.skill] = (battle.misses[battle.current.skill] || 0) + 1;
    profile.misses[battle.current.skill] = (profile.misses[battle.current.skill] || 0) + 1;
    setFeedback(`A resposta era ${battle.current.answerText}. O guardião contra-ataca!`, "bad");
    playSfx("wrong");
    updateCombo();
    saveProfile();

    if (battle.streakWrong >= 2 && battle.difficulty > 1) {
      battle.difficulty -= 1;
      battle.streakWrong = 0;
      renderDifficulty();
    }

    schedule(enemyTurn, 850);
  }

  function enemyTurn() {
    if (!battle || battle.over) return;
    const damage = battle.stage.damage + randomInt(0, 3);
    battle.playerHp = Math.max(0, battle.playerHp - damage);
    ui.player.classList.add("is-hit");
    setTimeout(() => {
      if (battle) ui.player.classList.remove("is-hit");
    }, 450);
    playSfx("hit");
    renderPlayerHp();
    const rect = ui.player.getBoundingClientRect();
    spawnDamage(rect.left + 56, rect.top + 16, `−${damage}`, "#ef6b47");
    setFeedback(`O guardião ataca: −${damage} de vida.`, "bad");
    refreshPotion();

    if (battle.playerHp <= 0) {
      loseBattle();
      return;
    }

    schedule(nextQuestion, 1100);
  }

  function usePotion() {
    if (!battle || battle.locked || battle.over || battle.potions <= 0) return;
    if (battle.playerHp >= battle.playerMaxHp) return;
    battle.locked = true;
    battle.potions -= 1;
    const healed = Math.min(battle.playerMaxHp - battle.playerHp, 26 + profile.level * 2);
    battle.playerHp += healed;
    playSfx("potion");
    renderPlayerHp();
    refreshPotion();
    setFeedback(`Poção restauradora: +${healed} de vida.`, "good");
    schedule(nextQuestion, 900);
  }

  function setFeedback(message, tone) {
    ui.feedback.textContent = message;
    ui.feedback.className = "feedback";
    if (tone === "good") ui.feedback.classList.add("is-good");
    if (tone === "bad") ui.feedback.classList.add("is-bad");
  }

  function castSpell(damage) {
    const panelRect = ui.runePanel.getBoundingClientRect();
    const enemyRect = ui.enemyArt.getBoundingClientRect();
    const x1 = panelRect.left + panelRect.width / 2;
    const y1 = panelRect.top + 18;
    const x2 = enemyRect.left + enemyRect.width / 2;
    const y2 = enemyRect.top + enemyRect.height / 2;
    const controlX = (x1 + x2) / 2 + randomInt(-60, 60);
    const controlY = Math.min(y1, y2) - randomInt(40, 90);
    const path = `M${x1} ${y1} Q${controlX} ${controlY} ${x2} ${y2}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "spell-svg");
      const trail = document.createElementNS(svgNS, "path");
      trail.setAttribute("d", path);
      trail.setAttribute("class", "spell-path");
      const orb = document.createElementNS(svgNS, "circle");
      orb.setAttribute("class", "spell-orb");
      orb.setAttribute("r", "4");
      const motion = document.createElementNS(svgNS, "animateMotion");
      motion.setAttribute("dur", "0.4s");
      motion.setAttribute("fill", "freeze");
      motion.setAttribute("path", path);
      orb.appendChild(motion);
      const burst = document.createElementNS(svgNS, "circle");
      burst.setAttribute("cx", String(x2));
      burst.setAttribute("cy", String(y2));
      burst.setAttribute("r", "2");
      burst.setAttribute("class", "spell-burst");
      svg.append(trail, orb, burst);
      ui.spellLayer.appendChild(svg);
      setTimeout(() => svg.remove(), 1000);
    }

    ui.enemyArt.classList.add("is-hit");
    setTimeout(() => {
      if (battle) ui.enemyArt.classList.remove("is-hit");
    }, 450);
    spawnDamage(x2, y2 - 10, `−${damage}`, "#ffd98a");
  }

  function spawnDamage(x, y, text, color) {
    const float = document.createElement("div");
    float.className = "damage-float";
    float.textContent = text;
    float.style.left = `${x}px`;
    float.style.top = `${y}px`;
    float.style.color = color;
    ui.spellLayer.appendChild(float);
    setTimeout(() => float.remove(), 1000);
  }

  function reportFinish({ win, xpGained = 0 }) {
    if (!battle || battle.reported) return;
    battle.reported = true;

    const attempts = battle.correct + battle.wrong;
    const accuracy = Math.round((battle.correct / Math.max(1, attempts)) * 100);

    postToPortal({
      type: "vrgame:finish",
      score: battle.correct,
      maxScore: Math.max(1, attempts),
      timeMs: Date.now() - battle.startedAt,
      detail: {
        mode: "battle",
        result: win ? "win" : "lose",
        grade: profile.grade,
        stage: battle.stageIndex + 1,
        stageName: battle.stage.name,
        correct: battle.correct,
        wrong: battle.wrong,
        accuracy,
        xpGained,
        level: profile.level,
        campaignComplete: win && battle.stageIndex === STAGES.length - 1
      }
    });
  }

  function winBattle() {
    battle.over = true;
    battle.locked = true;
    battle.enemyHp = 0;
    renderEnemyHp();
    refreshPotion();
    playSfx("win");
    clearBattleTimers();

    const accuracy = Math.round((battle.correct / Math.max(1, battle.correct + battle.wrong)) * 100);
    const xpGained = 32 + battle.stageIndex * 12 + battle.correct * 2 + (battle.wrong === 0 ? 10 : 0);
    const previousLevel = profile.level;
    profile.xp += xpGained;
    while (profile.xp >= xpForLevel(profile.level)) {
      profile.xp -= xpForLevel(profile.level);
      profile.level += 1;
    }
    profile.unlocked = Math.max(profile.unlocked, Math.min(STAGES.length + 1, battle.stageIndex + 2));
    saveProfile();
    reportFinish({ win: true, xpGained });

    const leveled = profile.level > previousLevel;
    const isBoss = battle.stageIndex === STAGES.length - 1;
    const nextIndex = battle.stageIndex + 1;
    const missed = Object.keys(battle.misses);
    const reviewHtml = missed.length
      ? `<div class="overlay__review">${missed.map((skill) => `<span class="tag">${skill}</span>`).join("")}</div>`
      : "";
    const levelHtml = leveled
      ? `<p class="overlay__note">Subiu para o nível ${profile.level}. Sua vida máxima agora é ${playerMaxHp()}.</p>`
      : "";
    const body = `
      <div class="overlay__stats">
        <div class="overlay__stat"><span>${battle.correct}</span><small>acertos</small></div>
        <div class="overlay__stat"><span>${accuracy}%</span><small>precisão</small></div>
        <div class="overlay__stat"><span>+${xpGained}</span><small>XP</small></div>
      </div>
      ${isBoss ? "<p>A Coroa Astral voltou a brilhar. Todas as constelações reconhecem seu nome.</p>" : "<p>O selo foi conquistado. O próximo guardião já sente sua magia.</p>"}
      ${levelHtml}
      ${reviewHtml}
    `;

    const actions = [];
    if (isBoss) {
      actions.push({ label: "Voltar à trilha", primary: true, action: showMap });
    } else {
      actions.push({ label: "Próximo guardião", primary: true, action: () => startBattle(nextIndex) });
      actions.push({ label: "Ver mapa", action: showMap });
    }

    schedule(() => {
      showOverlay({
        eyebrow: isBoss ? "A Coroa reacende" : "Selo conquistado",
        title: isBoss ? "A Coroa Astral voltou a brilhar" : "Vitória!",
        body,
        actions
      });
    }, 800);
  }

  function loseBattle() {
    battle.over = true;
    battle.locked = true;
    battle.playerHp = 0;
    renderPlayerHp();
    refreshPotion();
    playSfx("lose");
    clearBattleTimers();
    saveProfile();
    reportFinish({ win: false });

    const accuracy = Math.round((battle.correct / Math.max(1, battle.correct + battle.wrong)) * 100);
    const missed = Object.keys(battle.misses);
    const reviewHtml = missed.length
      ? `<p class="overlay__note">Para revisar: ${missed.join(", ")}.</p>`
      : "";
    const body = `
      <div class="overlay__stats">
        <div class="overlay__stat"><span>${battle.correct}</span><small>acertos</small></div>
        <div class="overlay__stat"><span>${battle.wrong}</span><small>erros</small></div>
        <div class="overlay__stat"><span>${accuracy}%</span><small>precisão</small></div>
      </div>
      <p>A magia se esgotou, mas nada foi perdido. As contas mudam a cada tentativa.</p>
      ${reviewHtml}
    `;

    const index = battle.stageIndex;
    schedule(() => {
      showOverlay({
        eyebrow: "A magia se esgotou",
        title: "O guardião venceu esta rodada",
        body,
        actions: [
          { label: "Tentar novamente", primary: true, action: () => startBattle(index) },
          { label: "Voltar ao mapa", action: showMap }
        ]
      });
    }, 700);
  }

  function showOverlay({ eyebrow, title, body, actions }) {
    ui.overlayEyebrow.textContent = eyebrow;
    ui.overlayTitle.textContent = title;
    ui.overlayBody.innerHTML = body;
    ui.overlayActions.innerHTML = "";
    actions.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `btn ${item.primary ? "btn--primary" : "btn--ghost"}`;
      button.textContent = item.label;
      button.addEventListener("click", item.action);
      ui.overlayActions.appendChild(button);
      if (index === 0) setTimeout(() => button.focus({ preventScroll: true }), 60);
    });
    ui.overlay.hidden = false;
  }

  function hideOverlay() {
    ui.overlay.hidden = true;
  }

  function confirmLeaveBattle() {
    if (!battle) {
      showMap();
      return;
    }
    if (battle.over) {
      showMap();
      return;
    }
    clearBattleTimers();
    battle.locked = true;
    refreshPotion();
    showOverlay({
      eyebrow: "Pausa",
      title: "Sair da batalha?",
      body: "<p>O progresso desta batalha será perdido, mas suas estatísticas continuam salvas.</p>",
      actions: [
        {
          label: "Continuar batalha",
          primary: true,
          action: () => {
            hideOverlay();
            if (!battle) return;
            battle.locked = false;
            nextQuestion();
          }
        },
        { label: "Sair para o mapa", action: showMap }
      ]
    });
  }

  function showToast(message) {
    ui.toast.textContent = message;
    ui.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      ui.toast.hidden = true;
    }, 3000);
  }

  function updateSoundButtons() {
    const muted = profile.muted;
    const icon = muted
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6.5 9H3v6h3.5L11 19V5Z"/><path d="m16 9 5 6M21 9l-5 6"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6.5 9H3v6h3.5L11 19V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a9 9 0 0 1 0 12"/></svg>';
    [ui.btnMapSound, ui.btnBattleSound].forEach((button) => {
      button.innerHTML = icon;
      button.setAttribute("aria-pressed", String(muted));
      button.setAttribute("aria-label", muted ? "Ligar som" : "Desligar som");
    });
  }

  function toggleSound() {
    profile.muted = !profile.muted;
    saveProfile();
    updateSoundButtons();
    if (!profile.muted) playSfx("click");
  }

  function getAudioContext() {
    if (profile.muted) return null;
    if (!audioContext) {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return null;
      audioContext = new Context();
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function tone(frequency, offset, duration, type = "sine", gain = 0.05, endFrequency = null) {
    const context = getAudioContext();
    if (!context) return;
    const start = context.currentTime + offset;
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.linearRampToValueAtTime(gain, start + 0.015);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(volume).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function playSfx(name) {
    if (profile.muted) return;
    if (name === "correct") {
      tone(523.25, 0, 0.18, "sine", 0.05);
      tone(659.25, 0.07, 0.18, "sine", 0.045);
      tone(783.99, 0.14, 0.24, "sine", 0.04);
    } else if (name === "wrong") {
      tone(196, 0, 0.3, "triangle", 0.045, 120);
      tone(146.83, 0.08, 0.28, "sine", 0.03, 100);
    } else if (name === "hit") {
      tone(110, 0, 0.14, "square", 0.03, 70);
    } else if (name === "potion") {
      tone(659.25, 0, 0.16, "sine", 0.04);
      tone(880, 0.06, 0.2, "sine", 0.035);
      tone(1046.5, 0.13, 0.24, "sine", 0.03);
    } else if (name === "win") {
      [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
        tone(frequency, index * 0.11, 0.34, "triangle", 0.045);
      });
    } else if (name === "lose") {
      [392, 329.63, 261.63].forEach((frequency, index) => {
        tone(frequency, index * 0.14, 0.36, "sine", 0.04);
      });
    } else if (name === "click") {
      tone(660, 0, 0.08, "sine", 0.03);
    }
  }

  const battleScreen = $('[data-screen="battle"]');

  ui.yearGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".year-card");
    if (!card) return;
    playSfx("click");
    selectYear(Number(card.dataset.grade));
  });

  ui.journeyNodes.addEventListener("click", (event) => {
    const node = event.target.closest(".node");
    if (!node || node.disabled) return;
    playSfx("click");
    startBattle(Number(node.dataset.stage));
  });

  ui.choices.addEventListener("click", (event) => {
    const choice = event.target.closest(".choice");
    if (!choice) return;
    handleAnswer(choice);
  });

  ui.btnPotion.addEventListener("click", usePotion);
  ui.btnLeave.addEventListener("click", confirmLeaveBattle);
  ui.btnMapGrade.addEventListener("click", () => {
    playSfx("click");
    showYears();
  });
  ui.btnMapSound.addEventListener("click", toggleSound);
  ui.btnBattleSound.addEventListener("click", toggleSound);

  ui.btnStart.addEventListener("click", () => {
    playSfx("click");
    showYears();
  });

  ui.btnContinue.addEventListener("click", () => {
    playSfx("click");
    if (profile.grade) showMap();
    else showYears();
  });

  ui.btnYearsBack.addEventListener("click", () => {
    playSfx("click");
    showTitle();
  });

  document.addEventListener("keydown", (event) => {
    if (!battle || battle.locked || battle.over || battleScreen.hidden) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = Number(event.key);
    if (key >= 1 && key <= 4) {
      const button = ui.choices.querySelector(`[data-key="${key}"]`);
      if (button) {
        event.preventDefault();
        handleAnswer(button);
      }
    }
  });

  function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
      document.documentElement.dataset.theme = theme;
    }
  }

  function preferredTheme() {
    try {
      const fromQuery = new URLSearchParams(window.location.search).get("theme");
      if (fromQuery === "dark" || fromQuery === "light") return fromQuery;
    } catch (error) {
      // URLSearchParams indisponível: segue para a próxima opção.
    }

    try {
      const saved = window.localStorage.getItem(PORTAL_THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (error) {
      // Armazenamento bloqueado: usa a preferência do sistema.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  let lastReportedHeight = 0;

  function reportHeight() {
    const height = Math.ceil(document.body.getBoundingClientRect().height);
    if (Math.abs(height - lastReportedHeight) < 4) return;
    lastReportedHeight = height;
    postToPortal({ type: "vrgame:resize", height });
  }

  window.addEventListener("message", (event) => {
    if (!event.data) return;
    if (event.data.type === "vrgame:theme") applyTheme(event.data.theme);
    if (event.data.type === "vrgame:fullscreen") {
      document.documentElement.classList.toggle("is-fullscreen", Boolean(event.data.fullscreen));
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === PORTAL_THEME_KEY) applyTheme(event.newValue);
  });

  window.addEventListener("resize", reportHeight);
  if ("ResizeObserver" in window) {
    new ResizeObserver(reportHeight).observe(document.body);
  }
  window.requestAnimationFrame(reportHeight);

  applyTheme(preferredTheme());

  if (window.self === window.top) {
    document.documentElement.classList.add("is-standalone");
  }

  postToPortal({ type: "vrgame:ready" });

  buildStars();
  buildAstrolabe();
  refreshTitle();
  updateSoundButtons();
})();
