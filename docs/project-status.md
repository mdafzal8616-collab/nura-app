# NURA — Master Status / Context Prompt

Last updated: 2026-09-15. Regenerate this file instead of trusting an old copy — read `CLAUDE.md` and `docs/decisions.md` first, they are the source of truth.

Paste this whole file into a new AI session as a starting prompt to give it full, accurate context on NURA without re-explaining from scratch.

---

## 1. What NURA is

Gen-Z-first Islamic self-improvement app for young Muslims, India first. Plain HTML/CSS/JS, no framework, no backend, no accounts — all data in browser `localStorage`. Budget ~₹1,000 for this phase.

Core promise: **"NURA helps a young Muslim take one small useful step when daily life feels difficult."**

Full background, tone rules, roadmap, survey data, business model: see `CLAUDE.md` in the repo root (Part A = current build scope, Part B = full reference).

## 2. Where it lives

- Local: `C:\Users\ADMIN\Documents\nura-app`
- Repo: https://github.com/mdafzal8616-collab/nura-app (public)
- Live: https://mdafzal8616-collab.github.io/nura-app/ (GitHub Pages, auto-deploys on push to `main`)

## 3. Completed — Phase 1 (gate passed)

Tested by 3-5 real outside testers, feedback positive. Built:
- Bottom nav shell (Home, Habits, +, Bhai AI, Profile) — always visible
- **Home**: name greeting, today's date, prayer check-in summary (X of 5), Reset Today button, 7-day dot row
- **Prayer Check-in**: 5 daily prayers, tap done/missed, saved per date in `nura_prayers`
- **Reset Today**: low/normal/high energy → one suggested action → "One small step counts." (never guilt language)

## 4. Completed — Phase 2 (in progress)

Per B8, Phase 2 = build exactly ONE more nav destination for real. **Habits** was picked (over cloud Bhai AI and Private Reflection).

- **Habits screen**: Core Habits (Quran, Zikr, One moment of gratitude — fixed, generic, not Islamic rulings), Bonus Habits (water, sleep, no-phone hour — fixed), Personal Habits (user-added via modal, deletable). Simple tap-to-complete, no streaks, no guilt language.
  - Data: `nura_habits_defs` (personal habits list), `nura_habits_log` (per-date completion)
- **Quran habit — daily verse (Arabic only)**: shows one real ayah per day inside the Core Habits card, Surah:Ayah reference, "Source: Tanzil Project · tanzil.net" attribution. Rotates deterministically through all 6,236 ayahs based on date (repeats every ~17 years). Text is a verbatim, freshly-verified download from tanzil.net (CC BY 3.0 — reproduction allowed, must not be altered, must attribute). Asset: `assets/quran/quran-uthmani.txt`, loaded via `fetch()` at runtime.
  - **No translation yet** — explicitly deferred, to be added later by Md Afzal himself.

## 5. Not built yet — parked, not forgotten

| Item | Status | Blocker |
|---|---|---|
| Verse translation | Deferred | Waiting on Md Afzal to provide it |
| Bhai AI (real chat) | Placeholder screen only | Needs cloud-vs-local decision (B4) + crisis/escalation wording (unwritten) |
| Profile (real settings) | Placeholder screen only | Not in current phase scope |
| **+** button | Placeholder toast only | Not in current phase scope |
| Daily Deen (hadith/quiz) | Not started | B5: no reviewer named yet for Islamic content |
| Private Reflection / Vault | Not started | Phase 2/3 candidate |
| Progress/analytics screens | Not started | Phase 3+ |
| Accounts, cloud sync, prayer-time API, notifications, ads, subscriptions, owner dashboard | Not started | Phase 3-4, needs ₹50-60k launch budget |

## 6. Open questions (unresolved, tracked in `docs/decisions.md`)

1. **Who reviews/verifies Islamic content before Daily Deen is ever built** (B5) — nobody named yet. This is "non-negotiable" per CLAUDE.md — must be resolved before any hadith/dua/ruling content ships.
2. **Bhai AI crisis/escalation wording** — not written. Must exist before Bhai AI ships with any open text input.

## 7. Standing rules that govern all future work

- **Golden Rule (A1)**: if a feature isn't explicitly listed/approved, stop and ask Md Afzal before building it — even something small.
- **B5 (non-negotiable)**: never invent Qur'an verses, hadith, dua, translations, sources, or Islamic rulings. Real content needs a verified source AND a named reviewer. (The Arabic verse feature used a verified source — Tanzil, with attribution — but the *reviewer* question is still separately open.)
- **B2 (tone)**: never shame, guilt, fake urgency, or "you failed" language.
- **A7**: Codex may also edit this repo — Claude Code and Codex should never edit the same file in the same session.
- Decisions get logged in `docs/decisions.md`, newest first — read it for the full reasoning history, not just this summary.

## 8. Immediate next options (not decided — ask Md Afzal before picking one)

- Provide/approve a translation source for the daily verse
- Name a reviewer for Islamic content (unblocks Daily Deen)
- Write Bhai AI crisis/escalation wording (unblocks Bhai AI)
- Gather more phone-testing feedback on the current build
