import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { useChatContext } from "../../context/ChatProvider";
import ProfileModal from "../miscellaneous/ProfileModal";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useChatContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <Box bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
        <Flex justifyContent="space-between" alignItems="center">
          <Tooltip
            label="Search Users to chat"
            hasArrow
            placeContent="bottom-end"
          >
            <Button variant="ghost" onClick={onOpen}>
              <i>
                <IoSearch />
              </i>
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search User
              </Text>
            </Button>
          </Tooltip>

          <Text fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
          </Text>

          <Menu>
            <MenuButton>
              <FaRegBell />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <ProfileModal user={user}>My Profile</ProfileModal>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}> Logout </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderWidth="1px">Search Users</DrawerHeader>
          </DrawerContent>
          <DrawerBody>
            <Box>
              <Flex pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                //  onClick={handleSearch }
                >
                  {" "}
                </Button>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
