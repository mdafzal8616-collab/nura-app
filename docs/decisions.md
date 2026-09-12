# Decisions Log

Record decisions here as they're made, newest first. This is where the feature-selection framework should be written out in full once Md Afzal has the exact step definitions — right now only the names of the steps are known (see `CLAUDE.md` B9): a safety filter, a "daily-ness" filter, adjusted frequency count, a feasibility check, a differentiation check, and a tie-breaker.

## 2026-09-12 — Reversed the hold-off: real Arabic verse text added to the Quran habit
- Md Afzal reversed the earlier "hold off" decision (below) and asked to add real Qur'an text now, with translation to be added by him separately later — no translation ships in this pass.
- Source handling, per B5's "verified source" requirement: Md Afzal pasted the full Tanzil Uthmani Arabic text into chat as the source to use. That pasted copy, recovered from the session transcript, was found to be corrupted (double-encoding/mojibake in the diacritics) — using it would have risked shipping wrong Qur'an text. Instead of repairing a corrupted copy, a fresh copy was downloaded directly from tanzil.net itself (the same source Md Afzal named) and verified: 6,236 ayahs present, no replacement/corruption characters, correct rendering spot-checked against Al-Fatiha and the final ayah (114:6), and the required Tanzil copyright/terms-of-use block preserved.
- License terms (Tanzil, CC BY 3.0): text may be reproduced verbatim, must not be altered, and must clearly attribute "Tanzil Project" with a link to tanzil.net. Implemented as a visible "Source: Tanzil Project · tanzil.net" line under every verse shown.
- What was built: a "Today's Verse" box inside the Core Habits card, above the Quran habit row. Shows one ayah in Arabic (RTL), its Surah:Ayah reference, and the Tanzil attribution. The verse rotates once per calendar day, cycling deterministically through all 6,236 ayahs (based on days since 2024-01-01), so it repeats the full Qur'an roughly every 17 years and is the same for everyone on a given day. No surah names, no translation, no tafsir, no ruling/commentary text — numeric reference only, to avoid adding any data beyond the verbatim verified text itself.
- New asset: `assets/quran/quran-uthmani.txt` (Tanzil Uthmani text, pipe-delimited `surah|ayah|text`, footer copyright block kept intact as required by the license). Loaded client-side via `fetch()` at runtime — not embedded inline in `app.js` — and cached in memory per page load.
- This is Arabic source text only, reproduced verbatim from a named, verified source (Tanzil) with required attribution — it is not AI-generated or invented content, so it does not conflict with B5's "never invent" rule. It does not, on its own, resolve B5's still-open question of who reviews Islamic content before Daily Deen; that question stays open below. Translation, when Md Afzal adds it, should go through the same verified-source + attribution standard as this Arabic text.

## 2026-09-12 — Declined to add real Qur'an verse text to the Quran habit
- Md Afzal asked about showing actual Qur'an verse/translation text inside the Quran habit on the Habits screen.
- Declined for now, per B5: no verified-source/reviewer process exists yet for Islamic content, and Daily Deen (where this belongs) is explicitly parked. Md Afzal chose to hold off rather than name a reviewer now.
- Claude Code will not generate, select, or invent Qur'an text, translations, or attributions under any circumstance — even user-supplied text still needs the B5 review process named before it ships.
- Quran habit stays a simple tap-to-complete, unchanged. Revisit only as real Daily Deen work, once a reviewer is named (still an open question below).

## 2026-09-12 — Phase 1 gate passed, Phase 2 started (Habits)
- Md Afzal confirmed: 3-5 outside testers used the live Phase 1 prototype (check-in + Reset Today) more than once without reminders, feedback genuinely positive. B8's Phase 1→2 gate is met.
- Per B8, Phase 2 builds exactly ONE more nav destination for real, picked from what testers asked for most. Md Afzal picked **Habits** (over cloud Bhai AI and Private Reflection) — it stays pure client-side/localStorage like Phase 1, no new infrastructure, no API key or backend needed. Bhai AI (cloud) was flagged as a bigger step requiring a backend/serverless proxy to avoid exposing an LLM API key in client JS — worth a separate discussion when it's picked.
- Built Habits screen: Core Habits (3 fixed generic self-improvement prompts, not Islamic rulings — no B5 conflict), Bonus Habits (3 fixed), Personal Habits (user-added via a simple modal, deletable). Simple tap-to-complete only — no streaks, no guilt language, matching B2/B3 ("simple completion, not guilt-heavy pressure").
- New localStorage keys (not in CLAUDE.md A5, which only covered Phase 1 — recorded here instead of editing CLAUDE.md directly, per A7's tool-split):
  - `nura_habits_defs` → `[ { id:"p-<timestamp>", name:"..." } ]` (personal habits only; core/bonus habit lists are fixed in `js/app.js`)
  - `nura_habits_log` → `{ "2026-09-12": { "core-quran": true, "bonus-water": false, "p-...": true } }`
- Home screen was left untouched — B3's "habit progress on Home" is target end-state, not part of this Phase 2 pass; only the Habits nav destination itself was built out.
- Bottom-nav **+** button still a placeholder — not part of this pass either.

## 2026-09-12 — Phase 1 scope locked, build started
- Confirmed Phase 1 = Home + Prayer Check-in + Reset Today + bottom-nav shell with Habits/Bhai AI/Profile as placeholders. Nothing else.
- Built as plain HTML/CSS/JS, localStorage only, in `C:\Users\ADMIN\Documents\nura-app`.
- "+" nav button also treated as placeholder (not in Part A's build list) — shows a "still being tested" toast rather than any add-flow, pending Md Afzal's confirmation this is correct.

- Confirmed with Md Afzal: the "+" button stays a placeholder (same "coming soon" toast as Habits/Bhai AI/Profile) for Phase 1.

## Open questions for Md Afzal
- Who reviews Islamic content before Daily Deen is ever built (B5) — not yet named.
- Bhai AI crisis/escalation wording — not yet written.
