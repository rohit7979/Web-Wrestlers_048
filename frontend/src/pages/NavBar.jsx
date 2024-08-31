// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box,
//   Flex,
//   IconButton,
//   useDisclosure,
//   Stack,
//   Link,
//   Drawer,
//   DrawerBody,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   Image,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   InputGroup,
//   Input,
//   InputLeftElement,
//   Collapse,
//   Spinner,
//   Text,
// } from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
// import { FaUser } from 'react-icons/fa';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from '../../images/logo.png';

// const API_URL = 'https://shikshasahayak.onrender.com/projects';

// export function NavBar({ isLoggedIn, setIsLoggedIn }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [isDonateOpen, setDonateOpen] = useState(false);
//   const [isFundraiserOpen, setFundraiserOpen] = useState(false);
//   const [isAboutOpen, setAboutOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const navigate = useNavigate();

//   const handleToggle = (menu) => {
//     switch (menu) {
//       case 'donate':
//         setDonateOpen(!isDonateOpen);
//         break;
//       case 'fundraiser':
//         setFundraiserOpen(!isFundraiserOpen);
//         break;
//       case 'about':
//         setAboutOpen(!isAboutOpen);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setIsLoggedIn(false);
//     navigate('/login');
//   };

//   const handleSearch = useCallback(
//     (query) => {
//       if (query.trim().length === 0) {
//         setSearchResults([]);
//         return;
//       }
//       setIsSearching(true);
//       axios
//         .get(API_URL)
//         .then((response) => {
//           const results = response.data.filter((item) =>
//             item.donation_title.toLowerCase().includes(query.toLowerCase())
//           );
//           setSearchResults(results);
//         })
//         .catch(() => {
//           setSearchResults([]);
//         })
//         .finally(() => {
//           setIsSearching(false);
//         });
//     },
//     [setSearchResults]
//   );

//   const debounce = (func, delay) => {
//     let debounceTimer;
//     return function (...args) {
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => func(...args), delay);
//     };
//   };

//   const handleInputChange = (event) => {
//     setSearchQuery(event.target.value);
//     debouncedSearch(event.target.value);
//   };

//   const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setSearchResults([]);
//     }
//   }, [searchQuery]);

//   const handleSearchSubmit = () => {
//     const selectedResult = searchResults.find(
//       (result) => result.donation_title.toLowerCase() === searchQuery.toLowerCase()
//     );
//     if (selectedResult) {
//       navigate(`/project/${selectedResult._id}`);
//     } else {
//       alert('No results based on your search');
//     }
//   };

//   return (
//     <Box
//       position="sticky"
//       top="0"
//       width="100%"
//       bg="rgba(255, 255, 255, 0.8)"
//       backdropFilter="blur(10px)"
//       px={4}
//       boxShadow="sm"
//       zIndex="1000"
//     >
//       <Flex h={20} alignItems="center" justifyContent="space-between">
//         <Box display="flex" alignItems="center">
//           <RouterLink to='/home'><Image src={logo} alt="Logo" height="80px" mr={4} /></RouterLink>
//         </Box>
//         <Box display={{ base: 'none', lg: 'flex' }} alignItems="center" flexWrap="wrap" flexGrow={1} justifyContent="space-around">
//           <Menu>
//             <MenuButton as={Link} href="#donate" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#f68631' }}>
//               Donate <ChevronDownIcon />
//             </MenuButton>
//             <MenuList>
//               <MenuItem as={Link} href="#fundDonateInfo">To Individual</MenuItem>
//               <MenuItem as={Link} href="#fundDonateInfo">To Group</MenuItem>
//             </MenuList>
//           </Menu>
//           <Menu>
//             <MenuButton as={Link} href="#fundraiser" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#f68631' }}>
//               Fundraiser <ChevronDownIcon />
//             </MenuButton>
//             <MenuList>
//               <MenuItem as={Link} href="#myself">Myself</MenuItem>
//               <MenuItem as={Link} href="#individual">Individual</MenuItem>
//               <MenuItem as={Link} href="#groups">Groups</MenuItem>
//             </MenuList>
//           </Menu>
//           <Link href="#pricing" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#a6d248' }}>Pricing</Link>
//           <Menu>
//             <MenuButton as={Link} href="#about" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#a6d248' }}>
//               About <ChevronDownIcon />
//             </MenuButton>
//             <MenuList>
//               <MenuItem as={Link} href="#aboutInfo">About us</MenuItem>
//               <MenuItem as={Link} href="#aboutInfo">Support</MenuItem>
//               <MenuItem as={Link} href="#aboutInfo">Help</MenuItem>
//               <MenuItem as={Link} href="#aboutInfo">FAQ's</MenuItem>
//               <MenuItem as={RouterLink} to="/contact">Contact Info</MenuItem>
//             </MenuList>
//           </Menu>
//         </Box>
//         <Flex alignItems="center" position="relative">
//           <InputGroup size="sm" width="200px" mr={4} display={{ base: 'none', lg: 'flex' }}>
//             <InputLeftElement pointerEvents="none">
//               <SearchIcon color="gray.500" />
//             </InputLeftElement>
//             <Input
//               type="search"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={handleInputChange}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSearchSubmit();
//                 }
//               }}
//             />
//           </InputGroup>
//           {isSearching && <Spinner size="sm" />}
//           {!isSearching && searchResults.length === 0 && searchQuery && (
//             <Box position="absolute" bg="white" width="200px" mt={20} borderRadius="md" boxShadow="md" zIndex="1000">
//               <Stack>
//                 <Box textAlign='center'><Text>No results found</Text></Box>
//               </Stack>
//             </Box>
//           )}
//           {searchResults.length > 0 && (
//             <Box position="absolute" bg="white" width="200px" mt={1} borderRadius="md" boxShadow="md" zIndex="1000">
//               <Stack>
//                 {searchResults.map((result) => (
//                   <Link
//                     key={result._id}
//                     onClick={() => navigate(`/project/${result._id}`)}
//                   >
//                     {result.donation_title}
//                   </Link>
//                 ))}
//               </Stack>
//             </Box>
//           )}
//           <Button backgroundColor='#f68631' color='white' variant="solid" mx={2} height='35px' borderRadius="30px" fontWeight="500" fontSize="lg" onClick={()=>{navigate("/fundRaise")}} >Start a fundraiser</Button>
//           <Box mx={2} display={{ base: 'none', lg: 'flex' }} alignItems="center">
//             <Menu>
//               <MenuButton as={IconButton} icon={<FaUser />} variant="outline" fontSize="lg" />
//               <MenuList>
//                 {!isLoggedIn ? (
//                   <>
//                     <MenuItem as={RouterLink} to="/login">Login</MenuItem>
//                     <MenuItem as={RouterLink} to="/signup">Register</MenuItem>
//                   </>
//                 ) : (
//                   <>
//                     <MenuItem as={RouterLink} to="/dashboard">Dashboard</MenuItem>
//                     <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
//                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                   </>
//                 )}
//               </MenuList>
//             </Menu>
//           </Box>
//           <IconButton
//             size="md"
//             icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//             aria-label="Open Menu"
//             display={{ base: 'flex', lg: 'none' }}
//             onClick={isOpen ? onClose : onOpen}
//           />
//         </Flex>
//       </Flex>

//       {isOpen ? (
//         <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//           <DrawerOverlay>
//             <DrawerContent bg="rgba(255, 255, 255, 0.8)" backdropFilter="blur(10px)">
//               <DrawerCloseButton />
//               <DrawerHeader>Menu</DrawerHeader>
//               <DrawerBody>
//                 <Stack as="nav" spacing={4}>
//                   <Link href="#home" onClick={onClose}>Home</Link>
//                   <Box>
//                     <Button onClick={() => handleToggle('donate')} variant="link">
//                       Donate <ChevronDownIcon />
//                     </Button>
//                     <Collapse in={isDonateOpen}>
//                       <Stack pl={4} mt={2} spacing={1}>
//                         <Link href="#fundDonateInfo" onClick={onClose}>To Individual</Link>
//                         <Link href="#fundDonateInfo" onClick={onClose}>To Group</Link>
//                       </Stack>
//                     </Collapse>
//                   </Box>
//                   <Box>
//                     <Button onClick={() => handleToggle('fundraiser')} variant="link">
//                       Fundraiser <ChevronDownIcon />
//                     </Button>
//                     <Collapse in={isFundraiserOpen}>
//                       <Stack pl={4} mt={2} spacing={1}>
//                         <Link href="#myself" onClick={onClose}>Myself</Link>
//                         <Link href="#individual" onClick={onClose}>Individual</Link>
//                         <Link href="#groups" onClick={onClose}>Groups</Link>
//                       </Stack>
//                     </Collapse>
//                   </Box>
//                   <Link href="#pricing" onClick={onClose}>Pricing</Link>
//                   <Box>
//                     <Button onClick={() => handleToggle('about')} variant="link">
//                       About <ChevronDownIcon />
//                     </Button>
//                     <Collapse in={isAboutOpen}>
//                       <Stack pl={4} mt={2} spacing={1}>
//                         <Link href="#aboutInfo" onClick={onClose}>About us</Link>
//                         <Link href="#aboutInfo" onClick={onClose}>Support</Link>
//                         <Link href="#aboutInfo" onClick={onClose}>Help</Link>
//                         <Link href="#aboutInfo" onClick={onClose}>FAQ's</Link>
//                         <Link href="/contact" onClick={onClose}>Contact Info</Link>
//                       </Stack>
//                     </Collapse>
//                   </Box>
//                   <InputGroup size="sm" width="200px" mt={4}>
//                     <InputLeftElement pointerEvents="none">
//                       <SearchIcon color="gray.500" />
//                     </InputLeftElement>
//                     <Input
//                       type="search"
//                       placeholder="Search"
//                       value={searchQuery}
//                       onChange={handleInputChange}
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter') {
//                           handleSearchSubmit();
//                         }
//                       }}
//                     />
//                   </InputGroup>
//                   <Link to="/fundRaise">Start a fundraiser</Link>
//                   {!isLoggedIn ? (
//                     <>
//                       <Link to="/login" onClick={onClose}>Login</Link>
//                       <Link to="/signup" onClick={onClose}>Register</Link>
//                     </>
//                   ) : (
//                     <>
//                       <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
//                       <Link to="/profile" onClick={onClose}>Profile</Link>
//                       <Link onClick={() => { handleLogout(); onClose(); }}>Logout</Link>
//                     </>
//                   )}
//                 </Stack>
//               </DrawerBody>
//             </DrawerContent>
//           </DrawerOverlay>
//         </Drawer>
//       ) : null}
//     </Box>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Stack,
  Link,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Input,
  InputLeftElement,
  Collapse,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo.png';

const API_URL = 'https://shikshasahayak.onrender.com/projects';

export function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDonateOpen, setDonateOpen] = useState(false);
  const [isFundraiserOpen, setFundraiserOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (menu) => {
    switch (menu) {
      case 'donate':
        setDonateOpen(!isDonateOpen);
        break;
      case 'fundraiser':
        setFundraiserOpen(!isFundraiserOpen);
        break;
      case 'about':
        setAboutOpen(!isAboutOpen);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleSearch = useCallback(
    (query) => {
      if (query.trim().length === 0) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      axios
        .get(API_URL)
        .then((response) => {
          const results = response.data.filter((item) =>
            item.donation_title.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(results);
        })
        .catch(() => {
          setSearchResults([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    },
    [setSearchResults]
  );

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    const selectedResult = searchResults.find(
      (result) => result.donation_title.toLowerCase() === searchQuery.toLowerCase()
    );
    if (selectedResult) {
      navigate(`/project/${selectedResult._id}`);
    } else {
      alert('No results based on your search');
    }
  };

  return (
    <Box
      position="sticky"
      top="0"
      width="100%"
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      px={4}
      boxShadow="sm"
      zIndex="1000"
    >
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <RouterLink to='/home'><Image src={logo} alt="Logo" height="80px" mr={4} /></RouterLink>
        </Box>
        <Box display={{ base: 'none', lg: 'flex' }} alignItems="center" flexWrap="wrap" flexGrow={1} justifyContent="space-around">
          <Menu>
            <MenuButton as={Link} to="#donate" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#f68631' }}>
              Donate <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="#fundDonateInfo">To Individual</MenuItem>
              <MenuItem as={RouterLink} to="#fundDonateInfo">To Group</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Link} to="#fundraiser" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#f68631' }}>
              Fundraiser <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="#myself">Myself</MenuItem>
              <MenuItem as={RouterLink} to="#individual">Individual</MenuItem>
              <MenuItem as={RouterLink} to="#groups">Groups</MenuItem>
            </MenuList>
          </Menu>
          <Link as={RouterLink} to="#pricing" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#a6d248' }}>Pricing</Link>
          <Menu>
            <MenuButton as={Link} to="#about" mx={2} fontWeight="500" fontSize="lg" _hover={{ color: '#a6d248' }}>
              About <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="#aboutInfo">About us</MenuItem>
              <MenuItem as={RouterLink} to="#aboutInfo">Support</MenuItem>
              <MenuItem as={RouterLink} to="#aboutInfo">Help</MenuItem>
              <MenuItem as={RouterLink} to="#aboutInfo">FAQ's</MenuItem>
              <MenuItem as={RouterLink} to="/contact">Contact Info</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Flex alignItems="center" position="relative">
          <InputGroup size="sm" width="200px" mr={4} display={{ base: 'none', lg: 'flex' }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
          </InputGroup>
          {isSearching && <Spinner size="sm" />}
          {!isSearching && searchResults.length === 0 && searchQuery && (
            <Box position="absolute" bg="white" width="200px" mt={20} borderRadius="md" boxShadow="md" zIndex="1000">
              <Stack>
                <Box textAlign='center'><Text>No results found</Text></Box>
              </Stack>
            </Box>
          )}
          {searchResults.length > 0 && (
            <Box position="absolute" bg="white" width="200px" mt={1} borderRadius="md" boxShadow="md" zIndex="1000">
              <Stack>
                {searchResults.map((result) => (
                  <Link
                    key={result._id}
                    onClick={() => navigate(`/project/${result._id}`)}
                  >
                    {result.donation_title}
                  </Link>
                ))}
              </Stack>
            </Box>
          )}
          <Button backgroundColor='#f68631' color='white' variant="solid" mx={2} height='35px' borderRadius="30px" fontWeight="500" fontSize="lg" onClick={()=>{navigate("/fundRaise")}} >Start a fundraiser</Button>
          <Box mx={2} display={{ base: 'none', lg: 'flex' }} alignItems="center">
            <Menu>
              <MenuButton as={IconButton} icon={<FaUser />} variant="outline" fontSize="lg" />
              <MenuList>
                {!isLoggedIn ? (
                  <>
                    <MenuItem as={RouterLink} to="/login">Login</MenuItem>
                    <MenuItem as={RouterLink} to="/signup">Register</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem as={RouterLink} to="/dashboard">Dashboard</MenuItem>
                    <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Box>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ base: 'flex', lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent bg="rgba(255, 255, 255, 0.8)" backdropFilter="blur(10px)">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <Stack as="nav" spacing={4}>
                  <Link as={RouterLink} to="/home" onClick={onClose}>Home</Link>
                  <Box>
                    <Button onClick={() => handleToggle('donate')} variant="link">
                      Donate <ChevronDownIcon />
                    </Button>
                    <Collapse in={isDonateOpen}>
                      <Stack pl={4} mt={2} spacing={1}>
                        <Link as={RouterLink} to="#fundDonateInfo" onClick={onClose}>To Individual</Link>
                        <Link as={RouterLink} to="#fundDonateInfo" onClick={onClose}>To Group</Link>
                      </Stack>
                    </Collapse>
                  </Box>
                  <Box>
                    <Button onClick={() => handleToggle('fundraiser')} variant="link">
                      Fundraiser <ChevronDownIcon />
                    </Button>
                    <Collapse in={isFundraiserOpen}>
                      <Stack pl={4} mt={2} spacing={1}>
                        <Link as={RouterLink} to="#myself" onClick={onClose}>Myself</Link>
                        <Link as={RouterLink} to="#individual" onClick={onClose}>Individual</Link>
                        <Link as={RouterLink} to="#groups" onClick={onClose}>Groups</Link>
                      </Stack>
                    </Collapse>
                  </Box>
                  <Link as={RouterLink} to="#pricing" onClick={onClose}>Pricing</Link>
                  <Box>
                    <Button onClick={() => handleToggle('about')} variant="link">
                      About <ChevronDownIcon />
                    </Button>
                    <Collapse in={isAboutOpen}>
                      <Stack pl={4} mt={2} spacing={1}>
                        <Link as={RouterLink} to="#aboutInfo" onClick={onClose}>About us</Link>
                        <Link as={RouterLink} to="#aboutInfo" onClick={onClose}>Support</Link>
                        <Link as={RouterLink} to="#aboutInfo" onClick={onClose}>Help</Link>
                        <Link as={RouterLink} to="#aboutInfo" onClick={onClose}>FAQ's</Link>
                        <Link as={RouterLink} to="/contact" onClick={onClose}>Contact Info</Link>
                      </Stack>
                    </Collapse>
                  </Box>
                  <InputGroup size="sm" width="200px" mt={4}>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="search"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearchSubmit();
                        }
                      }}
                    />
                  </InputGroup>
                  <Link as={RouterLink} to="/fundRaise" _hover={{ bg: "#e07b00" }}>Start a fundraiser</Link>
                  {!isLoggedIn ? (
                    <>
                      <Link as={RouterLink} to="/login" onClick={onClose}>Login</Link>
                      <Link as={RouterLink} to="/signup" onClick={onClose}>Register</Link>
                    </>
                  ) : (
                    <>
                      <Link as={RouterLink} to="/dashboard" onClick={onClose}>Dashboard</Link>
                      <Link as={RouterLink} to="/profile" onClick={onClose}>Profile</Link>
                      <Link as={RouterLink} onClick={() => { handleLogout(); onClose(); }}>Logout</Link>
                    </>
                  )}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      ) : null}
    </Box>
  );
}
