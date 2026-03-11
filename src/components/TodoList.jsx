// src/components/TODOList.jsx
import React from "react";
import { useRef,useState } from "react";
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
const API="http://localhost:5000/todos"

function Item({ item, setTodos }) {
  const [editing, setEditing] = React.useState(false);
  const [editValue, setEditValue] = useState(item.title);

  const inputRef = useRef(null);

  // Toggle edit mode
  const handleEdit = () => setEditing(true);

  // Submit updated title to backend
  const handleInputSubmit = async (event) => {
    event.preventDefault();
    setEditing(false);

    try {
      const res = await fetch(`${API}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editValue }),
      });
      const updatedTodo = await res.json();

      // Update state with response
      setTodos((prev) =>
        prev.map((todo) => (todo.id === item.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // Blur fallback (submit on blur)
  const handleInputBlur = handleInputSubmit;

  // Update title in local state as user types
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setTodos((prev) =>
  //     prev.map((todo) =>
  //       todo.id === item.id ? { ...todo, title: value } : todo
  //     )
  //   );
  // };

  // Delete todo permanently
  const handleDelete = async () => {
    try {
      await fetch(`${API}/${item.id}`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== item.id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // Toggle complete/incomplete
  const completeTodo = async () => {
    try {
      const res = await fetch(`${API}/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: !item.is_completed }),
      });
      const updatedTodo = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === item.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  // Auto-focus input when editing
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  return (
    <li
      id={item?.id}
      className={`todo_item ${item.is_completed ? "completed" : ""}`}
    >
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={item?.title}
            onBlur={handleInputBlur}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            {item.is_completed ? (
              <AiFillCheckCircle size={24} className="todo_circle done" />
            ) : (
              <AiOutlineCheckCircle size={24} className="todo_circle" />
            )}
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
              {item?.title}
            </p>
          </button>

          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <AiOutlineEdit size={20} />
            </button>
            <button onClick={handleDelete}>
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}


function TODOList({ todos, setTodos }) {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos.map((item) => (
          <Item key={item.id} item={item} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}

export default TODOList;
