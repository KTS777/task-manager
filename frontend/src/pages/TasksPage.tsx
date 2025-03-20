import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { Container, TaskList, Button } from "../styles/TaskStyles";



export default function TasksPage() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; description: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

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

  const handleToggleComplete = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "COMPLETED" ? "TODO" : "COMPLETED";
    try {
      await updateTask(id, {
        title: tasks.find((task) => task.id === id)?.title || "",
        description: tasks.find((task) => task.id === id)?.description || "",
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task status", error);
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

  const handleEditTask = async (
    id: number,
    updatedTask: { title: string; description: string; status: string }
  ) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <Container>
      <h2>📋 Tasks</h2>

      <TaskForm onTaskCreated={fetchTasks} />

      {/* ACTIVE TASKS */}
      <h3>Active Tasks</h3>
      <TaskList>
        {tasks
          .filter((task) => task.status !== "COMPLETED")
          .map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onTaskUpdated={fetchTasks}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask} // ✅ Added edit functionality
            />
          ))}
      </TaskList>

      {/* TOGGLE COMPLETED TASKS */}
      <Button onClick={() => setShowCompleted((prev) => !prev)}>
        {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
      </Button>

      {/* COMPLETED TASKS (Hidden by Default) */}
      {showCompleted && (
        <>
          <h3>✅ Completed Tasks</h3>
          <TaskList>
            {tasks
              .filter((task) => task.status === "COMPLETED")
              .map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onTaskUpdated={fetchTasks}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                  onEditTask={handleEditTask} // ✅ Added edit functionality
                />
              ))}
          </TaskList>
        </>
      )}
    </Container>
  );
}
