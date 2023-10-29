import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { Column } from "./components/Column"
import { DragDropContext } from "react-beautiful-dnd"

export const initialData = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Planned",
      taskIds: [],
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
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceTaskIds = [...sourceColumn.taskIds]
    const destTaskIds = [...destColumn.taskIds]
    const [removed] = sourceTaskIds.splice(source.index, 1)
    destTaskIds.splice(destination.index, 0, removed)
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
      const updatedData = {
        ...initialData,
        tasks: {
          ...initialData.tasks,
          [task.id]: task,
        },
        columns: updatedColumns,
      }
      initialData.tasks = updatedData.tasks
      console.log(initialData.tasks)
      return updatedData.columns
    })
  }

  const DeleteTaskFromColumn = (columnId, task) => {
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns }
      updatedColumns[columnId].taskIds = updatedColumns[
        columnId
      ].taskIds.filter((taskId) => taskId !== task.id)
      const updatedData = {
        ...initialData,
        columns: updatedColumns,
      }
      delete initialData.tasks[task.id]
      return updatedData.columns
    })
  }

  return (
    <Box
      minHeight={"100vh"}
      overflow={"hidden"}
      bg={"blackAlpha.600"}
      p={5} // wrapper
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Flex // Флекс-контейнер для колонок
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
                DeleteTaskFromColumn={DeleteTaskFromColumn}
              />
            )
          })}
        </Flex>
      </DragDropContext>
    </Box>
  )
}

export default App
