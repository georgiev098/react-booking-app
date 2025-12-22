import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function BookingDetail() {
  const {
    isLoading: isFetchingBooking,
    booking = {},
    error: fetchingBookingError,
  } = useBooking();
  const {
    isLoading: isCheckingout,
    mutate,
    error: checkingOutError,
  } = useCheckout();
  const {
    isLoading: isDeleting,
    mutate: deleteBooking,
    error: deleteBookingError,
  } = useDeleteBooking();
  const navigate = useNavigate();

  const { status, id: bookingId } = booking;
  const isCheckedIn = status === "checked-in";
  const isCheckedOut = status === "checked-out";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckout() {
    mutate(bookingId);
    navigate("/bookings");
  }
  function handleDelete() {
    deleteBooking(bookingId, {
      onSuccess: () => navigate("/bookings"),
    });
  }

  if (isFetchingBooking) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resourceName={"booking"} />;
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {!isCheckedIn && !isCheckedOut && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {isCheckedIn && (
          <Button
            disabled={isCheckingout}
            variation="primary"
            onClick={handleCheckout}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variation={"danger"}>Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={handleDelete}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}
