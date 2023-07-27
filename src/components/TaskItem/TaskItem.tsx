import { AiOutlineEdit, AiOutlineDelete, AiOutlineUndo } from "react-icons/ai";
import { MdOutlineDoneAll } from "react-icons/md";
import "./TaskItem.css";
import { useState, useRef, useEffect } from "react";
import { Todo } from "../../models/models";
import { Draggable } from "react-beautiful-dnd";

interface props {
  todo: string;
  todoId: number;
  todoIsDone: boolean;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const TaskItem: React.FC<props> = ({
  todo,
  todoId,
  todoIsDone,
  todoList,
  setTodoList,
  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    const newList = todoList.map((todo) =>
      todoId === todo.id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodoList(newList);
  };

  const handleEdit = (e: React.FormEvent, todoId: number) => {
    const newList = todoList.map((todo) =>
      todoId === todo.id ? { ...todo, todo: editText } : todo
    );
    setTodoList(newList);
    setEdit(false);
  };

  const handleDelete = (todoId: number) => {
    const newList = todoList.filter((todo) => {
      return todoId !== todo.id;
    });
    setTodoList(newList);
  };

  return (
    <Draggable draggableId={todoId.toString()} index={index}>
      {(provided) => {
        return (
          <li
            className={`todo-item ${todoIsDone ? "todo-item--completed" : ""}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {edit && !todoIsDone ? (
              <form
                className="form-edit"
                onSubmit={(e: React.FormEvent) => {
                  handleEdit(e, todoId);
                }}
              >
                <input
                  className="form-edit__input"
                  ref={editRef}
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                  }}
                />
              </form>
            ) : todoIsDone ? (
              <s className="strike"> {todo}</s>
            ) : (
              todo
            )}

            <span className="todo-item__controls">
              {!todoIsDone && (
                <span
                  className="todo-item__control"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <AiOutlineEdit className="todo-item__control__icon todo-item__control__icon--edit" />
                </span>
              )}

              <span
                className="todo-item__control"
                onClick={() => {
                  handleDelete(todoId);
                }}
              >
                <AiOutlineDelete className="todo-item__control__icon todo-item__control__icon--delete" />
              </span>
              {todoIsDone && (
                <span
                  className="todo-item__control"
                  onClick={() => {
                    handleDone(todoId);
                  }}
                >
                  <AiOutlineUndo className="todo-item__control__icon todo-item__control__icon--undo" />
                </span>
              )}

              {!todoIsDone && (
                <span
                  className="todo-item__control"
                  onClick={() => {
                    handleDone(todoId);
                  }}
                >
                  <MdOutlineDoneAll className="todo-item__control__icon todo-item__control__icon--done" />
                </span>
              )}
            </span>
          </li>
        );
      }}
    </Draggable>
  );
};

export default TaskItem;
