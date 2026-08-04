import { Annotation } from "@langchain/langgraph"

export const agentState = Annotation.Root({
    //Annotation is Helper that instantiates channels within a StateGraph state.
    //Can be used as a field in an Annotation.Root wrapper in one of two ways:
    //Directly: Creates a channel that stores the most recent value returned from a node.
    // With a reducer: Creates a channel that applies the reducer on a node's return value.
    prompt: Annotation(),
    aiResponse: Annotation(),
    agent: Annotation(),
    conversationId: Annotation(),
})
