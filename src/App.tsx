import { useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import { Todo } from "./models/models";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FaTasks } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const [completedTask, setCompletedTask] = useState<Array<Todo>>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todoList,
      completed = completedTask;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setCompletedTask(completed);
    setTodoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1 className="primary-heading">
          Taskify
          <FaTasks />
        </h1>
        <TaskInput
          todo={todo}
          setTodo={setTodo}
          setTodoList={setTodoList}
          todoList={todoList}
        />
        <TaskList
          todoList={todoList}
          setTodoList={setTodoList}
          completedTask={completedTask}
          setCompletedTask={setCompletedTask}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
