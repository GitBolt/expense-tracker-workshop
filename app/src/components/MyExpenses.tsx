import { useState } from "react";
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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { AddItem } from "./AddItem";

const dummyData = [{ merchant: "Amazon", amount: 100, title: "Stuff", authority: "XYZ", pubKey: "XYZ", }, { merchant: "Walmart", amount: 500, title: "TV", authority: "XYZ", pubKey: "XYZ", },];

export const MyExpenses = () => {
  const [expenses, setExpenses] = useState(dummyData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newMerchant, setNewMerchant] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleRemove = (index: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

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
              <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Title</Th>
              <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Amount</Th>
              <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Public Key</Th>
              <Th fontSize="1.4rem" color="gray.400" fontWeight={400}>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {expenses.map((expense, index) => (
              <Tr key={index} fontSize="1.4rem" color="gray.500" fontWeight={600}>
                <Td>{expense.merchant}</Td>
                <Td>{expense.title}</Td>
                <Td>{expense.amount}</Td>
                <Td>{expense.pubKey}</Td>
                <Td>
                  {/* <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit expense"
                    mr={2}
                    onClick={() =>
                      handleEdit(
                        index,
                        "merchant",
                        prompt("Edit merchant:", expense.merchant)
                      )
                    }
                  />
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit expense"
                    mr={2}
                    onClick={() =>
                      handleEdit(
                        index,
                        "amount",
                        prompt("Edit amount:", expense.amount)
                      )
                    }
                  />
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit expense"
                    mr={2}
                    onClick={() =>
                      handleEdit(
                        index,
                        "title",
                        prompt("Edit title:", expense.title)
                      )
                    }
                  /> */}
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
            ))}
          </Tbody>
        </Table>

        <AddItem onClose={onClose} isOpen={isOpen} />
      </Box>
    </Flex>
  )
}
