import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.background};
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function CreateTaskForm({
  onTaskCreated,
}: {
  onTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { title, description, status };

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setStatus("TODO");
        onTaskCreated(); // Refresh task list
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <FormContainer>
      <h2>Create New Task</h2>
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
        <Button type="submit">Add Task</Button>
      </form>
    </FormContainer>
  );
}
