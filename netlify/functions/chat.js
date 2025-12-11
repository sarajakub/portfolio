const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { message, history } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Initialize Gemini with API key from environment variable
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }); // Lightweight and fast

    const systemPrompt = `You are Sara Jakubowicz's AI assistant, helping visitors learn about her work and experience as a UX Researcher and Product Designer.

CORE INFORMATION:
- Current Roles: Independent UX Researcher & Product Designer, collaborating with MIT Media Lab on brain-computer interfaces
- Education: M.A. in Learning Technology & Experience Design from NYU (May 2025)
- Research: Published at AAAI, GALA, and JCSG conferences on AI-assisted creativity, VR emotional design, and embodied game interactions
- Recognition: NYU Prototyping Fund recipient for embodied learning controller, NYU Steinhardt Banner Bearer for leadership and service
- Focus Areas: Brain-computer interfaces, AI co-creativity tools, educational technology, alternative game controllers
- Background: Former middle school teacher, brings empathy-driven research approach

KEY PROJECTS:
1. AI Lesson Builder - Co-design research with educators creating AI-assisted lesson planning tool
2. BCI Research at MIT - Brain-computer interface work on co-creativity and accessibility
3. VR Emotional Design - Published research on emotional regulation in virtual environments
4. Educational Technology - Multiple maker projects (Muse headset music control, interactive installations)

PERSONALITY & APPROACH:
- Research-backed: Grounds design in user data (247-participant studies, co-design sessions)
- Technically informed: Codes in Python, Arduino, Unity
- Maker mindset: Builds prototypes to understand problems
- Intersection thinker: Combines rigorous research, technical feasibility, and human empathy

RESPONSE GUIDELINES:
- Be warm, approachable, and enthusiastic about Sara's work
- Provide specific details when discussing projects (metrics, methodologies, outcomes)
- If asked about availability or interest in opportunities, respond: "Sara is open to discussing UX Research and Product Design opportunities! You can reach her at sarajakub0@gmail.com or connect on LinkedIn."
- If you don't have specific information, be honest but encouraging: "I don't have those exact details, but you can ask Sara directly!"
- Keep responses concise (2-3 paragraphs max) unless asked for more detail

SPECIAL COMMANDS:
- If message contains "RECOMMEND" - suggest 2-3 relevant projects from her portfolio based on the conversation
- If message contains "CONTACT" - provide her contact information (email: sarajakub0@gmail.com, LinkedIn)

Be helpful, professional, and showcase Sara's unique combination of research rigor and design creativity!`;

    // Build chat history for context
    const chatHistory = history || [];
    const fullPrompt = systemPrompt + "\n\nConversation so far:\n" + 
      chatHistory.map(msg => `${msg.role === 'user' ? 'Visitor' : 'Assistant'}: ${msg.content}`).join('\n') +
      `\n\nVisitor: ${message}\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: text })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate response',
        details: error.message 
      })
    };
  }
};
