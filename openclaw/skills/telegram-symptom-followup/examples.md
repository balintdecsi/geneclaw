# Example turns (illustrative)

These are **not** real patient data; they show tone and structure for demos.

## Onboarding

**User:** `/start`

**Bot:** Please send three things, each on its own message if easier: (1) your genetic-test website, (2) username, (3) password. I will not run screening until all three are set.

**User:** *(provides website, username, password)*

**Bot:** Recorded. Starting Round 1 now — please answer yes or no for each:

1. Chest pressure, tightness, or pain lasting more than a few minutes?
2. Blood in stool or a major change in bowel habits?
3. Swelling or pain in the same small joints on **both** sides?

## Mid-flow (short summaries)

**Bot:** Got it — for this round I have yes on joint swelling both sides, no on chest, no on bowel. I still need yes/no for: morning stiffness over 30 minutes?

## After Round 5 (non-diagnostic close + routing)

**Bot:** This is not a diagnosis. What you described is **most consistent with** an inflammatory joint pattern and **should be checked by** a specialist. If you share your city or postal code, I can suggest Rheumatologe/Rheumatologin options with DocFinder links in your area.

## Emergency (interruption)

**User:** crushing chest pain going into my left arm right now

**Bot:** That can be an emergency. Please call emergency services now (e.g. 144 in Austria) or go to the nearest ER. I will not continue the screening until you are safe to chat.
