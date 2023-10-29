import getDate from "../utils/getDate"
import { v4 as uuid } from "uuid"
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
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/slices/board.slice"

export default function ModalAddTask({ setIsAddTaskModalOpen, column }) {
  const [inputValue, setInputValue] = useState("")
  const [isInputValid, setIsInputValid] = useState(true)
  const dispatch = useDispatch()
  const handleAddTask = ([columnId, task]) =>
    dispatch(addTask([columnId, task]))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!!inputValue) {
      const retTask = {
        id: uuid(),
        content: inputValue,
        date: getDate(),
      }
      handleAddTask([column.id, retTask])
      setIsAddTaskModalOpen(false)
    } else {
      setIsInputValid(false)
    }
  }
  return (
    <Modal isOpen={true} onClose={() => setIsAddTaskModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить задачу</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Содержимое задачи</FormLabel>
              <Input
                isInvalid={!isInputValid}
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value)
                }}
                placeholder="Введите содержимое задачи..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setIsAddTaskModalOpen(false)}
            >
              Отменить
            </Button>
            <Button colorScheme="blue" type="submit">
              Добавить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
