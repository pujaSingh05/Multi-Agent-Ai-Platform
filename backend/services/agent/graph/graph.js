import { StateGraph } from "@langchain/langgraph";
import { agentState } from './state.js';
import { router } from './router.js';
import { chatAgent } from '../agents/chatAgent.js';
import { searchAgent } from '../agents/searchAgent.js';
import { codingAgent } from '../agents/codingAgent.js';
import { imageAnalyzer } from '../agents/imageGenAgent.js';
import { pdfAgent } from '../agents/pdfAgent.js';
import { pptAgent } from '../agents/pptAgent.js';

const workflow = new StateGraph(agentState);


workflow.addNode("router", router);
workflow.addNode("chatAgent", chatAgent);
workflow.addNode("searchAgent", searchAgent);
workflow.addNode("codingAgent", codingAgent);
workflow.addNode("imageGenAgent", imageAnalyzer);
workflow.addNode("pdfAgent", pdfAgent);
workflow.addNode("pptAgent", pptAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges("router", (state) => {
    switch (state.agent) {
        case "chatAgent":
            return "chatAgent";
        case "searchAgent":
            return "searchAgent";
        case "codingAgent":
            return "codingAgent";
        case "imageGenAgent":
            return "imageGenAgent";
        case "pdfAgent":
            return "pdfAgent";
        case "pptAgent":
            return "pptAgent";
        default:
            return "chatAgent"; // Default to chatAgent if no match
    }
}, {
    chatAgent: "chatAgent",
    searchAgent: "searchAgent",
    codingAgent: "codingAgent",
    imageGenAgent: "imageGenAgent",
    pdfAgent: "pdfAgent",
    pptAgent: "pptAgent"
});

workflow.addEdge("searchAgent", "chatAgent");
workflow.addEdge("chatAgent", "__end__");
workflow.addEdge("codingAgent", "__end__");
workflow.addEdge("imageGenAgent", "__end__");
workflow.addEdge("pdfAgent", "__end__");
workflow.addEdge("pptAgent", "__end__");


export const graph = workflow.compile();


