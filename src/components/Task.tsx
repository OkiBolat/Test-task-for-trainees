import React, { useState } from 'react';
import { Box, Flex, Text, IconButton, Input } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateTaskContent } from '../redux/slices/TaskSlice';
import { updateTaskColumn } from '../redux/slices/ColumnSlice';

interface TaskProps {
  task: {
    id: string;
    content: string;
    date: string;
  };
  handleDeleteTask: (taskId: string) => void;
}

export const Task: React.FC<TaskProps> = ({ task, handleDeleteTask }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.content);

  const onDeleteClick = () => {
    handleDeleteTask(task.id);
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onSaveClick = () => {
    dispatch(updateTaskContent({ taskId: task.id, newContent: taskText }));
    dispatch(updateTaskColumn({ taskId: task.id, newContent: taskText }));
    setIsEditing(false);
  };

  const onCancelClick = () => {
    setTaskText(task.content);
    setIsEditing(false);
  };

  return (
    <Box
      w={['100%', '100%', '220px']}
      p={2}
      bg="blue.100"
      borderRadius="md"
      mb={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      wordBreak="break-word"
    >
      {!isEditing ? (
        <Flex flexDirection="column">
          <Text>
            {taskText} {task.date}
          </Text>
          <Flex>
            <IconButton
              icon={<EditIcon />}
              variant="ghost"
              size="sm"
              onClick={onEditClick}
              aria-label="Edit Task"
            />
            <IconButton
              icon={<DeleteIcon />}
              variant="ghost"
              size="sm"
              onClick={onDeleteClick}
              aria-label="Delete Task"
            />
          </Flex>
        </Flex>
      ) : (
        <Flex flexDirection="column">
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Flex>
            <IconButton
              icon={<EditIcon />}
              variant="ghost"
              size="sm"
              onClick={onSaveClick}
              aria-label="Save Task"
            />
            <IconButton
              icon={<DeleteIcon />}
              variant="ghost"
              size="sm"
              onClick={onCancelClick}
              aria-label="Cancel Edit"
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Task;