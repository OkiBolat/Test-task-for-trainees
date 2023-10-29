import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { Draggable } from "react-beautiful-dnd"

export function Task({ column, task, handleDelete, index }) {
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
                onClick={() => handleDelete(column.id, task)}
                aria-label="Delete Task"
              />
            </Box>
          </div>
        )
      }}
    </Draggable>
  )
}
