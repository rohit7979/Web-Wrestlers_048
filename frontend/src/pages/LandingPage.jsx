import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

import '../App.css';
import { Footer } from './Footer';
import pic from '../../images/logo_transparent.png'
import picture from '../../images/school2.jpg'
import { Link } from 'react-router-dom';
// import Chat from '../components/G';
// import Chat from '../components/Chat.jsx';

export const LandingPage = () => {
  const [barVisible, setBarVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById('bar');
      const hands = document.getElementById('hands');
      const formSection = document.getElementById('formSection');

      if (!bar || !hands || !formSection) return;

      // Get the top position of the hands section
      const handsTop = hands.getBoundingClientRect().top;
      const formTop = formSection.getBoundingClientRect().top;

      // Calculate when to show the #bar section
      const triggerPoint = handsTop - window.innerHeight + 100; // Adjust 100 to fine-tune when the #bar becomes visible

      // Toggle class based on scroll position
      if (window.scrollY > triggerPoint) {
        setBarVisible(true);
      } else {
        setBarVisible(false);
      }

      // Show form when scroll reaches the form section
      if (window.scrollY > formTop - window.innerHeight + 100) {
        setFormVisible(true);
      } else {
        setFormVisible(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = () => {
    toast({
      title: "Congratulations!",
      description: "Your details have been submitted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <div id="head_part">
        <div className='logo'>
          <Link to='/home'><img src={pic} alt="logo" /></Link>
        </div>
        <div className='Cont'>
          <span className="welcome-message">"Welcome! Empowering Students, Shaping Futures"</span>
        </div>
        <div className='but'>
          <Button onClick={onOpen}>Start A Free Fundraiser Now</Button>
        </div>
      </div>
      <div>
        <div className='school'>
          <img src={picture} alt="fund_img" />
        </div>
      </div>
      <div id="bar" className={barVisible ? 'visible' : ''}>
        <div className="box">Dedicated Campaign</div>
        <div className="box">Free Promotional tools</div>
        <div className="box">Withdraw money at any time</div>
        <div className="box">All-inclusive app</div>
      </div>

      <div id="hands">
        <div className="helping">
            <img src="https://i0.wp.com/crowdfunding.milaap.org/wp-content/uploads/2022/09/fund-page.jpg?w=688&ssl=1" alt="helping hands"/>
        </div>
        <div className='quto'>
          <h1>Raise funds using an online fundraiser</h1>
          
          <p>Online Fundraiser leverages the power of social networks and the internet to give people the means to raise funds for medical and social causes. With online fundraisers, you can receive donations from friends, family, colleagues and even strangers.</p>
        </div>
      </div>
        <div id="slog">
            <h4>Start a Free fundraiser on <strong>ShikshaSahayak</strong> raise money for your Bright Future</h4>
            <button onClick={onOpen}>Start A Fundraiser Now</button>
        </div>
        <div id="part2">
            <h1>How to start a fundraising Campaign on ShikshaSahayak</h1>
            <img src="https://i0.wp.com/crowdfunding.milaap.org/wp-content/uploads/2022/08/Landing-page-roadmap-1-e1659444309791.png?w=1080&ssl=1" alt="steps"/>
        </div>

        <div id='formSection' className={formVisible ? 'visible' : ''}>
            <h4>Start Registering now to Start A Free Fundraise</h4>
          <Button onClick={onOpen} mt={4}>Register Now</Button>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Fundraiser Registration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Enter your name" />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Phone</FormLabel>
                  <Input placeholder="Enter your phone number" />
                </FormControl>
                <FormControl id="why-fundraising">
                  <FormLabel>Why are you fundraising?</FormLabel>
                  <Select placeholder="Select option">
                    <option value="education">Education</option>
                  </Select>
                </FormControl>
                <FormControl id="to-whom-fundraising">
                  <FormLabel>To whom are you fundraising?</FormLabel>
                  <Select placeholder="Select option">
                    <option value="yourself">Yourself</option>
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                  </Select>
                </FormControl>
                <FormControl id="preferred-language">
                  <FormLabel>Preferred Language</FormLabel>
                  <Select placeholder="Select language">
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="telugu">Telugu</option>
                    {/* Add more languages as needed */}
                  </Select>
                </FormControl>
                <FormControl id="estimated-cost">
                  <FormLabel>Estimated Cost</FormLabel>
                  <Input placeholder="Enter estimated cost" type="number" min="10000" />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* <Footer /> */}
    </>
  );
};
