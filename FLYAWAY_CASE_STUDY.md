# FlyAway Case Study - Ready for App.js

This is the case study description for your 4th design project. Copy the `description` content into App.js and add 7-8 screenshots as indicated.

---

## JSX Object for App.js

```jsx
{
  id: 4,
  title: "FlyAway",
  company: "Independent Project",
  tagline: "Privacy-first iOS app for emotional healing and thought release",
  image: flyawayHero, // [SCREENSHOT 1: App hero or home screen]
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

![Thought composition and release](placeholder_compose_release)

2. **Non-Prescriptive Mood Tracking** — Optional mood check-ins (1-5 scale) with mood history visualization. No streaks, no guilt for skipping. Users see patterns emerge naturally; insights are observational, not judgmental ("You felt calmer after evening writes").

![Mood calendar and insights](placeholder_mood_insights)

3. **Private Letters for Unsent Words** — Compose letters to people you can't reach (estranged family, lost loved ones). Letters stored locally on device, never shared. This validates that healing doesn't require an external witness.

![Letters archive](placeholder_letters)

4. **Breathing Exercises with Haptic Pacing** — Box breathing (4-4-4-4) with visual + haptic guidance. Haptic feedback provides tactile grounding (evidence-based for anxiety). Breathing isn't just visual; it's embodied.

![Breathing interface](placeholder_breathing)

5. **Voice Journaling** — Record audio directly in the app. Some emotions are easier to speak than write. Audio stored locally; never transcribed or uploaded without permission.

![Voice recording interface](placeholder_voice)

6. **Accessibility-First Design** — WCAG AAA compliance (95%+). VoiceOver support, Dynamic Type, reduced motion support, haptics toggle. Crisis resources (988 Lifeline, Crisis Text Line) always accessible. Accessibility isn't compliance theater; it's foundational.

![Accessibility settings](placeholder_accessibility)

7. **Security & Privacy Transparent** — Biometric lock, end-to-end encryption, data export anytime. Firestore security rules are auditable in the GitHub repo. Privacy is a human right, especially for health data.

![Privacy controls](placeholder_privacy)

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
}
```

---

## 🎨 Screenshot Specifications

Use 7-8 key screenshots. Place them where indicated in the description above.

| # | Screen | Placement | Dimensions | Content |
|---|--------|-----------|------------|---------|
| 1 | Hero/Home | Top | 800×600px | Main home screen or app hero |
| 2 | Compose + Release | "Thought Release" section | 600×900px | Compose screen with expiry dropdown visible |
| 3 | Mood Insights | "Mood Tracking" section | 600×500px | Mood calendar + graph showing patterns |
| 4 | Letters | "Private Letters" section | 600×800px | Saved letters list/archive |
| 5 | Breathing | "Breathing Exercises" section | 600×700px | Breathing circle interface |
| 6 | Voice | "Voice Journaling" section | 600×700px | Voice recording/playback interface |
| 7 | Accessibility | "Accessibility-First" section | 600×800px | Accessibility settings menu |
| 8 | Privacy | "Security & Privacy" section | 600×700px | Privacy controls or data export screen |

**File naming:** `src/assets/flyaway_[1-8].png`

**Optimization:** PNG, <200KB each, dark mode preferred, iPhone mockup

---

## 📋 Integration Checklist

1. [ ] Collect 7-8 screenshots from FlyAway app
2. [ ] Optimize PNG files (<200KB each)
3. [ ] Add image imports to App.js
4. [ ] Copy project object above into `designProjects` array (after id: 3)
5. [ ] Update image filenames to match your assets
6. [ ] Test in browser: `/design` page shows FlyAway card
7. [ ] Click FlyAway, verify case study renders with images
8. [ ] Test mobile responsiveness
9. [ ] Deploy

**Time estimate: 45 minutes**

---

## 🎯 Why This Positioning Works for Your Audiences

**For Product Designers:**
- Shows you design with principles, not just aesthetics
- Privacy-first design is increasingly valued; demonstrates strategic thinking
- Code quality metrics show you understand full-stack product

**For UX Researchers:**
- Research foundation (SAMHSA frameworks, trauma-informed design)
- User testing with actual quotes and insights
- Validation through retention metrics and usability findings

**For EdTech Recruiters:**
- Accessibility-first approach (WCAG AAA compliance)
- Understanding of sensitive, vulnerable populations
- Evidence-based design grounded in research
- Multi-disciplinary capability (design + engineering + research)
