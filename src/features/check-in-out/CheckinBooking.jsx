import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [confirmIncludeBreakfast, setConfirmIncludeBreakfast] = useState(false);
  const {
    isLoading: isLoadingBooking,
    booking = {},
    error: bookingError,
  } = useBooking();
  const {
    isLoading: isLoadingSettings,
    settings = {},
    error: settingsError,
  } = useSettings();
  const { mutate, isLoading: isCheckingin } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmedPaid(booking?.hasPaid ?? false);
  }, [booking.hasPaid]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numberOfGuests,
    hasBreakfast,
    numberOfNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numberOfNights * numberOfGuests;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (confirmIncludeBreakfast) {
      mutate({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      mutate({ bookingId });
    }
  }

  if (isLoadingBooking || isLoadingSettings) {
    return <Spinner />;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={confirmIncludeBreakfast}
            onChange={() => {
              setConfirmIncludeBreakfast((hasBreakfast) => !hasBreakfast);
              setConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmedPaid}
          disabled={confirmedPaid || isCheckingin}
          onChange={() => setConfirmedPaid((confirmed) => !confirmed)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!confirmIncludeBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          variation="primary"
          disabled={!confirmedPaid || isCheckingin}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button
          disabled={isCheckingin}
          variation="secondary"
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
