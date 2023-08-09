import Axios from "axios";
import { Avatar, Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useSelector } from "react-redux";

export const ReportAttendance = () => {
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const token = localStorage.getItem("token");
    const redux = useSelector((state) => state.user.value);
    const getEmployee = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/attendance/report", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        };
    };
    const getSalary = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/attendance/cutsalary", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData2(response.data.results);
            console.log(response.data.results);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        getSalary();
        getEmployee();
    }, [])
    return (
        <Flex>
            <Sidebar />
            <Box ml={"20px"}>
                <Text fontFamily={"Times New Roman"} fontSize={"50px"} color={"#FFBD59"}>Attendance Report</Text>
                <Flex mt={"20px"}>
                    <Text><Avatar src={`http://localhost:8000/imgProfile/${redux.imgProfile}`} /></Text>
                    <Box mt={"2px"} ml={"5px"}>
                        <Text fontWeight={"bold"}>{redux.fullName}</Text>
                        <Text fontSize={"13px"}>{redux.email}</Text>
                    </Box>
                </Flex>
                <TableContainer>
                    <Table mt={"20px"} variant='striped' colorScheme="orange">
                        <Thead>
                            <Tr>
                                <Th textAlign={"center"}>Date</Th>
                                <Th textAlign={"center"}>Clock In</Th>
                                <Th textAlign={"center"}>Clock Out</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((item) => {
                                return (
                                    <Tr>
                                        <Td textAlign={"center"}>{new Date(`${item.clockIn}`).toLocaleDateString("us-US", {
                                            month: "long",
                                            day: "2-digit"
                                        })}</Td>
                                        {item.clockIn ?
                                            <Td textAlign={"center"}>{(item.clockIn).substring(11, 16)}</Td>
                                            : <Text>Haven't Clocked In</Text>
                                        }
                                        {item.clockOut ?
                                            <Td textAlign={"center"}>{(item.clockOut).substring(11, 16)}</Td>
                                            : <Td color={"red"}>Haven't Clocked Out</Td>
                                        }
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                {data2?.map((item) => {
                    return (
                        <Box bg={"#FFD06D"} borderRadius={"5px"} px={"10px"} w={"250px"} h={"70px"} mt={"20px"} border={"0px solid black"}>
                            <Flex justifyContent={"space-between"}>
                                <Text pt={"10px"} fontWeight={"bold"}>Potong Gaji</Text>
                                <Text pt={"7px"} textAlign={"end"} fontSize={"10px"} color={"red"} fontStyle={"italic"}>*Potong Gaji <br />
                                apabila tidak clock out</Text>
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Text> Rp, {item.fee}</Text>
                                <Text>{new Date(`${item.clockIn}`).toLocaleDateString("us-US", {
                                    month: "long",
                                    day: "2-digit"
                                })}</Text>
                            </Flex>
                        </Box>
                    )
                })}
            </Box>
        </Flex>
    );
}