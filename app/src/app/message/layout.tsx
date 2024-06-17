import { Box, Flex } from "@chakra-ui/react";
import ContactSideBar from "../Components/contactSideBar";
import { Providers } from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex bg="red">
      <Box>
        <ContactSideBar />
      </Box>
      <Box bg="blue">
        <Providers>{children}</Providers>
      </Box>
    </Flex>
  );
}
