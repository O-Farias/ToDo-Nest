export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3000/tasks");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
};

export const updateTask = async (
  id: number,
  updatedTask: Partial<Task>
): Promise<Task> => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  return response.json();
};
