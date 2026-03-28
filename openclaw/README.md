# OpenClaw assets (GeneClaw)

This folder holds **agent skills** and references used with OpenClaw / Cursor-style agents for the GeneClaw Telegram symptom follow-up flow. Use it as the canonical source in the repo for demos and hackathon submissions.

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

## Product context

GeneClaw combines genetic risk context with longitudinal symptom check-ins over Telegram. The skill encodes **non-diagnostic** screening behavior, **emergency red-flag** handling, and **Austria/Vienna** specialist lookup guidance (e.g. DocFinder, specialty names in German).
