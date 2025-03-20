import { useState } from "react";
import { createTask } from "../api";
import { FormContainer, InputField, SelectField, TextAreaField, SubmitButton} from "../styles/TaskStyles";


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
    e.preventDefault(); // ✅ Prevent page refresh

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
      onTaskCreated(); // ✅ Refresh task list
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
        <InputField
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextAreaField
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <SelectField value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </SelectField>
        <SubmitButton type="submit">Add Task</SubmitButton>
      </form>
    </FormContainer>
  );
}
