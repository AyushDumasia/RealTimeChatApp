"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RoomId = () => {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    console.log("Room ID:", roomId);
  }, [roomId]);

  if (!roomId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
    </div>
  );
};

export default RoomId;
