import { createSlice } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    // 스프링 url
    SpringbaseUrl: 'https://3.34.127.243',

    // 파이썬 url
    PythonbaseUrl: 'https://43.201.116.244',
  },
  reducers: {
    setSpringBaseUrl: (state, action) => {
      state.SpringbaseUrl = action.payload;
    },
    setPythonBaseUrl: (state, action) => {
      state.PythonbaseUrl = action.payload;
    }
  }
});

export const { setSpringBaseUrl, setPythonBaseUrl } = urlSlice.actions;
export default urlSlice.reducer;