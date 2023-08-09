import AddEmployee from "../components/addEmployee"
import { Box, Flex, Text } from "@chakra-ui/react"

export const Register = () => {
    return (
        <Flex bgGradient="linear(#FFD06D,#FFE5AD)" w={"full"} h={"100vh"} justifyContent={"center"}>
            <Box boxShadow={"0px 0px 5px grey"} borderRadius={"10px"} bor margin={"auto"} bg={"white"} w={"500px"} h={"200px"}>
                <Flex mt={"12px"} justifyContent={"center"}>
                    <Text fontFamily={"Times New Roman"} fontSize={"50px"} color={"#FFBD59"}>Add Employee</Text>
                </Flex>
                <Flex justifyContent={"center"}>
                    <Text fontFamily={"Times New Roman"} fontSize={"12px"} color={"black"}>Click this button below!</Text>
                </Flex>
                <Flex justifyContent={"center"}>
                    <AddEmployee />
                </Flex>
            </Box>
        </Flex>
    )
}