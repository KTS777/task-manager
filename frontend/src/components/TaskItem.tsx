import styled from "styled-components";

const TaskContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border-left: 6px solid ${({ theme }) => theme.primary};
  padding-left: 20px;
  position: relative;
  overflow: hidden;

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
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  transition: 0.3s ease;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.accent};
    transform: scale(1.05);
  }
`;

const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.delete};
  &:hover {
    background: ${({ theme }) => theme.hoverDelete};
  }
`;

interface TaskItemProps {
  id: number;
  title: string;
  description: string;
  status: string;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  status,
  onComplete,
  onDelete,
}) => {
  return (
    <TaskContainer>
      <TaskDetails>
        <TaskTitle>{title}</TaskTitle>
        <TaskDescription>{description}</TaskDescription>
        <StatusBadge status={status}>{status}</StatusBadge>
      </TaskDetails>

      {status !== "COMPLETED" && (
        <Button onClick={() => onComplete(id)}>✅ Complete</Button>
      )}
      <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
    </TaskContainer>
  );
};

export default TaskItem;
