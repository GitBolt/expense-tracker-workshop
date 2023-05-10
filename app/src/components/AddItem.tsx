import { DEVNET_RPC } from "@/util/constants"
import { createExpense } from "@/util/program/createExpense"
import { getExpenses } from "@/util/program/getExpenses"
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
  NumberInput,
  useToast
} from "@chakra-ui/react"
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import React, { useState } from "react"

export const AddItem = ({ isOpen, onClose, setExpenses }: { isOpen: boolean, onClose: any, setExpenses: any }) => {

  const [merchant, setMerchant] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const wallet = useAnchorWallet()
  const toast = useToast()

  const onSubmit = async () => {

    if (!wallet) {
      toast({
        status: "error",
        title: "Connect Wallet Required"
      })
      return
    }

    const { sig, error } = await createExpense(
      wallet as NodeWallet,
      merchant,
      amount
    )

    if (!sig || error) {
      toast({
        status: "error",
        title: error
      })
      return
    }

    console.log("Add sig: ", sig)

    toast({
      status: "success",
      title: "Signature: " + sig
    })

    const data = await getExpenses(wallet as NodeWallet)
    setExpenses(data)


  }
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
              onChange={(e) => setMerchant(e.target.value)}
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
          <Button onClick={onSubmit} colorScheme="messenger">Add Expense</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}