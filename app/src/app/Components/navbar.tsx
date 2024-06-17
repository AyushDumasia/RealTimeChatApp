import { Flex, Box, Spacer, Button } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi"; // Assuming you're using React Icons for user icon
import { Link } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      bg="teal"
      p={30}
      color="white"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Box ml={8}>
        <span className="text-white text-xl font-bold">Your Website Name</span>
      </Box>

      <Spacer />

      <Box mr={8} display="flex" alignItems="center">
        <Link
          colorScheme="teal"
          variant="solid"
          mr={4}
          px={6}
          href="/auth/login"
          _hover={{ bg: "teal.600" }}
        >
          Login
        </Link>
        <Link
          colorScheme="teal"
          variant="outline"
          px={6}
          href="/auth/signup"
          _hover={{ bg: "teal.600", color: "white" }}
        >
          Sign Up
        </Link>
        <Box display="inline-block" ml={4}>
          <FiUser size={24} color="white" />
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;
