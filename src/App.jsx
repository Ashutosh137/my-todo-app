// src/App.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./features/todo/todolice";

function App() {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo({ id: Date.now(), text }));
      setText("");
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingId(id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      dispatch(editTodo({ id: editingId, text: editingText }));
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
        className="input-group"
      >
        <input
          type="text"
          maxLength={40}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button className="custem" type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  maxLength={40}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{todo.text}</p>
                <div className="box">
                  <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
