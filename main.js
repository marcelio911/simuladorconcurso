/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config('.env');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

run();