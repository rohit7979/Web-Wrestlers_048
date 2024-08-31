// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Card,
//   CardBody,
//   Heading,
//   Input as ChakraInput,
//   Button as ChakraButton,
//   FormControl,
//   FormLabel,
//   useToast,
//   Text,
//   Spinner,
//   Box,
// } from '@chakra-ui/react';
// import { getUserData, updatePassword, updateProject } from '../components/dashboardApi';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const toast = useToast();
//    console.log(isEditing)

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');

//     if (token) {
//       getUserData(token)
//         .then(response => {
//           console.log('User data:', response.data);  // Added console log for debugging
//           setUser(response.data[0]);  // Assuming response.data is an array with a single user object
//         })
//         .catch(error => {
//           toast({
//             title: 'Failed to fetch user data',
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           });
//         });
//     } else {
//       toast({
//         title: 'No token found',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   }, [toast]);

//   const handlePasswordChange = (e) => {
//     e.preventDefault();
//     const newPassword = e.target.newPassword.value;
//     const token = localStorage.getItem('accessToken');

//     if (token) {
//       updatePassword(token, newPassword)
//         .then(() => {
//           toast({
//             title: 'Password updated successfully',
//             status: 'success',
//             duration: 3000,
//             isClosable: true,
//           });
//         })
//         .catch(() => {
//           toast({
//             title: 'Failed to update password',
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           });
//         });
//     }
//   };

//   const handleProjectUpdate = (e) => {
//     e.preventDefault();
//     const projectField = e.target.projectField.value;
//     const token = localStorage.getItem('accessToken');

//     if (token) {
//       updateProject(token, { projectField })
//         .then(() => {
//           toast({
//             title: 'Project updated successfully',
//             status: 'success',
//             duration: 3000,
//             isClosable: true,
//           });
//         })
//         .catch(() => {
//           toast({
//             title: 'Failed to update project',
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           });
//         });
//     }
//   };

//   const handleFieldUpdate = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsEditing(false);
//     toast({
//       title: 'User information updated successfully',
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   if (!user) return <Spinner size="xl" />;

//   console.log(user)

//   return (
//     <div style={{backgroundColor:'#eff8ff'}}>
//       <Container maxW="container.sm" p={4} centerContent>
//         <Box
//           borderWidth={1}
//           borderRadius="lg"
//           overflow="hidden"
//           p={4}
//           bg="green.50"
//           w="100%"
//           border="1px solid #a2c84e"
//           sx={{
//             transition: 'background-color 0.3s ease',
//             _hover: { backgroundColor: '' },
//           }}
//         >
//           <Heading as="h3" size="lg" mb={4} color="orange.500" textAlign="center">Your Dashboard</Heading>
//           <Text textAlign="center" mb={4}>This is your information and you can update if you want.</Text>

//           <Card mb={4}>
//             <CardBody border="1px solid #a2c84e">
//               <Heading as="h4" size="md" mb={4} color="orange.500">User Information</Heading>
//               {!isEditing ? (
//                 <>
//                   <Text mb={2}>Name: {user.student_name}</Text>
//                   <Text mb={2}>Email: {user.student_email}</Text>
//                   <ChakraButton backgroundColor='#f78735' color='white' onClick={() => setIsEditing(true)}>
//                     Edit Info
//                   </ChakraButton>
//                 </>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <FormControl id="student_name" isRequired mb={4}>
//                     <FormLabel>Name</FormLabel>
//                     <ChakraInput type="text" name="student_name" value={user.student_name} onChange={handleFieldUpdate} />
//                   </FormControl>
//                   <FormControl id="student_email" isRequired mb={4}>
//                     <FormLabel>Email</FormLabel>
//                     <ChakraInput type="email" name="student_email" value={user.student_email} onChange={handleFieldUpdate} />
//                   </FormControl>
//                   <ChakraButton colorScheme="teal" type="submit">
//                     Update Info
//                   </ChakraButton>
//                   <ChakraButton colorScheme="red" ml={4} onClick={() => setIsEditing(false)}>
//                     Cancel
//                   </ChakraButton>
//                 </form>
//               )}
//             </CardBody>
//           </Card>

//           <Card mb={4}>
//             <CardBody border="1px solid #a2c84e">
//               <Heading as="h4" size="md" mb={4} color="orange.500">Update Password</Heading>
//               <form onSubmit={handlePasswordChange}>
//                 <FormControl id="newPassword" isRequired mb={4}>
//                   <FormLabel>New Password</FormLabel>
//                   <ChakraInput type="password" name="newPassword" border='1px solid'/>
//                 </FormControl>
//                 <ChakraButton backgroundColor='#f78735' color='white' type="submit">
//                   Update Password
//                 </ChakraButton>
//               </form>
//             </CardBody>
//           </Card>

//           {/* <Card>
//             <CardBody border="1px solid #a2c84e">
//               <Heading as="h4" size="md" mb={4} color="orange.500">Update Project</Heading>
//               <form onSubmit={handleProjectUpdate}>
//                 <FormControl id="projectField" isRequired mb={4}>
//                   <FormLabel>Project Field</FormLabel>
//                   <ChakraInput type="text" name="projectField" border='1px solid'/>
//                 </FormControl>
//                 <ChakraButton backgroundColor='#f78735' color='white' type="submit">
//                   Update Project
//                 </ChakraButton>
//               </form>
//             </CardBody>
//           </Card> */}
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Heading,
  Input as ChakraInput,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { getUserData, updatePassword, updateProject } from '../components/dashboardApi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
   console.log(isEditing)

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      getUserData(token)
        .then(response => {
          console.log('User data:', response.data);  // Added console log for debugging
          setUser(response.data[0]);  // Assuming response.data is an array with a single user object
        })
        .catch(error => {
          toast({
            title: 'Failed to fetch user data',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: 'No token found',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const token = localStorage.getItem('accessToken');

    if (token) {
      updatePassword(token, newPassword)
        .then(() => {
          toast({
            title: 'Password updated successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Failed to update password',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const handleProjectUpdate = (e) => {
    e.preventDefault();
    const projectField = e.target.projectField.value;
    const token = localStorage.getItem('accessToken');

    if (token) {
      updateProject(token, { projectField })
        .then(() => {
          toast({
            title: 'Project updated successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Failed to update project',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: 'User information updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (!user) return <Spinner size="xl" />;

  console.log(user)

  return (
    <div style={{backgroundColor:'#eff8ff'}}>
      <Container maxW="container.sm" p={4} centerContent>
        <Box
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          p={4}
          bg="green.50"
          w="100%"
          border="1px solid #a2c84e"
          sx={{
            transition: 'background-color 0.3s ease',
            _hover: { backgroundColor: '' },
          }}
        >
          <Heading as="h3" size="lg" mb={4} color="orange.500" textAlign="center">Your Dashboard</Heading>
          <Text textAlign="center" mb={4}>This is your information and you can update if you want.</Text>

          <Card mb={4}>
            <CardBody border="1px solid #a2c84e">
              <Heading as="h4" size="md" mb={4} color="orange.500">User Information</Heading>
              {!isEditing ? (
                <>
                  <Text mb={2}>Name: {user.student_name}</Text>
                  <Text mb={2}>Email: {user.student_email}</Text>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormControl id="student_name" isRequired mb={4}>
                    <FormLabel>Name</FormLabel>
                    <ChakraInput type="text" name="student_name" value={user.student_name} onChange={handleFieldUpdate} />
                  </FormControl>
                  <FormControl id="student_email" isRequired mb={4}>
                    <FormLabel>Email</FormLabel>
                    <ChakraInput type="email" name="student_email" value={user.student_email} onChange={handleFieldUpdate} />
                  </FormControl>
                  <ChakraButton colorScheme="teal" type="submit">
                    Update Info
                  </ChakraButton>
                  <ChakraButton colorScheme="red" ml={4} onClick={() => setIsEditing(false)}>
                    Cancel
                  </ChakraButton>
                </form>
              )}
            </CardBody>
          </Card>

          <Card mb={4}>
            <CardBody border="1px solid #a2c84e">
              <Heading as="h4" size="md" mb={4} color="orange.500">Update Password</Heading>
              <form onSubmit={handlePasswordChange}>
                <FormControl id="newPassword" isRequired mb={4}>
                  <FormLabel>New Password</FormLabel>
                  <ChakraInput type="password" name="newPassword" border='1px solid'/>
                </FormControl>
                <ChakraButton backgroundColor='#f78735' color='white' type="submit">
                  Update Password
                </ChakraButton>
              </form>
            </CardBody>
          </Card>

          {/* <Card>
            <CardBody border="1px solid #a2c84e">
              <Heading as="h4" size="md" mb={4} color="orange.500">Update Project</Heading>
              <form onSubmit={handleProjectUpdate}>
                <FormControl id="projectField" isRequired mb={4}>
                  <FormLabel>Project Field</FormLabel>
                  <ChakraInput type="text" name="projectField" border='1px solid'/>
                </FormControl>
                <ChakraButton backgroundColor='#f78735' color='white' type="submit">
                  Update Project
                </ChakraButton>
              </form>
            </CardBody>
          </Card> */}
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
