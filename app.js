const authConfig = {
  username: "admin",
  passwordHash: "e6a1460e4a86a54ef373e3a6afe636a09ca6e9a5c1fece3aa7ec5f2347fbcce8",
};

const authStorageKey = "exemplo-vector-authenticated";

const journeyVideos = {
  "pix-imediato-iniciadora-fase-3": {
    url: "Assets/Sicredi PJ - receptora de dados - mobile.mp4",
    title: "Pix imediato na visão iniciadora (Fase 3)",
    description: "Demonstração da execução correta da jornada.",
  },
};

const rows = [
  {
    id: 1,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "funcionalidade",
    category: "Clareza e previsibilidade",
    criteria: "Apresenta tela descritiva informando que será redirecionado para a instituição Detentora",
    answer: { kind: "choice", value: "SIM" },
    status: "Respondida",
  },
  {
    id: 2,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Alerta",
    criteria: "Mensagem de indisponibilidade durante a jornada",
    answer: { kind: "choice", value: "NÃO" },
    status: "Respondida",
  },
  {
    id: 3,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Quantidade de telas",
    criteria: "Quantidade mínima total de telas para concluir a jornada",
    answer: { kind: "number", value: "8" },
    status: "Respondida",
  },
  {
    id: 4,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Duração",
    criteria: "Duração total para a execução da jornada na Iniciadora de Transação de Pagamento",
    answer: { kind: "number", value: "62" },
    status: "Respondida",
  },
  {
    id: 5,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Quantidade de cliques",
    criteria: "Quantidade de cliques para executar a jornada do usuário, partindo do início até a conclusão",
    answer: { kind: "number", value: "5" },
    status: "Respondida",
  },
  {
    id: 6,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Presença de erro",
    criteria: "Presença de erro ou travamento na jornada",
    answer: { kind: "choice", value: "NÃO" },
    status: "Respondida",
  },
  {
    id: 7,
    journeyId: "pix-imediato-iniciadora-fase-3",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix imediato na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Identificação",
    criteria: "Identifica corretamente a instituição envolvida na jornada",
    answer: { kind: "choice", value: "SIM" },
    status: "Respondida",
  },
  {
    id: 8,
    journeyId: "sem-video-demo",
    macroJourney: "Iniciação de pagamento Pix - Iniciadora",
    journey: "Pix agendado na visão iniciadora (Fase 3)",
    type: "monitor",
    category: "Disponibilidade",
    criteria: "Jornada disponível para execução pelo usuário",
    answer: { kind: "choice", value: "SIM" },
    status: "Respondida",
  },
];

const tableBody = document.getElementById("validationRows");
const modal = document.getElementById("videoModal");
const video = document.getElementById("journeyVideo");
const modalJourney = document.getElementById("videoModalJourney");
const videoDescription = document.getElementById("videoDescription");
const closeButton = document.getElementById("closeVideoModal");
const closeFooterButton = document.getElementById("closeVideoModalFooter");
const appShell = document.getElementById("appShell");
const loginPanel = document.getElementById("loginPanel");
const loginForm = document.getElementById("loginForm");
const loginUser = document.getElementById("loginUser");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const logoutLink = document.getElementById("logoutLink");

let selectedVideo = null;
let openerButton = null;

function setAuthenticated(isAuthenticated) {
  document.body.classList.toggle("auth-locked", !isAuthenticated);
  appShell.hidden = !isAuthenticated;
  loginPanel.hidden = isAuthenticated;

  if (isAuthenticated) {
    renderRows();
    return;
  }

  closeVideoModal();
  loginPassword.value = "";
  loginUser.focus();
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function handleLogin(event) {
  event.preventDefault();

  if (!crypto.subtle) {
    loginError.textContent = "Este navegador não suporta validação local de senha.";
    loginError.hidden = false;
    return;
  }

  const passwordHash = await sha256(loginPassword.value);
  const isValid = loginUser.value === authConfig.username && passwordHash === authConfig.passwordHash;

  if (!isValid) {
    loginError.textContent = "Usuário ou senha inválidos.";
    loginError.hidden = false;
    loginPassword.select();
    return;
  }

  loginError.hidden = true;
  sessionStorage.setItem(authStorageKey, "true");
  setAuthenticated(true);
}

function handleLogout(event) {
  event.preventDefault();
  sessionStorage.removeItem(authStorageKey);
  setAuthenticated(false);
}

function renderRows() {
  tableBody.innerHTML = rows.map(renderRow).join("");
}

function renderRow(row) {
  const videoInfo = journeyVideos[row.journeyId] ?? null;

  return `
    <div class="table-row" role="row" data-row-id="${row.id}">
      <div class="cell video-cell" role="cell">${renderVideoButton(row, videoInfo)}</div>
      <div class="cell macro" role="cell">
        <span class="expand-cell" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
        </span>
        <span>${escapeHtml(row.macroJourney)}</span>
      </div>
      <div class="cell journey" role="cell">${escapeHtml(row.journey)}</div>
      <div class="cell type" role="cell">${escapeHtml(row.type)}</div>
      <div class="cell category" role="cell">${escapeHtml(row.category)}</div>
      <div class="cell criteria" role="cell">${escapeHtml(row.criteria)}</div>
      <div class="cell response" role="cell">${renderAnswer(row.answer)}</div>
      <div class="cell status" role="cell">${escapeHtml(row.status)}</div>
      <div class="cell comment" role="cell">
        <button class="comment-button" type="button" aria-label="Adicionar comentário" title="Adicionar comentário">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg>
        </button>
      </div>
    </div>
  `;
}

function renderVideoButton(row, videoInfo) {
  if (!videoInfo) {
    return `
      <span class="video-unavailable" title="Vídeo indisponível" aria-label="Vídeo indisponível">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 10.5V7.8c0-.9-.7-1.6-1.6-1.6H5.6C4.7 6.2 4 6.9 4 7.8v8.4c0 .9.7 1.6 1.6 1.6h7.8c.9 0 1.6-.7 1.6-1.6v-2.7l4 3.1c.4.3 1 .1 1-.5V7.9c0-.6-.6-.8-1-.5l-4 3.1Z" />
          <path d="m4 4 16 16" />
        </svg>
      </span>
    `;
  }

  return `
    <button
      class="video-button"
      type="button"
      title="Visualizar vídeo da jornada"
      aria-label="Visualizar vídeo da jornada"
      data-journey-id="${escapeHtml(row.journeyId)}"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 10.5V7.8c0-.9-.7-1.6-1.6-1.6H5.6C4.7 6.2 4 6.9 4 7.8v8.4c0 .9.7 1.6 1.6 1.6h7.8c.9 0 1.6-.7 1.6-1.6v-2.7l4 3.1c.4.3 1 .1 1-.5V7.9c0-.6-.6-.8-1-.5l-4 3.1Z" />
      </svg>
    </button>
  `;
}

function renderAnswer(answer) {
  if (answer.kind === "number") {
    return `<input class="numeric-answer" aria-label="Resposta numérica" value="${escapeHtml(answer.value)}" />`;
  }

  return `
    <div class="response-options" aria-label="Resposta">
      <button class="response-choice ${answer.value === "SIM" ? "active" : ""}" type="button">SIM</button>
      <button class="response-choice ${answer.value === "NÃO" ? "active" : ""}" type="button">NÃO</button>
    </div>
  `;
}

function openVideoModal(journeyId, trigger) {
  const videoInfo = journeyVideos[journeyId];
  if (!videoInfo) return;

  selectedVideo = videoInfo;
  openerButton = trigger;
  modalJourney.textContent = videoInfo.title;
  videoDescription.textContent = videoInfo.description || "";
  video.src = videoInfo.url;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();

  const playback = video.play();
  if (playback && typeof playback.catch === "function") {
    playback.catch(() => {});
  }
}

function closeVideoModal() {
  if (modal.hidden) return;

  video.pause();
  video.removeAttribute("src");
  video.load();
  selectedVideo = null;
  modal.hidden = true;
  document.body.style.overflow = "";

  if (openerButton) {
    openerButton.focus();
    openerButton = null;
  }
}

function keepFocusInModal(event) {
  if (modal.hidden || event.key !== "Tab") return;

  const focusable = modal.querySelectorAll(
    'button, video, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

tableBody.addEventListener("click", (event) => {
  const videoButton = event.target.closest(".video-button");
  if (!videoButton) return;

  event.stopPropagation();
  openVideoModal(videoButton.dataset.journeyId, videoButton);
});

closeButton.addEventListener("click", closeVideoModal);
closeFooterButton.addEventListener("click", closeVideoModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeVideoModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoModal();
    return;
  }

  keepFocusInModal(event);
});

loginForm.addEventListener("submit", handleLogin);
logoutLink.addEventListener("click", handleLogout);
setAuthenticated(sessionStorage.getItem(authStorageKey) === "true");
