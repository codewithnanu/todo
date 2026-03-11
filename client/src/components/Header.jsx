// src/components/Header.jsx
import { MdChecklist } from "react-icons/md";

function Header() {
  return (
    <div className="header">
      <MdChecklist size={32} className="todo-icon" />
      <h1>TODO</h1>
    </div>
  );
}

export default Header;
