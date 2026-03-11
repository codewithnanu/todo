// src/components/TODOHero.jsx
function TODOHero({ todos_completed, total_todos }) {
  return (
    <section className="todohero_section">
      <div>
        <p className="heading1">Task Done</p>
        <p className="heading2">Keep it up</p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
}
export default TODOHero;