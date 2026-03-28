---
name: telegram-symptom-followup
description: >-
  Run a per-user Telegram symptom follow-up workflow for genetic-risk screening.
  Use when a Telegram user sends /start for the symptom bot, when onboarding or
  restarting a user into the workflow, when asking or recording Round 1–5 answers,
  when handling emergency red-flag symptom replies, when creating or continuing
  per-user schedules/state under data/symptom-users, or when concluding after Round 5
  and finding Vienna/Austria specialists on DocFinder. Also use when a cron or
  scheduled job sends the next round follow-up, updates data/symptom-users state,
  or logs a dashboard summary for a symptom screening run.
---

# Telegram Symptom Follow-up

Run the Telegram symptom workflow as a **per-user, per-chat longitudinal screening flow**.

## Core workflow

1. On `/start`, ask for:
   - genetic-test website
   - username
   - password
2. Do not start screening until credentials are provided.
3. As soon as credentials arrive, start **Round 1 immediately in that same chat**.
4. Create or continue a **per-user state file** under `data/symptom-users/<sender_id>.json`.
5. Create or continue that user’s own reminder/schedule entry; do not reuse a shared schedule.
6. Keep all future reminders, follow-ups, and specialist lookup in the **same Telegram chat**.

## Scheduled follow-ups (cron)

The live agent uses **cron (or equivalent schedulers)** to remind users between rounds. When a job runs for a user who is still in the workflow:

- Send the next round’s check-in in Telegram (brief intro, the **3 core yes/no questions**, plus the **emergency-symptoms** warning).
- Update `data/symptom-users/<sender_id>.json`: `currentRound`, per-round status (e.g. pending), `askedAt`, and the outbound Telegram `messageId` when available.
- Do **not** conclude early or start doctor lookup unless Round 5 is complete and the pattern warrants it (same rules as interactive chat).

If the environment commits workspace changes, record a clear commit message for the state update. See `openclaw/README.md` for an example dashboard log of a cron-driven Round 2 send.

## Round behavior

Use the same core questions each round:

1. chest pressure/tightness/pain lasting more than a few minutes
2. blood in stool or major bowel-habit change
3. swelling or pain in the same small joints on both sides

Rules:

- **Round 1:** ask core questions and save answers.
- **Rounds 2–4:** ask the same core questions again; optionally add 1–2 disease-specific follow-up questions if a pattern is emerging.
- **Round 5:** ask the core questions again; if still ambiguous, ask only the minimum extra disease-specific questions needed to decide.
- Do **not** provide a disease overview before Round 5 unless emergency escalation is required.

## Emergency escalation

Immediately advise urgent/emergency care if the user reports:

- chest pain happening now
- chest pain spreading to arm, jaw, neck, or shoulder
- shortness of breath, fainting, dizziness, sweating, or nausea with chest pain
- black/bloody stool with weakness or severe pain
- severe abdominal swelling / obstruction symptoms

When emergency symptoms appear:

- prioritize safety over workflow completion
- ask only minimal urgency-check questions
- do not delay care for future rounds

## Persistence and conclusion

Do not diagnose. Use language like:

- “most consistent with”
- “points more toward”
- “this should be checked by”

After 5 rounds:

- if GI/bowel symptoms persist across rounds, route toward **Gastroenterologe / Gastroenterologin**
- if cardiac symptoms dominate, route toward **Kardiologe / Kardiologin**
- if bilateral small-joint symptoms dominate, route toward **Rheumatologe / Rheumatologin**

If the pattern is strong enough after Round 5:

1. ask for city/ZIP if missing
2. search DocFinder
3. return 3–8 doctor options with specialty, district/city, and profile URL
4. mark the doctor-search step complete so reminders stop

## State expectations

Maintain per-user state in `data/symptom-users/<sender_id>.json` with at least:

- user/channel/target
- `currentRound`
- `maxRounds`
- `credentialsProvided`
- `website`
- `rounds[]` with answers/status/timestamps
- `doctorSearchCompleted`

If the reminder DB exists, keep it in sync with the state file.

## References

- Detailed message rules, patterns, and DocFinder output: `references/workflow.md`
- Example turns: `examples.md`
