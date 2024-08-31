import React, { useState } from 'react';
import axios from './api'; 
import { FormControl, FormLabel, Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [student_name, setName] = useState('');
  const [student_email, setEmail] = useState('');
  const [student_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', { student_name, student_email, student_password });
      console.log(response);
      setSuccess('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <>

    <Box maxW="sm" mx="auto" p="6" boxShadow="md" borderRadius="md" bg="white">
      <Text fontSize="2xl" textAlign="center">Register</Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={student_name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={student_email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={student_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          
          <Button type="submit" colorScheme="teal" width="full" bg="#F68631">Register</Button>
        </VStack>
      </form>
      
      <Text mt="4" textAlign="center">
        Already have an account?{' '}
        <Text as={Link} to="/login" color="blue.500" fontWeight="bold" textDecoration="underline">
          Login
        </Text>
      </Text>
    </Box>
              </>
  );
};

export default RegisterForm;