import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { ArrowRight, ArrowLeft, Mail, Linkedin, Github, GraduationCap, Sparkles, Play, Activity, Smartphone, Brain, Eye, Users, Code, Home, Gamepad2, Menu, X, StickyNote, Send } from 'lucide-react';
import profileImage from './assets/akvan-16_EDIT.png';
import cosmosImage from './assets/cosmossim.png';
import courseaiImage from './assets/courseai_progress.png';
import foodfighterImage from './assets/foodfighter_homepage.png';
import foodfighterArchImage from './assets/foodfighter_architecture.png';
import foodfighterARImage from './assets/foodfighter_ar.png';
import foodfighterPersonasImage from './assets/foodfighter_personas.png';
import stresscamImage from './assets/stresscam_sim.png';
import stresscamWatchImage from './assets/stresscam_watch.png';
import stresscamIphoneImage from './assets/stresscam_iphone2.png';
import smartlightsImage from './assets/smartlights1.jpg';
import hueToggleVideo from './assets/hue_io.mov';
import hueColorVideo from './assets/hue_hue.mov';
import altcontrollerImage from './assets/og_altcontroller.png';
import altctrlV0Image from './assets/v0_altctrl.jpg';
import altctrlV0Gif from './assets/v0_gif.GIF';
import altctrlV1Image from './assets/v1_altctrl.jpeg';
import altctrlV2_0Image from './assets/v2.0_altctrl.jpg';
import altctrlV2_1Image from './assets/v2.1_altctrl.jpeg';
import altctrlV2_2Image from './assets/v2.2_altctrl.jpeg';
import aycetImage from './assets/aycet_study.png';
import cellsImage from './assets/cells_study.png';
import aiArtImage from './assets/ai_art.png';
import { supabase } from './supabaseClient';

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [designHover, setDesignHover] = useState(false);
  const [researchHover, setResearchHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [guestbookNotes, setGuestbookNotes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);

  // Check URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/design/')) {
      const id = parseInt(path.split('/design/')[1]);
      setCurrentPage('design');
      setSelectedProjectId(id);
    } else if (path.includes('/research/')) {
      const id = parseInt(path.split('/research/')[1]);
      setCurrentPage('research');
      setSelectedProjectId(id);
    } else if (path.includes('/maker/')) {
      const id = parseInt(path.split('/maker/')[1]);
      setCurrentPage('maker');
      setSelectedProjectId(id);
    } else if (path === '/design') {
      setCurrentPage('design');
    } else if (path === '/research') {
      setCurrentPage('research');
    } else if (path === '/maker') {
      setCurrentPage('maker');
    } else if (path === '/guestbook') {
      setCurrentPage('guestbook');
    }
  }, []);

  const handleDesignHover = (isHovering) => {
    setDesignHover(isHovering);
    if (isHovering) setResearchHover(false);
  };

  const handleResearchHover = (isHovering) => {
    setResearchHover(isHovering);
    if (isHovering) setDesignHover(false);
  };

  const navigateToProject = (id, type) => {
    window.history.pushState({}, '', `/${type}/${id}`);
    setSelectedProjectId(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToPage = (page) => {
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    setCurrentPage(page);
    setSelectedProjectId(null);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const fetchNotes = useCallback(async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching notes:', error);
    } else {
      setGuestbookNotes(data || []);
    }
  }, []);

  // Fetch guestbook notes
  useEffect(() => {
    if (currentPage === 'guestbook') {
      fetchNotes();
    }
  }, [currentPage, fetchNotes]);

  const submitNote = async (e) => {
    e.preventDefault();
    const name = nameInputRef.current?.value.trim();
    const message = messageInputRef.current?.value.trim();
    
    if (!name || !message) return;
    
    setIsSubmitting(true);
    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }]);
    
    if (error) {
      console.error('Error submitting note:', error);
      alert('Failed to post note. Please try again!');
    } else {
      if (nameInputRef.current) nameInputRef.current.value = '';
      if (messageInputRef.current) messageInputRef.current.value = '';
      fetchNotes();
    }
    setIsSubmitting(false);
  };

  const designProjects = [
    {
      id: 1,
      title: "Food-Fighter: Battle for Health",
      company: "NYU Learning Game Design",
      tagline: "Transforming nutrition education through strategic gameplay",
      image: foodfighterImage,
      thumbnail: foodfighterImage,
      arImage: foodfighterARImage,
      archImage: foodfighterArchImage,
      personasImage: foodfighterPersonasImage,
      icon: Smartphone,
      details: [
        { label: "Role", value: "UX/Game Designer" },
        { label: "Duration", value: "3 months" },
        { label: "Platform", value: "iOS" }
      ],
      tags: ["Game Design", "UX Design", "Learning Design"],
      color: "from-violet-500 via-purple-500 to-indigo-500",
      description: `**The Challenge**

Kids don't have access to engaging nutrition education - 40 out of 50 US states don't mandate it in schools. Existing "learning games" use boring drag-and-drop mechanics that fail to create lasting behavior change.

**My Role**

UX/Game Designer on a 3-person team. I led user research, designed the complete gameplay system, created high-fidelity prototypes, and developed the visual design language.

**Understanding Our Players**

[PERSONAS_IMAGE]

I created 3 user personas to guide our design decisions - each representing a different motivation for learning about nutrition:

**Clare (13)** needs practical knowledge to make better lunch choices at school
**Blake (12)** wants to understand the science behind cooking with his dad  
**Elliot (10)** loves Pokemon but needs to study for health class

Their different needs shaped our core insight: the game had to be fun first, educational second.

**Designing the System**

[ARCH_IMAGE]

I mapped out the complete technical architecture - from how kids would use their phone cameras to collect ingredients in the real world, to how those ingredients would translate into battle mechanics, to the backend systems managing multiplayer matches and card progression. This blueprint kept our ambitions grounded in what was technically feasible.

**The Solution: AR Nutrition Game Meets Pokemon Go**

[AR_IMAGE]

A mobile game where players discover and collect real ingredients using AR, build customizable "plate warriors" from 5 food groups, and battle friends. Nutrition facts become gameplay mechanics: carbs = health, protein = attack, vitamins = special moves.

Players use their phone camera to "catch" healthy ingredients at grocery stores, farmers markets, and restaurants - turning everyday food encounters into game moments. Collected ingredients unlock customizable avatar parts (grain heads, veggie arms, protein legs), making nutrition knowledge immediately visible and rewarding.

**Design Decisions That Solved Real Problems**

**Cognitive Load Problem:** Players were overwhelmed choosing from 50+ ingredient cards during battles.
**Solution:** Segmented selection by food group first, then show 5-8 cards max. Testing showed 60% faster decision-making.

**Motivation Problem:** How do you make broccoli exciting?
**Solution:** Social competition + unlockable abilities. Friend battles and card trading created intrinsic motivation beyond "eating healthy."

**Transfer Problem:** Would gameplay actually change real-world food choices?
**Solution:** Photo recognition mechanic that rewards photographing actual meals. Early testing showed kids asking parents about ingredient nutrients at dinner.

**Key Learnings**

The hardest UX challenge wasn't the game mechanics - it was **balancing educational rigor with fun**. Initial designs had too many nutritional facts competing for attention. I learned to hide complexity in progressive unlocks: players start with simple carb/protein/fat, then discover vitamin combinations as they level up. This matches how real learning works - foundation first, nuance later.

Also learned that **cultural food representation matters deeply**. When testing showed players disengaging with unfamiliar ingredients, I redesigned the unlock system to start with universal foods and introduce regional ingredients at higher levels.

**Design Presentation**

<iframe src="https://docs.google.com/presentation/d/14kIOTQM-TcxU-sGgpbpXq6AT6XBDd5-WaIPcpb91Q48/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

→ [Full Design Document](https://docs.google.com/document/d/1HZvi4Sdot2Ku082ph5T4A4iM5EMEH-_7UpGCMbljVxI/edit?usp=sharing)`
    },
    {
      id: 2,
      title: "Cosmos VR Game",
      company: "CREATE Lab",
      tagline: "Making learning immersive and fun",
      image: cosmosImage,
      thumbnail: cosmosImage,
      icon: Play,
      details: [
        { label: "Role", value: "Lead Designer" },
        { label: "Duration", value: "1 year" },
        { label: "Platform", value: "Meta Quest" }
      ],
      tags: ["UI/UX Design", "Co-Design", "Learning Design"],
      color: "from-purple-500 via-pink-500 to-rose-500",
      description: `**The Challenge**

Middle school students struggled to grasp abstract astronomy concepts like planetary motion and scale when taught through 2D diagrams and textbooks.

**My Design Process**

- Discovery: Conducted 12 student interviews and observed 5 classroom sessions
- Insight: Students learn best through hands-on manipulation, not passive observation
- Ideation: Created 3 game mechanic concepts balancing fun with learning objectives
- Iteration: 3 rounds of co-design with students and teachers
- Testing: Weekly playtests with 8th graders measuring engagement and comprehension

**The Solution**

An immersive VR experience where students become space explorers, manipulating planets in real-time to understand orbits, gravity, and scale. Guided discovery replaces lectures.

**The Impact**

- Adopted by 15+ classrooms in pilot program
- Teachers reported measurably higher student engagement
- "This is the first time astronomy clicked for me!" - 8th grade student

**What I Learned**

Early testing with actual students (not just teachers) was critical. Our first prototype was too game-like and distracted from learning - student feedback helped us find the right balance between fun and education.`
    },
    {
      id: 3,
      title: "AI Lesson Builder",
      company: "Stealth Startup",
      tagline: "Building courses with AI, made easy",
      image: courseaiImage,
      thumbnail: courseaiImage,
      icon: Sparkles,
      details: [
        { label: "Role", value: "Prototyper" },
        { label: "Duration", value: "2 weeks" },
        { label: "Platform", value: "Web App" }
      ],
      tags: ["AI", "EdTech", "Interaction Design"],
      color: "from-blue-500 via-cyan-500 to-teal-500",
      description: `**The Challenge**

Educators spend hours creating course materials from scratch, lacking tools that understand pedagogical best practices while saving time.

**My Role**

As Prototyper, I designed and tested an AI-powered lesson builder that helps educators scaffold courses efficiently while maintaining quality.

**The Process**

- 8 interviews with educators across K-12 and higher ed
- Competitive analysis of 5 existing tools
- 4 rapid prototyping cycles with weekly user feedback
- Usability testing with 12 educators

**The Impact**

Reduced course creation time from 4 hours to 45 minutes while maintaining pedagogical quality. Educators praised the balance of AI assistance with creative control.

"It's like having a teaching assistant who knows learning design." - High school teacher`
    }
  ];

  const researchProjects = [
    {
      id: 1,
      title: "AI-Assisted Character Design",
      type: "Mixed Methods (AAAI 2025)",
      tagline: "How students integrate AI into creative art-making workflows",
      image: aiArtImage,
      stat: "39 participants",
      finding: "95% adopted AI in personalized creative workflows",
      icon: Users,
      tags: ["AI/ML", "Educational Technology", "Behavioral Analysis"],
      color: "from-indigo-400 to-indigo-600",
      details: [
        { label: "Study Type", value: "Mixed Methods" },
        { label: "Participants", value: "39 students" },
        { label: "Publication", value: "AAAI 2025" }
      ],
      link: "https://ojs.aaai.org/index.php/AAAI/article/view/35182",
      description: `**Research Question**

How do middle and high school students integrate AI tools into creative character design workflows, and what factors influence their adoption patterns, creative agency, and perception of AI as a collaborator?

**Methodology**

Developed an AI-assisted character design activity using **Google Colab, Python, and OpenAI APIs** (GPT-3.5, GPT-4o, DALL-E). Led two multi-day workshops with **39 middle and high school students** (12 middle, 27 high school; 21F, 18M) who completed character design through **multiple stages**: briefing, reference generation, sketching/clay modeling, AI feedback, iteration, personality design, animation, and peer sharing. Collected activity sheets with revision logs, code notebooks, created artifacts (sketches, clay models), and **pre/post surveys** measuring AI attitudes, skills, and confidence. Applied **thematic analysis** to identify **four workflow dimensions**: inspiration influence, ideation style, AI-image satisfaction, and feedback application.

**Key Findings**

Students successfully integrated AI across the creative process with **95% completion rate** for character personality and chat features. Identified **8 distinct creative personas** across 4 workflow dimensions: **69% were "Dependents"** (relied on AI for visual inspiration), **69% were "Visionaries"** (mental planners using prompts first), **74% were "Fulfilled"** (satisfied with ≤2 AI generations), and **51% were "Iterators"** (applied AI feedback to their work). Students showed **statistically significant increases** in AI trust, understanding how AI works, confidence explaining AI to others, and overall AI skills and attitudes. **37% incorporated clay modeling** into their designs. Post-activity, students reported **higher preference for human+AI collaboration** and confidence using AI in future art projects, though concerns emerged around **creative ownership, AI biases** (e.g., stereotypical Chinese clothing), and limitations with generating specific details.

**Implications**

AI literacy in creative education requires scaffolded activities that preserve student agency while introducing technical skills. Successful integration depends on flexible workflows allowing students to choose which creative stages benefit from AI assistance. Design implications for educational AI tools include: providing transparency in AI capabilities/limitations, enabling personalization of AI feedback, supporting multimodal creative expression, and explicitly addressing ethical considerations like bias and ownership. These findings provide a replicable framework for integrating AI into non-CS subjects while maintaining students' creative identity and decision-making authority.`
    },
    {
      id: 2,
      title: "Motion Design for Emotion Design",
      type: "A/B Testing (GALA 2024)",
      tagline: "NPC animation impact on emotion and cognitive performance in VR",
      image: aycetImage,
      stat: "44 participants",
      finding: "User-approaching NPCs increased arousal 36%",
      icon: Brain,
      tags: ["VR", "Behavioral Research", "Emotion Design"],
      color: "from-blue-400 to-blue-600",
      details: [
        { label: "Study Type", value: "Comparative Testing" },
        { label: "Total Participants", value: "44 users" },
        { label: "Publication", value: "GALA 2024" }
      ],
      link: "https://link.springer.com/chapter/10.1007/978-3-031-78269-5_32",
      description: `**Research Question**

How do NPC motion patterns (path complexity and trajectory) in VR environments affect users' emotional responses and cognitive performance?

**Methodology**

Led two comparative studies with **44 total participants**. Study 1 (**15 participants**) tested **six NPC animations** using repeated measures, varying by path (sinusoidal, near-straight, meandering) and trajectory (approaching user vs. static distance). Measured emotional states using **Self-Assessment Manikin** for arousal and valence after each animation. Study 2 (**29 participants**) used **between-groups testing**, integrating the two highest-performing animations into All You Can E.T. VR, an executive function training game. Tracked emotion during gameplay across **10 levels**, plus reaction time, accuracy, and pre/post cognitive performance assessments.

→ [All You Can ET iOS version](https://apps.apple.com/us/app/all-you-can-et/id1475283294)
→ [Game demo video](https://vimeo.com/366276953)

**Key Findings**

Study 1: **User-approaching animations significantly increased arousal** compared to static-distance animations, with the zipline-static vs. sine-approach comparison showing the **strongest effect**. Path complexity and trajectory both influenced emotional valence. Study 2: Confirmed approaching NPCs produced **36% higher arousal** (3.4 vs. 2.5, **statistically significant**) but more negative emotional valence (2.7 vs. 3.7). While cognitive performance tasks showed no significant improvements, this was likely due to adult participants having already-developed executive function skills and the short **10-minute play session**.

**Implications**

Character animation trajectory is a powerful design lever for controlling user arousal in VR experiences. When designing features requiring sustained attention or heightened engagement, approaching NPCs significantly increase cognitive arousal. For more positive emotional experiences, static-distance NPCs with moderate path complexity are preferable. These findings provide evidence-based animation guidelines for affective design in immersive learning environments and inform how motion design choices directly impact measurable user emotional states.`
    },
    {
      id: 3,
      title: "VR Emotional Design for Learning",
      type: "Qualitative Study (AERA 2025)",
      tagline: "How VR design features facilitate affective learning experiences",
      image: cellsImage,
      stat: "9 participants",
      finding: "74% of design-emotion connections from structured tasks",
      icon: Eye,
      tags: ["Usability Testing", "VR", "Think-Aloud Protocol"],
      color: "from-purple-400 to-purple-600",
      details: [
        { label: "Study Type", value: "Mixed Methods" },
        { label: "Participants", value: "9 users" },
        { label: "Publication", value: "AERA 2025" }
      ],
      link: "https://doi.org/10.3102/2197501",
      description: `**Research Question**

How do VR design features facilitate affective learning experiences in a biology simulation, and what design factors influence emotions, cognitive load, and engagement?

**Methodology**

Led mixed-methods research with **9 participants** (ages 16-25) using **think-aloud sessions** while navigating Looking Inside Cells VR simulation. Participants completed **two activities**: Animal Cell (open-ended organelle placement) and Mitosis (structured sequential phases), each experiencing **4 lighting/particle effect conditions** (3 minutes each). Audio-recorded sessions, live-screen observations, and post-activity interviews captured user behaviors and emotional responses. Applied **thematic analysis** to transcripts, developing a coding framework across **four categories**: emotional states, VR design factors, cognitive and emotional constructs, and learning mechanics. Performed **network analysis using Gephi** to visualize relationships and identify interaction patterns between design elements and user outcomes.

→ [NYU CREATE Lab research page](https://steinhardt.nyu.edu/create/research/looking-inside)
→ [Steam VR app](https://store.steampowered.com/app/1889880/Looking_Inside_Cells/)
→ [VR gameplay demo](https://vimeo.com/708027096)

**Key Findings**

Relationship mapping revealed **lighting and feedback mechanisms significantly influenced** both positive and negative emotional responses. **74% of design-emotion connections** occurred during the structured Mitosis activity versus the open-ended Animal Cell activity, showing that **clear task design** (objectives, level unlock mechanics, progress bars) **drives stronger engagement and motivation**. Negative emotions clustered around **unclear task demands and repetition**, while positive emotions connected to design factors like **particles, bright lighting, and novel interactions**. Users' mental associations with object designs (e.g., spindle fibers perceived as "spiders" vs. "octopuses") **directly influenced emotional responses** - negative associations correlated with disgust/fear, positive associations with joy. Participants requested more **spatial interaction like 3D rotation** to better leverage the immersive environment. One participant described a breakthrough moment as **"something magical is happening"** when design successfully supported their understanding.

**Implications**

VR learning design should prioritize structured tasks with clear objectives and feedback mechanisms to enhance engagement and self-efficacy. Design recommendations for positive affect in VR learning: use bright lighting, particles for interactivity, gradual feature introduction to manage cognitive load, narrative framing, spatial contiguity for scaffolds, and careful object design considering learners' potential schema associations. Negative affect stems primarily from unclear task expectations and poor action-outcome feedback - addressable through progress indicators and signaling. These findings extend emotional design principles from 2D multimedia to immersive 3D environments, establishing initial design heuristics for VR educational experiences that balance affective engagement with cognitive load management.`
    }
  ];

  const makerProjects = [
    {
      id: 3,
      title: "StressCam",
      tagline: "Real-time stress detection via Apple Watch + AI",
      image: stresscamImage,
      watchImage: stresscamWatchImage,
      iphoneImage: stresscamIphoneImage,
      icon: Activity,
      tech: ["Swift", "HealthKit", "WatchConnectivity", "SwiftUI"],
      description: `**The Concept**

A biometric monitoring system that detects stress in real-time by analyzing Apple Watch data and triggering camera-based context capture when anomalies occur.

→ [GitHub Repository](https://github.com/sarajakub/StressCam)

**How It Works**

[WATCH_IMAGE]

**Apple Watch:** Continuously monitors heart rate, HRV (heart rate variability), and SpO2 (oxygen saturation) via HealthKit. Detects anomalies when values exceed personalized thresholds and sends alerts to iPhone via WatchConnectivity.

[IPHONE_IMAGE]

**iPhone App:** Receives biometric streams, calculates personalized baseline from historical data (7-30 days), and computes a composite stress score (0-100) using weighted z-scores. Real-time charts visualize HR, HRV, and SpO2 trends with threshold indicators.

**Anomaly Detection:** Statistical threshold manager monitors each metric against baseline (mean ± 2 standard deviations). When anomalies trigger, the system is designed to activate a computer vision camera for environmental context capture (OpenMV integration planned).

**Key Technical Features**

- Real-time HealthKit data streaming with anchored queries
- Statistical baseline calculation with configurable time windows
- Composite stress scoring algorithm (HR: 40%, HRV: 40%, SpO2: 20%)
- WatchConnectivity for low-latency anomaly messaging
- SwiftUI Charts for interactive biometric visualization
- Persistent baseline storage with 30-day expiration

**Architecture**

Built with MVVM pattern: BiometricViewModel orchestrates HealthKit + ThresholdManager, publishes reactive state to SwiftUI views. Combine framework handles async data streams and state management.

**What I Learned**

HealthKit authorization and data access patterns are complex - simulator requires mock data streams. Statistical anomaly detection needs careful tuning to avoid false positives. Real-time biometric data is noisy; smoothing and debouncing are critical for usable UX.`
    },
    {
      id: 2,
      title: "Smart Lights Gesture Control",
      tagline: "Control lights with muscle signals",
      image: smartlightsImage,
      toggleVideo: hueToggleVideo,
      colorVideo: hueColorVideo,
      icon: Home,
      tech: ["Python", "Myo Armband", "XGBoost", "Philips Hue API"],
      description: `**The Idea**

Control my apartment lights with hand gestures. No switches, no voice commands - just flex my hand and the lights respond.

→ [GitHub Repository](https://github.com/sarajakub/emg_iot)

**See It In Action**

[TOGGLE_VIDEO]

*Toggling lights on/off with a fist gesture*

[COLOR_VIDEO]

*Changing light hue by holding fist gesture + moving arm left/right*

**Technical Implementation**

Built a Python application using the Myo EMG armband to read muscle signals and control Philips Hue lights. Implemented two control modes:

**Basic Toggle:** Train a fist gesture using XGBoost classifier to toggle lights/groups on and off

**Color Control:** Hold fist gesture + move arm left/right to smoothly adjust light color/hue using IMU (inertial measurement unit) data

The system uses pyomyo for EMG signal processing, XGBoost for gesture classification, and phue to interface with the Philips Hue Bridge API.

**Key Technical Features**

- Custom gesture training mode with visual EMG feedback
- Real-time EMG signal classification (preprocessed mode with 10-sample history)
- IMU motion detection with deadzone filtering to prevent jitter
- Rate limiting to protect the Hue Bridge from excessive API calls
- Support for both individual lights and light groups
- Modular design for expanding gesture mappings

**What I Learned**

EMG signal processing requires careful preprocessing and calibration. Combining EMG gestures with IMU motion data creates more expressive control schemes. Designing smooth, gradual changes (like hue adjustment) requires thoughtful rate limiting and motion thresholds to prevent jittery behavior.`
    },
    {
      id: 1,
      title: "alt.ctrl.LRN: Embodied Learning Controller",
      tagline: "Alternative input for astronomy education",
      image: altcontrollerImage,
      v0Image: altctrlV0Image,
      v0Gif: altctrlV0Gif,
      v1Image: altctrlV1Image,
      v2_0Image: altctrlV2_0Image,
      v2_1Image: altctrlV2_1Image,
      v2_2Image: altctrlV2_2Image,
      icon: Gamepad2,
      tech: ["Arduino Nano", "Rotary Encoder", "Web Serial API", "JavaScript"],
      description: `**The Challenge**

Students learn spatial concepts like lunar phases from 2D screens using a mouse - a mismatch between the physical, circular motion of orbits and the abstract, indirect input method. How might a tangible controller that mimics orbital rotation improve learning and engagement?

→ [Thesis Archive](https://www.ectexpo.info/thesis-archive/spring-2025/sara-jakubowicz)
→ [GitHub Repository](https://github.com/sarajakub/alt-learning-ctrl)

**The Solution**

[V2_2_IMAGE]

A custom rotary encoder controller where turning a physical knob directly rotates the moon/Earth in the simulation - creating a 1:1 mapping between physical and digital motion. Users physically feel the orbital relationship through the controller's form: a thermoplastic moon connected to an upcycled Earth stress ball via metal rod.

**Documentation Video**

<iframe width="100%" height="400" src="https://www.youtube.com/embed/IYY1LpCZgw8?si=-2eK0_l-sz8UXoLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**My Process: Iterating Based on User Feedback**

I built and tested three hardware versions, each informed by user testing and usability findings:

**Version 0: Gyroscope Sphere** ❌

[V0_GIF]

- **Concept:** Handheld moon-shaped controller you rotate in your hands
- **Built:** Vacuum-formed thermoplastic housing with Arduino Nano 33 BLE
- **User feedback:** Gyroscope calibration drift caused frustration; holding your arm up caused fatigue within 2 minutes
- **Learning:** Physical constraints matter - cool concept doesn't mean usable product

**Version 1: Joystick** ❌

[V1_IMAGE]

- **Concept:** Familiar joystick input mimicking mouse behavior via Teensy 4.1 HID
- **Built:** Mounted on phone stand for stability
- **User feedback:** Precision issues made fine control difficult; sustained finger pressure tired users; felt no different from using a mouse
- **Learning:** Direct mapping matters - joystick didn't embody the circular motion we were trying to teach

**Version 2: Rotary Encoder** ✅

[V2_0_IMAGE]

[V2_1_IMAGE]

- **Concept:** Turn a physical knob to rotate the moon/Earth - 1:1 mapping of physical to digital motion
- **Built:** Custom perfboard circuit, laser-cut enclosure, thermoplastic moon connected to upcycled Earth stress ball via metal rod
- **User feedback:** "This makes the relationship click!" Users experimented freely, physically feeling the orbital motion
- **Learning:** Affordance = understanding. When the controller's form matches the concept, learning happens naturally

**What Users Told Me**

Tested with 6 students and 2 educators during formative evaluation:

- **Engagement**: Users spent 3x longer exploring with the rotary controller vs. mouse, actively testing hypotheses ("What if I spin it backwards?")
- **Accessibility**: One educator noted it would be "ideal for neurodiverse learners who benefit from tactile engagement"
- **Limitation discovered**: Users felt frustrated when some simulation features (time-jump buttons) weren't accessible via controller - they wanted complete control or none at all

**Technical Implementation**

Arduino-powered rotary encoder sends serial commands via Web Serial API to PBS Kids moon phase simulation (modified JavaScript backend). Two-button system: short press for pause/play, long press toggles between Moon and Earth control modes. Custom perfboard soldering for clean circuit layout with laser-cut enclosure for durability.

**Design Principles That Guided Me**

- **Embodied cognition**: Physical rotation encodes orbital dynamics through muscle memory
- **Universal Design for Learning**: One-handed operation, tactile feedback, reduced fine motor demands
- **Affordance mapping**: The controller's circular form suggests rotation - users knew what to do without instructions

**Key Learning**

The biggest insight: **Failed prototypes are where the learning happens.** Each "failure" taught me something critical about the gap between conceptual elegance and usable design. The gyroscope seemed brilliant on paper but ignored human factors like arm fatigue. The joystick worked technically but missed the pedagogical point. Only by building, testing, listening, and iterating did I land on a design that actually improved learning.

Also learned: **Partial control is worse than no control.** Users wanted the controller to do everything or clearly define its scope - mixing controller + mouse inputs created cognitive friction.

**Full Thesis Presentation**

<iframe width="100%" height="450" src="https://embed.figma.com/slides/nfAzIjZAwAXM1kVmZxed75/Thesis--alt.ctrl.LRN?node-id=1-350&embed-host=share" allowfullscreen></iframe>`
    }
  ];

  const AnimatedLine = React.memo(({ isHovering, color }) => {
    const pathRef = useRef(null);
    const [length, setLength] = useState(0);
    
    useEffect(() => {
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        setLength(pathLength);
      }
    }, []);

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <path
          ref={pathRef}
          d="M 20 50 Q 150 20, 280 50 T 540 50"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={length}
          strokeDashoffset={isHovering ? 0 : length}
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'drop-shadow(0 0 12px currentColor)'
          }}
        />
      </svg>
    );
  }, (prev, next) => prev.isHovering === next.isHovering && prev.color === next.color);



  const AnimatedChart = React.memo(({ isHovering }) => {
    const pathRef = useRef(null);
    const [length, setLength] = useState(0);
    
    useEffect(() => {
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        setLength(pathLength);
      }
    }, []);

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" style={{ zIndex: 1 }}>
        {/* Grid lines */}
        <line x1="60" y1="80" x2="540" y2="80" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" />
        <line x1="60" y1="140" x2="540" y2="140" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" />
        <line x1="60" y1="200" x2="540" y2="200" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" />
        
        {/* Animated trend line */}
        <path
          ref={pathRef}
          d="M 60 200 L 150 180 L 240 140 L 330 120 L 420 90 L 510 70"
          fill="none"
          stroke="rgb(96, 165, 250)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={length}
          strokeDashoffset={isHovering ? 0 : length}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'drop-shadow(0 0 10px rgb(96, 165, 250))'
          }}
        />
        
        {/* Constant dots - always visible */}
        <circle cx="60" cy="200" r="5" fill="rgb(96, 165, 250)" />
        <circle cx="150" cy="180" r="5" fill="rgb(96, 165, 250)" />
        <circle cx="240" cy="140" r="5" fill="rgb(96, 165, 250)" />
        <circle cx="330" cy="120" r="5" fill="rgb(96, 165, 250)" />
        <circle cx="420" cy="90" r="5" fill="rgb(96, 165, 250)" />
        <circle cx="510" cy="70" r="5" fill="rgb(96, 165, 250)" />
      </svg>
    );
  }, (prev, next) => prev.isHovering === next.isHovering);



  const AnimatedBorderLines = () => {
    return (
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.3 }}>
        <path
          d="M 0 100 Q 200 50, 400 100 T 800 100"
          fill="none"
          stroke="rgb(192, 132, 252)"
          strokeWidth="2"
          className="animate-pulse"
        />
        <path
          d="M 0 300 Q 300 250, 600 300 T 1200 300"
          fill="none"
          stroke="rgb(147, 197, 253)"
          strokeWidth="2"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <path
          d="M 800 500 Q 1000 450, 1200 500 T 1600 500"
          fill="none"
          stroke="rgb(192, 132, 252)"
          strokeWidth="2"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>
    );
  };

  const AnimatedBlobs = () => {
    const [reduced, setReduced] = useState(false);
    const b1 = useRef(null);
    const b2 = useRef(null);
    const b3 = useRef(null);

    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = () => setReduced(mq.matches);
      handler();
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else mq.addListener(handler);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener('change', handler);
        else mq.removeListener(handler);
      };
    }, []);

    useEffect(() => {
      if (reduced) return;

      let raf = null;
      let t0 = performance.now();

      const loop = (t) => {
        const s = (t - t0) / 1000;
        if (b1.current) {
          const x = Math.sin(s * 0.2) * 40; const y = Math.cos(s * 0.18) * 30; const scale = 1 + Math.sin(s * 0.15) * 0.03;
          b1.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
        if (b2.current) {
          const x = Math.cos(s * 0.15) * 30; const y = Math.sin(s * 0.22) * 45; const scale = 1 + Math.cos(s * 0.12) * 0.04;
          b2.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
        if (b3.current) {
          const x = Math.sin(s * 0.11) * 25; const y = Math.cos(s * 0.14) * 28; const scale = 1 + Math.sin(s * 0.18) * 0.035;
          b3.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [reduced]);

    return (
      <div className="animated-blobs">
        <div ref={b1} className="blob blob-1" />
        <div ref={b2} className="blob blob-2" />
        <div ref={b3} className="blob blob-3" />
      </div>
    );
  };

  const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e) => {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
      <div
        className="fixed w-12 h-12 bg-white rounded-full pointer-events-none z-50 mix-blend-difference custom-cursor"
        style={{ 
          left: 0,
          top: 0,
          transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
          willChange: 'transform'
        }}
      />
    );
  };

  const HomePage = () => (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative overflow-hidden">
      
      {/* Animated Background Lines */}
      {/* Animated soft blob background (replaces heavy lines) */}
      <AnimatedBlobs />

      {/* Top Border */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="text-center mb-20">
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center">
            <div className="w-44 h-44 rounded-full border-4 border-purple-400/50 overflow-hidden shadow-2xl hover:scale-110 transition-transform duration-300">
              <img
                src={profileImage}
                alt="Sara Jakubowicz"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="inline-block mb-6 px-6 py-2.5 bg-purple-500/20 backdrop-blur-sm text-purple-300 rounded-full text-base font-medium border-2 border-purple-400/30">
            Designer • Researcher • Maker
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Sara Jakubowicz
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-purple-200 max-w-3xl mx-auto font-light px-4">
            I design delightful experiences & uncover insights that make products sing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <button
            onClick={() => navigateToPage('design')}
            onMouseEnter={() => handleDesignHover(true)}
            onMouseLeave={() => handleDesignHover(false)}
            className="group relative bg-slate-900/40 backdrop-blur-md p-8 md:p-14 rounded-3xl md:rounded-[2.5rem] border-2 border-purple-500/30 hover:border-purple-400/60 hover:bg-slate-900/60 transition-all duration-500 text-left overflow-hidden h-80 md:h-96 shadow-2xl hover:shadow-purple-500/30 md:hover:scale-105 transform"
            style={{ overflow: 'hidden' }}
          >
            <AnimatedLine isHovering={designHover} color="rgb(192, 132, 252)" />
            
            <div className="relative z-10">
              <div className="mb-6 text-purple-300">
                <Sparkles size={56} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Design</h2>
              <p className="text-purple-200 text-base md:text-lg mb-6 md:mb-8 font-light">
                Product design that moves the needle
              </p>
              
              <div className="flex items-center gap-3 text-purple-300 font-bold group-hover:gap-6 transition-all text-lg">
                See My Designs
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <button
            onClick={() => navigateToPage('research')}
            onMouseEnter={() => handleResearchHover(true)}
            onMouseLeave={() => handleResearchHover(false)}
            className="group relative bg-slate-900/40 backdrop-blur-md p-8 md:p-14 rounded-3xl md:rounded-[2.5rem] border-2 border-blue-500/30 hover:border-blue-400/60 hover:bg-slate-900/60 transition-all duration-500 text-left overflow-hidden h-80 md:h-96 shadow-2xl hover:shadow-blue-500/30 md:hover:scale-105 transform"
            style={{ overflow: 'hidden' }}
          >
            <AnimatedChart isHovering={researchHover} />
            
            <div className="relative z-10">
              <div className="mb-6 text-blue-300">
                <Brain size={56} strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Research</h2>
              <p className="text-blue-200 text-base md:text-lg mb-6 md:mb-8 font-light">
                Understanding humans, one study at a time
              </p>
              
              <div className="flex items-center gap-3 text-blue-300 font-bold group-hover:gap-6 transition-all text-lg">
                See My Research
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>

        <div className="text-center mb-12">
          <button
            onClick={() => navigateToPage('maker')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 rounded-full border-2 border-emerald-500/30 hover:border-emerald-400/60 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all group font-bold text-lg shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform"
          >
            <Code size={22} />
            <span>Side Projects & Fun Stuff</span>
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center px-4">
          <a href="mailto:sarajakub0@gmail.com" className="group flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <Mail size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Say hi!</span>
          </a>
          <a href="https://linkedin.com/in/sara-jakubowicz" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a href="https://github.com/sarajakub" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <Github size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">GitHub</span>
          </a>
          <a href="https://scholar.google.com/citations?user=ckN30ogAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <GraduationCap size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Google Scholar</span>
          </a>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
    </div>
  );

  const DesignPage = () => {
    const selectedProject = designProjects.find(p => p.id === selectedProjectId);

    if (selectedProject) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative">
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />
          <AnimatedBorderLines />

          <div className="bg-slate-900/50 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <button onClick={() => {
                window.history.pushState({}, '', '/design');
                setSelectedProjectId(null);
              }} className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors font-bold group">
                <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </button>
              <button onClick={() => navigateToPage('home')} className="text-purple-300 hover:text-purple-200 transition-colors font-bold">
                Home
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <selectedProject.icon size={48} className="text-purple-400" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-purple-400 font-bold mb-1">{selectedProject.company}</div>
                  <h1 className="text-5xl font-black text-white">{selectedProject.title}</h1>
                </div>
              </div>
              <p className="text-lg md:text-2xl text-purple-200 font-light mb-8">{selectedProject.tagline}</p>
            </div>

            {selectedProject.id === 1 && (
              <div className="mb-12">
                <div className="relative w-full" style={{ padding: '56.25% 0 0 0' }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1014379680?badge=0&autopause=0&player_id=0&app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    className="rounded-3xl border-2 border-purple-500/30"
                    title="Cosmos VR Game Demo"
                  />
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
              </div>
            )}

            {selectedProject.id === 2 && (
              <div className="mb-12">
                <div className="relative w-full" style={{ padding: '56.25% 0 0 0' }}>
                  <iframe 
                    src="https://embed.figma.com/proto/nHuqd69kbVvCtt3d5PwDTV/SaraJakubowicz_skilltree?page-id=0%3A1&node-id=1-2&p=f&viewport=-752%2C20%2C0.5&scaling=scale-down&content-scaling=fixed&starting-point-node-id=97%3A527&embed-host=share" 
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    className="rounded-3xl border-2 border-purple-500/30"
                    title="AI Lesson Builder Prototype"
                  />
                </div>
              </div>
            )}

            {selectedProject.id === 3 && (
              <div className="mb-12">
                <div className="relative w-full" style={{ padding: '56.25% 0 0 0' }}>
                  <iframe 
                    src="https://embed.figma.com/proto/dUTMJG7mBeAO0riVJJ05oD/FoodFighter?node-id=14-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=14%3A2&embed-host=share" 
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    className="rounded-3xl border-2 border-purple-500/30"
                    title="FoodFighter Game Prototype"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 p-6 md:p-8 bg-slate-900/50 backdrop-blur-sm rounded-3xl border-2 border-purple-500/30">
              {selectedProject.details.map((detail, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">{detail.value}</div>
                  <div className="text-purple-300 font-medium">{detail.label}</div>
                </div>
              ))}
            </div>

            {selectedProject.link && (
              <div className="flex justify-center mb-8">
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  <span>Read Publication</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-12">
              {selectedProject.tags.map((tag, idx) => (
                <span key={idx} className="px-5 py-2 bg-purple-500/20 text-purple-200 rounded-full border-2 border-purple-400/30 font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <div className="text-purple-100 text-lg leading-relaxed whitespace-pre-line">
                {selectedProject.description.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-3">{line.replace(/\*\*/g, '')}</h3>;
                  }
                  if (line.trim() === '') {
                    return <div key={idx} className="h-2" />;
                  }
                  // Handle special image placeholders
                  if (line === '[AR_IMAGE]' && selectedProject.arImage) {
                    return <img key={idx} src={selectedProject.arImage} alt="AR ingredient collection and avatar customization" className="w-full rounded-2xl my-6 border-2 border-purple-500/30" />;
                  }
                  if (line === '[ARCH_IMAGE]' && selectedProject.archImage) {
                    return <img key={idx} src={selectedProject.archImage} alt="Food-Fighter technical architecture" className="w-full rounded-2xl my-6 border-2 border-purple-500/30" />;
                  }
                  if (line === '[PERSONAS_IMAGE]' && selectedProject.personasImage) {
                    return <img key={idx} src={selectedProject.personasImage} alt="Food-Fighter user personas" className="w-full rounded-2xl my-6 border-2 border-purple-500/30" />;
                  }
                  // Handle video placeholders
                  if (line === '[TOGGLE_VIDEO]' && selectedProject.toggleVideo) {
                    return <video key={idx} src={selectedProject.toggleVideo} controls className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[COLOR_VIDEO]' && selectedProject.colorVideo) {
                    return <video key={idx} src={selectedProject.colorVideo} controls className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  // Handle altctrl version image placeholders
                  if (line === '[V0_GIF]' && selectedProject.v0Gif) {
                    return <img key={idx} src={selectedProject.v0Gif} alt="Version 0 gyroscope in action" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V1_IMAGE]' && selectedProject.v1Image) {
                    return <img key={idx} src={selectedProject.v1Image} alt="Version 1 joystick controller" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V2_0_IMAGE]' && selectedProject.v2_0Image) {
                    return <img key={idx} src={selectedProject.v2_0Image} alt="Version 2.0 rotary encoder controller" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V2_1_IMAGE]' && selectedProject.v2_1Image) {
                    return <img key={idx} src={selectedProject.v2_1Image} alt="Version 2.1 controller detail" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V2_2_IMAGE]' && selectedProject.v2_2Image) {
                    return <img key={idx} src={selectedProject.v2_2Image} alt="Version 2.2 controller final design" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  // Handle iframe embeds
                  if (line.startsWith('<iframe')) {
                    // Use emerald border for maker projects, purple for design/research
                    const borderColor = currentPage === 'maker' ? 'border-emerald-500/30' : 'border-purple-500/30';
                    return <div key={idx} className={`my-8 w-full aspect-video rounded-2xl border-2 ${borderColor} p-0`} dangerouslySetInnerHTML={{ __html: line }} />;
                  }
                  // Handle img tags
                  if (line.startsWith('<img')) {
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />;
                  }
                  // Parse markdown links [text](url) and inline bold **text**
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const boldRegex = /\*\*([^*]+)\*\*/g;
                  if (linkRegex.test(line) || boldRegex.test(line)) {
                    const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
                    return (
                      <p key={idx} className="mb-3">
                        {parts.map((part, i) => {
                          const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                          if (linkMatch) {
                            return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline">{linkMatch[1]}</a>;
                          }
                          const boldMatch = part.match(/\*\*([^*]+)\*\*/);
                          if (boldMatch) {
                            return <strong key={i} className="font-bold text-white">{boldMatch[1]}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                  return <p key={idx} className="mb-3">{line}</p>;
                })}
              </div>
            </div>

            <div className="mb-12">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 md:h-[600px] object-cover object-center rounded-3xl border-2 border-purple-500/30" />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative pt-16">
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />
        <AnimatedBorderLines />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">Design Work</h1>
            <p className="text-lg md:text-2xl text-purple-200 font-light">Where research meets pixels</p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            {designProjects.map((project) => {
              const Icon = project.icon;
              return (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(project.id, 'design')}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 transform shadow-2xl hover:shadow-purple-500/40"
                >
                  <img src={project.thumbnail} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ]
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-purple-900/90 group-hover:via-purple-900/70 transition-all duration-500" />
                  
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <Icon size={36} className="text-purple-300 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                      <div className="px-3 py-1 bg-purple-500/30 backdrop-blur-sm text-purple-200 text-xs font-bold rounded-full border border-purple-400/40">
                        {project.company}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{project.title}</h3>
                      <p className="text-purple-200 text-sm mb-4 font-medium">{project.tagline}</p>
                      
                      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                        {project.details.map((detail, idx) => (
                          <div key={idx} className="text-center bg-black/30 backdrop-blur-sm rounded-xl p-2 border border-purple-400/20">
                            <div className="text-lg md:text-xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{detail.value}</div>
                            <div className="text-xs text-purple-300">{detail.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-purple-300 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={16} fill="currentColor" />
                        View Full Case Study
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
      </div>
    );
  };

  const ResearchPage = () => {
    const selectedProject = researchProjects.find(p => p.id === selectedProjectId);

    if (selectedProject) {
      const Icon = selectedProject.icon;
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 relative">
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />
          <AnimatedBorderLines />

          <div className="bg-slate-900/50 backdrop-blur-lg border-b border-blue-500/20 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <button onClick={() => {
                window.history.pushState({}, '', '/research');
                setSelectedProjectId(null);
              }} className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-bold group">
                <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                Back to Research
              </button>
              <button onClick={() => navigateToPage('home')} className="text-blue-300 hover:text-blue-200 transition-colors font-bold">
                Home
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <Icon size={48} className="text-blue-400" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-blue-400 font-bold mb-1">{selectedProject.type}</div>
                  <h1 className="text-5xl font-black text-white">{selectedProject.title}</h1>
                </div>
              </div>
              <p className="text-2xl text-blue-200 font-light mb-8">{selectedProject.tagline}</p>
            </div>

            <div className="mb-12 p-8 bg-slate-900/50 backdrop-blur-sm rounded-3xl border-2 border-blue-500/30">
              <div className="text-sm text-blue-300 mb-2">{selectedProject.stat}</div>
              <div className="text-3xl font-black text-white">{selectedProject.finding}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 p-6 md:p-8 bg-slate-900/50 backdrop-blur-sm rounded-3xl border-2 border-blue-500/30">
              {selectedProject.details.map((detail, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-2">{detail.value}</div>
                  <div className="text-blue-300 font-medium">{detail.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {selectedProject.tags.map((tag, idx) => (
                <span key={idx} className="px-5 py-2 bg-blue-500/20 text-blue-200 rounded-full border-2 border-blue-400/30 font-bold">
                  {tag}
                </span>
              ))}
            </div>

            {selectedProject.link && (
              <div className="flex justify-center mb-8">
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  <span>Read Publication</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <div className="text-blue-100 text-lg leading-relaxed whitespace-pre-line">
                {selectedProject.description.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-3">{line.replace(/\*\*/g, '')}</h3>;
                  }
                  if (line.trim() === '') {
                    return <div key={idx} className="h-2" />;
                  }
                  // Handle iframe embeds
                  if (line.startsWith('<iframe')) {
                    return <div key={idx} className="my-8 w-full aspect-video rounded-2xl overflow-hidden border-2 border-blue-500/30" dangerouslySetInnerHTML={{ __html: line }} />;
                  }
                  // Handle img tags
                  if (line.startsWith('<img')) {
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />;
                  }
                  // Parse markdown links [text](url) and inline bold **text**
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const boldRegex = /\*\*([^*]+)\*\*/g;
                  if (linkRegex.test(line) || boldRegex.test(line)) {
                    const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
                    return (
                      <p key={idx} className="mb-3">
                        {parts.map((part, i) => {
                          const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                          if (linkMatch) {
                            return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">{linkMatch[1]}</a>;
                          }
                          const boldMatch = part.match(/\*\*([^*]+)\*\*/);
                          if (boldMatch) {
                            return <strong key={i} className="font-bold text-white">{boldMatch[1]}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                  return <p key={idx} className="mb-3">{line}</p>;
                })}
              </div>
            </div>

            <div className="mb-12">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-[600px] object-cover object-center rounded-3xl border-2 border-blue-500/30" />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 relative pt-16">
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />
        <AnimatedBorderLines />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">Research</h1>
            <p className="text-lg md:text-2xl text-blue-200 font-light">Curiosity-driven insights</p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            {researchProjects.map((project) => {
              const Icon = project.icon;
              return (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(project.id, 'research')}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 cursor-pointer hover:scale-105 transform shadow-2xl hover:shadow-blue-500/40"
                >
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 contrast-110" />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <Icon size={36} className="text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                      <div className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/40">
                        {project.type}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">{project.title}</h3>
                      <p className="text-blue-100 text-sm mb-4 font-medium">{project.tagline}</p>
                      
                      <div className="mb-4 bg-black/30 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                        <div className="text-sm text-white/80 mb-1">{project.stat}</div>
                        <div className="text-lg md:text-xl font-black text-white">{project.finding}</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full font-medium border border-white/30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
      </div>
    );
  };

  const MakerPage = () => {
    const selectedProject = makerProjects.find(p => p.id === selectedProjectId);

    if (selectedProject) {
      const Icon = selectedProject.icon;
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-900 relative">
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />
          <AnimatedBorderLines />

          <div className="bg-slate-900/50 backdrop-blur-lg border-b border-emerald-500/20 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <button onClick={() => {
                window.history.pushState({}, '', '/maker');
                setSelectedProjectId(null);
              }} className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors font-bold group">
                <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </button>
              <button onClick={() => navigateToPage('home')} className="text-emerald-300 hover:text-emerald-200 transition-colors font-bold">
                Home
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <Icon size={48} className="text-emerald-400" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-emerald-400 font-bold mb-1">Maker Project</div>
                  <h1 className="text-5xl font-black text-white">{selectedProject.title}</h1>
                </div>
              </div>
              <p className="text-2xl text-emerald-200 font-light mb-8">{selectedProject.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {selectedProject.tech.map((tech, idx) => (
                <span key={idx} className="px-5 py-2 bg-emerald-500/20 text-emerald-200 rounded-full border-2 border-emerald-400/30 font-bold">
                  {tech}
                </span>
              ))}
            </div>

            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <div className="text-emerald-100 text-lg leading-relaxed whitespace-pre-line">
                {selectedProject.description.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-3">{line.replace(/\*\*/g, '')}</h3>;
                  }
                  if (line.trim() === '') {
                    return <div key={idx} className="h-2" />;
                  }
                  // Handle video placeholders
                  if (line === '[TOGGLE_VIDEO]' && selectedProject.toggleVideo) {
                    return <video key={idx} src={selectedProject.toggleVideo} controls className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[COLOR_VIDEO]' && selectedProject.colorVideo) {
                    return <video key={idx} src={selectedProject.colorVideo} controls className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  // Handle altctrl version image placeholders
                  if (line === '[V0_GIF]' && selectedProject.v0Gif) {
                    return <img key={idx} src={selectedProject.v0Gif} alt="Version 0 gyroscope in action" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V1_IMAGE]' && selectedProject.v1Image) {
                    return <img key={idx} src={selectedProject.v1Image} alt="Version 1 joystick controller" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V2_0_IMAGE]' && selectedProject.v2_0Image) {
                    return <img key={idx} src={selectedProject.v2_0Image} alt="Version 2.0 rotary encoder controller" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V2_1_IMAGE]' && selectedProject.v2_1Image) {
                    return <img key={idx} src={selectedProject.v2_1Image} alt="Version 2.1 controller detail" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[V2_2_IMAGE]' && selectedProject.v2_2Image) {
                    return <img key={idx} src={selectedProject.v2_2Image} alt="Version 2.2 controller final design" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  // Handle StressCam image placeholders
                  if (line === '[WATCH_IMAGE]' && selectedProject.watchImage) {
                    return <img key={idx} src={selectedProject.watchImage} alt="StressCam Apple Watch interface" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  if (line === '[IPHONE_IMAGE]' && selectedProject.iphoneImage) {
                    return <img key={idx} src={selectedProject.iphoneImage} alt="StressCam iPhone app" className="w-full rounded-2xl my-6 border-2 border-emerald-500/30" />;
                  }
                  // Handle iframe embeds
                  if (line.startsWith('<iframe')) {
                    return <div key={idx} className="my-8 w-full aspect-video rounded-2xl overflow-hidden border-2 border-emerald-500/30" dangerouslySetInnerHTML={{ __html: line }} />;
                  }
                  // Handle img tags
                  if (line.startsWith('<img')) {
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: line }} />;
                  }
                  // Parse markdown links [text](url) and inline bold **text**
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const boldRegex = /\*\*([^*]+)\*\*/g;
                  if (linkRegex.test(line) || boldRegex.test(line)) {
                    const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
                    return (
                      <p key={idx} className="mb-3">
                        {parts.map((part, i) => {
                          const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                          if (linkMatch) {
                            return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline">{linkMatch[1]}</a>;
                          }
                          const boldMatch = part.match(/\*\*([^*]+)\*\*/);
                          if (boldMatch) {
                            return <strong key={i} className="font-bold text-white">{boldMatch[1]}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                  return <p key={idx} className="mb-3">{line}</p>;
                })}
              </div>
            </div>

            <div className="mb-12">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-[600px] object-cover object-center rounded-3xl border-2 border-emerald-500/30" />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-900 relative pt-16">
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-40" />
        <AnimatedBorderLines />

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">Maker Projects</h1>
            <p className="text-lg md:text-2xl text-emerald-200 font-light">Built for fun, learned a ton</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {makerProjects.map((project) => {
              const Icon = project.icon;
              return (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(project.id, 'maker')}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-500 cursor-pointer hover:scale-105 transform shadow-2xl hover:shadow-emerald-500/40"
                >
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-emerald-900/90 group-hover:via-emerald-900/70 transition-all duration-500" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <Icon size={32} className="text-emerald-300 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2">{project.title}</h3>
                      <p className="text-emerald-200 text-sm mb-4 font-medium">{project.tagline}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-xs rounded-full border border-emerald-400/30 font-bold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40" />
      </div>
    );
  };

  const noteColors = [
    'bg-yellow-200',
    'bg-pink-200', 
    'bg-blue-200',
    'bg-green-200',
    'bg-purple-200',
    'bg-orange-200'
  ];

  const GuestbookPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Guestbook
            </h1>
            <p className="text-lg md:text-2xl text-purple-200">
              Leave a note on the wall! ✨
            </p>
          </div>

          {/* Submit Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={submitNote} className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-yellow-500/30">
              <div className="mb-6">
                <label htmlFor="guestbook-name" className="block text-yellow-200 font-bold mb-2">Your Name</label>
                <input
                  ref={nameInputRef}
                  id="guestbook-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-yellow-500/30 rounded-xl text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none"
                  placeholder="Sara was here"
                  maxLength={50}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="guestbook-message" className="block text-yellow-200 font-bold mb-2">Message</label>
                <textarea
                  ref={messageInputRef}
                  id="guestbook-message"
                  name="message"
                  autoComplete="off"
                  className="w-full px-4 py-3 bg-slate-900/50 border-2 border-yellow-500/30 rounded-xl text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none resize-none"
                  placeholder="Leave your mark..."
                  rows={4}
                  maxLength={200}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Posting...' : 'Post Note'}</span>
              </button>
            </form>
          </div>

          {/* Notes Wall */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guestbookNotes.map((note, index) => (
              <div
                key={note.id}
                className={`${noteColors[index % noteColors.length]} p-6 rounded-lg shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 relative`}
                style={{
                  transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3)}deg)`
                }}
              >
                <StickyNote className="absolute top-2 right-2 w-6 h-6 text-slate-700/20" />
                <div className="font-handwriting text-slate-900">
                  <p className="text-lg mb-3 break-words">{note.message}</p>
                  <p className="text-sm font-bold">- {note.name}</p>
                  <p className="text-xs text-slate-600 mt-2">
                    {new Date(note.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {guestbookNotes.length === 0 && (
            <div className="text-center text-purple-300 text-xl mt-12">
              Be the first to leave a note! 📝
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 z-40" />
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Fixed Header with Hamburger Menu */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigateToPage('home')}
            className="text-2xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-purple-200 hover:to-pink-200 transition-all"
          >
            SJ
          </button>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-purple-300 hover:text-purple-200 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-purple-500/30 shadow-2xl">
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
              <button
                onClick={() => navigateToPage('home')}
                className="text-left px-4 py-3 text-lg font-bold text-purple-200 hover:text-white hover:bg-purple-500/20 rounded-xl transition-all"
              >
                Home
              </button>
              <button
                onClick={() => navigateToPage('research')}
                className="text-left px-4 py-3 text-lg font-bold text-purple-200 hover:text-white hover:bg-purple-500/20 rounded-xl transition-all"
              >
                UX Research
              </button>
              <button
                onClick={() => navigateToPage('design')}
                className="text-left px-4 py-3 text-lg font-bold text-pink-200 hover:text-white hover:bg-pink-500/20 rounded-xl transition-all"
              >
                Design
              </button>
              <button
                onClick={() => navigateToPage('maker')}
                className="text-left px-4 py-3 text-lg font-bold text-emerald-200 hover:text-white hover:bg-emerald-500/20 rounded-xl transition-all"
              >
                Maker
              </button>
              <button
                onClick={() => navigateToPage('guestbook')}
                className="text-left px-4 py-3 text-lg font-bold text-yellow-200 hover:text-white hover:bg-yellow-500/20 rounded-xl transition-all"
              >
                Guestbook
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Sticky Contact Button */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3">
        <a
          href="mailto:sarajakub0@gmail.com"
          className="group p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300"
          aria-label="Email"
        >
          <Mail size={24} className="text-white" />
        </a>
        <a
          href="https://linkedin.com/in/sara-jakubowicz"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} className="text-white" />
        </a>
        <a
          href="https://github.com/sarajakub"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full shadow-2xl hover:shadow-slate-500/50 hover:scale-110 transition-all duration-300"
          aria-label="GitHub"
        >
          <Github size={24} className="text-white" />
        </a>
      </div>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'design' && <DesignPage />}
      {currentPage === 'research' && <ResearchPage />}
      {currentPage === 'maker' && <MakerPage />}
      {currentPage === 'guestbook' && <GuestbookPage />}
      <Cursor />
    </div>
  );
}