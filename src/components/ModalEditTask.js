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
  FormLabel,
  Text,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { addTask } from "../store/slices/board.slice"
import { removeTask } from "../store/slices/board.slice"

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
  const handleRemoveTask = ([columnId, task]) => {
    dispatch(removeTask([columnId, task]))
  }
  return (
    <Modal isOpen={true} onClose={() => setIsEditTaskModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task.content}</ModalHeader>
        <ModalCloseButton />
        <form>
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
            <Button colorScheme="blue" type="submit">
              Сохранить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
