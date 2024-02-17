import { Box, Flex } from "@chakra-ui/react";
import { useChatContext } from "../context/ChatProvider";
import MyChats from "../components/chat/MyChats";
import ChatBox from "../components/chat/ChatBox";
import SideDrawer from "../components/chat/SideDrawer";

const Chat = () => {
  const { user } = useChatContext();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box w="100%" h="91.5vh">
        <Flex justifyContent="space-between">
          {user && <MyChats />}
          {user && <ChatBox />}
        </Flex>
      </Box>
    </div>
  );
};

export default Chat;
