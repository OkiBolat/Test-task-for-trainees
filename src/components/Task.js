import { Box, Flex, IconButton } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { removeTask } from "../store/slices/board.slice"

export function Task({ column, task, index }) {
  const dispatch = useDispatch()
  const handleRemoveTask = ([columnId, task]) => {
    dispatch(removeTask([columnId, task]))
  }
  return (
    <Draggable key={task?.id} draggableId={task?.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              margin: "0 0 8px 0",
              minHeight: "50px",
              color: "white",
              ...provided.draggableProps.style,
            }}
          >
            <Box
              w={"100%"}
              p={2}
              bg="blue.400"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex
                flexDirection="column"
                // Содержимое таска
              >
                {task?.content}, {task?.date}
              </Flex>
              <IconButton // иконка
                icon={<DeleteIcon />}
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveTask([column.id, task])}
                aria-label="Delete Task"
              />
            </Box>
          </div>
        )
      }}
    </Draggable>
  )
}
