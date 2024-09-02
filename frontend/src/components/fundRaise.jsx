import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack, Heading, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FundRaise() {
    const toast = useToast();
    const [input, setInput] = useState({
        current_amount: 0,
        media_images: [],
        goal_amount: "",
        donation_active_status: true,
        donation_title: "",
        donation_discription: "",
        student_age: "",
        donation_deadline: "",
        time_of_creation: new Date(),
    });
    const [lastPage, setLastPage] = useState(false);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };

    const validatePageOne = () => {
        return input.goal_amount && input.student_age;
    };

    const validatePageTwo = () => {
        return input.donation_title && input.donation_discription && input.donation_deadline;
    };

    const handleNext = () => {
        if (!lastPage && validatePageOne()) {
            setLastPage(true);
        } else if (lastPage && validatePageTwo()) {
            postProject();
        } else {
            toast({
                title: "Please fill in all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    async function postProject() {
        try {
            const res = await axios.post("https://backend-render-7zzl.onrender.com/project/update", input, config);
            toast({
                title: `Submission ${res.data.status}`,
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (err) {
            toast({
                title: `Internal Error Occurred`,
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            console.error(err);
        }
    }

    return (
        <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
            <Box w={{ base: "90%", md: "60%", lg: "50%" }} p={8} boxShadow="lg" bg="white" borderRadius="md">
                <Heading as="h2" size="lg" textAlign="center" mb={8}>Setup Fundraiser</Heading>
                <form onSubmit={(e) => e.preventDefault()}>
                    <VStack spacing={6}>
                        {!lastPage && (
                            <Box w="100%">
                                <FormControl id="goal_amount" isRequired>
                                    <FormLabel>Estimated Cost</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder="Estimated Cost"
                                        name="goal_amount"
                                        value={input.goal_amount}
                                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                        required
                                    />
                                </FormControl>
                                <FormControl id="age" mt={4} isRequired>
                                    <FormLabel>Age</FormLabel>
                                    <Input
                                        name="student_age"
                                        type="number"
                                        placeholder="Age"
                                        value={input.student_age}
                                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                        required
                                    />
                                </FormControl>
                            </Box>
                        )}
                        {lastPage && (
                            <Box w="100%">
                                <FormControl id="donation_title" isRequired>
                                    <Input
                                        type="text"
                                        placeholder="Name your fundraiser"
                                        name="donation_title"
                                        value={input.donation_title}
                                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                        required
                                    />
                                </FormControl>
                                <FormControl id="donation_discription" mt={4} isRequired>
                                    <Textarea
                                        placeholder="Write your story. Keep it simple, personal, and about the specific use of funds"
                                        name="donation_discription"
                                        value={input.donation_discription}
                                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                        required
                                        minHeight="150px"
                                    />
                                </FormControl>
                                <FormControl id="donation_deadline" mt={4} isRequired>
                                    <FormLabel>When do you need funds?</FormLabel>
                                    <Input
                                        name="donation_deadline"
                                        type="date"
                                        value={input.donation_deadline}
                                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                        required
                                    />
                                </FormControl>
                            </Box>
                        )}
                        <Button
                            backgroundColor="#f68631"
                            color="white"
                            onClick={handleNext}
                            w="full"
                        >
                            {lastPage ? "Submit" : "Next"}
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}
