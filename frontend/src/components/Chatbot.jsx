// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Textarea,
//   Text,
//   useToast,
//   IconButton,
//   VStack,
//   useDisclosure,
//   Collapse,
//   Card,
//   CardBody,
//   CardHeader,
//   Heading,
// } from '@chakra-ui/react';
// import { AiOutlineMessage } from 'react-icons/ai';
// import '../styles/d.css'; // Import the CSS file

// const PromptForm = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { isOpen, onToggle } = useDisclosure();
//   const toast = useToast();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const res = await fetch('https://shikshasahayak.onrender.com/apie/prompt', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await res.json();
//       setResponse(data);
//       toast({
//         title: "Response Received",
//         description: "Your prompt has been processed.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//       toast({
//         title: "An error occurred.",
//         description: err.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box className="container">
//       <Heading className="heading">Generative AI Prompt</Heading>
//       {/* <form onSubmit={handleSubmit}>
//         <VStack spacing="4" align="flex-start">
//           <Textarea
//             className="textarea"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter your prompt here..."
//           />
//           <IconButton
//             aria-label="Send prompt"
//             icon={<AiOutlineMessage />}
//             isLoading={loading}
//             type="submit"
//             colorScheme="blue"
//             size="lg"
//             className="button"
//           />
//         </VStack>
//       </form> */}
//       <Collapse in={isOpen}>
//         <Card className="response-card">
//           <CardHeader>
//             <Heading size="md">Response</Heading>
//           </CardHeader>
//           <CardBody>
//             {response ? (
//               <Text>{response}</Text>
//             ) : (
//               <Text>No response yet.</Text>
//             )}
//           </CardBody>
//         </Card>
//       </Collapse>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing="4" align="flex-start">
//           <Textarea
//             className="textarea"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter your prompt here..."
//           />
//           <IconButton
//             aria-label="Send prompt"
//             icon={<AiOutlineMessage />}
//             isLoading={loading}
//             type="submit"
//             colorScheme="blue"
//             size="lg"
//             className="button"
//           />
//         </VStack>
//       </form>
//       {error && (
//         <Text className="error">
//           {error}
//         </Text>
//       )}
//       <Button mt="4" onClick={onToggle} colorScheme="blue" variant="link">
//         Toggle Response
//       </Button>
//     </Box>
//   );
// };

// export default PromptForm;


import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  Text,
  useToast,
  IconButton,
  VStack,
  useDisclosure,
  Collapse,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from '@chakra-ui/react';
import { AiOutlineMessage } from 'react-icons/ai';
import '../styles/d.css'; // Import the CSS file

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('https://shikshasahayak.onrender.com/apie/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data);
      toast({
        title: "Response Received",
        description: "Your prompt has been processed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
      toast({
        title: "An error occurred.",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="container">
      <Heading className="heading">Generative AI Prompt</Heading>
      {/* <form onSubmit={handleSubmit}>
        <VStack spacing="4" align="flex-start">
          <Textarea
            className="textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
          />
          <IconButton
            aria-label="Send prompt"
            icon={<AiOutlineMessage />}
            isLoading={loading}
            type="submit"
            colorScheme="blue"
            size="lg"
            className="button"
          />
        </VStack>
      </form> */}
      <Collapse in={isOpen}>
        <Card className="response-card">
          <CardHeader>
            <Heading size="md">Response</Heading>
          </CardHeader>
          <CardBody>
            {response ? (
              <Text>{response}</Text>
            ) : (
              <Text>No response yet.</Text>
            )}
          </CardBody>
        </Card>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4" align="flex-start">
          <Textarea
            className="textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
          />
          <IconButton
            aria-label="Send prompt"
            icon={<AiOutlineMessage />}
            isLoading={loading}
            type="submit"
            colorScheme="blue"
            size="lg"
            className="button"
          />
        </VStack>
      </form>
      {error && (
        <Text className="error">
          {error}
        </Text>
      )}
      <Button mt="4" onClick={onToggle} colorScheme="blue" variant="link">
        Toggle Response
      </Button>
    </Box>
  );
};

export default PromptForm;