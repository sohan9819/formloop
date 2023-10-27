import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

export const StatsCardsData = [
  {
    title: "Total visits",
    icon: LuView,
    helperText: "All time form visits",
    dataType: "visits",
    color: "blue",
  },
  {
    title: "Total submissions",
    icon: FaWpforms,
    helperText: "All time form submissions",
    dataType: "submissions",
    color: "yellow",
  },
  {
    title: "Submission rate",
    icon: HiCursorClick,
    helperText: "Visits that result in form submission",
    dataType: "visits",
    color: "green",
  },
  {
    title: "Bounce rate",
    icon: TbArrowBounce,
    helperText: "Visits that leave without interacting",
    dataType: "visits",
    color: "red",
  },
];
