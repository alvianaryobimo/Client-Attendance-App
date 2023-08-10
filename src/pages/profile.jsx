import Axios from 'axios';
import * as Yup from "yup";
import { Avatar, Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react"
import { Sidebar } from "../components/sidebar"
import { useSelector } from "react-redux";
import { useState } from "react";
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';

export const Profile = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const token = localStorage.getItem("token");
    const data = useSelector((state) => state.user.value);
    const [file, setFile] = useState(null);
    const Formschema = Yup.object().shape({
        imgProfile: Yup.string()
            .required("Add image"),
    });
    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            data.append("imgProfile", file);
            await Axios.patch(`http://localhost:8000/auth/updateprofile`, data, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            toast({
                title: "Profile Updated!",
                description: "Your Profile Updated!",
                status: 'success',
                duration: 1000,
                position: "top"
            });
            setTimeout(() => {
                window.location.reload();
                navigate("/home");
            }, 1000);
        } catch (err) {
            toast({
                title: "Failed to Change your Photo Profile!",
                description: "File should be less than 1MB or File is not supported",
                status: 'error',
                duration: 3000,
                position: "top"
            });
        }
    };
    return (
        <Flex>
            <Sidebar />
            <Box mt={"15px"} ml={"20px"}>
                <Text fontFamily={"Times New Roman"} fontSize={"50px"} color={"#FFBD59"}>Profile</Text>
                <Box mt={"10px"}>
                    <Avatar size={"xl"} src={`http://localhost:8000/imgProfile/${data.imgProfile}`} />
                </Box>
                <Formik
                    initialValues={{ imgProfile: null }}
                    validationSchema={Formschema}
                    onSubmit={(value, action) => {
                        console.log(value);
                        handleCreate(value);
                    }}>
                    {(props) => {
                        return (
                            <Form>
                                <Flex mr="60px" position="relative" justifyContent="center">
                                    <Field name="imgProfile">
                                        {({ field }) => (
                                            <>
                                                <label htmlFor="customFileInput">
                                                    <Text h="25px" mt="-25px" position="absolute" fontSize="12px" as="span" bg="gray.500" color="white" px="7px" pb="5px" pt="2px" borderRadius="md" cursor="pointer" _hover={{ bg: 'orange.600' }}>
                                                        <AddIcon />
                                                    </Text>
                                                </label>
                                                <Input
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFile(e.target.files[0]);
                                                    }}
                                                    placeholder="Photo"
                                                    name="imgProfile"
                                                    type="file"
                                                    id="customFileInput"
                                                    style={{ display: 'none' }}
                                                />
                                            </>
                                        )}
                                    </Field>
                                </Flex>
                                <Flex >
                                    <Button isDisabled={!props.dirty} type="submit" w="80px" h="30px" lineHeight="30px" mt="20px" cursor="pointer" _hover={{ bg: 'orange.600' }} fontSize="17px" bg="yellow.500" color="white">Save</Button>
                                </Flex>
                            </Form>
                        );
                    }}
                </Formik>
                <Box borderTop={"2px solid #FFBD59"} mt={"20px"}>
                    <Text mt={"20px"} fontWeight={"bold"}>
                        Name
                    </Text>
                    <Text fontFamily={"Times New Roman"}>
                        {data.fullName}
                    </Text>
                    <Text fontWeight={"bold"}>
                        Email
                    </Text>
                    <Text fontFamily={"Times New Roman"}>
                        {data.email}
                    </Text>
                    <Text fontWeight={"bold"}>
                        Phone Number
                    </Text>
                    <Text fontFamily={"Times New Roman"}>
                        {data.phone}
                    </Text>
                    <Text fontWeight={"bold"}>
                        Birthdate
                    </Text>
                    <Text fontFamily={"Times New Roman"}>
                        {new Date(`${data.birthdate}`).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        })}
                    </Text>
                    <Text fontWeight={"bold"}>
                        Salary
                    </Text>
                    <Text fontFamily={"Times New Roman"}>
                        Rp. 5.000.000,00
                    </Text>
                    <Text fontWeight={"bold"}>
                        Status
                    </Text>
                    <Text fontFamily={"Times New Roman"}>
                        {data?.isAdmin ?
                            <Flex mt={"10px"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"green.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>
                                Admin
                            </Flex>
                            :
                            <Flex mt={"10px"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"green.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>
                                Employee
                            </Flex>
                        }
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}