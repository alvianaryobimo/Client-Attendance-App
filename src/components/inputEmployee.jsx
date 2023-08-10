import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react"
import Axios from "axios";

export const Input = () => {
    const toast = useToast();
    const token = localStorage.getItem("token");
    const clockIn = async () => {
        try {
            await Axios.post("http://localhost:8000/attendance/clockin", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'You are Presented!',
                description: "Have a nice day!",
                status: 'success',
                duration: 1000,
                position: "top"
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast({
                title: 'You Have Clocked In!',
                status: 'error',
                duration: 1500,
                position: "top"
            });
        }
    }
    const clockOut = async () => {
        try {
            await Axios.post("http://localhost:8000/attendance/clockout", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Thank You for Today!!',
                description: "See you Tomorrow!",
                status: 'success',
                duration: 1000,
                position: "top"
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast({
                title: 'You Have Clocked Out!',
                status: 'error',
                duration: 1500,
                position: "top"
            });
        }
    }
    return (
        <Box w={["210px",'300px', "400px"]} mt={"15px"} h={"220px"} boxShadow={"0px 0px 5px grey"} borderRadius={"5px"} border={"0px solid black"}>
            <Flex borderBottom={"1px solid #FFBD59"} w={"full"} justifyContent={"center"}>
                <Text margin={"5px"} fontFamily={"Times New Roman"} fontSize={"25px"}>Attendance</Text>
            </Flex>
            <Flex justifyContent={"center"}>
                <Textarea w={"350px"} mt={"20px"} fontFamily={"Times New Roman"} fontSize={"20px"} placeholder="Note"></Textarea>
            </Flex>
            <Flex mt={"15px"} justifyContent={"center"}>
                <Button onClick={clockIn} bg={"#FFBD59"} color={"white"}>
                    Clock In
                </Button>
                <Button onClick={clockOut} bg={"red"} color={"white"} ml={["6px", '10px', "10px"]}>
                    Clock Out
                </Button>
            </Flex>
        </Box>
    )
}