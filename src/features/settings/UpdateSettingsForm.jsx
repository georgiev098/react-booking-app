import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";
import useSettings from "./useSettings";

export default function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isEditing, editSettings } = useEditSettings();

  function handleUpdate(e, name) {
    const { value } = e.target;

    if (!value) return;

    editSettings({
      [name]: value,
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={(e) => {
            handleUpdate(e, "minBookingLength");
          }}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isEditing}
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => {
            handleUpdate(e, "maxBookingLength");
          }}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isEditing}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => {
            handleUpdate(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          disabled={isEditing}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => {
            handleUpdate(e, "breakfastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}
