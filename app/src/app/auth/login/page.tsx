"use client";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!phone || !password) {
      setError("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          phone,
          password,
        }
      );

      console.log(response.data);

      setPhone("");
      setPassword("");
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.900"
      color="white"
    >
      <Box
        p={8}
        mx="auto"
        rounded="lg"
        bg="transparent"
        boxShadow="lg"
        maxW={{ base: "80%", sm: "80%", md: "80%" }}
        w="30%"
      >
        <Box textAlign="center">
          <Heading size="lg">Login</Heading>
        </Box>

        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="phone">Phone:</FormLabel>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isRequired
                // borderColor="teal.300"
                bg="gray.800"
                p="6"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />

              <FormLabel mt={4} htmlFor="password">
                Password:
              </FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                // borderColor="teal.300"
                bg="gray.800"
                p="6"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />

              <Button
                mt={6}
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Logging in..."
                type="submit"
                w="full"
                _hover={{ bg: "teal.500" }}
              >
                Login
              </Button>

              {error && (
                <FormErrorMessage mt={2} fontSize="sm" color="red.300">
                  {error}
                </FormErrorMessage>
              )}
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
