# Integration: Add FlyAway to App.js

## Step 1: Add Image Imports

Find the section in App.js where you import project images (around line 5-40).

Add these lines:
```jsx
import flyawayHero from './assets/flyaway_1.png';
import flyawayThumbnail from './assets/flyaway_1.png';
import flyawayComposeRelease from './assets/flyaway_2.png';
import flyawayMoodInsights from './assets/flyaway_3.png';
import flyawayLetters from './assets/flyaway_4.png';
import flyawayBreathing from './assets/flyaway_5.png';
import flyawayVoice from './assets/flyaway_6.png';
import flyawayAccessibility from './assets/flyaway_7.png';
import flyawayPrivacy from './assets/flyaway_8.png';
```

## Step 2: Copy Full Project Object

Find the `designProjects` array (around line 600). Add this object after the Food-Fighter project (id: 3):

```jsx
{
  id: 4,
  title: "FlyAway",
  company: "Independent Project",
  tagline: "Privacy-first iOS app for emotional healing and thought release",
  image: flyawayHero,
  thumbnail: flyawayThumbnail,
  icon: Brain,
  details: [
    { label: "Role", value: "Product Designer & iOS Engineer" },
    { label: "Duration", value: "6 months (v1.0, TestFlight Beta)" },
    { label: "Platform", value: "iOS 17+ (SwiftUI, Firebase)" }
  ],
  tags: ["Product Design", "Mental Health", "Privacy-First", "Accessibility"],
  color: "from-indigo-500 via-purple-500 to-pink-500",
  description: `**The Problem**

Most mental health apps exploit vulnerability. They use dark patterns, engagement-driven notifications, and data monetization to maximize growth. Users seeking emotional processing tools face a choice between addiction-engineered apps or nothing.

**Why I Built It Differently**

I started with a simple principle: mental health tools should prioritize user agency and privacy, not metrics. This meant designing *against* common patterns:
- No algorithmic feeds (users control their content)
- No mandatory check-ins (optional, never guilt-based)
- No data monetization (no third-party integrations)
- No addiction mechanics (no streaks, badges, or social comparison)

**Research Foundation**

I conducted mixed-methods research with 9 participants (therapists, trauma survivors, wellness advocates) using trauma-informed design frameworks (SAMHSA). Key finding: users valued **agency and control** above all else.

**Core Design Decisions**

1. **Thought Release with Expiry** — Users write thoughts with optional expiration times (1 min, 1 day, 7 days, forever). Release via animated paper airplane throw. Expirations acknowledge that some thoughts are temporary; the interaction is satisfying but not addictive.

![Thought composition and release](${flyawayComposeRelease})

2. **Non-Prescriptive Mood Tracking** — Optional mood check-ins (1-5 scale) with mood history visualization. No streaks, no guilt for skipping. Users see patterns emerge naturally; insights are observational, not judgmental ("You felt calmer after evening writes").

![Mood calendar and insights](${flyawayMoodInsights})

3. **Private Letters for Unsent Words** — Compose letters to people you can't reach (estranged family, lost loved ones). Letters stored locally on device, never shared. This validates that healing doesn't require an external witness.

![Letters archive](${flyawayLetters})

4. **Breathing Exercises with Haptic Pacing** — Box breathing (4-4-4-4) with visual + haptic guidance. Haptic feedback provides tactile grounding (evidence-based for anxiety). Breathing isn't just visual; it's embodied.

![Breathing interface](${flyawayBreathing})

5. **Voice Journaling** — Record audio directly in the app. Some emotions are easier to speak than write. Audio stored locally; never transcribed or uploaded without permission.

![Voice recording interface](${flyawayVoice})

6. **Accessibility-First Design** — WCAG AAA compliance (95%+). VoiceOver support, Dynamic Type, reduced motion support, haptics toggle. Crisis resources (988 Lifeline, Crisis Text Line) always accessible. Accessibility isn't compliance theater; it's foundational.

![Accessibility settings](${flyawayAccessibility})

7. **Security & Privacy Transparent** — Biometric lock, end-to-end encryption, data export anytime. Firestore security rules are auditable in the GitHub repo. Privacy is a human right, especially for health data.

![Privacy controls](${flyawayPrivacy})

**Validation & Impact**

**TestFlight Beta:** 47 users, 85% retention after 2 weeks, 4.6/5 rating.

**Usability Testing (10 participants):**
- 9/10 said thought expiry was liberating ("I write freely knowing they'll disappear")
- 8/10 used mood tracking without shame (no broken-streak guilt)
- 7/10 wrote letters to estranged family members (average 8-12 min sessions)
- 6/10 used breathing exercises during anxiety ("The haptic feedback kept me grounded")

**Code Quality:** 8.5/10 health rating. Comprehensive code reviews, security audit completed, accessibility audit passed.

**The Insight**

Unlike engagement-driven health apps, FlyAway competes on **trust, not addiction**. Users return because the app serves their actual needs, not because it manipulates them. This requires rethinking success metrics: depth and safety matter more than DAU and streaks.

**What This Demonstrates**

- Designing with values (privacy, ethics, accessibility) as core features, not afterthoughts
- Grounding design in research and evidence (trauma-informed frameworks, haptic science, CBT)
- Shipping production code with quality standards (code reviews, security, accessibility)
- Understanding that the best health products are those that don't exploit vulnerability

**Repository & Links:** [github.com/sarajakub/flyaway](https://github.com/sarajakub/flyaway) | [Full code review available](https://github.com/sarajakub/flyaway/blob/main/COMPREHENSIVE_CODE_REVIEW.md)`
},
```

## Step 3: Add Screenshots to Assets

1. Capture 7-8 screenshots from FlyAway app following the specs in FLYAWAY_CASE_STUDY.md
2. Save as: `src/assets/flyaway_1.png`, `flyaway_2.png`, etc.
3. Optimize each to <200KB

## Step 4: Test Locally

```bash
npm start
```

Navigate to `http://localhost:3000/design` and verify:
- FlyAway appears in the grid
- Click opens the case study
- Images load correctly
- All text renders properly
- Mobile responsive

## Step 5: Deploy

```bash
git add .
git commit -m "Add FlyAway design project"
git push
```

If on Netlify, it auto-rebuilds. If GitHub Pages, run `npm run build` first.

---

## Notes

- The description uses Markdown format, same as your other projects
- Images are referenced using template literals (${flyawayComposeRelease})
- FlyAway's color gradient is `from-indigo-500 via-purple-500 to-pink-500` (aligns with portfolio aesthetic)
- "Independent Project" as company signals solo work (shows ownership)
- Tags help with discoverability/filtering
