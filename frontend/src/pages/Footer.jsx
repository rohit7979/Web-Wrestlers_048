// Footer.js
import React from 'react';
import { Box, Input, Button, Flex, Text, Link, VStack } from '@chakra-ui/react';
import '../styles/Footer.css'; // Import the CSS for additional styles

export const Footer = () => {
  return (
    <Box className="footer">
      <Flex className="footer-content container">
        <VStack className="footer-section" align="start">
          <Text className="footer-title">ShikshaSahayak</Text>
          <Link href="#">About us</Link>
          <Link href="#">Press and media</Link>
          <Link href="#">Team</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Thank you</Link>
          <Link href="#">Resources</Link>
        </VStack>
        <VStack className="footer-section" align="start">
          <Text className="footer-title">Indian office address</Text>
          <Text>ShikshaSahayak Social Ventures India Pvt. Ltd.</Text>
          <Text>Nextcoworks JP Nagar - Coworking Space JP Nagar Alankar Plaza, Bk circle, Nayak Layout, 8th Phase, J. P. Nagar, Bangalore, Karnataka, India 560078</Text>
          <Text className="footer-supported-title">Supported by</Text>
          <Flex className="footer-logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="MasterCard" />
            <img src="https://w7.pngwing.com/pngs/173/994/png-transparent-paytm-social-icons-color-icon.png" alt="Paytm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" />
          </Flex>
        </VStack>
        <VStack className="footer-section" align="start">
          <Text className="footer-title">Start a fundraiser</Text>
          <Link href="#">Pricing</Link>
          <Link href="#">Reviews</Link>
          <Link href="#">FAQs and tips</Link>
          <Text className="footer-download-title">Download Now!</Text>
          <Flex className="footer-logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" />
          </Flex>
        </VStack>
        <VStack className="footer-section newsletter" align="start">
          <Text className="footer-title">Newsletter Subscription</Text>
          <Flex width="100%">
            <Input placeholder="Subscribe to our newsletter" flex="1" />
            <Button colorScheme="orange" ml={2}>Subscribe</Button>
          </Flex>
        </VStack>
      </Flex>
      <Box className="footer-bottom">
        <Text>&copy; 2010-2024 ShikshaSahayak.org. All rights reserved.</Text>
        <Flex justifyContent="center" gap={4}>
          <Link href="#">Security & Privacy</Link>
          <Link href="#">Conditions of use</Link>
        </Flex>
      </Box>
    </Box>
  );
};


