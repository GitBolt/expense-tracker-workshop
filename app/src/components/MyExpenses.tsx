import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { AddItem } from "./AddItem";
import { getExpenses } from "@/util/program/getExpenses";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { truncatedPublicKey } from "@/util/helper";
import { Expense } from "@/types/expense";
import { deleteExpense } from "@/util/program/deleteExpense";
import { UpdateItem } from "./UpdateItem";
import { DistributionChart } from "./DistributionChart";


export const MyExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentValues, setCurrentValues] = useState<any>({})
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2
  } = useDisclosure()


  const wallet = useAnchorWallet()
  const toast = useToast()
  useEffect(() => {

    if (!wallet) {
      setExpenses(undefined)
      return
    }
    const run = async () => {
      const data = await getExpenses(wallet as NodeWallet)
      setExpenses(data)
    }
    run()
  }, [wallet])


  const handleRemove = async (id: number) => {
    if (!wallet) {
      toast({
        status: "error",
        title: "Connect Wallet Required"
      })
      return
    }
    const sig = await deleteExpense(wallet as NodeWallet, id)
    console.log(sig)
    const data = await getExpenses(wallet as NodeWallet)
    setExpenses(data)
  }

  const handleUpdate = async (expense: Expense) => {
    setCurrentValues({
      id: expense.id,
      pubKey: expense.pubKey,
      amount: expense.amount,
      merchant: expense.merchant
    })

    onOpen2()
  }

  return (
    <Flex w="100%" h="100vh" align="start" mt="10rem" justifyContent="space-around">
      <Flex flexFlow="column" gap="2rem">
        <Button w="30%" leftIcon={<AddIcon />} onClick={onOpen} mt={4} colorScheme="blue" fontSize="1.3rem" h="3rem">
          Add new expense
        </Button>
        <Box w="100%" p="2rem 1rem" boxShadow="0px 5px 20px #f1f1f5" border="1px solid" borderColor="gray.100" borderRadius="1rem" fontSize="2rem">

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Merchant</Th>
                <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Amount</Th>
                <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Public Key</Th>
                <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {expenses && expenses.length ? expenses.map((expense: Expense, index) => (
                <Tr key={index} fontSize="1.4rem" color="gray.500" fontWeight={600}>
                  <Td>{expense.merchant}</Td>
                  <Td>${expense.amount}</Td>
                  <Td>{truncatedPublicKey(expense.pubKey)}</Td>
                  <Td>
                    <IconButton
                      h="3rem"
                      w="3rem"
                      mr="10px"
                      icon={<EditIcon style={{ width: "2rem", height: "2rem" }} />}
                      aria-label="Update expense"
                      onClick={() => handleUpdate(expense)}
                    />
                    <IconButton
                      h="3rem"
                      w="3rem"
                      bg="red.100"
                      icon={<DeleteIcon style={{ width: "2rem", height: "2rem" }} color="red" />}
                      aria-label="Remove expense"
                      onClick={async () => await handleRemove(expense.id)}
                    />
                  </Td>
                </Tr>
              )) : <Text fontSize="1.5rem" color="gray.500">Nothing to show here</Text>}
            </Tbody>
          </Table>

          <AddItem onClose={onClose} isOpen={isOpen} setExpenses={setExpenses} />
          {currentValues && <UpdateItem onClose={onClose2} isOpen={isOpen2} setExpenses={setExpenses} currentValues={currentValues} />}
        </Box>
      </Flex>
      <DistributionChart data={expenses} />

    </Flex>
  )
}
