# Decisions Log

Record decisions here as they're made, newest first. This is where the feature-selection framework should be written out in full once Md Afzal has the exact step definitions — right now only the names of the steps are known (see `CLAUDE.md` B9): a safety filter, a "daily-ness" filter, adjusted frequency count, a feasibility check, a differentiation check, and a tie-breaker.

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
