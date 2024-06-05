// src/features/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    return JSON.parse(savedTodos);
  }
  return [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: loadTodosFromLocalStorage(),
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload); // Add to the top
      saveTodosToLocalStorage(state);
    },
    deleteTodo: (state, action) => {
      const newState = state.filter(todo => todo.id !== action.payload);
      saveTodosToLocalStorage(newState);
      return newState;
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        saveTodosToLocalStorage(state);
      }
    }
  }
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
