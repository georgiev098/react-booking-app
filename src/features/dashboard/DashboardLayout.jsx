import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { data: bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    data: stays,
    confirmedStays,
    isLoading: isLoadingStays,
  } = useRecentStays();

  if (isLoadingStays || isLoadingBookings) {
    return <Spinner />;
  }
  return (
    <StyledDashboardLayout>
      <div className="">Statistics</div>
      <div className="">Activities</div>
      <div className="">Chart stay durations</div>
      <div className="">Chart sales</div>
    </StyledDashboardLayout>
  );
}
