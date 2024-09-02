import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Image,
  Progress,
  SimpleGrid,
  Heading,
  Stack,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import pic from '../../images/kids1.png';
import kids from '../../images/charity1.png';
import lg from '../../images/logo_transparent.png';

export const HomePage = () => {
  const [selectedContent, setSelectedContent] = useState('EDUCATE');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const content = {
    'START FREE FUNDING': (
      <VStack align="flex-start" spacing="4">
        <Text>Your donations directly fund the education of underprivileged students.</Text>
        <Text>Every contribution helps provide essential resources like books, uniforms, and tuition fees.</Text>
        <Text>With your support, we can ensure that no child is deprived of education due to financial constraints.</Text>
        <Text>Your generosity helps bridge the gap between potential and opportunity. Invest in education today to empower the leaders of tomorrow.</Text>
      </VStack>
    ),
    'EDUCATE': (
      <VStack align="flex-start" spacing="4">
        <Text>Education is a powerful tool that can transform lives and uplift communities.</Text>
        <Text>Your support ensures that financial constraints do not hinder a child's opportunity to learn and grow.</Text>
        <Text>Every donation helps create a brighter future for students who are the first in their families to pursue higher education.</Text>
        <Text>Together, we can make a significant impact and empower the next generation through education.</Text>
      </VStack>
    ),
    'ENHANCE': (
      <VStack align="flex-start" spacing="4">
        <Text>Enhancing the quality of education is vital for the overall development of students.</Text>
        <Text>Your contributions help us improve school facilities and provide better learning environments.</Text>
        <Text>Funds also support rural girls, helping them gain confidence and become self-sufficient.</Text>
        <Text>Together, we can ensure that students not only pursue their education but also excel in it, leading to professional success.</Text>
      </VStack>
    ),
    'EMPLOYMENT': (
      <VStack align="flex-start" spacing="4">
        <Text>Today's students, supported by your donations, are tomorrow's employees and leaders.</Text>
        <Text>By helping students raise funds, you enable them to pursue education and build successful careers.</Text>
        <Text>Your contributions help educate rural girls, preventing early marriages and making them self-sufficient and employable.</Text>
        <Text>Join us in creating a future where every student, with the support of generous donors like you, becomes a valuable member of the workforce.</Text>
      </VStack>
    ),
  };

  useEffect(() => {
    fetch('https://backend-render-7zzl.onrender.com/projects')
      .then((response) => response.json())
      .then((data) => {
        const activeDonations = data.filter(
          (project) => project.donation_active_status === true
        );
        setData(activeDonations);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (project) => {
    localStorage.setItem('selectedProject', JSON.stringify(project));
    navigate('/detailedProject');
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Skeleton height="20px" width="50%" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Error: {error.message}</Text>
      </Flex>
    );
  }

  return (
    <Box>
      <div id="home">
        <img src={pic} alt="kids" />
      </div>
      <div className="description">
        <p>
          Students from all backgrounds deserve access to quality education and opportunities. Unfortunately, many are deprived of these due to financial constraints. Fundmitra is dedicated to creating a supportive environment where students can thrive academically. Our platform enables students to raise the necessary funds for their education through community donations. By contributing to Fundmitra, you can help ensure that bright students, regardless of their economic status, can pursue their dreams. With your support, these students can focus on their studies, excel in their educational pursuits, and ultimately break the cycle of poverty for their families. Join us in empowering the next generation of scholars and making a lasting impact on their lives.
        </p>
      </div>
      
      <Box py="8" px={{ base: '4', md: '16' }}>
        <Flex justify="center">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing="6"
            w={{ base: '100%', md: '80%' }}
            bg="white"
            boxShadow="xl"
            p="8"
            borderRadius="md"
          >
            <VStack align="flex-start" spacing="4" w={{ base: '100%', md: '30%' }}>
              {Object.keys(content).map((key) => (
                <Button
                  key={key}
                  variant={selectedContent === key ? 'solid' : 'outline'}
                  bg={selectedContent === key ? 'teal.500' : 'white'}
                  color={selectedContent === key ? 'white' : 'teal.600'}
                  w="100%"
                  onClick={() => setSelectedContent(key)}
                  _hover={{ bg: 'teal.400', color: 'white' }}
                >
                  {key}
                </Button>
              ))}
            </VStack>
            <Box flex="1">
              <Heading size="md" mb="4">
                {selectedContent}
              </Heading>
              {content[selectedContent]}
            </Box>
          </Stack>
        </Flex>
      </Box>
      
      <Box py="8" bg={useColorModeValue('gray.50', 'gray.800')}>
        <Heading textAlign="center" mb="6">
          Featured Projects
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" px={{ base: '4', md: '16' }}>
          {Array.isArray(data) &&
            data.map((project) => (
              <Box
                key={project._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="6"
                bg={useColorModeValue('white', 'gray.700')}
                shadow="lg"
                transition="all 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
                cursor="pointer"
                onClick={() => handleCardClick(project)}
              >
                <Image
                  src={lg}
                  alt="user logo"
                  borderRadius="full"
                  boxSize="80px"
                  mx="auto"
                  mb="4"
                />
                <Text fontWeight="bold" fontSize="xl" textAlign="center" mb="2">
                  {project.donation_title}
                </Text>
                <Text textAlign="center" mb="4">
                  {project.donation_discription}
                </Text>
                <Progress
                  value={(project.current_amount / project.goal_amount) * 100}
                  size="sm"
                  colorScheme="green"
                  mb="4"
                />
                <Flex justify="space-between" mt="4">
                  <Text color="green.500" fontWeight="500">
                    Raised: ₹{project.current_amount}
                  </Text>
                  <Text color="#f78633" fontWeight="500">
                    Target: ₹{project.goal_amount}
                  </Text>
                </Flex>
                <Text mt="4" textAlign="center">
                  Created by: {project.student_name}
                </Text>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
      
      <Box bg="teal.600" py="12" color="white" textAlign="center">
        <Heading as="h3" fontSize="2xl" mb="4">
          "Investing in education is the most powerful way to create a brighter future."
        </Heading>
        <Image src={kids} alt="kids" mx="auto" borderRadius="md" />
      </Box>
    </Box>
  );
};

export default HomePage;
