import { FiHome } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";

export const sideBarLinks = [
    {
        icon: <FiHome />,
        label: "Home",
        path: "/" 
    },
    {
        icon: <FiPlusSquare />,
        label: "Create Post",
        path: "/create-post" 
    },
    {
        icon: <FiUsers />,
        label: "Community",
        path: "/community" 
    },
    {
        icon: <FiUserPlus />,
        label: "Profile",
        path: "/profile" 
    }
];