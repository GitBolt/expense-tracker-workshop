import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic";
const Wallets = dynamic(() => import("../components/WalletButton"), { ssr: false });

export const Navbar = () => {
    return (
        <Flex zIndex="10" bg="gray.100" h="6rem" w="100%" justify="end" align="center" p="10">
            <Wallets />
        </Flex>
    )
}