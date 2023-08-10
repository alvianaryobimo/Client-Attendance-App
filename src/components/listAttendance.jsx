import Axios from "axios"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export const ListAttendance = () => {
    const token = localStorage.getItem("token");
    const [log, setLog] = useState();
    const handleInfo = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/attendance/log", {
                headers: { Authorization: `Bearer ${token}` },
            });
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
            <Box bgGradient="linear(#FFE5AD, #FFD06D)" w={["210px",'300px', "400px"]}  mt={"25px"} h={"150px"} borderRadius={"8px"} border={"0px solid black"}>
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
        </>
    )
}