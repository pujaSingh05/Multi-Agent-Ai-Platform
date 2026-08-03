import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
    },
    //update the state with the user data when the user logs in
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        }
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;