import { useState } from "react";
import {
  TaskContainer,
  TaskDetails,
  InputField,
  TextAreaField,
  SelectField,
  StatusBadge,
  DeleteButton,
  EditButton,
  SubmitButton,
  Checkbox,
  TaskActions,
} from "../styles/TaskStyles";

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  status: string;
  onTaskUpdated: () => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, status: string) => void;
  onEditTask: (
    id: number,
    updatedTask: { title: string; description: string; status: string }
  ) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  status,
  onDelete,
  onToggleComplete,
  onEditTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);

  // Save Task Updates
  const handleSave = async () => {
    await onEditTask(id, {
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
    });
    setIsEditing(false);
  };

  // **📌 Helper Function: Render Edit Mode**
  const renderEditMode = () => (
    <>
      <InputField
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <TextAreaField
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <SelectField
        value={editedStatus}
        onChange={(e) => setEditedStatus(e.target.value)}
      >
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </SelectField>
    </>
  );

  // **📌 Helper Function: Render Display Mode**
  const renderDisplayMode = () => (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
      <StatusBadge status={status}>{status}</StatusBadge>
    </>
  );

  return (
    <TaskContainer>
      {/* ✅ Checkbox to Toggle Completion */}
      <Checkbox
        type="checkbox"
        checked={status === "COMPLETED"}
        onChange={() => onToggleComplete(id, status)}
      />

      {/* ✅ Task Details (Edit Mode OR Display Mode) */}
      <TaskDetails>
        {isEditing ? renderEditMode() : renderDisplayMode()}
      </TaskDetails>

      {/* ✅ Task Actions (Edit, Save, Delete) */}
      <TaskActions>
        {isEditing ? (
          <SubmitButton onClick={handleSave}>Save</SubmitButton>
        ) : (
          <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
        )}
        <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
      </TaskActions>
    </TaskContainer>
  );
};

export default TaskItem;
