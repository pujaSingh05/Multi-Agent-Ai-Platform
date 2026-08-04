import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    temperature: 0,
    maxRetries: 2,
})



export const getModel = (agent) => {
    switch (agent) {
        case "chatAgent":
            return groq;
        case "searchAgent":
            return groq;
        case "codingAgent":
            return gemini;
        case "imageGenAgent":
            return groq;
        default:
            return groq;
    }
}