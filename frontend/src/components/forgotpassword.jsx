import React, { useState } from 'react';
import axios from './api';
import { PinInput, PinInputField, VStack, Button, useToast, Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [student_email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [password, setNewPassword] = useState("");
    const toast = useToast();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/send-otp', { student_email });
            setIsOtpSent(true);
            toast({
                title: 'OTP Sent',
                description: response.data,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    const handleOtpComplete = async (value) => {
        try {
            const response = await axios.post('/verify-otp', { student_email, otp: value, password });
            toast({
                title: 'Success',
                description: response.data,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            localStorage.setItem('resetToken', response.data.token);
            // Redirect to change password page
            navigate("/login");
            // Redirect to reset password page or home page
        } catch (error) {
            toast({
                title: 'Error',
                description: "Something went wrong :(",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        < Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md" bg="white">
            <VStack spacing={4}>
                {!isOtpSent ? (
                    <form onSubmit={handleEmailSubmit}>
                        <FormControl id="password" mt="4" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={student_email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required /><br />
                            <Button type="submit" colorScheme="teal" bg="green"  mt="2">
                                Send OTP
                            </Button>
                        </FormControl>
                    </form>

                ) : (
                    <>
                      <Box display="flex" gap="2px" alignItems="center">
                        <PinInput value={otp} onChange={handleOtpChange} >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                        </Box>
                        <Input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            flex="1"
                            minW="200px"
                            
                        />
                        <Button onClick={() => handleOtpComplete(otp)} colorScheme="teal" bg="#F68631" >
                            Verify OTP
                        </Button>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default ForgotPassword;
