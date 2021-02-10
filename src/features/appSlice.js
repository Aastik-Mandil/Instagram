import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      console.log(state);
      state.user = null;
    },
  },
});
export const { addUser, removeUser } = appSlice.actions;
export const selectUser = state => state.app.user;

export default appSlice.reducer;
