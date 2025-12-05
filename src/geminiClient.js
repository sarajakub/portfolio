import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Gemini client
// You'll need to add your API key as an environment variable
// Create a .env.local file with: REACT_APP_GEMINI_API_KEY=your-key-here
// Get your free API key from: https://aistudio.google.com/app/apikey

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export default genAI;
