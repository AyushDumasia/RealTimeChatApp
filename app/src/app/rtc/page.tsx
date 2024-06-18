"use client";
import { Box, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSocket } from "../Providers/Socket";
import { useRouter } from "next/navigation";

const RtcPage = () => {
  const { socket } = useSocket();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("joinRoom", { emailId: email, roomId: room });
  };

  useEffect(() => {
    const join = ({ roomId }) => {
      console.log(roomId);
      router.push(`/rtc/${roomId}`);
    };

    socket.on("joinRoom", join);

    return () => {
      socket.off("joinRoom", join);
    };
  }, [socket]);

  return (
    <Box width="50%" p="10">
      <form onSubmit={handleJoinRoom}>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          mb={4}
        />
        <Input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room"
          mb={4}
        />
        <Button colorScheme="teal" size="lg" variant="outline" type="submit">
          Enter
        </Button>
      </form>
    </Box>
  );
};

export default RtcPage;
