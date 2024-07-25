import { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
  Task,
} from "./services/api";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    getTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask) {
      const task = await createTask({ title: newTask, isCompleted: false });
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditingText(task.title);
  };

  const handleUpdateTask = async (id: number) => {
    if (editingText) {
      const updatedTask = await updateTask(id, { title: editingText });
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      setEditingTask(null);
      setEditingText("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-main">
        <h1 className="text-center mb-4">Lista de Tarefas</h1>
        <ul className="list-group mb-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingTask === task.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => handleUpdateTask(task.id)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleUpdateTask(task.id)
                  }
                />
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="d-flex">
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleEditTask(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleAddTask}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
