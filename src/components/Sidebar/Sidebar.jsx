import { Box, Flex,Image, Tooltip,Button } from "@chakra-ui/react";
import {Link} from 'react-router-dom'
import {Link as RouterLink} from 'react-router-dom';
// import { CreatePostLogo,NotificationsLogo,SearchLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";


const Sidebar = () => {
 const{handleLogout,isLoggingOut} = useLogout()
   return (<Box
    height={"100vh"}
    borderRight={"1px solid"}
    borderColor={"whiteAlpha.400"}
    py={1}
    position={"sticky"}
    top={0}
    left={0}
    px={{base:2,md:4}}
    >
<Flex direction={"column"} gap={10} w="full" height={"full"}>
    <Link to={"/"} as ={RouterLink} pl={2} display={{base:"none",md:"block"}} cursor="pointer">
        <Image src = "/homelogo.png" h={50}/>       
    </Link>
    <Flex direction={"column"} gap={5} cursor={"pointer"}>
					<SidebarItems />
				</Flex>
				{/* LOGOUT */}
				<Tooltip
					hasArrow
					label={"Logout"}
					placement='right'
					ml={1}
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>
					<Flex
						onClick={handleLogout}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "whiteAlpha.400" }}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						mt={"auto"}
						justifyContent={{ base: "center", md: "flex-start" }}
					>
						<BiLogOut size={25} />
						<Button
							display={{ base: "none", md: "block" }}
							variant={"ghost"}
							_hover={{ bg: "transparent" }}
							isLoading={isLoggingOut}
						>
							Logout
						</Button>
					</Flex>
				</Tooltip>
			</Flex>
		</Box>
	);
};

export default Sidebar;