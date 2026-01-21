import './App.css';
import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import TODOHero from './components/TodoHero';
import TODOList from './components/TodoList';


let nextId = 0;

function App() {
    const [todos, setTodos] = React.useState([
    
  ]);
   const todos_completed = todos.filter(
    (todo) => todo.is_completed === true
  ).length;
  const total_todos = todos.length;
 return(
  <>
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Form setTodos={setTodos}/>
      <TODOList todos={todos} setTodos={setTodos}/>
    </div>
  </>
 );
}

export default App;
