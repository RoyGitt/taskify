import React, { useEffect, useState } from "react";
import "./TaskList.css";
import TaskItem from "../TaskItem/TaskItem";
import { Todo } from "../../models/models";
import { Droppable } from "react-beautiful-dnd";
import { BsFire, BsFillCheckCircleFill } from "react-icons/bs";
import runnerimage from "../../assets/runner.png";
import emptyFile from "../../assets/nodata.png";

interface props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTask: Todo[];
  setCompletedTask: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<props> = ({
  todoList,
  setTodoList,
  completedTask,
  setCompletedTask,
}) => {
  return (
    <div className="todo-container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => {
          return (
            <div
              className={`todo-list--ongoing ${
                snapshot.isDraggingOver ? "drag-active" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2>
                {" "}
                Active Task <BsFire color="#f0932b" />
              </h2>
              {todoList.length === 0 && <img src={runnerimage} alt="" />}

              <ul className="todo-list">
                {todoList.map((singleTodo, index) => (
                  <TaskItem
                    index={index}
                    key={index}
                    todo={singleTodo.todo}
                    todoId={singleTodo.id}
                    todoIsDone={singleTodo.isDone}
                    todoList={todoList}
                    setTodoList={setTodoList}
                  />
                ))}
              </ul>
            </div>
          );
        }}
      </Droppable>
      <Droppable droppableId="CompletedTask">
        {(provided, snapshot) => {
          return (
            <div
              className={`todo-list--completed ${
                snapshot.isDraggingOver ? "drag-complete" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2>
                Completed Task <BsFillCheckCircleFill color="#27ae60" />
              </h2>
              {completedTask.length === 0 && <img src={emptyFile} alt="" />}
              <ul className="completed-list">
                {completedTask.map((singleTodo, index) => (
                  <TaskItem
                    index={index}
                    key={index}
                    todo={singleTodo.todo}
                    todoId={singleTodo.id}
                    todoIsDone={singleTodo.isDone}
                    todoList={completedTask}
                    setTodoList={setCompletedTask}
                  />
                ))}
              </ul>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default TaskList;
