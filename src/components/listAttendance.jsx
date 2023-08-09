import Axios from "axios"
import { Avatar, Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react";


export const ListAttendance = () => {
    const token = localStorage.getItem("token");
    const [log, setLog] = useState();
    const handleInfo = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/attendance/log", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
            setLog(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const logDate = new Date(log?.clockIn);
    const logTime = new Date(logDate.getTime() - (7 * 3600 * 1000));
    const logDateOut = new Date(log?.clockOut);
    const logTimeOut = new Date(logDateOut.getTime() - (7 * 3600 * 1000));

    useEffect(() => {
        handleInfo();
    }, []);
    return (
        <>
            <Box bgGradient="linear(#FFE5AD, #FFD06D)" w={"400px"} mt={"25px"} h={"150px"} borderRadius={"8px"} border={"0px solid black"}>
                <Text fontFamily={"Times New Roman"} display={"flex"} justifyContent={"center"} pt={"5px"} fontWeight={"bold"} fontSize={"20px"}>
                    Attendance Log
                </Text>
                {log?.clockIn ?
                    <>
                        <Flex px={"20px"} justifyContent={"space-between"}>
                            <Box>
                                <Text mt={"10px"} fontWeight={"bold"}>
                                    {new Date(`${logTime}`).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </Text>
                                <Text fontSize={"12px"}>
                                    {new Date(`${logTime}`).toLocaleDateString("id-ID", {
                                        month: "short",
                                        day: "2-digit"
                                    })}
                                </Text>
                            </Box>
                            <Flex mt={"17px"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"green.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Clock In</Flex>
                        </Flex>
                    </>
                    : <Flex mt={"23px"} justifyContent={"center"}>
                        <Text fontFamily={"Times New Roman"}>You Haven't Clocked In</Text>
                    </Flex>
                }
                {log?.clockOut ?
                    <>
                        <Flex px={"20px"} justifyContent={"space-between"}>
                            <Box>
                                <Text mt={"10px"} fontWeight={"bold"}>
                                    {new Date(`${logTimeOut}`).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </Text>
                                <Text fontSize={"12px"}>
                                    {new Date(`${logTimeOut}`).toLocaleDateString("us-US", {
                                        month: "short",
                                        day: "2-digit"
                                    })}
                                </Text>
                            </Box>
                            <Flex mt={"17px"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"red.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Clock Out</Flex>
                        </Flex>
                    </>
                    : <Flex mt={"15px"} justifyContent={"center"}>
                        <Text color={"red"} fontFamily={"Times New Roman"}>You Haven't Clocked Out</Text>
                    </Flex>}
            </Box>
            {/* <Flex mt={"30px"} justifyContent={"center"}>
            <TableContainer>
            <Table variant='simple'>
                        <Thead>
                        <Tr>
                        <Th textAlign={"center"}>Avatar</Th>
                        <Th textAlign={"center"}>Name</Th>
                        <Th textAlign={"center"}>Date</Th>
                        <Th textAlign={"center"}>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td textAlign={"center"}><Avatar /></Td>
                                <Td textAlign={"center"}>Alvian Aryo Bimo</Td>
                                <Td textAlign={"center"}>
                                    <Text fontWeight={"bold"}>
                                        08.45 AM
                                    </Text>
                                    <Text fontSize={"12px"}>
                                        10 Nov
                                    </Text>
                                </Td>
                                <Td textAlign={"center"}><Flex boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"green.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Working</Flex></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex> */}
        </>
    )
}