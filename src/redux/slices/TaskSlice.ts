import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  content: string;
  date: string; 
}

interface TasksState {
  tasks: { [key: string]: Task };
}

const initialTasksState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
      state.tasks[newTask.id] = newTask;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      delete state.tasks[taskId];
    },
    updateTaskContent: (state, action: PayloadAction<{ taskId: string; newContent: string }>) => {
      const { taskId, newContent } = action.payload;
      const taskToUpdate = state.tasks[taskId];
      if (taskToUpdate) {
        taskToUpdate.content = newContent;
      }
    },
  },
});

export const { addTask, deleteTask, updateTaskContent } = tasksSlice.actions;
export default tasksSlice.reducer;