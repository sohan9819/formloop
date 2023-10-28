import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

export const StatsCardsData = [
  {
    title: "Total visits",
    icon: <LuView className="text-blue-600" />,
    helperText: "All time form visits",
    dataType: "visits",
    colorClass: "shadow-blue-600",
  },
  {
    title: "Total submissions",
    icon: <FaWpforms className="text-yellow-600" />,
    helperText: "All time form submissions",
    dataType: "submissions",
    colorClass: "shadow-yellow-600",
  },
  {
    title: "Submission rate",
    icon: <HiCursorClick className="text-green-600" />,
    helperText: "Visits that result in form submission",
    dataType: "visits",
    colorClass: "shadow-green-600",
  },
  {
    title: "Bounce rate",
    icon: <TbArrowBounce className="text-red-600" />,
    helperText: "Visits that leave without interacting",
    dataType: "visits",
    colorClass: "shadow-red-600",
  },
];
