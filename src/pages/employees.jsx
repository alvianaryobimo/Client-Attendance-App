import Axios from "axios";
import { Box, Button, Flex, FormLabel, Input, Select, Text, useToast } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";
import { ListEmployee } from "../components/listEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Employees = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [data, setData] = useState();
    const { token } = useParams();
    const header = {
        Authorization: `Bearer ${token}`
    }

    const roles = async () => {
        try {
            const response = await Axios.get("http://localhost:8000/admin/employeesrole",)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const sendEmail = async () => {
        try {
            await Axios.post("http://localhost:8000/admin/sendemail", {
                email: email,
            }, { headers: header });
            toast({
                title: "Sent to your Employee's Email!",
                description: "Inform your Employee for Register!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            });
            setTimeout(() => {
                window.location.reload();
                navigate("/employees");
            }, 2500)
        } catch (err) {
            toast({
                title: "Error!",
                status: "error",
                duration: 2500,
                isClosable: true,
                position: "top"
            });

        }
    }
    useEffect(() => {
        roles()
    }, [])
    return (
        <Flex>
            <Sidebar />
            <Box ml={"20px"}>
                <Text fontFamily={"Times New Roman"} fontSize={"40px"} color={"#FFBD59"}>Employees List</Text>
                <Box mt={"20px"} borderRadius={"10px"} border={"0px solid black"} w={"450px"} h={"195px"} boxShadow={"0px 0px 5px grey"}>
                    <FormLabel ml={"10px"} pt={"12px"}>Add Employee's Email for Register</FormLabel>
                    <Input variant={"flushed"}
                        value={email}
                        onChange={(input) => setEmail(input.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                sendEmail();
                            }
                        }}
                        ml={"10px"} w={"400px"} placeholder="Email" />
                    {/* <Select mt={"10px"} ml={"10px"} w={"400px"} placeholder='Select Roles'>
                        {data?.map((item) => {
                            return (
                                <option value='option1'>{item.position}</option>
                            )
                        })}
                    </Select> */}
                    <Button type="submit" onClick={sendEmail} ml={"10px"} bg={"#FFBD59"} mt={"10px"}>Send</Button>
                </Box>
                <Flex mt={"10px"}>
                    <ListEmployee />
                </Flex>
            </Box>
        </Flex>
    );
}