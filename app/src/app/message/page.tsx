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
    <Flex direction="column" width="100%" maxWidth="600px" margin="auto">
      {/* Receiver's message */}
      <Flex
        width="100%"
        justifyContent="flex-start"
        alignItems="center"
        marginBottom="4"
      >
        <Avatar
          name={receiver.name}
          src={receiver.avatarUrl}
          size="sm"
          marginRight="2"
        />
        <Box>
          <Text fontWeight="bold">{receiver.name}</Text>
          <Text fontSize="sm">{receiver.role}</Text>
        </Box>
      </Flex>

      {/* Message box */}
      <Flex
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        marginBottom="2"
      >
        <MessageBox
          position="left"
          avatar={receiver.avatarUrl}
          type="text"
          status="sent"
          text="Hi, my name is my friend."
          date={new Date()}
          notch={false}
          maxWidth="80%"
        />
      </Flex>

      {/* Sender's information */}
      <Flex
        width="100%"
        justifyContent="flex-end"
        alignItems="center"
        marginTop="4"
      >
        <Box textAlign="right">
          <Text fontSize="sm">{sender.name}</Text>
          <Text fontSize="xs">{sender.role}</Text>
        </Box>
        <Avatar
          name={sender.name}
          src={sender.avatarUrl}
          size="sm"
          marginLeft="2"
        />
      </Flex>
    </Flex>
  );
};

export default Message;
