import Axios from "axios";
import * as Yup from "yup";
import { Box, Button, Flex, Input, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, ErrorMessage, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setValue } from "../redux/userSlice";

export const AdminLogin = () => {
    const [success, setSuccess] = useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email addres format")
            .required("Write your Email"),
        password: Yup.string()
            .required("Password is required")
    });
    const handleSubmit = async (data1) => {
        try {
            const response = await Axios.post("  http://localhost:8000/auth/adminlogin", data1);
            dispatch(setValue(response.data.user));
            localStorage.setItem("token", response.data.token);
            setSuccess(true);
            navigate("/home");
            toast({
                title: "Welcome!",
                description: "Login Success!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            });
        } catch (err) {
            toast({
                title: "Access Denied!",
                description: err.response.data.error.message,
                status: "error",
                duration: 2500,
                isClosable: true,
                position: "top"
            });
        }
    }
    useEffect(() => {
        if (token) {
            navigate("/home")
        }
    }, []);
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(value, action) => {
                handleSubmit(value);
                if (success) action.resetForm();
            }}>
            {(props) => {
                return (
                    <Box as={Form}>
                        <Flex justifyContent={"center"}>
                            <VStack>
                                <Field as={Input} name="email" w={{ base: '180px', md: '400px', lg: '400px' }} placeholder="Email" size={"md"} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
                                <ErrorMessage component="box" name="email" style={{ color: "red", marginTop: "-8px" }} />
                            </VStack>
                        </Flex>
                        <Flex ml={{ base: '33px', md: '30px', lg: '30px' }} mt={"10px"} justifyContent={"center"}>
                            <VStack>
                                <Field as={Input} name="password" w={{ base: '180px', md: '400px', lg: '400px' }} placeholder="Password" size={"md"} type={show ? 'text' : 'password'} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
                                <ErrorMessage
                                    component="box"
                                    name="password"
                                    style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                            </VStack>
                            <Button right={"30px"} variant={"unstyled"} size='sm' onClick={handleClick}>
                                {show ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </Flex>
                        <Flex mt={"30px"} justifyContent={"center"}>
                            <Button isDisabled={!props.dirty} type="submit" fontFamily={"Times New Roman"} boxShadow='0px 0px 6px black' color={"black"} bgGradient="linear(#FFEA61, #FFC900)" w={"200px"}>
                                Login
                            </Button>
                        </Flex>
                    </Box>
                );
            }}
        </Formik>
    );
};