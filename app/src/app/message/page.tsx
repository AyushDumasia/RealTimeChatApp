"use client";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { MessageBox } from "react-chat-elements";

const Message: React.FC = () => {
  // Mock data for sender and receiver
  const sender = {
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Software Engineer",
  };

  const receiver = {
    name: "Friend",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "Product Designer",
  };

  return (
    <Flex direction="column" width="90vw">
      {/* Receiver's message */}
      <Flex width="100%" justifyContent="flex-start" alignItems="center" mb="4">
        <Avatar
          name={receiver.name}
          src={receiver.avatarUrl}
          size="sm"
          mr="2"
        />
        <Box>
          <Text fontWeight="bold">{receiver.name}</Text>
          <Text fontSize="sm">{receiver.role}</Text>
        </Box>
      </Flex>

      {/* Message box */}
      <Flex width="100%" justifyContent="flex-start" alignItems="center" mb="2">
        <MessageBox
          position="left"
          avatar={receiver.avatarUrl}
          type="text"
          status="sent"
          text="Hi, my name is my friend."
          date={new Date()}
          notch={false}
          className="custom-message-box" // Custom class for styling purposes
          style={{
            background: "#f0f0f0", // Example background color
            borderRadius: "8px", // Example border radius
            padding: "10px", // Example padding
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Message;
