# NURA — Project Context for Claude Code

This file is read automatically by Claude Code every time this project opens. It is the single source of truth for what NURA is and what to build right now. If anything here conflicts with an instruction given in chat, ask Md Afzal before proceeding — don't guess.

This file has two parts: **Part A** is short and tells you exactly what to build today. **Part B** is the full project background — read it for context, but it does not override Part A's scope.

---

# PART A — BUILD RIGHT NOW

## A1. Current phase: Phase 1 prototype — build ONLY this

**Golden rule: if a feature is not listed below, stop and ask Md Afzal before building it — even a small one, even if it's described in Part B.** Earlier planning repeatedly tried to build 8-9 features at once before anything was proven with real users. Phase 1 exists to break that pattern.

Build:
- **Bottom nav shell** — Home, Habits, + , Bhai AI, Profile. Always visible.
- **Home** — greeting using the user's name (ask once, save locally), today's date, a Prayer Check-in summary (X of 5 done today), a "Reset Today" button always available, a simple 7-day dot row of completed check-ins.
- **Prayer Check-in** — the 5 daily prayers listed, tap to mark done/missed, saved locally per date.
- **Reset Today flow** — reachable from Home any time (not only after a miss). Asks "low / normal / high energy?" then gives one small suggested action per level. Ends with a calm line like "One small step counts." Never "you failed."
- **Habits, Bhai AI, Profile (nav destinations)** — real screens exist and are reachable, but each currently shows only: "This part of NURA is still being tested — coming soon." Do not build their real functionality yet.

Do NOT build yet (parked for later phases — see Part B, Section 8):
- Bhai AI chat or any AI logic, local or cloud
- Daily Deen (hadith/quiz content)
- Private Reflection / Vault
- Progress / analytics screens
- Real Profile settings (theme, language, subscription, etc.)
- Accounts, login, or any cloud sync
- Prayer-time API or push notifications (check-in is manual only in Phase 1)
- Ads, subscriptions, owner/admin dashboard, native app conversion

## A2. Tech stack

Plain HTML, CSS, and JavaScript. No framework, no build step, no backend, no accounts. All data lives in the browser's `localStorage`. This matches the current budget (~₹1,000) and keeps the project understandable while the app owner is still learning HTML/CSS.

When ready to test with real people, host free (GitHub Pages or Netlify free tier) — no paid hosting needed for Phase 1.

## A3. Folder structure

```
nura-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   └── icons/          (nav icons + a subtle moon/geometric motif)
├── docs/
│   ├── survey-summary.md
│   └── decisions.md
└── CLAUDE.md            (this file)
```

## A4. Visual tokens (starting point — adjust for contrast/accessibility)

| Token | Value | Use |
|---|---|---|
| Ivory background | `#F6F1E2` | page background |
| Deep emerald | `#173A2C` | primary color, headers, key buttons |
| Soft gold | `#9C7A25` | accents, highlights, dividers |
| Ink text | `#221F16` | body text |

Style direction: warm ivory/cream background, deep emerald as the main color, soft gold accents, subtle moon/mosque/geometric-pattern visuals used sparingly, clean cards, readable type, modern Gen-Z mobile feel. Not old-fashioned, not busy, not an endless social feed.

## A5. Data model (localStorage — no backend)

```
nura_user_name        → "Afzal"
nura_prayers          → { "2026-09-12": { fajr:true, dhuhr:true, asr:false, maghrib:false, isha:false } }
nura_resets           → [ { date:"2026-09-12", energy:"low", action:"..." } ]
```

## A6. Definition of done for Phase 1

- Opens and works correctly in Chrome on a real mid-range Android phone, portrait mode
- Marking a prayer, and using Reset Today, both save and reload correctly after closing the browser
- No browser console errors
- Tested by 3-5 real young Muslim testers (not just Md Afzal) before Phase 1 is considered done
- Nothing from the "do not build yet" list has been added

## A7. Working alongside other tools

Codex may also be working on this project. Claude Code and Codex should never edit the same file in the same session — check before starting work. Cloud AI (Claude in chat) handles research, survey analysis, copy, and strategy review; it does not write code directly into this repo.

---

# PART B — FULL PROJECT REFERENCE

## B1. What NURA is

NURA is a Gen-Z-first Islamic self-improvement app for young Muslims.

Initial audience: India first, young Muslims, both boys and girls, mostly Gen-Z but usable by other ages.

Main goals: pray more consistently, build better habits, reduce phone distraction, improve sleep/study/fitness/discipline/confidence/character, learn small authentic Islamic lessons, reflect privately, recover after a bad day without guilt, feel supported not judged.

Core promise: **"NURA helps a young Muslim take one small useful step when daily life feels difficult."**

NURA must NOT become: a social-media scrolling app, a public creator/community feed, a fatwa app, a replacement for a scholar/doctor/therapist/emergency service, or an overwhelming "everything app" with too many features on one screen.

## B2. Tone — non-negotiable

NURA feels: private, calm, modern, premium, respectful, simple, Gen-Z friendly, hopeful, practical.

Never use: shame, fear, guilt-heavy streaks, fake urgency, gambling-like rewards, "you failed" language, manipulative notifications.

Good language examples: "Start small." "You still have time." "Every day is a new beginning." "Let's reset this hour." "One small step counts."

## B3. Full confirmed navigation and feature set (target end-state — most of this is NOT built yet; see Part A for what's actually in scope now)

Bottom nav: Home, Habits, large **+** button (add habit/task/goal/dua/reflection/personal reminder), Bhai AI, Profile. Don't repeat "Hamdard" branding across screens. Bhai AI and Profile must always be clearly visible/reachable.

- **Home** — greeting using the user's name, today's focus, prayer progress, habit progress, quick actions, a visible Bhai AI card, simple weekly progress. No overloaded dashboard.
- **Habits** — core habits, personal habits, bonus habits, simple completion (not guilt-heavy pressure).
- **Prayer support** — prayer check-in, simple prayer-time support later, "Reset Today" flow after missing a prayer, no shame.
- **Daily Deen** — short verified hadith or Islamic lesson, source shown clearly, simple explanation, small quiz, practical daily action.
- **Reset Today** — low-energy / normal-energy / high-energy options, helps restart after a bad day.
- **Private Reflection** — daily reflection, trigger/struggle log, gratitude, personal code, career reflection, private by default.
- **Bhai AI** — supportive accountability companion; helps split goals into small steps; helps reset after bad days; encouragement and simple planning; **not** a scholar, doctor, therapist, or mufti; must say when professional or scholar help is needed.
- **Progress** — weekly habit progress, gentle streaks, personal insights, completion history, no punishment for restarting.
- **Profile** — personal goals, theme, language, notifications, privacy, subscription, help/support.

## B4. Privacy and local AI — the real plan

Privacy is a core NURA promise.

- Bhai AI should run locally/on-device where realistically possible. Private chats, reflection, vault, habits, and personal data should stay local by default.
- Cloud backup or external AI must be optional and require user permission.
- Users need delete and export options.
- Do not claim encryption or full privacy unless it is technically true — a basic browser prototype is NOT secure encrypted storage. No false privacy claims, ever.
- Ads must never use or read: private reflections, vault entries, Bhai AI chats, sensitive habit data, personal struggles.

**Reality check (researched):** Google's on-device model (Gemini Nano/AICore) currently only runs well on flagship phones (Pixel 8 Pro+, Galaxy S24+/S25+ and similar). Most of NURA's target users in India carry budget/mid-range Android phones, where this is not supported yet. Android is ~93% of India's smartphone market, but that share is dominated by budget/mid-range devices. Do not promise or build "fully private, on-device Bhai AI" as a real feature until this has been properly re-tested on actual target devices — right now, promising it would break trust for most users rather than build it. A real cloud-AI fallback with a strict no-logging/no-training policy is the more honest Phase 2 answer.

## B5. Islamic content safety — never negotiable

Never invent: Qur'an verses, hadith, dua, translations, sources, Islamic rulings, or rewards for worship.

All Islamic content needs: a verified source, a careful review process, and a clear distinction between verified Islamic material and AI-generated encouragement. Bhai AI must never act like an Islamic authority. **Nobody has been named yet as the actual reviewer/source-checker for this content** — this must be decided before Daily Deen is ever built (Phase 2+).

## B6. Business model (future — none of this is active in Phase 1)

Possible future income: respectful ads for free users, a Plus subscription, partner books/courses, affiliate arrangements with trusted Islamic educators, carefully selected sponsors.

Ad rules: no ads in Qur'an, dua, prayer, Bhai AI chat, Private Reflection, or Vault; no excessive ads; no deceptive ads; no sensitive targeting; no ads that damage worship or privacy.

Possible Plus benefits later: ad-free experience, advanced progress reports, premium learning packs, audio content, offline content, optional enhanced AI features.

**Creator/community feature:** discussed, explicitly NOT part of version one. It may distract Gen-Z users and turn NURA into another social platform. Do not add it unless Md Afzal explicitly decides to revisit it later.

## B7. Owner control / remote configuration (future)

NURA needs a future owner dashboard. Owner can control: feature flags, content packs, notification campaigns, ad placement/frequency, blocked ad categories, themes, subscription offers, approved Islamic content, consent-based analytics, staged rollout, rollback, admin roles and audit logs.

Owner must NOT be able to: read private chats, read Private Reflection/Vault data, silently turn on tracking, inject arbitrary code, change verified Islamic content without review, or bypass user privacy settings.

Security needs: role-based access, MFA for owner/admin, audit logs, staging before release, rollback, safe offline defaults.

## B8. Full phase roadmap

- **Phase 1 (now):** small offline browser prototype — Home, Prayer Check-in, Reset Today, bottom-nav shell with placeholders for Habits/Bhai AI/Profile. See Part A for exact scope. **Move to Phase 2 when:** 3-5 real outside testers actually use the check-in and reset flow more than once without being reminded, and feedback on tone/usefulness is genuinely positive.
- **Phase 2:** pick ONE more nav destination to build for real, based on what Phase 1 testers ask for most — full Habits, a simple *cloud-based* Bhai AI (not local — see B4), or a basic Private Reflection journal. Confirm who reviews Islamic content (B5) before Daily Deen is ever built. A privately-scoped habit module for harmful digital/behavioral habits (working name **"Brain Pal"**) is a candidate habit here, not a separate app. **Move to Phase 3 when:** Phase 1 testers are still returning daily after 2-3 weeks and one clear next-most-wanted feature has emerged.
- **Phase 3:** optional accounts, cloud backup, real prayer-time API, notifications, Plus subscription, respectful ads, owner/admin dashboard (B7). This is the phase the ₹50,000-60,000 launch budget is for — Play Store fee, proper hosting, possibly a cloud AI API. **Move to Phase 4 when:** Phase 2 shows real daily-return usage across a wider group (20-50 people) and the launch budget is actually in hand.
- **Phase 4:** trusted partner content, books/courses, affiliate plans, sponsor plans. Creator/community only if it does not distract users, and only if explicitly revisited.

## B9. Research so far — the "Young Muslims: Daily Life & Growth Survey"

Method: anonymous Google Form, 24 responses collected (target was 20-30), distributed partly via a poster pasted at a masjid. No name/email/phone was supposed to be collected.

**⚠️ Privacy issue found and must be fixed:** the live form was NOT actually anonymous — 20 of 24 response rows carried a real signed-in Gmail address (some clearly tied to real names). This means "Collect email addresses" or a sign-in requirement was switched on in the Form's Settings. Turn that off, and delete the already-collected email data from the response Sheet — don't just stop collecting it going forward. Treat this as a standing rule for any future survey/data collection in NURA: verify anonymity settings before sending, don't assume they're correct.

**Who answered:** 17 male, 7 female (71%/29% — heavily skewed male; the plan to use a trusted female relative/friend to reach girls should be checked). Age: 15 were 18-24, 5 under 18, 4 25-30.

**Hardest part of daily life (multi-select, n=24):** salah/namaz 42%, habits/routine 38%, phone/screen time 38%, confidence/stress 33%, studies/career 33%, islamic learning 29%, sleep 29%.

**After missing a prayer/habit (n=22):** restart soon 41%, feel guilty and delay 36%, forget about it for the day 18% — i.e. 54% land in guilt or avoidance rather than a clean restart.

**What would actually help every day:** small daily plan 54%, gentle reminder 29%, supportive AI 25%, private reflection 17%.

**What makes people quit an app:** too many ads 46% (the #1 reason by far), too many notifications 21%, hard to use 13%, privacy concerns 13%. This is real evidence behind the "no excessive ads, no manipulative notifications" tone rules in B2 — keep them even under revenue pressure in Phase 3+.

**Representative quotes:** "I want pray salah for 5 time but i can't it...it's forget my mind." (R10) · "Fixing routine and growing" / "My routine and goals" (R2) · "Guidance, motivation, and simple reminders to help me stay on the right path." (R7).

**Why Prayer Check-in + Reset Today was picked first:** salah/namaz is the single largest pain point (42%, ahead of everything else), and the guilt-or-avoidance reaction after missing a prayer (54%) is exactly what "Reset Today" was designed to treat. The two most-wanted kinds of help — a small daily plan and a gentle reminder — both fit naturally inside this loop. Habits/routine and phone/screen-time were close behind (38% each) and are the leading Phase 2 candidates, but they lack as strong a matching pain signal as the prayer-guilt number.

**Honest caveat:** the sample skews 71% male, so treat the pick as a strong signal, not proof — a handful more responses from girls would make it safer.

**Known gaps in this data (not yet resolved):**
- No crisis/escalation wording exists yet for what Bhai AI should say if a future user mentions something serious (self-harm, abuse, severe distress) — must be written before Bhai AI ever ships with open text input, even in Phase 2.
- Md Afzal has mentioned an internal decision framework for choosing features (a safety filter, a "daily-ness" filter, adjusted frequency count, a feasibility check, a differentiation check, and a tie-breaker) — the exact definitions of each step haven't been recorded in this file yet. If that framework exists in writing, it should be pasted into `docs/decisions.md` and referenced here.

## B10. Development phases as originally planned

1. Small offline prototype — Home, Habits, Prayer check-in, Reset Today, basic Private Reflection, basic Bhai AI demonstration only, local browser storage, mobile-first UI. *(This is Part A's scope, narrowed further after survey results.)*
2. Privacy and trustworthy content — real local data model, realistic vault/privacy design, verified Islamic content packs, local AI feasibility testing, no false encryption claims.
3. Online services — optional accounts, optional cloud backup, prayer-time source/API, notifications, subscription, ads, owner remote config.
4. Growth — trusted partner content, books/courses, affiliate plans, sponsor plans, creator/community only if it does not distract users.

## B11. Work split across tools

- **Cloud AI (Claude in chat):** research official sources, APIs, costs, privacy/app-store policy, local AI feasibility; reviews product strategy; finds missing requirements; creates technical options, architecture drafts, content-review system ideas, test plans; clearly states uncertainty and what can't be confirmed.
- **Codex / Claude Code:** final integration, main project-file edits, builds approved features, tests features, prevents conflicting versions, checks whether claimed solutions really work.
- **Never** let two of these edit the same main feature or same file at the same time.

## B12. Budget and time reality

Budget available right now: about ₹1,000 — this is why Phase 1 is a free-hosted web prototype, not a native app (Google Play alone needs a $25 one-time fee plus at least 12 testers continuously opted in for 14 days before production access). Planned launch budget once the app actually ships: ₹50,000-60,000 (Phase 3 money — Play Store fee, real hosting, possibly a cloud AI API). Time available: about 2-3 hours per day.

---
Full research report, survey charts, and roadmap (visual version of this file): https://claude.ai/code/artifact/22d467e4-d15f-4c0f-b2c5-6d6ef5b30af4
