import { Avatar, Box, Flex, Img, Text, useToast } from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { BiMessageSquareAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { useSelector } from "react-redux";

export const Sidebar = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const data = useSelector((state) => state.user.value);
    const onLogout = () => {
        localStorage.removeItem("token")
        toast({
            title: "Good Bye!",
            description: "You Have Logged Out!",
            colorScheme: "red",
            status: 'success',
            duration: 1500,
            position: "top"
        });
        setTimeout(() => {
            navigate("/");
        }, 500);
    }
    return (
        <Flex justifyContent={"space-between"} direction={"column"} bg={"#FFE5AD"} w={"100px"} minH={"100vh"} boxShadow={"0px 0px 10px grey"}>
            <Box >
                <Flex pt={"6px"} mr={"5px"} justifyContent={"center"}>
                    <Img borderBottom={"2px solid #FFBD59"} w={"80px"} src="logo192.png" />
                </Flex>
                <Flex as={Link} to={"/home"} mt={"20px"} justifyContent={"center"}>
                    <AiOutlineHome size={"30px"} color="white" />
                </Flex>
                <Flex as={Link} to={"/profile"} mt={"20px"} justifyContent={"center"}>
                    <RxAvatar size={"30px"} color="white" />
                </Flex>
                <Flex as={Link} to={"/report"} mt={"20px"} justifyContent={"center"}>
                    <AiOutlineCalendar size={"30px"} color="white" />
                </Flex>
                {data.isAdmin ?
                    <Flex as={Link} to={"/employees"} mt={"20px"} justifyContent={"center"}>
                        <BiMessageSquareAdd size={"30px"} color="white" />
                    </Flex>
                    : null}
            </Box>
            <Box>
                <Flex mb={"10px"} justifyContent={"center"}>
                    <Menu isLazy>
                        <MenuButton><Avatar src={`http://localhost:8000/imgProfile/${data.imgProfile}`} /></MenuButton>
                        <MenuList boxShadow={"0px 0px 5px grey"}>
                            <MenuItem>
                                <Box mt={"2px"}>
                                    <Text fontWeight={"bold"}>{data.fullName}</Text>
                                    <Text fontSize={"12px"}>{data.email}</Text>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={onLogout} color={"red"}>Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Box>
        </Flex>
    );
}