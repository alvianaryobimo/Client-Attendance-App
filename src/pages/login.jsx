import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Img } from '@chakra-ui/react';
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { AdminLogin } from '../components/adminLogin';
import { EmployeeLogin } from '../components/employeeLogin';

export const Login = () => {
    return (
        <>
            <Flex w={"full"} h={"100vh"} bgGradient="linear(#FFE5AD, #FFD06D)" justifyContent={"center"}>
                <Box margin={"auto"} bg={"white"} w={{ base: '250px', md: '500px', lg: '600px', xl: "600px" }} h={"500px"} border={"2px solid"} borderColor={"black"} borderRadius={"10px"} boxShadow={"0px 0px 10px black"} justifyContent={"center"}>
                    <Flex justifyContent={"center"}>
                        <Heading mt={{ base: '58px', md: '55px', lg: '45px' }} color={"#FFBD59"} fontSize={{ base: '30px', md: '40px', lg: '60px', xl: "60px" }} fontFamily={"Times New Roman"}>LOGIN</Heading>
                        <Img mt={{ base: '25px', md: '30px', lg: '25px' }} w={"100px"} src="logo192.png"></Img>
                    </Flex>
                    <Flex mt={"20px"} fontSize={"25px"} color={"#D5AD18"} justifyContent={"center"} >
                        <Text display={"flex"} fontFamily={"Times New Roman"}>Login As</Text>
                    </Flex>
                    <Tabs mt={"25px"} align={"center"} variant="unstyled">
                        <TabList>
                            <Tab fontFamily={"Times New Roman"} fontSize={{ base: '11px', md: '18px', lg: '18px' }}>Employee</Tab>
                            <Text color={"#D5AD18"} mt={{ base: '6px', md: '5px', lg: '7px' }} fontSize={{ base: '11px', md: '20px', lg: '18px' }}>or</Text>
                            <Tab fontFamily={"Times New Roman"} fontSize={{ base: '11px', md: '18px', lg: '18px' }}>Admin</Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="2px" bg="#FFBD59" borderRadius="1px" />
                        <TabPanels>
                            <TabPanel>
                                <EmployeeLogin />
                            </TabPanel>
                            <TabPanel>
                                <AdminLogin />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </>
    );
}