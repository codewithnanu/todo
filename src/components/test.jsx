import './App.css';
import { TiEdit } from 'react-icons/ti';
import { useState } from 'react';

let nextId = 0;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState('');

  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  function addTask() {
    if (!inputValue.trim()) return;

    setTodoList([
      ...todoList,
      { id: nextId++, name: inputValue, date: inputDate },
    ]);

    setInputValue('');
    setInputDate('');
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleDate(e) {
    setInputDate(e.target.value);
  }

  return (
    <div className="App">
      <div className="renderingContainer">
        <input
          placeholder="Add task"
          value={inputValue}
          onChange={handleChange}
        />

        <input
          type="date"
          value={inputDate}
          onChange={handleDate}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id} className="renderingContainer">

            {edit.id === todo.id ? (
              // EDIT MODE
             <input
  className="input"
  value={edit.id === todo.id ? edit.value : todo.name}
  readOnly={edit.id !== todo.id}
  autoFocus={edit.id === todo.id}
  onChange={(e) => {
    const value = e.target.value;

    setEdit({ id: todo.id, value });

    setTodoList((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, name: value } : item
      )
    );
  }}
/>

            ) : (
              // VIEW MODE
              <input
                className="input"
                value={todo.name}
                readOnly
              />
            )}

            <span>{todo.date}</span>

            <button
              onClick={() =>
                setTodoList(todoList.filter((a) => a.id !== todo.id))
              }
            >
              Delete
            </button>
    <button
              onClick={() =>
                
                 setEdit({ id: todo.id, value: todo.name })
              }
            >
            update
            </button>
            <TiEdit
              className="edit-icon"
              onClick={() =>
                setEdit({ id: todo.id, value: todo.name })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
