import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { useState } from "react";
import useCreatePost from "../../hooks/useCreatePost";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(" ");
  const { isLoading, handleCreatePost } = useCreatePost();
  const handlePostCreation = async () => {
    try {
      await handleCreatePost(content);
      onClose();
      setContent("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      {
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />

          <ModalContent bg={"black"} border={"1px solid gray"}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Textarea
                placeholder="Post Text..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  );
};

export default CreatePost;