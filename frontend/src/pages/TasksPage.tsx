import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  margin-left: 260px;
  max-width: 800px;
  margin: auto;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TaskItem = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(24, 55, 88, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border-left: 5px solid ${({ theme }) => theme.primary};
  padding-left: 20px;

  &:hover {
    transform: scale(1.02);
  }
`;

const TaskDetails = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const TaskTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const StatusBadge = styled.span<{ status: string }>`
  background-color: ${({ status }) =>
    status === "COMPLETED"
      ? "#4CAF50"
      : status === "IN_PROGRESS"
      ? "#FF9800"
      : "#F44336"};
  color: white;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  border: none;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  transition: 0.2s ease;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

const DeleteButton = styled(Button)`
  background: red;
  &:hover {
    background: darkred;
  }
`;

const Form = styled.form`
  background: ${({ theme }) => theme.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 6px;
  font-size: 16px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.accent};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 6px;
  font-size: 16px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  background: ${({ theme }) => theme.buttonBg};
  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

export default function TasksPage() {
  const [tasks, setTasks] = useState<
    { id: number; title: string; description: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🚀 New State for Form Inputs
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }

    try {
      await updateTask(id, {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        status: "COMPLETED",
      });
      fetchTasks(); // Reload the task list
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

  // 🚀 Handle Form Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // 🚀 Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      console.log("Submitting form...");

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status: status || "TODO",
      };

      console.log("Sending task data to API:", taskData);

      await createTask(taskData);
      fetchTasks(); // Reload the task list

      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setError(""); // Clear error if successful
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Failed to create task. Please try again.");
    }
  };




  return (
    <Container>
      <h2>📋 Tasks</h2>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🚀 CREATE TASK FORM */}
      <Form onSubmit={handleSubmit}>
        <h3>Create a New Task</h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />

        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />

        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Select>
        <SubmitButton type="submit">Add Task</SubmitButton>
      </Form>

      {/* 🚀 TASK LIST */}
      <TaskList>
        {tasks.length === 0 && !loading ? <p>No tasks found.</p> : null}
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <TaskDetails>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <StatusBadge status={task.status}>{task.status}</StatusBadge>
            </TaskDetails>
            <Button onClick={() => handleCompleteTask(task.id)}>
              ✅ Complete
            </Button>

            <DeleteButton onClick={() => handleDelete(task.id)}>
              Delete
            </DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}
