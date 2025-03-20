import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api";
import styled from "styled-components";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: auto;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function TasksPage() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; description: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
      setError("Failed to load tasks. Please try again later.");
    }
    setLoading(false);
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await updateTask(id, {
        title: tasks.find((task) => task.id === id)?.title || "",
        description: tasks.find((task) => task.id === id)?.description || "",
        status: "COMPLETED",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to complete task", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  return (
    <Container>
      <h2>📋 Tasks</h2>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🚀 Create Task Form */}
      <TaskForm onTaskCreated={fetchTasks} />

      {/* 🚀 Task List */}
      <TaskList>
        {tasks.length === 0 && !loading ? <p>No tasks found.</p> : null}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            onComplete={handleCompleteTask}
            onDelete={handleDelete}
          />
        ))}
      </TaskList>
    </Container>
  );
}
