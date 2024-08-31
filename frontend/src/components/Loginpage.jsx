import React, { useState } from 'react';
import axios from './api';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const [student_email, setEmail] = useState('');
  const [student_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { student_email, student_password });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setError('');
      setIsLoggedIn(true);
      setSuccessMessage('Successfully logged in!');
      setTimeout(() => {
        // window.location.href = '/home'; // Redirect to home page after login
        navigate('/home')
      }, 2000); // Show the success message for 2 seconds
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <Box maxW="sm" mx="auto"mb='10' p="6" boxShadow="md" borderRadius="md" bg="white">
      {successMessage ? (
        <Text fontSize="2xl" color="green.500">{successMessage}</Text>
      ) : (
        <>
          <Text fontSize="2xl" color='black'>Login</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={student_email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password"  isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  value={student_password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              {error && <Text color="red.500">{error}</Text>}
              <Button type="submit" colorScheme="green" bg="#F58634" 
      color="white" 
      w="100%" >Login</Button>
            </VStack>
          </form>
          <br />
          <p>Create an Account <Text color="blue" as={Link} to="/signup" size="md">Signup</Text></p>
          <p><Text color="blue" as={Link} to="/forgotpassword" size="md">Forgot Password</Text></p>
        </>
      )}
    </Box>
  );
};

export default LoginForm;