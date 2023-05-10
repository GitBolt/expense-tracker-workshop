import { Expense } from "@/types/expense"
import { DEVNET_RPC } from "@/util/constants"
import { createExpense } from "@/util/program/createExpense"
import { getExpenses } from "@/util/program/getExpenses"
import { updateExpense } from "@/util/program/updateExpense"
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
import { Connection, Transaction } from "@solana/web3.js"
import React, { useEffect, useState } from "react"

export const UpdateItem = ({ isOpen, onClose, setExpenses, currentValues }: { isOpen: boolean, onClose: any, setExpenses: any, currentValues: Expense }) => {
  const [merchant, setMerchant] = useState<string>(currentValues.merchant)
  const [amount, setAmount] = useState<number>(currentValues.amount)
  const wallet = useAnchorWallet()
  const toast = useToast()


  useEffect(() => {
    setMerchant(currentValues.merchant)
    setAmount(currentValues.amount)
  }, [])


  const onSubmit = async () => {

    if (!wallet) {
      toast({
        status: "error",
        title: "Connect Wallet Required"
      })
      return
    }
    console.log(currentValues)
    const { sig, error } = await updateExpense(
      wallet as NodeWallet,
      currentValues.id,
      merchant,
      amount,
    )

    if (!sig || error) {
      toast({
        status: "error",
        title: error
      })
      return
    }

    console.log(sig)
    const data = await getExpenses(wallet as NodeWallet)
    setExpenses(data)
    toast({
      status: "success",
      title: "Signature: " + sig
    })

  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Updating expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Merchant</FormLabel>
            <Input
              defaultValue={currentValues.merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Amount</FormLabel>

            <NumberInput
              defaultValue={currentValues.amount}

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
          <Button onClick={onSubmit} colorScheme="messenger">Update expense</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}