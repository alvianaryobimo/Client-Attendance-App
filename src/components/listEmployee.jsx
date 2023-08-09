import Axios from "axios";
import { Avatar, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ListEmployee = () => {
    const [data, setData] = useState();
    const getEmployee = async (data) => {
        try {
            const response = await Axios.get("http://localhost:8000/admin", data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        getEmployee()
    }, [])
    return (
        <TableContainer>
            <Table variant='striped' colorScheme="orange">
                <Thead>
                    <Tr>
                        <Th textAlign={"center"}>Avatar</Th>
                        <Th textAlign={"center"}>Fullname</Th>
                        <Th textAlign={"center"}>Email</Th>
                        <Th textAlign={"center"}>Phone Number</Th>
                        <Th textAlign={"center"}>Birthdate</Th>
                        <Th textAlign={"center"}>Role</Th>
                        <Th textAlign={"center"}>Salary (Rp)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((item) => {
                        return (
                            <Tr>
                                <Td textAlign={"center"}><Avatar src={`http://localhost:8000/imgProfile/${item.imgProfile}`} /></Td>
                                <Td textAlign={"center"}>{item.fullName}</Td>
                                <Td textAlign={"center"}>{item.email}</Td>
                                <Td textAlign={"center"}>{item.phone}</Td>
                                <Td textAlign={"center"}>{new Date(`${item.birthdate}`).toLocaleDateString("id-ID", {
                                    year: "2-digit",
                                    month: "short",
                                    day: "2-digit"
                                })}</Td>
                                <Td textAlign={"center"}>
                                    <Flex boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"teal.300"} h={"30px"} w={"140px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>{item.Role.position}</Flex>
                                </Td>
                                <Td textAlign={"center"}>{item.Role.salary}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}