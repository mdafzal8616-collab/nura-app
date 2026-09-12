(function () {
  "use strict";

  var PRAYERS = [
    { key: "fajr", label: "Fajr" },
    { key: "dhuhr", label: "Dhuhr" },
    { key: "asr", label: "Asr" },
    { key: "maghrib", label: "Maghrib" },
    { key: "isha", label: "Isha" }
  ];

  var CORE_HABITS = [
    { id: "core-quran", name: "Quran" },
    { id: "core-zikr", name: "Zikr" },
    { id: "core-gratitude", name: "One moment of gratitude" }
  ];

  var BONUS_HABITS = [
    { id: "bonus-water", name: "Drink enough water" },
    { id: "bonus-sleep", name: "Sleep on time" },
    { id: "bonus-noscreen", name: "One hour with no phone" }
  ];

  var RESET_ACTIONS = {
    low: "Just pray one prayer right now, even sitting down if you need to. That's enough for this moment.",
    normal: "Pick the very next prayer time, and set out your wudu or a reminder before it comes.",
    high: "Catch up on today's missed prayers one at a time, no rush — just start with the first one."
  };

  function todayKey(d) {
    d = d || new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // storage unavailable — fail silently, nothing to persist
    }
  }

  function getPrayers() {
    return readJSON("nura_prayers", {});
  }

  function setDayPrayers(dateKey, dayData) {
    var all = getPrayers();
    all[dateKey] = dayData;
    writeJSON("nura_prayers", all);
  }

  function getDayPrayers(dateKey) {
    var all = getPrayers();
    return all[dateKey] || { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
  }

  function countDone(dayData) {
    return PRAYERS.reduce(function (sum, p) {
      return sum + (dayData[p.key] ? 1 : 0);
    }, 0);
  }

  function showToast(msg) {
    var toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    setTimeout(function () {
      toast.classList.add("hidden");
    }, 1800);
  }

  // ---------- HOME RENDER ----------

  function renderGreeting() {
    var name = localStorage.getItem("nura_user_name");
    var greetingEl = document.getElementById("home-greeting");
    greetingEl.textContent = name ? ("Assalamu Alaikum, " + name) : "Assalamu Alaikum";
  }

  function renderDate() {
    var el = document.getElementById("home-date");
    var now = new Date();
    el.textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }

  function renderPrayerSummary() {
    var key = todayKey();
    var day = getDayPrayers(key);
    var done = countDone(day);

    document.getElementById("prayer-count-badge").textContent = done + " of 5";

    var preview = document.getElementById("prayer-dots-preview");
    preview.innerHTML = "";
    PRAYERS.forEach(function (p) {
      var dot = document.createElement("div");
      dot.className = "prayer-dot-mini" + (day[p.key] ? " done" : "");
      dot.textContent = p.label.charAt(0);
      preview.appendChild(dot);
    });
  }

  function renderWeekRow() {
    var row = document.getElementById("week-row");
    row.innerHTML = "";
    var today = new Date();

    for (var i = 6; i >= 0; i--) {
      var d = new Date(today);
      d.setDate(today.getDate() - i);
      var key = todayKey(d);
      var day = getDayPrayers(key);
      var done = countDone(day);

      var wrap = document.createElement("div");
      wrap.className = "week-day";

      var dot = document.createElement("div");
      dot.className = "week-dot";
      if (done === 5) dot.className += " full";
      else if (done > 0) dot.className += " partial";
      if (i === 0) dot.className += " today";

      var label = document.createElement("span");
      label.className = "label";
      label.textContent = d.toLocaleDateString(undefined, { weekday: "narrow" });

      wrap.appendChild(dot);
      wrap.appendChild(label);
      row.appendChild(wrap);
    }
  }

  function renderHome() {
    renderGreeting();
    renderDate();
    renderPrayerSummary();
    renderWeekRow();
  }

  // ---------- HABITS RENDER ----------

  function getHabitDefs() {
    return readJSON("nura_habits_defs", []);
  }

  function saveHabitDefs(defs) {
    writeJSON("nura_habits_defs", defs);
  }

  function addPersonalHabit(name) {
    var defs = getHabitDefs();
    defs.push({ id: "p-" + Date.now(), name: name });
    saveHabitDefs(defs);
  }

  function deletePersonalHabit(id) {
    var defs = getHabitDefs().filter(function (h) {
      return h.id !== id;
    });
    saveHabitDefs(defs);
  }

  function getHabitLogs() {
    return readJSON("nura_habits_log", {});
  }

  function getDayHabitLog(dateKey) {
    var all = getHabitLogs();
    return all[dateKey] || {};
  }

  function setDayHabitLog(dateKey, log) {
    var all = getHabitLogs();
    all[dateKey] = log;
    writeJSON("nura_habits_log", all);
  }

  function toggleHabitDone(habitId) {
    var key = todayKey();
    var log = getDayHabitLog(key);
    log[habitId] = !log[habitId];
    setDayHabitLog(key, log);
  }

  function buildHabitItem(habit, log, deletable) {
    var item = document.createElement("div");
    item.className = "habit-item";

    var name = document.createElement("span");
    name.className = "name";
    name.textContent = habit.name;

    var actions = document.createElement("div");
    actions.className = "habit-actions";

    var done = !!log[habit.id];
    var toggle = document.createElement("button");
    toggle.className = "habit-toggle" + (done ? " done" : "");
    toggle.textContent = done ? "Done" : "Mark done";
    toggle.addEventListener("click", function () {
      toggleHabitDone(habit.id);
      renderHabits();
    });
    actions.appendChild(toggle);

    if (deletable) {
      var del = document.createElement("button");
      del.className = "habit-delete";
      del.textContent = "✕";
      del.setAttribute("aria-label", "Remove habit");
      del.addEventListener("click", function () {
        deletePersonalHabit(habit.id);
        renderHabits();
      });
      actions.appendChild(del);
    }

    item.appendChild(name);
    item.appendChild(actions);
    return item;
  }

  // ---------- QURAN VERSE OF THE DAY ----------
  // Arabic text: verbatim from the Tanzil Project (tanzil.net), CC BY 3.0 —
  // attribution required, text must not be altered. No translation is shown
  // yet; that is added separately once ready. See docs/decisions.md.

  var QURAN_DATA_URL = "assets/quran/quran-uthmani.txt";
  var quranVersesCache = null;
  var quranLoadPromise = null;

  function loadQuranVerses() {
    if (quranVersesCache) return Promise.resolve(quranVersesCache);
    if (quranLoadPromise) return quranLoadPromise;

    quranLoadPromise = fetch(QURAN_DATA_URL)
      .then(function (res) { return res.text(); })
      .then(function (text) {
        var verses = [];
        text.split("\n").forEach(function (line) {
          var m = line.match(/^(\d+)\|(\d+)\|(.+)$/);
          if (m) {
            verses.push({ surah: Number(m[1]), ayah: Number(m[2]), text: m[3].trim() });
          }
        });
        quranVersesCache = verses;
        return verses;
      });

    return quranLoadPromise;
  }

  function getTodayVerseIndex(total) {
    var epoch = Date.UTC(2024, 0, 1);
    var daysSince = Math.floor((Date.now() - epoch) / 86400000);
    return ((daysSince % total) + total) % total;
  }

  function renderVerseOfDay() {
    var box = document.getElementById("verse-box");
    loadQuranVerses().then(function (verses) {
      if (!verses.length) return;
      var verse = verses[getTodayVerseIndex(verses.length)];
      document.getElementById("verse-ref").textContent = "Surah " + verse.surah + ":" + verse.ayah;
      document.getElementById("verse-arabic").textContent = verse.text;
      box.classList.remove("hidden");
    }).catch(function () {
      box.classList.add("hidden");
    });
  }

  function renderHabits() {
    document.getElementById("habits-date").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    renderVerseOfDay();

    var key = todayKey();
    var log = getDayHabitLog(key);
    var personalDefs = getHabitDefs();
    var allHabits = CORE_HABITS.concat(BONUS_HABITS, personalDefs);
    var doneCount = allHabits.reduce(function (sum, h) {
      return sum + (log[h.id] ? 1 : 0);
    }, 0);
    document.getElementById("habits-count-badge").textContent = doneCount + " of " + allHabits.length;

    var coreList = document.getElementById("core-habit-list");
    coreList.innerHTML = "";
    CORE_HABITS.forEach(function (h) {
      coreList.appendChild(buildHabitItem(h, log, false));
    });

    var bonusList = document.getElementById("bonus-habit-list");
    bonusList.innerHTML = "";
    BONUS_HABITS.forEach(function (h) {
      bonusList.appendChild(buildHabitItem(h, log, false));
    });

    var personalList = document.getElementById("personal-habit-list");
    personalList.innerHTML = "";
    if (personalDefs.length === 0) {
      var empty = document.createElement("p");
      empty.className = "habit-empty";
      empty.textContent = "No personal habits yet — add one that fits your day.";
      personalList.appendChild(empty);
    } else {
      personalDefs.forEach(function (h) {
        personalList.appendChild(buildHabitItem(h, log, true));
      });
    }
  }

  function initAddHabitModal() {
    var modal = document.getElementById("modal-add-habit");
    var openBtn = document.getElementById("open-add-habit");
    var closeBtn = document.getElementById("add-habit-close");
    var input = document.getElementById("add-habit-input");
    var saveBtn = document.getElementById("add-habit-save");

    function save() {
      var val = input.value.trim();
      if (val) {
        addPersonalHabit(val);
        renderHabits();
      }
      modal.classList.add("hidden");
    }

    openBtn.addEventListener("click", function () {
      input.value = "";
      modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.add("hidden");
    });

    saveBtn.addEventListener("click", save);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") save();
    });
  }

  // ---------- NAV ----------

  function setActiveView(name) {
    document.querySelectorAll(".view").forEach(function (v) {
      v.classList.toggle("hidden", v.dataset.view !== name);
    });
    document.querySelectorAll(".nav-btn[data-nav]").forEach(function (btn) {
      if (btn.dataset.nav === "add") return;
      btn.classList.toggle("active", btn.dataset.nav === name);
    });
    if (name === "home") renderHome();
    if (name === "habits") renderHabits();
  }

  function initNav() {
    document.querySelectorAll(".nav-btn[data-nav]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.dataset.nav;
        if (target === "add") {
          showToast("Adding things is still being tested — coming soon.");
          return;
        }
        setActiveView(target);
      });
    });
  }

  // ---------- NAME MODAL ----------

  function initNameModal() {
    var existing = localStorage.getItem("nura_user_name");
    var modal = document.getElementById("modal-name");
    if (existing) {
      modal.classList.add("hidden");
      return;
    }
    modal.classList.remove("hidden");
    var input = document.getElementById("name-input");
    var saveBtn = document.getElementById("name-save");

    function save() {
      var val = input.value.trim();
      if (val) {
        localStorage.setItem("nura_user_name", val);
      }
      modal.classList.add("hidden");
      renderGreeting();
    }

    saveBtn.addEventListener("click", save);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") save();
    });
  }

  // ---------- PRAYER CHECK-IN MODAL ----------

  function renderCheckinList() {
    var key = todayKey();
    var day = getDayPrayers(key);
    var list = document.getElementById("prayer-list");
    list.innerHTML = "";

    PRAYERS.forEach(function (p) {
      var item = document.createElement("div");
      item.className = "prayer-item";

      var name = document.createElement("span");
      name.className = "name";
      name.textContent = p.label;

      var toggle = document.createElement("button");
      toggle.className = "prayer-toggle" + (day[p.key] ? " done" : "");
      toggle.textContent = day[p.key] ? "Done" : "Mark done";

      toggle.addEventListener("click", function () {
        var current = getDayPrayers(key);
        current[p.key] = !current[p.key];
        setDayPrayers(key, current);
        renderCheckinList();
        renderPrayerSummary();
        renderWeekRow();
      });

      item.appendChild(name);
      item.appendChild(toggle);
      list.appendChild(item);
    });
  }

  function initCheckinModal() {
    var modal = document.getElementById("modal-checkin");
    var openBtn = document.getElementById("open-checkin");
    var closeBtn = document.getElementById("checkin-close");
    var dateEl = document.getElementById("checkin-date");

    openBtn.addEventListener("click", function () {
      dateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
      renderCheckinList();
      modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  // ---------- RESET TODAY MODAL ----------

  function initResetModal() {
    var modal = document.getElementById("modal-reset");
    var openBtn = document.getElementById("open-reset");
    var closeBtn = document.getElementById("reset-close");
    var stepEnergy = document.getElementById("reset-step-energy");
    var stepAction = document.getElementById("reset-step-action");
    var actionText = document.getElementById("reset-action-text");
    var doneBtn = document.getElementById("reset-done");

    function resetToStart() {
      stepEnergy.classList.remove("hidden");
      stepAction.classList.add("hidden");
    }

    openBtn.addEventListener("click", function () {
      resetToStart();
      modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.add("hidden");
    });

    document.querySelectorAll("[data-energy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var energy = btn.dataset.energy;
        actionText.textContent = RESET_ACTIONS[energy];

        var resets = readJSON("nura_resets", []);
        resets.push({ date: todayKey(), energy: energy, action: RESET_ACTIONS[energy] });
        writeJSON("nura_resets", resets);

        stepEnergy.classList.add("hidden");
        stepAction.classList.remove("hidden");
      });
    });

    doneBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
  }

  // ---------- INIT ----------

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initNameModal();
    initCheckinModal();
    initResetModal();
    initAddHabitModal();
    renderHome();
  });
})();
