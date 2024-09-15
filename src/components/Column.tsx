import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import  Task  from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import {
  deleteTaskFromColumn,
  addTaskToColumn,
} from '../redux/slices/ColumnSlice';
import { addTask, deleteTask } from '../redux/slices/TaskSlice';
interface TaskProp {
  id: string;
  content: string;
  date: string;
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
    color: string;
  };
  tasks: TaskProp[];
}
const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const dispatch = useDispatch();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskFromColumn({ columnId: column.id, taskId }));
    dispatch(deleteTask(taskId));
  };

  const handleAddTask = () => {
    if (newTaskText) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}.${
        currentDate.getMonth() + 1
      }.${currentDate.getFullYear()}`;
      const newTaskId = `task-${Date.now()}`;
      const newTask = {
        id: newTaskId,
        content: newTaskText,
        date: formattedDate,
      };
      dispatch(addTask(newTask));
      dispatch(addTaskToColumn({ columnId: column.id, task: newTask }));
      setNewTaskText('');
      setIsAddTaskModalOpen(false);
    }
  };


  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <Flex
          borderColor={snapshot.isDraggingOver ? 'blue.100' : 'transparent'}
          borderWidth="2px"
          borderRadius="md"
          padding="4"
          bg={snapshot.isDraggingOver ? 'blue.10' : 'blackAlpha.600'}
          width="250px"
          minHeight="600px"
          p={2}
          flexDirection="column"
          alignItems="start"
          m={2}
        >
          <Text
            w={'100%'}
            borderRadius={'md'}
            display="flex"
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'50px'}
            textAlign={'center'}
            color="white"
            bg={column.color}
            mb={2}
            fontWeight="bold"
            wordBreak="break-word"
          >
            {column.title} ({tasks.length})
          </Text>
          <VStack
            spacing={2}
            width="100%"
            transition="background-color 0.2s ease"
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} handleDeleteTask={handleDeleteTask}/>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </VStack>
          <Button onClick={() => setIsAddTaskModalOpen(true)}>
            Добавить задачу
          </Button>
          <Modal
            isOpen={isAddTaskModalOpen}
            onClose={() => setIsAddTaskModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Добавить задачу</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Содержимое задачи</FormLabel>
                  <Input
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Введите содержимое задачи..."
                    maxLength={30}
                    wordBreak="break-word"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => setIsAddTaskModalOpen(false)}
                >
                  Отменить
                </Button>
                <Button
  colorScheme="blue"
  onClick={() => {
    handleAddTask();
    setIsAddTaskModalOpen(false);
  }}
>
  Добавить
</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </Droppable>
  );
}
export default Column;