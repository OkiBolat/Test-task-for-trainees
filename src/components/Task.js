import { Box, Flex, IconButton } from "@chakra-ui/react"
import { InfoOutlineIcon } from "@chakra-ui/icons"
import { Draggable } from "react-beautiful-dnd"
import { useState } from "react"
import ModalEditTask from "./ModalEditTask"

export function Task({ column, task, index }) {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
  return (
    <Draggable key={task?.id} draggableId={task?.id} index={index}>
      {(provided) => {
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
                icon={<InfoOutlineIcon />}
                variant="ghost"
                color={"blackAlpha.600"}
                size="sm"
                onClick={() => setIsEditTaskModalOpen(true)}
                aria-label="Delete Task"
              />
            </Box>
            {isEditTaskModalOpen && (
              <ModalEditTask
                setIsEditTaskModalOpen={setIsEditTaskModalOpen}
                task={task}
                column={column}
              />
            )}
          </div>
        )
      }}
    </Draggable>
  )
}
