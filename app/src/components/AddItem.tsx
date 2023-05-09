import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ModalCloseButton,
  ModalContent,
  ModalHeader, ModalOverlay,
  NumberInput
} from "@chakra-ui/react"
import React, { useState } from "react"

export const AddItem = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {

  const [merchant, setMerchant] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Merchant</FormLabel>
            <Input
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Amount</FormLabel>

            <NumberInput
              onChange={(e) => setAmount(Number(e))}
            >
              <NumberInputField
                h="3rem"
                fontSize="1.2rem"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>


          </FormControl>
          <Button onClick={() => {}} colorScheme="messenger">Add expense</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}