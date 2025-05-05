import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userType: 'employer' | 'employee' | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userType: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<'employer' | 'employee'>) => {
      state.userType = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userType = null;
    },
  },
});

export const { setUserType, login, logout } = userSlice.actions;
export default userSlice.reducer;