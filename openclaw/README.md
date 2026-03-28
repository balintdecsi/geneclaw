# OpenClaw assets (GeneClaw)

This folder holds **agent skills** and references used with OpenClaw / Cursor-style agents for the GeneClaw Telegram symptom follow-up flow. Use it as the canonical source in the repo for demos and hackathon submissions.

## Maritime (OpenClaw host)

The production-style agent runs on **[Maritime](https://maritime.sh/docs)** — use their docs for workspace setup, agent configuration, secrets, and run history in the dashboard.

**Hackathon checklist (high level):**

1. Create or connect a Git-backed **OpenClaw workspace** (paths like `/home/node/.openclaw/workspace/` on the host map to your repository contents).
2. Point the agent at the skill under `openclaw/skills/telegram-symptom-followup/` (see **Layout** below).
3. Enable **cron** (or Maritime’s scheduler) so follow-up rounds fire on a schedule; each run should send Telegram messages, update `data/symptom-users/<telegram_user_id>.json`, and (if enabled) commit workspace changes — see **Cron reminders** below for a real **dashboard log** example.

For the rest of the GeneClaw stack (Lovable app, ElevenLabs voice, Supabase Telegram function), see the [root README](../README.md).

## Layout

| Path | Purpose |
|------|---------|
| `skills/telegram-symptom-followup/SKILL.md` | Main skill instructions (YAML frontmatter + workflow) |
| `skills/telegram-symptom-followup/references/workflow.md` | Message style, follow-up patterns, DocFinder output rules |
| `skills/telegram-symptom-followup/examples.md` | Short example turns for judges / onboarding |

## Use in Cursor

1. Copy the skill directory into the project skills location:

   ```bash
   mkdir -p .cursor/skills
   cp -r openclaw/skills/telegram-symptom-followup .cursor/skills/
   ```

2. Reload the workspace or restart Cursor so project skills are picked up.

Skills follow the usual layout: one directory per skill with a `SKILL.md` file at the root of that directory.

## Use elsewhere

Any OpenClaw-compatible runner that loads markdown skills with YAML frontmatter can point at `openclaw/skills/*/SKILL.md` and resolve relative `references/` paths from that file’s directory.

## Cron reminders

The agent that runs this workflow is set up to use **cron jobs (or an equivalent scheduler)** so each enrolled user gets follow-ups on a cadence (e.g. the next screening round) without relying on the user to message first. Each run typically:

- Sends the appropriate round check-in to the user’s Telegram chat
- Updates the per-user state file under `data/symptom-users/<telegram_user_id>.json`
- Records timing and outbound message metadata (`askedAt`, Telegram `messageId`, round status)
- Commits workspace changes when the runner is configured to track the workspace in git

Dashboards (for example a **maritime operations / run log UI**) surface these runs as structured summaries. Example log line from one such dashboard:

```
Telegram symptom follow-up for Negar · OK
Sent Round 2 follow-up to Telegram user 1316506403 (@Khavidak_97) in the Telegram chat.

What I sent:
A brief Round 2 check-in
The 3 core yes/no screening questions
A short urgent-care warning for emergency symptoms

State update:
Updated /home/node/.openclaw/workspace/data/symptom-users/1316506403.json
Advanced workflow to currentRound: 2
Marked Round 2 as pending
Stored askedAt: 2026-03-28T02:22:00Z
Stored Telegram messageId: 36

Repo:
Committed the workspace change: Update Negar symptom screening round 2 state

No conclusion was given. No doctor lookup was started.
```

Paths like `/home/node/.openclaw/workspace/` reflect the deployed OpenClaw workspace; in development they map to your local clone (the skill still expects `data/symptom-users/` relative to that workspace).

## Product context

GeneClaw combines genetic risk context with longitudinal symptom check-ins over Telegram. Onboarding in the skill references a **genetics test website**; our **first crawl** and portal implementation live in the companion repo **[github.com/negarl/geno-health-portal](https://github.com/negarl/geno-health-portal)**, which GeneClaw integrates with in the demo (report pages + credentials). The skill encodes **non-diagnostic** screening behavior, **emergency red-flag** handling, and **Austria/Vienna** specialist lookup guidance (e.g. DocFinder, specialty names in German).
