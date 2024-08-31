import React, { useState, useEffect } from 'react';
import { Box, Flex, VStack, Text, Button, Image, Progress } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import pic from '../../images/kids.jpg';
import kids from '../../images/charity.jpg';
import lg from '../../images/logo_transparent.png';

export const HomePage = () => {
  const [selectedContent, setSelectedContent] = useState('EDUCATE');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const content = {
    'START FREE FUNDING': (
      <VStack align="flex-start" spacing="2">
        <Text>Your donations directly fund the education of underprivileged students.</Text>
        <Text>Every contribution helps provide essential resources like books, uniforms, and tuition fees.</Text>
        <Text>With your support, we can ensure that no child is deprived of education due to financial constraints.</Text>
        <Text>By funding education, you are not only helping individuals but also contributing to the betterment of society.</Text>
        <Text>Together, we can create a future where every child has the opportunity to learn and grow.</Text>
        <Text>Your generosity helps bridge the gap between potential and opportunity. Invest in education today to empower the leaders of tomorrow.</Text>
      </VStack>
    ),
    'EDUCATE': (
      <VStack align="flex-start" spacing="2">
        <Text>Education is a powerful tool that can transform lives and uplift communities.</Text>
        <Text>By contributing to our cause, you are helping to provide essential resources like books, uniforms, and tuition fees for underprivileged students.</Text>
        <Text>Your support ensures that financial constraints do not hinder a child's opportunity to learn and grow.</Text>
        <Text>Every donation helps create a brighter future for students who are the first in their families to pursue higher education.</Text>
        <Text>We do not expect any monetary return; your generosity is the true reward as it brings hope and opportunity to those in need.</Text>
        <Text>Together, we can make a significant impact and empower the next generation through education.</Text>
      </VStack>
    ),
    'ENHANCE': (
      <VStack align="flex-start" spacing="2">
        <Text>Enhancing the quality of education is vital for the overall development of students.</Text>
        <Text>Your contributions help us improve school facilities and provide better learning environments.</Text>
        <Text>We focus on providing additional resources like extracurricular activities, mentorship programs, and skill-building workshops.</Text>
        <Text>Funds also support rural girls, helping them gain confidence and become self-sufficient.</Text>
        <Text>With your help, we collaborate with junior colleges and schools to ensure students from poor backgrounds receive quality education.</Text>
        <Text>Together, we can ensure that students not only pursue their education but also excel in it, leading to professional success.</Text>
      </VStack>
    ),
    'EMPLOYMENT': (
      <VStack align="flex-start" spacing="2">
        <Text>Today's students, supported by your donations, are tomorrow's employees and leaders.</Text>
        <Text>By helping students raise funds, you enable them to pursue education and build successful careers.</Text>
        <Text>Many of our beneficiaries are first-time graduates in their families, coming from villages and small towns.</Text>
        <Text>Your contributions help educate rural girls, preventing early marriages and making them self-sufficient and employable.</Text>
        <Text>With education, these students gain the skills and knowledge needed for professional success.</Text>
        <Text>Join us in creating a future where every student, with the support of generous donors like you, becomes a valuable member of the workforce.</Text>
      </VStack>
    ),
  };

  useEffect(() => {
    fetch('http://localhost:9090/projects')
      .then(response => response.json())
      .then(data => {
        const activeDonations = data.filter(project => project.donation_active_status === true);
        setData(activeDonations);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (project) => {
    localStorage.setItem('selectedProject', JSON.stringify(project));
    navigate('/detailedProject');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="home-page">
      <div id="home">
        <img src={pic} alt="kids" />
        <h1>This is What We Do</h1>
      </div>
      <div className="description">
        <p>
          Students from all backgrounds deserve access to quality education and opportunities. Unfortunately, many are deprived of these due to financial constraints. ShikshaSahayak is dedicated to creating a supportive environment where students can thrive academically. Our platform enables students to raise the necessary funds for their education through community donations. By contributing to ShikshaSahayak, you can help ensure that bright students, regardless of their economic status, can pursue their dreams. With your support, these students can focus on their studies, excel in their educational pursuits, and ultimately break the cycle of poverty for their families. Join us in empowering the next generation of scholars and making a lasting impact on their lives.
        </p>
      </div>
      <Flex w="100%" justify="center">
        <Flex border="1px solid #9fc74a" borderRadius="md" boxShadow="lg" p="4" bg="white" width={{ base: '100%', md: '80%' }} ml="auto" mr="auto" direction={{ base: 'column', md: 'row' }}>
          <VStack align="flex-start" spacing="4" mt="16" w={{ base: '100%', md: '30%' }}>
            {Object.keys(content).map((key) => (
              <Button
                key={key}
                variant={selectedContent === key ? 'solid' : 'outline'}
                backgroundColor={selectedContent === key ? '#f8852f' : 'white'}
                color={selectedContent === key ? 'white' : '#f8852f'}
                w="100%"
                onClick={() => setSelectedContent(key)}
              >
                {key}
              </Button>
            ))}
          </VStack>
          <Box ml={{ base: '0', md: '8' }} mt={{ base: '8', md: '0' }} p="4" borderLeft={{ md: '1px solid #9fc74a' }} w={{ base: '100%', md: '70%' }}>
            <Text fontSize="lg" mb="4">
              {selectedContent}
            </Text>
            {content[selectedContent]}
          </Box>
        </Flex>
      </Flex>
      <div id="char">
        <h3>"Investing in education is the most powerful way to create a brighter future. Your support can change a life, and through that life, change the world."</h3>
        <img src={kids} alt="kids" />
      </div>
      <div id="cards" className="cards">
        {Array.isArray(data) && data.map((project) => (
          <Box key={project._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" m="7" className="card" border="1px solid #9fc948" onClick={() => handleCardClick(project)}>
            <Image src={lg} alt="user logo" borderRadius="full" boxSize="50px" mt="4" />
            <Text fontWeight="bold" fontSize="xl">{project.donation_title}</Text>
            <Text mt="2">{project.donation_discription}</Text>
            <Progress value={(project.current_amount / project.goal_amount) * 100} size="sm" colorScheme="green" mt="4" />
            <Text mt="2" color="green.500" fontWeight="500">Raised: ₹{project.current_amount}</Text>
            <Text mt="2" color="#f78633" fontWeight="500">Target: ₹{project.goal_amount}</Text>
            <Text mt="2">Created by: {project.student_name}</Text>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
