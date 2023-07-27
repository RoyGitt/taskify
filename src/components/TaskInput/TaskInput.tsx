import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import "./TaskInput.css";
import { Todo } from "../../models/models";

interface props {
  todo: string;
  todoList: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskInput: React.FC<props> = ({
  todo,
  setTodo,
  setTodoList,
  todoList,
}) => {
  console.log(todo);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList((prevValue) => [
        ...prevValue,
        { id: Date.now(), todo, isDone: false },
      ]);
      console.log(todo);
      setTodo("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleAdd}>
      <input
        className="task-form__input"
        type="text"
        placeholder="Enter a task..."
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        value={todo}
        maxLength={50}
      />
      <button className="task-form__btn" type="submit">
        <AiFillPlusCircle size="40px" color="#f0932b" />
      </button>
    </form>
  );
};

export default TaskInput;
