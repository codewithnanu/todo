import { AiOutlinePlus } from "react-icons/ai";

function Form({ setTodos }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = event.target.todo.value.trim();
    if (!value) return; // empty todo guard

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: value }),
      });

      // 🔥 IMPORTANT: check status
      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await res.json();

      setTodos((prev) => [...prev, newTodo]);
      event.target.reset();
    } catch (error) {
      console.error("ADD TODO ERROR:", error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>

      <button type="submit">
        <span className="visually-hidden">Submit</span>
        <AiOutlinePlus size={22} />
      </button>
    </form>
  );
}

export default Form;
