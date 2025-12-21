import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import {
  HiCalendarDays,
  HiMiniBanknotes,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numbDays,
  cabinCount,
}) {
  const numOfBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkIns = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce((acc, curr) => acc + curr.numberOfNights, 0) /
    (numbDays * cabinCount);
  return (
    <>
      <Stat
        value={numOfBookings}
        title={"Number of bookings"}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
      />
      <Stat
        value={checkIns}
        title={"Check ins"}
        icon={<HiCalendarDays />}
        color={"indigo"}
      />
      <Stat
        value={formatCurrency(sales)}
        title={"Sales"}
        icon={<HiMiniBanknotes />}
        color={"green"}
      />
      <Stat
        value={Math.round(occupancyRate * 100) + "%"}
        title={"Occupancy rate"}
        icon={<HiOutlineChartBarSquare />}
        color={"yellow"}
      />
    </>
  );
}
