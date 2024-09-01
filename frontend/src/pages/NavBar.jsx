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

const API_URL = 'http://localhost:9090/projects';

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
        <Box display="flex" alignItems="center" gap="20px">
          {!isLoggedIn ? (
            <>
              <RouterLink to="/">
                <Image src={logo} alt="Logo" height="80px" mr={4} />
              </RouterLink>
              <RouterLink to="/contact">
                <div style={{ fontSize: '1.2rem' }}>Contact Info</div>
              </RouterLink>
            </>
          ) : (
            <>
            
            <RouterLink to="/home">
                <Image src={logo} alt="Logo" height="80px" mr={4} />
              </RouterLink>
              <RouterLink to="/contact">
                <div style={{ fontSize: '1.2rem' }}>Contact Info</div>
              </RouterLink>
            </>
            
            
          )}
        </Box>
{/* 
        <Box
          display={{ base: 'none', lg: 'flex' }}
          alignItems="center"
          flexWrap="wrap"
          flexGrow={1}
          justifyContent="space-evenly"
        >
          {isLoggedIn && (
            <>
              <Menu>
                <MenuButton
                  as={Link}
                  to="#donate"
                  mx={2}
                  fontWeight="500"
                  fontSize="lg"
                  _hover={{ color: '#f68631' }}
                >
                  Donate <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="#fundDonateInfo">
                    To Individual
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#fundDonateInfo">
                    To Group
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Link}
                  to="#fundraiser"
                  mx={2}
                  fontWeight="500"
                  fontSize="lg"
                  _hover={{ color: '#f68631' }}
                >
                  Fundraiser <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="#myself">
                    Myself
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#individual">
                    Individual
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#groups">
                    Groups
                  </MenuItem>
                </MenuList>
              </Menu>
              <Link
                as={RouterLink}
                to="#pricing"
                mx={2}
                fontWeight="500"
                fontSize="lg"
                _hover={{ color: '#a6d248' }}
              >
                Pricing
              </Link>
              <Menu>
                <MenuButton
                  as={Link}
                  to="#about"
                  mx={2}
                  fontWeight="500"
                  fontSize="lg"
                  _hover={{ color: '#a6d248' }}
                >
                  About <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="#aboutInfo">
                    About us
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#aboutInfo">
                    Support
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#aboutInfo">
                    Help
                  </MenuItem>
                  <MenuItem as={RouterLink} to="#aboutInfo">
                    FAQ's
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/contact">
                    Contact Info
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Box> */}

        <Flex alignItems="center" position="relative" gap="30px">
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
                <Box textAlign="center">
                  <Text>No results found</Text>
                </Box>
              </Stack>
            </Box>
          )}

          {searchResults.length > 0 && (
            <Box position="absolute" bg="white" width="200px" mt={1} borderRadius="md" boxShadow="md" zIndex="1000">
              <Stack>
                {searchResults.map((result) => (
                  <Link key={result._id} onClick={() => navigate(`/project/${result._id}`)}>
                    {result.donation_title}
                  </Link>
                ))}
              </Stack>
            </Box>
          )}

          <Button
            backgroundColor="#02A95C"
            color="white"
            variant="solid"
            mx={2}
            height="35px"
            borderRadius="8px"
            fontWeight="500"
            fontSize="lg"
            onClick={() => {
              navigate('/fundRaise');
            }}
          >
            Start a fundraiser
          </Button>

          <Box mx={2} display={{ base: 'none', lg: 'flex' }} alignItems="center">
            {!isLoggedIn ? (
              <Link as={RouterLink} to="/login" fontSize="lg" fontWeight="600" color="#2C5282">
                Login
              </Link>
            ) : (
              <Menu>
                <MenuButton as={IconButton} icon={<FaUser />} variant="outline" aria-label="Options" />
                <MenuList>
                  <MenuItem as={RouterLink} to="/dashboard">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Box>

          <IconButton
            size="lg"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <RouterLink to="/">
                <Image src={logo} alt="Logo" height="40px" />
              </RouterLink>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                <Link as={RouterLink} to="/" onClick={onClose}>
                  Home
                </Link>
                <Link as={RouterLink} to="/contact" onClick={onClose}>
                  Contact Info
                </Link>
                <Link as={RouterLink} to="/login" onClick={onClose}>
                  Login
                </Link>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Collapse>
    </Box>
  );
}
