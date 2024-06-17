"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Flex,
  Heading,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";

const contacts = [
  {
    name: "Segun Adebayo",
    role: "Creator, Chakra UI",
    avatarUrl: "https://bit.ly/sage-adebayo",
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    avatarUrl: "https://bit.ly/dan-abramov",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    avatarUrl: "https://bit.ly/code-beast",
  },
];

const ContactSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const btnRef = useRef();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();

  return (
    <>
      <Flex alignItems="center" marginLeft="10px" height="80vh">
        <IconButton
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          icon={<FiUsers />}
          aria-label="Open Contacts"
          // mt="auto"
          // mb="auto"
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        width="100%"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#1a202c" color="white" maxWidth="500px">
          <DrawerCloseButton />
          <DrawerHeader>Contacts</DrawerHeader>

          <DrawerBody>
            <VStack
              spacing="4"
              p="6"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              width="100%"
              alignItems="start"
            >
              {contacts.map((contact, index) => (
                <Flex
                  key={index}
                  width="100%"
                  alignItems="center"
                  bg="#2d3748"
                  p="4"
                  borderRadius="md"
                >
                  <Avatar
                    name={contact.name}
                    src={contact.avatarUrl}
                    size="lg"
                  />
                  <Box ml="4">
                    <Heading size="md">{contact.name}</Heading>
                    <Text>{contact.role}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ContactSideBar;
