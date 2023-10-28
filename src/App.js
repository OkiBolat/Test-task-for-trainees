import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { Column } from "./components/Column"
import { DragDropContext } from "react-beautiful-dnd"
import { v4 as uuid } from "uuid"

export const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1", date: "12.12.2023" },
    "task-2": { id: "task-2", content: "Task 2", date: "13.12.2023" },
    "task-3": { id: "task-3", content: "Task 3", date: "13.12.2023" },
    "task-4": { id: "task-4", content: "Task 4", date: "13.12.2023" },
    "task-5": { id: "task-5", content: "Task 5", date: "13.12.2023" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Planned",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
      color: "#ff4244",
    },
    "column-2": {
      id: "column-2",
      title: "In Working",
      taskIds: [],
      color: "#b4a6ff",
    },

    "column-3": {
      id: "column-3",
      title: "Testing",
      taskIds: [],
      color: "#41ffbb",
    },
    "column-4": {
      id: "column-4",
      title: "Release",
      taskIds: [],
      color: "#f5df8b",
    },
  },
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result
  if (source.droppableId !== destination.droppableId) {
    console.log(result)
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceTaskIds = [...sourceColumn.taskIds]
    const destTaskIds = [...destColumn.taskIds]
    console.log(sourceTaskIds)
    console.log(destTaskIds)
    const [removed] = sourceTaskIds.splice(source.index, 1)
    destTaskIds.splice(destination.index, 0, removed)
    console.log(sourceTaskIds)
    console.log(destTaskIds)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      },
      [destination.droppableId]: {
        ...destColumn,
        taskIds: destTaskIds,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedTaskIds = [...column.taskIds]
    const [removed] = copiedTaskIds.splice(source.index, 1)
    copiedTaskIds.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        taskIds: copiedTaskIds,
      },
    })
  }
}
function App() {
  const [columns, setColumns] = useState(initialData.columns)

  const addTaskToColumn = (columnId, task) => {
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns }
      updatedColumns[columnId].taskIds.push(task.id)
      // Update the initialData with the new task
      const updatedData = {
        ...initialData,
        tasks: {
          ...initialData.tasks,
          [task.id]: task,
        },
        columns: updatedColumns,
      }
      initialData.tasks = updatedData.tasks

      // Update the state and initialData
      return updatedData.columns
    })
  }

  return (
    <Box minHeight={"100vh"} overflow={"hidden"} bg={"blackAlpha.600"} p={5}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Flex
          width={"fit-content"}
          margin={"auto"}
          justifyContent={"space-between"}
          direction="row"
          flexWrap={"wrap"}
        >
          {Object.entries(columns).map(([id, column]) => {
            const tasks = column.taskIds.map(
              (taskId) => initialData.tasks[taskId]
            )
            return (
              <Column
                id={id}
                column={column}
                tasks={tasks}
                key={id}
                addTaskToColumn={addTaskToColumn}
              />
            )
          })}
        </Flex>
      </DragDropContext>
    </Box>
  )
}

export default App
