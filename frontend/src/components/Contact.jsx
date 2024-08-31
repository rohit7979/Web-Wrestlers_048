import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import '../styles/d.css';

const Contact = () => {
  const form = useRef();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm('service_qqoak2d', 'template_54vo3sp', form.current, '8n4ZAqKngGKpmq7ZR')
      .then(
        () => {
          toast({
            title: 'Success!',
            description: 'Your message has been sent successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          form.current.reset(); // Reset the form fields after successful submission
        },
        (error) => {
          toast({
            title: 'Error',
            description: `Failed to send message. ${error.text}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className="contact-page" p={4} maxW="lg" mx="auto">
      <Box
        p="6"
        rounded="lg"
        bg="green.50"  // Changed to light green background
        boxShadow="lg"
        textAlign="center"
        borderWidth={1}
        borderColor="green.300"  // Changed to light green border
        transition="all 0.3s ease-in-out"
        _hover={{ bg: 'green.100' }}  // Changed to lighter green on hover
      >
        <Box mb="4">
          <Box as="h2" fontSize="3xl" fontWeight="bold" color="orange">
            Contact Us for Support
          </Box>
          <Box fontSize="lg" color="green" mt="2">
            We're here to help! Please fill out the form below and we'll get back to you as soon as possible.
          </Box>
        </Box>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <FormControl id="name" isRequired>
            <FormLabel color="black">Name</FormLabel>
            <Input 
              type="text" 
              name="from_name" 
              placeholder="Your Name" 
              borderColor="orange.300" 
              _placeholder={{ color: 'green' }} 
            />
          </FormControl>
          <FormControl id="email" isRequired mt="4">
            <FormLabel color="black">Email</FormLabel>
            <Input 
              type="email" 
              name="from_email" 
              placeholder="Your Email" 
              borderColor="orange.300" 
              _placeholder={{ color: 'green' }} 
            />
          </FormControl>
          <FormControl id="message" isRequired mt="4">
            <FormLabel color="black">Message</FormLabel>
            <Textarea 
              name="message" 
              resize="vertical" 
              placeholder="Your Message" 
              borderColor="orange.300" 
              _placeholder={{ color: 'green' }} 
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="orange"
            mt="4"
            isLoading={loading}
            loadingText="Sending..."
            borderRadius="md"
            bg="orange.400"  // Changed to orange background
            _hover={{ bg: 'orange.500', color: 'white' }}
            transition="all 0.3s ease-in-out"
          >
            Send
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Contact;
