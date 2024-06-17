import { Box, Avatar, Text, Flex, Heading, VStack } from "@chakra-ui/react";

// Sample contact data
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
  return (
    <VStack
      width="25%"
      spacing="4"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="#1a202c"
      color="white"
      minHeight="100vh"
      alignItems="start"
    >
      {contacts.map((contact, index) => (
        <Flex key={index} width="100%" alignItems="center" bg="#2d3748" p="4">
          <Avatar name={contact.name} src={contact.avatarUrl} size="lg" />
          <Box ml="4">
            <Heading size="md">{contact.name}</Heading>
            <Text>{contact.role}</Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  );
};

export default ContactSideBar;
