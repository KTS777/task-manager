import styled from "styled-components";

// Main container
export const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: auto;
`;

// Task list container
export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;  // Increased gap for uniformity
`;

// Task container with better padding & alignment
export const TaskContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between; // Proper spacing between elements
  transition: all 0.2s ease-in-out;
  border-left: 6px solid ${({ theme }) => theme.primary};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }
`;

// Task Details container for text & status
export const TaskDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Text Input & Textarea Unified
export const InputField = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.text};
  font-size: 16px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.accent};
  }
`;

export const TextAreaField = styled(InputField).attrs({ as: "textarea" })`
  resize: none;
  height: 40px;
`;

// Status Badge
export const StatusBadge = styled.span<{ status: string }>`
  background-color: ${({ status }) =>
    status === "COMPLETED"
      ? "#6BAA75"
      : status === "IN_PROGRESS"
      ? "#FFA726"
      : "#E57373"};
  color: white;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  align-self: flex-start;
`;

// Base Button Styling
export const Button = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  border: none;
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  transition: 0.3s ease;
  font-size: 14px;
  margin: 5px;

  &:hover {
    background: ${({ theme }) => theme.accent};
    transform: scale(1.05);
  }
`;

// Task Action Buttons Wrapper for alignment
export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

// Delete Button
export const DeleteButton = styled(Button)`
  background: ${({ theme }) => theme.delete};
  &:hover {
    background: ${({ theme }) => theme.hoverDelete};
  }
`;

// Edit Button
export const EditButton = styled(Button)`
  background: ${({ theme }) => theme.edit};
  &:hover {
    background: ${({ theme }) => theme.hoverEdit};
  }
`;

// Checkbox Alignment
export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 15px;
  transform: scale(1.3);
  cursor: pointer;
`;

// Form Container
export const FormContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Form Inputs Wrapper for better spacing
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Submit Button (Reuses Button)
export const SubmitButton = styled(Button)`
  align-self: flex-start;
  padding: 12px 20px;
`;

// Dropdown (Same style as InputField)
export const SelectField = styled(InputField).attrs({ as: "select" })`
  width: 90%;
`;

