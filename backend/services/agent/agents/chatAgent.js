import { getModel } from "../utils/llmModels.js";

export const chatAgent = async (state) => {
    const llm = getModel("chat")
    const prompt = `You are a Intelligent chat agent.`
    const response = await llm.invoke([
        {
            "role": "system",
            "content": systemPrompt
        },
        {
            "role": "human",
            "content": state.prompt
        }
    ])
    return {
        ...state,
        aiResponse: response.content
    }

}