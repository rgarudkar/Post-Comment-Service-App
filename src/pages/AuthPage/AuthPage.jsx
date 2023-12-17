import React from "react";
import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
//UI for Auth page (starting page)
function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex alignItems={"center"} gap={10}>
          {/* Left Hand Side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/logo.png" h={250} alt="WEB LOGO" align={"left"} />
          </Box>
          {/* Right Hand Side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthPage;
