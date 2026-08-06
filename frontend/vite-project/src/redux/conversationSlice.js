import { createSlice } from '@reduxjs/toolkit'


const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [],
        selectedConversation: null,
    },

    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        setConversation: (state, action) => {
            state.conversations.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },

        setConvTitle: (state, actions) => {
            const { title, conversationId } = actions.payload
            state.conversations = state.conversations.map((conv) => (
                conv._id = conversationId ? (
                    { ...conv, title }
                ) : conv
            ))

            if (state.selectedConversation?._id === conversationId) {
                state.selectedConversation = {
                    ...state.selectedConversation, title
                }
            }
        }
    }
})

export const { setConversations, setConversation, setSelectedConversation, setConvTitle } = conversationSlice.actions

export default conversationSlice.reducer