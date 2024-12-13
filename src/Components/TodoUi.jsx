import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoProvider } from "../Context/Todocontext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoUi = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      {
        id: uuidv4().slice(0, 3),
        todoTittle: todo.todo, // Ensure key matches what TodoItem expects
        completed: false,
      },
      // Get problem here that is i pass only Todo instead of my key which i make in context "todotittle"
      ...prev,
    ]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, todoTittle: updatedTodo } : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const localStorageQuery = JSON.parse(localStorage.getItem("todoTitle"));

    if (localStorageQuery && localStorageQuery.length) {
      setTodos(localStorageQuery);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("todoTitle", JSON.stringify(todos));

  }, [todos]); 

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoUi;
