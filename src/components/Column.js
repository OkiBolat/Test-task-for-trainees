import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { v4 as uuid } from "uuid"
import { Button } from "@chakra-ui/react"
import { Task } from "./Task"

import ModalAddTask from "./ModalAddTask"

export function Column({
  column,
  id,
  tasks,
  addTaskToColumn,
  DeleteTaskFromColumn,
}) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  return (
    <Flex
      spacing={2}
      width="250px"
      minHeight="600px"
      p={2}
      bg="blackAlpha.600"
      borderRadius="md"
      flexDirection="column"
      alignItems="start"
      m={2}
    >
      <Text
        w={"100%"}
        borderRadius={"md"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"50px"}
        textAlign={"center"}
        color="white"
        bg={column.color}
        mb={2}
        fontWeight="bold"
      >
        {column.title}, {column.taskIds.length}
      </Text>
      <Button
        onClick={() => {
          setIsAddTaskModalOpen(true)
        }}
      >
        Добавить задачу
      </Button>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ height: "200px", width: "100%" }}
            >
              <VStack
                spacing={2}
                width="100%"
                height="100%"
                transition="background-color 0.2s ease"
              >
                {column.taskIds.map((taskId, index) => {
                  const task = tasks.find((task) => {
                    return task?.id === taskId
                  })
                  return (
                    <Box width={"100%"} key={index}>
                      <Task
                        column={column}
                        handleDelete={DeleteTaskFromColumn}
                        task={task}
                        index={index}
                      />
                    </Box>
                  )
                })}
              </VStack>
              {isAddTaskModalOpen && (
                <ModalAddTask
                  setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                  column={column}
                  addTaskToColumn={addTaskToColumn}
                />
              )}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </Flex>
  )
}
