import { Box, Flex } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { changeColumns } from "./store/slices/board.slice"
import { Column } from "./components/Column"
import { DragDropContext } from "react-beautiful-dnd"
export const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "task content",
      description: "description of the task",
      date: "28.10.23",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Planned",
      taskIds: ["task-1"],
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
  const dispatch = useDispatch()
  const columns = useSelector((state) => state.board.columns)
  const tasks = useSelector((state) => state.board.tasks)
  const handleDragEnd = (col) => dispatch(changeColumns(col))
  return (
    <Box
      minHeight={"100vh"}
      overflow={"hidden"}
      bg={"blackAlpha.600"}
      p={5} // wrapper
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, handleDragEnd)}
      >
        <Flex // Флекс-контейнер для колонок
          width={"fit-content"}
          margin={"auto"}
          justifyContent={"space-between"}
          direction="row"
          flexWrap={"wrap"}
        >
          {Object.entries(columns).map(([id, column]) => {
            const tasksFromColumn = column.taskIds.map(
              (taskId) => tasks[taskId]
            )
            return (
              <Column
                id={id}
                column={column}
                tasks={tasksFromColumn}
                key={id}
              />
            )
          })}
        </Flex>
      </DragDropContext>
    </Box>
  )
}

export default App
