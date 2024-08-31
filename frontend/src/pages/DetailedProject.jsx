import React, { useState } from 'react';
import { Box, Heading, Text, List, ListItem, Image, Stack, Flex, VStack, useBreakpointValue, Button, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel'; // Import Carousel
import 'react-multi-carousel/lib/styles.css'; // Import Carousel styles
import '../styles/d.css'; // Import the custom CSS
import ProductCard from '../components/ProductCard';

const DetailedProject = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('selectedProject')).comments || []);

  const project = JSON.parse(localStorage.getItem('selectedProject'));

  if (!project) {
    return <Box>No project selected</Box>;
  }

  const orange = '#FFA500';  // Orange color
  const green = '#228B22';   // Green color
  const darkGrey = '#333';   // Dark grey for general text
  const darkGreen = '#006400'; // Dark green for donation details
  const lightGray = '#f4f4f4'
  const black='black'; // Light gray for row background

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { _id: Date.now(), name: 'Anonymous', message: newComment }];
      setComments(updatedComments);
      setNewComment('');
      localStorage.setItem('selectedProject', JSON.stringify({ ...project, comments: updatedComments }));
    }
  };

  // Carousel responsive settings
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Flex
      direction={useBreakpointValue({ base: 'column', md: 'row' })}
      padding={5}
      maxW="container.xl"
      mx="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      className="detailed-project-container"
    >
      {/* Project Details Section */}
      <Box
        flex="2"
        p={5}
        borderRight={{ base: 'none', md: '1px solid #e2e8f0' }}
        className="project-details"
        borderRadius="md"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
      >
        <Heading as="h1" size="xl" color={orange} mb={6}>
          {project.donation_title}
        </Heading>

        {/* Card for Project Details */}
        <Box
          p={5}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          mb={6}
          border="1px solid #e2e8f0"
        >
         <Table variant="simple" mb={6}>
          <Tbody>
            <Tr>
              <Th color={orange}>Detail</Th>
              <Th color={orange}>Value</Th>
            </Tr>
            <Tr>
              <Td color={green}>Raised</Td>
              <Td color={green}>₹{project.current_amount}</Td>
            </Tr>
            <Tr>
              <Td color={green}>Target</Td>
              <Td color={green}>₹{project.goal_amount}</Td>
            </Tr>
            <Tr>
              <Td color={green}>Created by</Td>
              <Td color={green}>{project.student_name}</Td>
            </Tr>
            <Tr>
              <Td color={green}>Created on</Td>
              <Td color={green}>{format(new Date(project.time_of_creation), 'dd/MM/yyyy')}</Td>
            </Tr>
            <Tr>
              <Td color={green}>Deadline</Td>
              <Td color={green}>{format(new Date(project.donation_deadline), 'dd/MM/yyyy')}</Td>
            </Tr>
          </Tbody>
        </Table>

        </Box>

        {/* <Heading as="h3" size="lg" mb={4} color={orange}>
          Updates on Donation:
        </Heading> */}
        <List spacing={3} mb={6}>
          {project.updates_on_donation.map((update, index) => (
            <ListItem key={index} color={green} fontSize="md">{update}</ListItem>
          ))}
        </List>

        {/* Carousel for Media Images */}
        {/* <Heading as="h3" size="lg" mb={4} color={orange}>
          Media Images:
        </Heading> */}
        <Carousel responsive={responsive} showDots={true} infinite={true} autoPlay={true}>
          {project.media_images.map((image, index) => (
            <Box key={index} p={2}>
              <Image
                src={`path_to_images/${image}`}
                alt={`Media ${index + 1}`}
                borderRadius="lg"
                boxSize="100%"
                objectFit="cover"
                transition="all 0.3s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
          ))}
        </Carousel>

        <Heading as="h3" size="lg" mb={4} color={orange}>
          Current Donators:
        </Heading>
        <Table variant="simple" mb={6}>
          <Thead>
            <Tr>
              <Th color={orange}>Name</Th>
              <Th color={orange}>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {project.current_donators.map((donator) => (
              <Tr key={donator._id} _hover={{ bg: lightGray }}>
                <Td color={green}>{donator.name}</Td>
                <Td color={green}>₹{donator.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Heading as="h3" size="lg" mb={4} color={orange}>
          Comments:
        </Heading>
        <Table variant="simple" mb={6}>
          <Thead>
            <Tr>
              <Th color={orange}>Name</Th>
              <Th color={orange}>Comment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment) => (
              <Tr key={comment._id} _hover={{ bg: lightGray }}>
                <Td color={green}>{comment.name}</Td>
                <Td color={green}>{comment.message}</Td>
              </Tr>
              
            ))}
          </Tbody>
        </Table>
        <FormControl mt={4}>
          <FormLabel htmlFor="new-comment" color={orange}>Add a Comment</FormLabel>
          <Input
            id="new-comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            mb={4}
            size="md"
            color={darkGrey}
          />
          <Button
            colorScheme="orange"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Add Comment
          </Button>
        </FormControl>
        
      </Box>

      {/* Donation Section */}
      <Box
        flex="1"
        p={5}
        className="donation-section"
        borderRadius="md"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
      >
        <VStack spacing={6} align="center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT11jD5dUOEtRNSTwJWZ5SDn38BnrxYYbJBrHLMDhLZhuQzFrTwGvqio-8X5Q&s"
            alt="Scanner"
            boxSize="200px"
            mb={6}
            transition="all 0.3s ease-in-out"
            _hover={{ transform: 'scale(1.1)' }}
          />
          <Text fontSize="2xl" color={orange} mb={4}>Current Fund: ₹{project.current_amount}</Text>
          <Text fontSize="2xl" color={orange} mb={6}>Goal Amount: ₹{project.goal_amount}</Text>
          <ProductCard />
        </VStack>
      </Box>
      
    </Flex>
  );
};

export default DetailedProject;
