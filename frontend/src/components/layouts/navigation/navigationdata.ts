import { FiHome } from "react-icons/fi"; // home icon
import { GoHomeFill } from "react-icons/go"; // home icon filled
import { RiVideoAiLine } from "react-icons/ri"; // video icon
import { RiVideoAiFill } from "react-icons/ri"; // video icon filled
import { MdOutlineExplore } from "react-icons/md"; // Explore icon
import { MdExplore } from "react-icons/md"; // Explore icon filled
import { TbMessageCircle } from "react-icons/tb"; // Message icon
import { TbMessageCircleFilled } from "react-icons/tb"; // Message icon filled
import { RiFileVideoLine } from "react-icons/ri";
import { RiFileVideoFill } from "react-icons/ri";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType;
  activeIcon?: React.ComponentType;
}

export const NavigationData: NavItem[] = [
  { name: "Home", href: "/", icon: FiHome, activeIcon: GoHomeFill },
  {
    name: "Videos",
    href: "/videos",
    icon: RiVideoAiLine,
    activeIcon: RiVideoAiFill,
  },
  {
    name: "Clips",
    href: "/clips",
    icon: RiFileVideoLine,
    activeIcon: RiFileVideoFill,
  },
  {
    name: "Discover",
    href: "/explore",
    icon: MdOutlineExplore,
    activeIcon: MdExplore,
  },

  {
    name: "Message",
    href: "/message",
    icon: TbMessageCircle,
    activeIcon: TbMessageCircleFilled,
  },
];
