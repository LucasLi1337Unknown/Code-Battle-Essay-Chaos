const rounds = [
  {
    label: "ROUND 1 / BROWSER PANIC",
    scene: `<p><b>Dad:</b> Hello, are you playing chess?</p><p><b>Lucas:</b> <em>quickly switches tabs</em> No. I am learning... Englush.</p><p><b>Dad:</b> Then show me your essay.</p>`,
    choices: [
      ["TAB SACRIFICE", "Open a random essay", -8, -14, "tab", "The essay begins: ‘Bro, this passage contributes nothing.’ Dad takes emotional damage."],
      ["GRAMMAR GAMBIT", "Claim chess is English research", -14, -7, "tab", "You describe the queen as indirect characterization. Dad almost believes you."],
      ["BLUNDER", "Show the chessboard proudly", -25, 2, "", "Dad sees mate in one. Stockfish calls your decision ‘incomprehensible.’"]
    ]
  },
  {
    label: "ROUND 2 / CLOUD INCIDENT",
    scene: `<p><b>Dad:</b> Download the essay into Word and translate it.</p><p><b>VPN:</b> 403 — I-just-don't-want-you-to-use-it.</p><p><b>Cloud:</b> Preparing to spit out 57 quadrillion files.</p>`,
    choices: [
      ["CLOUD VOMIT", "Recover literally everything", -5, -17, "cloud", "Largest file: PlayingChessFor27482Hours.exe. Essay: 0.0000000001 bit."],
      ["DOUBAO DEFENSE", "Ask Doubao to write it", -15, -12, "cloud", "Doubao announces that one bit equals 657848395i million TB, then becomes Wednesday."],
      ["HONESTY?!", "Admit there is no essay", -24, -24, "", "Dad is shocked by the honesty but still demands 1,000 words. Nobody wins."]
    ]
  },
  {
    label: "ROUND 3 / HARDWARE TRAGEDY",
    scene: `<p><b>Computer:</b> Application memory exhausted.</p><p><b>Dad:</b> Why do you need so much RAM to copy an essay?</p><p><b>Lucas:</b> <em>invent an explanation immediately</em></p>`,
    choices: [
      ["GOAT DEFENSE", "The RAM died because I killed the goat", -6, -20, "ram", "Dad's logic processor encounters an unrecoverable exception."],
      ["CLOUD THEORY", "The smoke is the cloud", -11, -15, "ram", "Your computer is now ‘uploading physically.’ Fire alarm joins the discussion."],
      ["BUY A NEW MAC", "Suggest replacing the computer", -12, -8, "", "Dad reminds you it is HIS computer. Your financial evaluation drops to −99."]
    ]
  },
  {
    label: "ROUND 4 / COMMENT ATTACK",
    scene: `<p><b>Dad:</b> I understand GitHub and C++.</p><p><b>Lucas:</b> Then what does <code>// mean in C++?</code></p><p><b>Dad:</b> What question?</p>`,
    choices: [
      ["COMMENT LOOP", "Repeat // mean in C++?", -2, -23, "comment", "Everything after // is ignored. Dad cannot hear the question. Linguistic exploit successful."],
      ["UNDEF DAD", "Run #undef DAD_IS_ALWAYS_RIGHT", -8, -20, "comment", "Dad installs dad_control_everything.h and turns off your Wi-Fi."],
      ["POINTER EVIDENCE", "Accuse Dad using int *homework", -10, -14, "", "Pointer Pointer produces photographic evidence of Dad pointing at the essay."]
    ]
  },
  {
    label: "FINAL ROUND / RECURSION",
    scene: `<p><b>Dad:</b> Whoever crashes the computer loses.</p><p><b>Lucas:</b> I have one final program.</p><p><code>void playChess() { playChess(); }</code></p>`,
    choices: [
      ["RUN IT", "Infinite chess requires no base case", -34, -29, "recursion", "STACK OVERFLOW. RAM is sacrificed. The cloud recursively uploads itself."],
      ["HARDCODE VICTORY", "Set dadWritesEssay = true", -9, -31, "recursion", "It compiles. Dad patches the assignment to 100,000 words."],
      ["CLAIM A DRAW", "Invoke threefold repetition", -15, -25, "recursion", "Stockfish confirms the conversation repeated three times. Dad sacrifices your weekend anyway."]
    ]
  }
];

let round = 0;
let lucasHp = 100;
let dadHp = 100;
let sound = true;
const unlocked = new Set(JSON.parse(localStorage.getItem("codeBattleAchievements") || "[]"));
const sceneText = document.querySelector("#sceneText");
const choices = document.querySelector("#choices");
const roundLabel = document.querySelector("#roundLabel");
const battleLog = document.querySelector("#battleLog");

function beep(frequency = 280, duration = .08) {
  if (!sound) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "square";
  gain.gain.setValueAtTime(.025, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

function renderRound() {
  const data = rounds[round];
  roundLabel.textContent = data.label;
  sceneText.innerHTML = data.scene;
  choices.innerHTML = "";
  data.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.innerHTML = `<span>MOVE ${index + 1}</span>${choice[0]}<small>${choice[1]}</small>`;
    button.querySelector("small").style.cssText = "display:block;color:#9ca9c4;margin-top:7px;font-weight:500";
    button.addEventListener("click", () => choose(choice));
    choices.appendChild(button);
  });
}

function choose(choice) {
  lucasHp = Math.max(0, lucasHp + choice[2]);
  dadHp = Math.max(0, dadHp + choice[3]);
  log(choice[0], choice[5]);
  if (choice[4]) unlock(choice[4]);
  updateHud();
  beep(180 + Math.random() * 280, .12);
  sceneText.classList.remove("glitch");
  void sceneText.offsetWidth;
  sceneText.classList.add("glitch");
  round++;
  if (round >= rounds.length) {
    setTimeout(showEnding, 650);
  } else {
    setTimeout(renderRound, 430);
  }
}

function updateHud() {
  document.querySelector("#lucasHp").style.width = `${lucasHp}%`;
  document.querySelector("#dadHp").style.width = `${dadHp}%`;
  document.querySelector("#lucasHpText").textContent = `${lucasHp} HP`;
  document.querySelector("#dadHpText").textContent = `${dadHp} PATIENCE`;
  document.querySelector("#lucasStatus").textContent = lucasHp > 65 ? "pretending to study" : lucasHp > 30 ? "academically unstable" : "absolutely cooked";
  document.querySelector("#dadStatus").textContent = dadHp > 65 ? "suspicious" : dadHp > 30 ? "calculating mate" : "parental blue screen";
}

function log(tag, message) {
  const row = document.createElement("div");
  row.innerHTML = `<span>${tag}</span>${message}`;
  battleLog.prepend(row);
}

function unlock(name) {
  if (unlocked.has(name)) return;
  unlocked.add(name);
  localStorage.setItem("codeBattleAchievements", JSON.stringify([...unlocked]));
  document.querySelector(`[data-achievement="${name}"]`)?.classList.add("unlocked");
  showToast(`ACHIEVEMENT UNLOCKED: ${name.toUpperCase()}`);
}

function loadAchievements() {
  unlocked.forEach(name => document.querySelector(`[data-achievement="${name}"]`)?.classList.add("unlocked"));
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function showEnding() {
  unlock("ending");
  const modal = document.querySelector("#endingModal");
  let title = "THE WEEKEND WAS SACRIFICED";
  let text = "Dad hands you a pencil. The pencil begins chasing the gummy bears. Stockfish claims threefold repetition, but homework law rejects the draw.";
  if (dadHp <= 5) {
    title = "DAD.EXE STOPPED RESPONDING";
    text = "You did not finish the essay, but Dad's logic processor has crashed. Doubao awards you Wednesday points.";
  } else if (lucasHp <= 25) {
    title = "LUCAS IS ABSOLUTELY COOKED";
    text = "Your computer, RAM, cloud storage and weekend were all sacrificed. The essay still contains four words.";
  }
  document.querySelector("#endingTitle").textContent = title;
  document.querySelector("#endingText").textContent = text;
  document.querySelector("#endingScore").textContent = `LUCAS ${lucasHp} HP  /  DAD ${dadHp} PATIENCE  /  ESSAY 4 WORDS`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

document.querySelector("#restartButton").addEventListener("click", () => {
  round = 0;
  lucasHp = 100;
  dadHp = 100;
  updateHud();
  renderRound();
  document.querySelector("#endingModal").classList.remove("open");
  document.querySelector("#battle").scrollIntoView();
});

document.querySelector("#soundButton").addEventListener("click", event => {
  sound = !sound;
  event.currentTarget.textContent = `SOUND: ${sound ? "ON" : "OFF"}`;
  beep();
});

document.querySelector("#panicButton").addEventListener("click", () => {
  document.body.classList.add("panic");
  showToast("RAM HAS LEFT THE CHAT");
  beep(80, .4);
  setTimeout(() => document.body.classList.remove("panic"), 1300);
});

const commands = {
  help: "Available: help, essay, chess, cloud, doubao, stockfish, ram, goat, sudo win, clear",
  essay: "essay_FINAL_REAL_USE_THIS.docx — size: 0.0000000001 bit — words: 4",
  chess: "Chess.com detected. Educational cover story activated. Evaluation: Lucas −99.9",
  cloud: "MISSION STARTED: spitting out 57,383,295,848,298,753 million files...",
  doubao: "According to my calculations, one bit equals Wednesday. I am also a refrigerator.",
  stockfish: "depth 245 | mate in 1 | best move: WRITE_THE_ESSAY",
  ram: "RAM status: deceased. Suspect: one innocent goat.",
  goat: "The goat denies all allegations and has retained legal counsel.",
  "sudo win": "Permission denied: Dad owns this computer.",
  "git clone cloud": "fatal: repository 'cloud' does not exist. Try looking outside."
};

document.querySelector("#terminalForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.querySelector("#terminalInput");
  const command = input.value.trim().toLowerCase();
  if (!command) return;
  const output = document.querySelector("#terminalOutput");
  const prompt = document.createElement("p");
  prompt.innerHTML = `<span>lucas@definitely-studying</span>:~$ ${escapeHtml(input.value)}`;
  output.appendChild(prompt);
  if (command === "clear") {
    output.innerHTML = "";
  } else {
    const response = document.createElement("p");
    response.className = commands[command] ? "info" : "error";
    response.textContent = commands[command] || `command not found: ${command}. Doubao suggests restarting on Wednesday.`;
    output.appendChild(response);
  }
  output.scrollTop = output.scrollHeight;
  input.value = "";
  beep(330, .05);
});

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
}

loadAchievements();
renderRound();
