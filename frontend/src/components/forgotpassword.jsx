// import React, { useState } from 'react';
// import {
//   PinInput,
//   PinInputField,
//   VStack,
//   Button,
//   useToast,
// } from '@chakra-ui/react';

// const ForgotPassword = () => {
//   const [pin, setPin] = useState('');
//   const toast = useToast();

//   const handleChange = (value) => {
//     setPin(value);
//   };

//   const handleComplete = (value) => {
//     console.log('Completed PIN:', value);
//     // Add your logic here for what happens when the PIN is complete
//     // For example, you can send this PIN to your backend for verification
//     toast({
//       title: 'PIN Entered.',
//       description: `Your entered PIN is ${value}`,
//       status: 'success',
//       duration: 5000,
//       isClosable: true,
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Submitted PIN:', pin);
//     // Add your submit logic here
//     // This could involve sending the PIN to your backend to validate and reset the password
//   };

//   return (
//     <VStack spacing={4}>
//       <PinInput value={pin} onChange={handleChange} onComplete={handleComplete}>
//         <PinInputField />
//         <PinInputField />
//         <PinInputField />
//         <PinInputField />
//       </PinInput>
//       <Button onClick={handleSubmit} colorScheme="teal">
//         Submit
//       </Button>
//     </VStack>
//   );
// };

// export default ForgotPassword;

// import React, { useState } from 'react';
// import axios from './api';
// import { useHistory } from 'react-router-dom';

// const RequestOtpForm = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/send-otp', { email });
//       setMessage(response.data);
//       history.push('/verify-otp', { email }); // Pass email to the next component
//     } catch (error) {
//       setMessage(error.response.data);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </label>
//         <button type="submit">Send OTP</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default RequestOtpForm;


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
