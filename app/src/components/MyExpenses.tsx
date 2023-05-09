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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { AddItem } from "./AddItem";
import { getExpenses } from "@/util/program/getExpenses";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { truncatedPublicKey } from "@/util/helper";
import { Expense } from "@/types/expense";


export const MyExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useAnchorWallet()

  useEffect(() => {
    const run = async () => {
      const data = await getExpenses(wallet as NodeWallet)
      console.log(data)
      setExpenses(data)
    }
    run()
  }, [wallet])



  return (
    <Flex justifyContent="start" mt="10rem" w="100%" h="100vh" align="center" flexFlow="column" gap="1rem">
      <Button leftIcon={<AddIcon />} onClick={onOpen} mt={4} colorScheme="blue" fontSize="1.3rem" h="3rem">
        Add new expense
      </Button>
      <Box p="2rem 1rem" boxShadow="0px 5px 20px #f1f1f5" border="1px solid" borderColor="gray.100" borderRadius="1rem" w="50%" fontSize="2rem">

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
                    bg="red.100"
                    icon={<DeleteIcon style={{ width: "2rem", height: "2rem" }} color="red" />}
                    aria-label="Remove expense"
                    onClick={() => handleRemove(index)}
                  />
                </Td>
              </Tr>
            )) : <Text>Nothing to show here</Text>}
          </Tbody>
        </Table>

        <AddItem onClose={onClose} isOpen={isOpen} />
      </Box>
    </Flex>
  )
}
