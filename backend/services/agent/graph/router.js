import { getModel } from '../llm/index.js';

export const router = async (state) => {
    const llm = await getModel("router")
    const prompt = `You are a agent router.

    User Query:
    ${state.prompt}

    const response = await llm.invoke(prompt)
    `

    return {
        ...state,
        agent: response.content.trim().toLowerCase(),
    }
}