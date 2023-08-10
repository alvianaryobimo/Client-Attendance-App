import { Box, Flex, Text } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";
import { Clock } from "../components/clock";
import { Input } from "../components/inputEmployee";
import { ListAttendance } from "../components/listAttendance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AttendanceInput = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/")
        }
    }, []);
    return (
        <Flex>
            <Sidebar />
            <Box mt={"10px"} ml={["13px", '20px', "20px"]} mr={["7px", '0px', "0px"]}>
                <Text fontFamily={"Times New Roman"} fontSize={"40px"} color={"#FFBD59"}>Time & Attendance</Text>
                <Clock />
                <Input />
                <ListAttendance />
            </Box>
        </Flex>
    );
}