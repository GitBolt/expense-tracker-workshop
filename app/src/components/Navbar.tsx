import { Flex, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic";
const Wallets = dynamic(() => import("../components/WalletButton"), { ssr: false });

export const Navbar = () => {
    return (
        <Flex zIndex="10" bg="gray.100" h="1rem" w="100%" justify="space-between" align="center" p="9">
            <Text fontSize="1.2rem" color="blue.400" fontWeight={600} bg="blue.100" padding="0.5rem 2rem" borderRadius="1rem">Expense Tracker</Text>
            <Wallets />
        </Flex>
    )
}