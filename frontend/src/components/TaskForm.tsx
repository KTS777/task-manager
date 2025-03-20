import { useState } from "react";
import styled from "styled-components";
import { createTask } from "../api";

const FormContainer = styled.form`
  background: ${({ theme }) => theme.primary};
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 2px solid ${({ theme }) => theme.text};
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 16px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;

  &:focus {
    outline: 3px solid ${({ theme }) => theme.accent};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  margin-bottom: 10px;
  border: 2px solid ${({ theme }) => theme.text};
  border-radius: 8px;
  font-size: 16px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  background: ${({ theme }) => theme.buttonBg};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    transform: scale(1.05);
  }
`;

export default function TaskForm({
  onTaskCreated,
}: {
  onTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const newTask = { title, description, status };

    try {
      await createTask(newTask);
      setTitle("");
      setDescription("");
      setStatus("TODO");
      setError(null);
      onTaskCreated(); // Refresh task list
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Failed to create task. Please try again.");
    }
  };

  return (
    <FormContainer>
      <h3>Create a New Task</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </Select>
        <SubmitButton type="submit">Add Task</SubmitButton>
      </form>
    </FormContainer>
  );
}
