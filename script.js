// Simple Tidy Notes demo – vanilla JS + localStorage

const STORAGE_KEY = "tidyNotesDemo.v1";
const THEME_KEY = "tidyNotesTheme";

// ---------- LANGUAGE SUPPORT (infrastructure only) ---------- //

const LANGUAGES = {
  en: {
    appTitle: "Tidy Notes",
    subtitle: "Write it down. Find it instantly.",
    allLabel: "All",

categories: {
  idea: "Idea",
  task: "Task",
  reminder: "Reminder",
  shopping: "Shopping",
  phone: "Phone number",
  email: "Email",
  family: "Family",
  quotes: "Quotes",
  goals: "Goals",
  finance: "Finance"
},

    
    searchPlaceholder: "Search notes…",
    emptyNoNotes: "No notes yet.",
    emptyAddFirst: "Tap the + button to add your first clean note.",
    newNote: "New Note",
    editNote: "Edit Note",
    pinned: "Pinned",
    deleteConfirm: 'Delete note "{title}"?\nThis cannot be undone.',
    filterNoMatch: "No notes match your filters yet.",
    alertMissingFields: "Please add a title and some content.",
    categoriesLabel: "Categories:",
    selectCategoryTitle: "Select category",
    copyTitle: "Copy note",
    editTitle: "Edit",
    deleteTitle: "Delete",
    pinTitle: "Pin",
    unpinTitle: "Unpin",
    modal: {
    titleLabel: "Title",
    categoryLabel: "Category",
    contentLabel: "Content",
    contentPlaceholder: "Write your note here…",
    save: "Save note",
    cancel: "Cancel"
    },
  },
  he: {
    appTitle: "Tidy Notes",
    subtitle: ".פתקים פשוטים, תמיד מסודרים",
    
    allLabel: "הכל",

categories: {
  idea: "רעיון",
  task: "משימה",
  reminder: "תזכורת",
  shopping: "קניות",
  phone: "טלפון",
  email: "אימייל",
  family: "משפחה",
  quotes: "ציטוטים",
  goals: "מטרות",
  finance: "כספים"
},

    
    searchPlaceholder: "חיפוש פתקים…",
    emptyNoNotes: "אין פתקים עדיין.",
    emptyAddFirst: "לחץ על כפתור + כדי להוסיף פתק ראשון.",
    newNote: "פתק חדש",
    editNote: "עריכת פתק",
    pinned: "נעוץ",
    deleteConfirm: 'למחוק את הפתק "{title}"?\nלא ניתן לשחזר.',
    filterNoMatch: "אין פתקים שמתאימים לסינון.",
    alertMissingFields: "אנא הוסף כותרת ותוכן.",
    categoriesLabel: "קטגוריות:",
    selectCategoryTitle: "בחר קטגוריה",
    copyTitle: "העתק פתק",
    editTitle: "ערוך",
    deleteTitle: "מחק",
    pinTitle: "נעץ",
    unpinTitle: "בטל נעיצה",
    modal: {
    titleLabel: "כותרת",
    categoryLabel: "קטגוריה",
    contentLabel: "תוכן",
    contentPlaceholder: "כתוב את הפתק כאן…",
    save: "שמור פתק",
    cancel: "ביטול"
    },
  },

zh: {
  appTitle: "Tidy Notes",
  subtitle: "写下来，立刻找到。",
  allLabel: "全部",

  categories: {
    idea: "想法",
    task: "任务",
    reminder: "提醒",
    shopping: "购物",
    phone: "电话",
    email: "电子邮件",
    family: "家庭",
    quotes: "语录",
    goals: "目标",
    finance: "财务"
  },

  searchPlaceholder: "搜索笔记…",
  emptyNoNotes: "还没有笔记。",
  emptyAddFirst: "点击 + 按钮创建你的第一条笔记。",
  newNote: "新建笔记",
  editNote: "编辑笔记",
  pinned: "已固定",

  deleteConfirm: '删除笔记“{title}”？\n此操作无法撤销。',
  filterNoMatch: "没有符合条件的笔记。",
  alertMissingFields: "请填写标题和内容。",

  categoriesLabel: "分类：",
  selectCategoryTitle: "选择分类",

  copyTitle: "复制笔记",
  editTitle: "编辑",
  deleteTitle: "删除",
  pinTitle: "固定",
  unpinTitle: "取消固定",

  modal: {
    titleLabel: "标题",
    categoryLabel: "分类",
    contentLabel: "内容",
    contentPlaceholder: "在这里写下你的笔记…",
    save: "保存笔记",
    cancel: "取消"
  }
},

  
  es: {
    appTitle: "Tidy Notes",
    subtitle: "Escríbelo. Encuéntralo al instante.",
    searchPlaceholder: "Buscar notas…",
    emptyNoNotes: "Aún no hay notas.",
    emptyAddFirst: "Pulsa el botón + para crear tu primera nota.",
    newNote: "Nueva nota",
    editNote: "Editar nota",
    pinned: "Fijada",
    deleteConfirm: '¿Eliminar la nota "{title}"?\nNo se puede deshacer.',
    filterNoMatch: "No hay notas que coincidan con el filtro.",
    alertMissingFields: "Por favor añade un título y contenido.",
    categoriesLabel: "Categorías:",
    selectCategoryTitle: "Seleccionar categoría",

    modal: {
      titleLabel: "Título",
      categoryLabel: "Categoría",
      contentLabel: "Contenido",
      contentPlaceholder: "Escribe tu nota aquí…",
      save: "Guardar nota",
      cancel: "Cancelar"
    },

    categories: {
      idea: "Idea",
      task: "Tarea",
      reminder: "Recordatorio",
      shopping: "Compras",
      phone: "Teléfono",
      email: "Correo",
      family: "Familia",
      quotes: "Citas",
      goals: "Objetivos",
      finance: "Finanzas"
    },

    allLabel: "Todas"
  }
  
};

const LANG_KEY = "tidyNotesLang";

function detectLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && LANGUAGES[saved]) return saved;

  const systemLang = (navigator.language || "en").split("-")[0];
  return LANGUAGES[systemLang] ? systemLang : "en";
}

let currentLang = detectLanguage();

function t(key, vars = {}) {
  const keys = key.split(".");
  let text = LANGUAGES[currentLang];

  for (const k of keys) {
    text = text?.[k];
  }

  if (!text) return key;

  for (const [k, v] of Object.entries(vars)) {
    text = text.replaceAll(`{${k}}`, String(v));
  }

  return text;
}


function setLanguage(lang) {
  if (!LANGUAGES[lang]) return;

  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  // 🔥 APPLY RTL WHEN LANGUAGE CHANGES
  applyPartialRTL(lang === "he");

  updateStaticText();
  renderNotes();
}



function applyPartialRTL(isRTL) {
  // Modal
  const modal = document.getElementById("note-modal");
  if (modal) modal.classList.toggle("rtl", isRTL);

  // Search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.classList.toggle("rtl", isRTL);

  // Note content textarea
  const noteContent = document.getElementById("note-content");
  if (noteContent) noteContent.classList.toggle("rtl", isRTL);

  // 🔥 Categories (filters row)
  const filters = document.querySelector(".filters");
  if (filters) filters.classList.toggle("rtl", isRTL);
  
  // 🔥 Category sheet title
  const sheetTitle = document.querySelector("#category-sheet h3");
  if (sheetTitle) sheetTitle.classList.toggle("rtl", isRTL);
}




// Safe: only updates elements if they exist (you’ll wire HTML later)
function updateStaticText() {
  // ---------- Header ----------
  const h1 = document.querySelector(".app-header h1");
  if (h1) h1.textContent = t("appTitle");

  const subtitle = document.querySelector(".app-header p");
  if (subtitle) subtitle.textContent = t("subtitle");

  // ---------- Search ----------
  const search = document.getElementById("search-input");
  if (search) search.placeholder = t("searchPlaceholder");

  // ---------- Empty state ----------
  const empty = document.getElementById("notes-empty");
  if (empty) {
    const ps = empty.querySelectorAll("p");
    if (ps[0]) ps[0].textContent = t("emptyNoNotes");
    if (ps[1]) {
      ps[1].innerHTML = t("emptyAddFirst").replace("+", "<strong>+</strong>");
    }
  }

  // ---------- Filters ----------
  const filtersLabel = document.querySelector(".filters-label");
  if (filtersLabel) filtersLabel.textContent = t("categoriesLabel");

  // ---------- Category sheet title ----------
  const sheetTitle = document.querySelector("#category-sheet h3");
  if (sheetTitle) sheetTitle.textContent = t("selectCategoryTitle");

  // ---------- Modal title ----------
  const modalTitle = document.getElementById("modal-title");
  if (modalTitle) {
    modalTitle.textContent = editingNoteId
      ? t("editNote")
      : t("newNote");
  }

  // ---------- Generic text (labels, buttons, options, spans) ----------
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;

    // OPTION elements
    if (el.tagName === "OPTION") {
      el.textContent = t(key);
      return;
    }

    // Default text nodes (label, span, button)
    el.textContent = t(key);
  });

  // ---------- Placeholders ----------
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
}





let notes = [];
let activeCategory = "all";
let searchQuery = "";
let preselectedCategory = null;

// ★ Edit state
let editingNoteId = null;

// ---------- Helpers ---------- //

function generateId() {
  return Date.now().toString(36) + "-" + Math.random().toString(16).slice(2);
}

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
}

// Category info (labels + icons)
const CATEGORY_INFO = {
  idea: { icon: "💡" },
  task: { icon: "📝" },
  reminder: { icon: "⏰" },
  shopping: { icon: "🛒" },
  phone: { icon: "📞" },
  email: { icon: "✉️" },
  family: { icon: "👨‍👩‍👧" },
  quotes: { icon: "💬" },
  goals: { icon: "🎯" },
  finance: { icon: "💰" },
};


// ---------- THEME HANDLING ---------- //

function applyTheme(theme) {
  const btn = document.getElementById("theme-toggle");

  if (theme === "light") {
    document.documentElement.classList.add("light");
    // light mode shows moon (toggle to dark)
    if (btn) btn.textContent = "🌙";
  } else {
    document.documentElement.classList.remove("light");
    // dark mode shows sun (toggle to light)
    if (btn) btn.textContent = "☀️";
  }
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(saved);
}

// ---------- Storage ---------- //

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      notes = JSON.parse(saved);
      return;
    } catch {
      notes = [];
    }
  }

  // Seed demo notes on first run
  notes = [
    {
      id: generateId(),
      title: "App idea – clean notes",
      content: "Notes sorted by categories. Always tidy.",
      category: "idea",
      pinned: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 6,
    },
    {
      id: generateId(),
      title: "Call Dani about project",
      content: "Ask about the Android demo.",
      category: "task",
      pinned: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 3,
    },
    {
      id: generateId(),
      title: "Groceries list",
      content: "Tomatoes\nPasta\nOlive oil\nMilk",
      category: "shopping",
      pinned: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
    },
  ];

  saveNotes();
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- Rendering ---------- //

function renderNotes() {
  const container = document.getElementById("notes-container");
  const emptyState = document.getElementById("notes-empty");

  if (!notes.length) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  const query = searchQuery.trim().toLowerCase();

  let filtered = notes.filter((note) => {
    const matchesCategory =
      activeCategory === "all" || note.category === activeCategory;

    const matchesSearch =
      !query ||
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Pins first, then newest first
  filtered.sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;

  const timeA = a.updatedAt || a.createdAt;
  const timeB = b.updatedAt || b.createdAt;

  return timeB - timeA; // ★ sort by last edited
});


  if (!filtered.length) {
  container.innerHTML =
    `<p class="empty-state">${t("filterNoMatch")}</p>`;
  return;
}


  container.innerHTML = "";
  for (const note of filtered) {
    container.appendChild(createNoteCard(note));
  }
}

function createNoteCard(note) {
  const card = document.createElement("article");
  card.className = `note-card ${note.category}`;
  card.dataset.id = note.id;

  // Header
  const header = document.createElement("div");
  header.className = "note-header";

  const title = document.createElement("h3");
  title.className = "note-title";
  title.textContent = note.title;

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const info = CATEGORY_INFO[note.category] || { label: note.category, icon: "" };

  const catSpan = document.createElement("span");
  catSpan.className = `note-category-pill ${note.category}`;
  catSpan.textContent = `${info.icon} ${t(`categories.${note.category}`)}`;

  const dateSpan = document.createElement("span");
  //dateSpan.textContent = formatDate(note.createdAt);
  const timestamp = note.updatedAt || note.createdAt;
  dateSpan.textContent = formatDate(timestamp);


  meta.appendChild(catSpan);
  meta.appendChild(dateSpan);

  header.appendChild(title);
  header.appendChild(meta);

  // Content
  const content = document.createElement("div");
  content.className = "note-content";
  content.textContent = note.content;

  // Footer
  const footer = document.createElement("div");
  footer.className = "note-footer";

  const left = document.createElement("div");
  if (note.pinned) {
    const pinBadge = document.createElement("span");
    pinBadge.className = "pin-badge";
    pinBadge.textContent = t("pinned");
    left.appendChild(pinBadge);
  }

  const actions = document.createElement("div");
  actions.className = "note-actions";

  // PIN
  const pinBtn = document.createElement("button");
  pinBtn.type = "button";
  pinBtn.className = "icon-btn";
  pinBtn.title = note.pinned ? t("unpinTitle") : t("pinTitle");
  pinBtn.textContent = note.pinned ? "📌" : "📍";
  pinBtn.dataset.action = "toggle-pin";

  // EDIT ★ NEW
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "icon-btn";
  editBtn.title = t("editTitle");
  editBtn.textContent = "✏️";
  editBtn.dataset.action = "edit";

  // COPY
  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "icon-btn";
  copyBtn.title = t("copyTitle");
  copyBtn.textContent = "📋";
  copyBtn.dataset.action = "copy";

  // DELETE
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "icon-btn icon-btn-danger";
  deleteBtn.title = t("deleteTitle");
  deleteBtn.textContent = "🗑";
  deleteBtn.dataset.action = "delete";

  actions.appendChild(pinBtn);
  actions.appendChild(editBtn);
  actions.appendChild(copyBtn);
  actions.appendChild(deleteBtn);

  footer.appendChild(left);
  footer.appendChild(actions);

  card.appendChild(header);
  card.appendChild(content);
  card.appendChild(footer);

  return card;
}

// ---------- COPY HANDLER (✓ Green Tick + fallback) ---------- //

function handleCopyNote(id, btn) {
  const note = notes.find((n) => n.id === id);
  if (!note) return;

  const text = `${note.title}\n\n${note.content}`;

  // Modern browsers (requires secure context for clipboard API)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => showCopySuccess(btn))
      .catch(() => fallbackCopy(text, btn));
    return;
  }

  // Fallback
  fallbackCopy(text, btn);
}

function fallbackCopy(text, btn) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const ok = document.execCommand("copy");
    if (ok) showCopySuccess(btn);
    else showCopyFailure(btn);
  } catch {
    showCopyFailure(btn);
  }

  textarea.remove();
}

function showCopySuccess(btn) {
  const original = btn.textContent;

  btn.textContent = "✓";
  btn.style.background = "rgba(34, 197, 94, 0.3)";
  btn.style.color = "#22c55e";

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = "";
    btn.style.color = "";
  }, 1500);
}

function showCopyFailure(btn) {
  const original = btn.textContent;

  btn.textContent = "⚠";
  btn.style.background = "rgba(239, 68, 68, 0.3)";
  btn.style.color = "#ef4444";

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = "";
    btn.style.color = "";
  }, 1500);
}

// ---------- Modal logic ---------- //

const modal = document.getElementById("note-modal");
const modalBackdrop = document.getElementById("note-modal-backdrop");
const addNoteBtn = document.getElementById("add-note-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const modalTitleEl = document.getElementById("modal-title");

const noteForm = document.getElementById("note-form");
const noteTitleInput = document.getElementById("note-title");
const noteCategorySelect = document.getElementById("note-category");
const noteContentTextarea = document.getElementById("note-content");

// Sliding sheet
const categorySheet = document.getElementById("category-sheet");
const categorySheetBackdrop = document.getElementById("category-sheet-backdrop");
const categoryCancel = document.getElementById("category-cancel");

function openModal({ mode = "new" } = {}) {
  modal.classList.remove("hidden");
  modalBackdrop.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  
  // 🔥 ENSURE RTL IS APPLIED WHEN MODAL OPENS
  applyPartialRTL(currentLang === "he");

  modalTitleEl.textContent = mode === "edit" ? t("editNote") : t("newNote");

  setTimeout(() => noteTitleInput.focus(), 50);
}

function closeModal() {
  modal.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  // reset edit state
  editingNoteId = null;
}

function openNewNoteFlow() {
  editingNoteId = null;
  preselectedCategory = null;
  openCategorySheet();
}

function openEditNoteFlow(note) {
  editingNoteId = note.id;

  noteTitleInput.value = note.title;
  noteContentTextarea.value = note.content;
  noteCategorySelect.value = note.category;

  openModal({ mode: "edit" });
}

function handleSaveNote(event) {
  event.preventDefault();

  const title = noteTitleInput.value.trim();
  const content = noteContentTextarea.value.trim();
  const category = noteCategorySelect.value;

  if (!title || !content) {
    alert(t("alertMissingFields"));
    return;
  }

  if (editingNoteId) {
    // UPDATE existing
    const idx = notes.findIndex((n) => n.id === editingNoteId);
    if (idx !== -1) {
      notes[idx] = {
        ...notes[idx],
        title,
        content,
        category,
        // keep pinned + createdAt
        updatedAt: Date.now(), // ★ ADD THIS
      };
    }
  } else {
    // CREATE new
    notes.push({
      id: generateId(),
      title,
      content,
      category,
      pinned: false,
      createdAt: Date.now(),
    });
  }

  saveNotes();
  renderNotes();
  closeModal();
}

// ---------- Category Sheet ---------- //

function openCategorySheet() {
  categorySheet.classList.remove("hidden");
  categorySheetBackdrop.classList.remove("hidden");

  requestAnimationFrame(() => {
    categorySheet.classList.add("visible");
    categorySheetBackdrop.classList.add("active");
  });
}

function closeCategorySheet() {
  categorySheet.classList.remove("visible");
  categorySheetBackdrop.classList.remove("active");

  setTimeout(() => {
    categorySheet.classList.add("hidden");
    categorySheetBackdrop.classList.add("hidden");
  }, 450);
}

// ---------- Note actions ---------- //

function handleDeleteNote(id) {
  const note = notes.find((n) => n.id === id);
  if (!note) return;

  const confirmDelete = confirm(t("deleteConfirm", { title: note.title }));

  if (!confirmDelete) return;

  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  renderNotes();
}

function handleTogglePin(id) {
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return;

  notes[idx].pinned = !notes[idx].pinned;
  saveNotes();
  renderNotes();
}

// ---------- Event Listeners ---------- //

document.addEventListener("DOMContentLoaded", () => {
  currentLang = detectLanguage();

  applyPartialRTL(currentLang === "he");

  updateStaticText();
  loadTheme();
  loadNotes();
  setupEvents();
  renderNotes();
});



function setupEvents() {
  // Theme toggle
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.toggle("light");
      const newTheme = isLight ? "light" : "dark";
      localStorage.setItem(THEME_KEY, newTheme);
      applyTheme(newTheme);
    });
  }

  // + button → category sheet (new note)
  addNoteBtn.addEventListener("click", openNewNoteFlow);

  // Modal closing
  modalCloseBtn.addEventListener("click", closeModal);
  modalCancelBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  // ESC closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Save note
  noteForm.addEventListener("submit", handleSaveNote);

  // Category chips filter
  const chipContainer = document.querySelector(".filters");
  chipContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    const category = chip.dataset.category;
    if (!category) return;

    activeCategory = category;

    document.querySelectorAll(".chip").forEach((c) => {
      c.classList.remove("chip-active");
    });
    chip.classList.add("chip-active");

    renderNotes();
  });

  // Search input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderNotes();
  });

  // Note action buttons (pin/edit/copy/delete)
  const container = document.getElementById("notes-container");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const card = e.target.closest(".note-card");
    if (!card) return;

    const id = card.dataset.id;
    const action = btn.dataset.action;

    if (action === "delete") {
      handleDeleteNote(id);
    } else if (action === "toggle-pin") {
      handleTogglePin(id);
    } else if (action === "copy") {
      handleCopyNote(id, btn);
    } else if (action === "edit") {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      openEditNoteFlow(note);
    }
  });

  // Category selection from sheet
  document.querySelectorAll(".category-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      preselectedCategory = btn.dataset.category || "idea";
      closeCategorySheet();

      // Prepare modal for NEW note
      editingNoteId = null;
      noteForm.reset();
      noteCategorySelect.value = preselectedCategory;

      openModal({ mode: "new" });
    });
  });

  categoryCancel.addEventListener("click", closeCategorySheet);
  categorySheetBackdrop.addEventListener("click", closeCategorySheet);
  
    // Language dropdown hook (optional; safe if element doesn't exist)
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

}