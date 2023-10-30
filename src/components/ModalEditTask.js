import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { removeTask, changeTask } from "../store/slices/board.slice"

export default function ModalEditTask({
  setIsEditTaskModalOpen,
  task,
  column,
}) {
  const [nameInputValue, setNameInputValue] = useState(task.content)
  const [descriptionInputValue, setDescriptionInputValue] = useState(
    task.description
  )
  const dispatch = useDispatch()
  const handleEditTask = (newTask) => {
    dispatch(changeTask(newTask))
  }
  const handleRemoveTask = ([columnId, task]) => {
    dispatch(removeTask([columnId, task]))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newTask = {
      id: task.id,
      content: nameInputValue,
      description: descriptionInputValue,
      date: task.date,
    }
    handleEditTask(newTask)
    setIsEditTaskModalOpen(false)
  }
  return (
    <Modal isOpen={true} onClose={() => setIsEditTaskModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task.content}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <Input
                variant={"unstyled"}
                value={nameInputValue}
                onChange={(event) => setNameInputValue(event.target.value)}
                placeholder="Введите имя задачи..."
              />
              <Input
                variant={"unstyled"}
                value={descriptionInputValue}
                onChange={(event) =>
                  setDescriptionInputValue(event.target.value)
                }
                placeholder="Введите новое описание..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              bg={"red"}
              color={"white"}
              onClick={() => handleRemoveTask([column.id, task])}
            >
              Удалить
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => handleEditTask(task)}
            >
              Сохранить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
