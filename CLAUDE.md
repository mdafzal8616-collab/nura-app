# NURA — Master Project Brief (for Claude Code)

**Read this whole file before writing or changing any code.** This is the authoritative, current project context for NURA. If any older prompt, note, or draft conflicts with this file, this file wins unless the project owner says otherwise. For day-to-day build status, also check `docs/project-status.md` in the repo — that file tracks what's currently built; this file tracks the stable rules and vision.

Sections 1–16 are the day-to-day rules and current state. The **Appendix** at the end folds in fuller reference detail (tech stack, exact data model, full target feature set, survey data, budget breakdown) that day-to-day work doesn't need constantly, but that matters when planning ahead — read it before proposing anything not already covered above it.

## 1. What NURA Is

NURA is a Gen-Z-first Islamic self-improvement app, built India-first, for both young men and young women (mostly Gen-Z, but usable by other ages too).

**Core promise:** NURA helps a young Muslim take one small useful step when daily life feels difficult.

**NURA must never become:**
- A social feed
- A fatwa app
- A replacement for a scholar, doctor, therapist, or emergency service

## 2. Tone & Voice

Every screen, message, and notification must feel: private, calm, modern, premium, hopeful, practical.

**Never use:** shame, guilt-heavy streaks, fear, fake urgency, or gambling-style rewards.

## 3. App Structure

Bottom navigation: **Home, Habits, + (add habit/task/goal/dua/reflection/reminder), Bhai AI, Profile**

- Don't repeat "Hamdard" branding across every screen.
- Bhai AI and Profile must always be clearly visible in the nav.

## 4. Bhai AI (the in-app companion)

- Bhai AI is a supportive companion — **not** a scholar, doctor, therapist, or mufti. Must never claim or imply that role.
- Should run locally/on-device where realistic.
- Chats, reflection entries, vault content, and habit data stay **local by default**. Cloud backup or external AI use is optional and needs the user's explicit permission each time it applies.
- Never make false privacy or encryption claims.
- **Hard gate (rule B4):** before Bhai AI can accept any open-text chat input, two things must exist first — (1) a clear cloud-vs-local decision, and (2) written crisis/escalation wording for what happens if a user writes something like a mental-health crisis. **Neither is written yet — do not ship open-text Bhai AI chat until both exist.**

## 5. Islamic Content Rules (strict)

- Never invent Quran verses, hadith, duas, translations, sources, or religious rulings.
- **Rule B5:** every piece of real Islamic content needs a verified source *and* a named reviewer before it ships. The daily Quran verse feature has a verified source (Tanzil Project) but still has no named reviewer — treat it as unfinished until someone is named.
- Bhai AI must never act as, or be presented as, an Islamic authority.

## 6. Future Business Model (not in v1 — do not build yet)

- Respectful ads — but **never** inside Quran, dua, prayer, Bhai AI chat, Private Reflection, or Vault.
- "Plus" subscription.
- Partner/affiliate content.
- A creator/community feed was discussed but is **explicitly excluded from v1**. Only revisit if the owner decides later.

## 7. Future Owner/Admin Dashboard (not in v1 — do not build yet)

Planned: feature flags, content packs, staged rollout/rollback, RBAC + MFA, audit logs.

Hard rule: admin access must never read private chats/vault, silently enable tracking, or bypass user privacy.

## 8. Build Phases — build in order, never combine

1. **Phase 1 — ✅ COMPLETE.** Tested with 3–5 real outside testers, feedback positive, gate passed.
2. **Phase 2 — 🔄 IN PROGRESS.** Only one new nav destination unlocks at a time (rule B8). Habits is the one built so far.
3. **Phase 3:** online services, notifications, subscription, ads, owner config. Not started.
4. **Phase 4:** growth and partners. Not started.

**Golden Rule:** don't build anything not explicitly listed/approved — ask first.

## 9. Current Build State (as of 2026-09-15)

**Hosting:** live and free on GitHub Pages.
- Live app: https://mdafzal8616-collab.github.io/nura-app/
- Repo: https://github.com/mdafzal8616-collab/nura-app

**✅ Phase 1 (done, tested):**
- Bottom nav shell: Home, Habits, + (placeholder), Bhai AI (placeholder), Profile (placeholder)
- Home: name greeting, date, prayer check-in summary, Reset Today button, 7-day dot row
- Prayer Check-in: 5 daily prayers, tap done/missed, saved per date
- Reset Today: low/normal/high energy → one suggested action → "One small step counts."

**🔄 Phase 2 (in progress — Habits only, per B8):**
- Habits screen: Core Habits (Quran, Zikr, one moment of gratitude), Bonus Habits (water, sleep, no-phone hour), Personal Habits (user-added, deletable) — tap-to-complete, no streaks/guilt.
- Quran habit shows a real daily Arabic verse — one ayah per day, rotates through all 6,236 deterministically by date, with Surah:Ayah reference and "Source: Tanzil Project · tanzil.net" attribution (CC BY 3.0, verified). **No translation yet — owner is adding that themselves later, by choice.**

**⏳ Not built yet (deferred on purpose, not forgotten):**
- Translation text for the daily verse (waiting on owner)
- Bhai AI real chat — blocked on rule B4 (see Section 4)
- Profile (real settings) — placeholder
- + button — placeholder
- Private Reflection/Vault, Progress/analytics, Daily Deen (hadith/quiz), accounts/cloud sync, prayer-time API/notifications, ads/subscriptions, owner dashboard — all Phase 3–4, untouched

## 10. Why Prayer Check-in + Reset Today Was First

An anonymous survey ("Young Muslims: Daily Life & Growth Survey," 24+ responses) found:
- **Missing salah/namaz** = top daily pain point (42%)
- **Guilt/avoidance after missing prayer** = second-biggest issue (54%)

Chosen using a decision framework: safety filter → daily-ness filter → adjusted frequency count → feasibility check → differentiation check → tie-breaker. Any future feature choice should go through the same framework, not gut feeling. (The exact definition of each step in this framework still hasn't been written down anywhere in the repo — only the step names are known. If the owner has these definitions, they should be added to `docs/decisions.md`.)

Full survey findings (demographics, quotes, a privacy issue found in the data collection itself): see Appendix K.

## 11. Possible Future Feature: "Brain Pal" (not approved to build yet)

Idea under consideration: a habit-support feature for users struggling with pornography, smoking, or masturbation. Working name: "Brain Pal."

If this is ever built: follow Section 2 (tone) and Section 5 (no invented religious rulings) extra strictly, since this is a sensitive, shame-prone area. It must never claim to detect or scan content — any "pause" feature is a manual, user-chosen interruption, not surveillance.

## 12. Open Questions Blocking Future Work

- Who reviews Islamic content before Daily Deen is built (rule B5) — not named yet.
- Bhai AI crisis/escalation wording (rule B4) — not written yet. Must exist before any open-text AI input ships.

## 13. Work Split

- **Cloud AI (Claude):** research, official sources, strategy, risk-finding, architecture drafts. Must clearly flag uncertainty rather than guessing confidently.
- **Codex:** final integration, builds approved features.
- **Rule A7:** Codex may also touch this repo directly — never edit the same file at the same time.

## 14. How the Owner Wants Feedback

- Brutally honest, practical feedback — not generic praise or idea lists.
- Explain clearly *why* something is too big, unsafe, too expensive, or unrealistic.
- Use simple English (the owner is learning technical English).
- Before giving major advice, ask up to five short clarifying questions if key info is missing.
- Keep project docs in one running document rather than scattered files.

## 15. Working Constraints

- Budget right now is small; a larger budget is planned only after the app actually launches. Exact figures: Appendix L.
- Owner can give about 2–3 hours a day to this project.

## 16. Quick "Do Not" Checklist

- Don't build more than one phase — or more than one Phase-2 destination — at a time.
- Don't invent Islamic content or rulings; don't ship real Islamic content without a verified source AND a named reviewer.
- Don't ship Bhai AI open-text chat until the cloud/local decision and crisis wording both exist.
- Don't make false privacy/security/encryption claims.
- Don't let admin tooling see private user data.
- Don't put ads on sacred or private surfaces.
- Don't build the creator/social feed in v1.
- Don't push code, install SDKs, or change firewall/network settings without asking the owner first.

---

# APPENDIX — Full Reference Detail

Background and specifics that Sections 1–16 don't spell out. Consult before proposing new tech choices, new screens, or anything touching money, privacy architecture, or Islamic content sourcing.

## A. Tech Stack & Hosting

Plain HTML, CSS, and JavaScript. No framework, no build step, no backend, no accounts. All data lives in the browser's `localStorage`. This matches the current budget and keeps the project understandable while the owner is still learning HTML/CSS. Hosted free (GitHub Pages) — no paid hosting needed until Phase 3.

## B. Folder Structure (current, as built)

```
nura-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   └── quran/
│       └── quran-uthmani.txt   (Tanzil Project Arabic text, CC BY 3.0)
├── docs/
│   ├── survey-summary.md
│   ├── decisions.md
│   └── project-status.md       (living build-status doc)
└── CLAUDE.md                    (this file)
```

## C. Visual Design Tokens

| Token | Value | Use |
|---|---|---|
| Ivory background | `#F6F1E2` | page background |
| Deep emerald | `#173A2C` | primary color, headers, key buttons |
| Soft gold | `#9C7A25` | accents, highlights, dividers |
| Ink text | `#221F16` | body text |

Style direction: warm ivory/cream background, deep emerald as the main color, soft gold accents, subtle moon/mosque/geometric-pattern visuals used sparingly, clean cards, readable type, modern Gen-Z mobile feel. Not old-fashioned, not busy, not an endless social feed.

## D. Data Model (localStorage — current)

```
nura_user_name        → "Afzal"
nura_prayers           → { "2026-09-12": { fajr:true, dhuhr:true, asr:false, maghrib:false, isha:false } }
nura_resets            → [ { date:"2026-09-12", energy:"low", action:"..." } ]
nura_habits_defs        → [ { id:"p-<timestamp>", name:"..." } ]   (personal habits only)
nura_habits_log         → { "2026-09-12": { "core-quran": true, "bonus-water": false, "p-...": true } }
```

## E. Definition of Done — Phase 1 (met)

- Opens and works correctly in Chrome on a real mid-range Android phone, portrait mode
- Marking a prayer, and using Reset Today, both save and reload correctly after closing the browser
- No browser console errors
- Tested by 3-5 real young Muslim testers (not just the owner) before being considered done
- Nothing from the "do not build yet" list was added

## F. Full Target End-State Feature Set (Phase 3–4 vision, most NOT built yet)

- **Home** — greeting, today's focus, prayer progress, habit progress, quick actions, a visible Bhai AI card, simple weekly progress. No overloaded dashboard.
- **Habits** — core, personal, bonus habits, simple completion.
- **Prayer support** — check-in, simple prayer-time support later, Reset Today, no shame.
- **Daily Deen** — short verified hadith/lesson, source shown clearly, simple explanation, small quiz, practical daily action.
- **Private Reflection** — daily reflection, trigger/struggle log, gratitude, personal code, career reflection, private by default.
- **Bhai AI** — splits goals into small steps, helps reset after bad days, encouragement/simple planning; must say when professional or scholar help is needed.
- **Progress** — weekly habit progress, gentle streaks, personal insights, completion history, no punishment for restarting.
- **Profile** — personal goals, theme, language, notifications, privacy, subscription, help/support.

## G. Local AI / Privacy Reality Check (researched)

Google's on-device model (Gemini Nano/AICore) currently only runs well on flagship phones (Pixel 8 Pro+, Galaxy S24+/S25+ and similar). Most of NURA's target users in India carry budget/mid-range Android phones, where this is not supported yet. Android is ~93% of India's smartphone market, but that share is dominated by budget/mid-range devices. **Do not promise or build "fully private, on-device Bhai AI" as a real feature** until this has been properly re-tested on actual target devices — right now, promising it would break trust for most users rather than build it. A real cloud-AI fallback with a strict no-logging/no-training policy is the more honest Phase 2+ answer.

Also: users need delete and export options for their own data. Ads must never use or read private reflections, vault entries, Bhai AI chats, sensitive habit data, or personal struggles.

## H. Business Model Detail

Possible future income: respectful ads for free users, a Plus subscription, partner books/courses, affiliate arrangements with trusted Islamic educators, carefully selected sponsors.

Ad rules: no ads in Qur'an, dua, prayer, Bhai AI chat, Private Reflection, or Vault; no excessive ads; no deceptive ads; no sensitive targeting; no ads that damage worship or privacy.

Possible Plus benefits later: ad-free experience, advanced progress reports, premium learning packs, audio content, offline content, optional enhanced AI features.

## I. Owner/Admin Dashboard Detail

Owner can control: feature flags, content packs, notification campaigns, ad placement/frequency, blocked ad categories, themes, subscription offers, approved Islamic content, consent-based analytics, staged rollout, rollback, admin roles and audit logs.

Security needs: role-based access, MFA for owner/admin, audit logs, staging before release, rollback, safe offline defaults.

## J. Phase Roadmap — Gate Criteria (when to move phases)

- **Phase 1 → 2:** 3-5 real outside testers actually use the check-in and reset flow more than once without being reminded, and feedback on tone/usefulness is genuinely positive. **(Met.)**
- **Phase 2 → 3:** Phase 1 testers are still returning daily after 2-3 weeks and one clear next-most-wanted feature has emerged.
- **Phase 3 → 4:** Phase 2 shows real daily-return usage across a wider group (20-50 people) and the launch budget is actually in hand.

Phase 2 candidates considered (Habits was picked; see `docs/decisions.md` for why): full Habits, a simple cloud-based Bhai AI (not local — see Appendix G), or a basic Private Reflection journal. "Brain Pal" (Section 11) is a candidate *habit inside* Phase 2/3, not a separate app.

## K. Survey Research — "Young Muslims: Daily Life & Growth Survey"

Method: anonymous Google Form, 24 responses collected (target was 20-30), distributed partly via a poster pasted at a masjid. No name/email/phone was supposed to be collected.

**⚠️ Privacy issue found and must be fixed:** the live form was NOT actually anonymous — 20 of 24 response rows carried a real signed-in Gmail address (some clearly tied to real names). This means "Collect email addresses" or a sign-in requirement was switched on in the Form's Settings. Turn that off, and delete the already-collected email data from the response Sheet — don't just stop collecting it going forward. Treat this as a standing rule for any future survey/data collection in NURA: verify anonymity settings before sending, don't assume they're correct.

**Who answered:** 17 male, 7 female (71%/29% — heavily skewed male; the plan to use a trusted female relative/friend to reach girls should be checked). Age: 15 were 18-24, 5 under 18, 4 25-30.

**Hardest part of daily life (multi-select, n=24):** salah/namaz 42%, habits/routine 38%, phone/screen time 38%, confidence/stress 33%, studies/career 33%, islamic learning 29%, sleep 29%.

**After missing a prayer/habit (n=22):** restart soon 41%, feel guilty and delay 36%, forget about it for the day 18% — i.e. 54% land in guilt or avoidance rather than a clean restart.

**What would actually help every day:** small daily plan 54%, gentle reminder 29%, supportive AI 25%, private reflection 17%.

**What makes people quit an app:** too many ads 46% (the #1 reason by far), too many notifications 21%, hard to use 13%, privacy concerns 13%. This is the real evidence behind the "no excessive ads, no manipulative notifications" tone rules — keep them even under revenue pressure in Phase 3+.

**Representative quotes:** "I want pray salah for 5 time but i can't it...it's forget my mind." (R10) · "Fixing routine and growing" / "My routine and goals" (R2) · "Guidance, motivation, and simple reminders to help me stay on the right path." (R7).

**Honest caveat:** the sample skews 71% male, so treat any pick based on it as a strong signal, not proof.

## L. Budget & Time Reality

Budget available right now: about ₹1,000 — this is why the current build is a free-hosted web prototype, not a native app (Google Play alone needs a $25 one-time fee plus at least 12 testers continuously opted in for 14 days before production access). Planned launch budget once the app actually ships: ₹50,000-60,000 (Phase 3 money — Play Store fee, real hosting, possibly a cloud AI API). Time available: about 2-3 hours per day.

---
Full research report, survey charts, and roadmap (visual version of this file): https://claude.ai/code/artifact/22d467e4-d15f-4c0f-b2c5-6d6ef5b30af4
