// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "./features/todo/todolice"
const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

export default store;
