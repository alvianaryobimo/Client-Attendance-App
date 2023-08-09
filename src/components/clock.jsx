import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

export const Clock = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = currentDateTime.toLocaleTimeString();
    const formattedDate = currentDateTime.toDateString();

    return (
        <Box>
            <Text fontFamily={"Times New Roman"} fontSize="2xl">Clock and Date</Text>
            <Text fontFamily={"Times New Roman"} fontWeight={"bold"} fontSize="lg">{formattedDate}</Text>
            <Text fontWeight={"bold"} fontSize="xl">{formattedTime}</Text>
        </Box>
    );
};
