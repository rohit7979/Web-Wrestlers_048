import React, { useState } from 'react';
import axios from 'axios';
import { HStack, Input, Button, useToast,Box } from '@chakra-ui/react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('resetToken');
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post('http://localhost:9090/user/changePassword', {newPassword}, config);
      toast({
        title: 'Success',
        description: response.data,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Optionally, redirect to login page or home page
      window.location.href = '/login';
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

  return (
  <Box maxW="sm" mx="auto" mt="30" p="6" boxShadow="md" borderRadius="md" bg="white">
      <HStack spacing={2} as="form" onSubmit={handleSubmit} flexWrap="wrap">
        
        <Button type="submit" colorScheme="teal" flex="none">
          Change Password
        </Button>
      </HStack>
    </Box>
  );
};

export default ChangePassword;
