import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
//UI for home page
function HomePage() {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10} border={"1px solid black"}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
          border={"1px solid black"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
}

export default HomePage;
