import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUpdateUserData from "./useUpdateUserData";
import useUser from "./useUser";

export default function UpdateUserDataForm() {
  const { user } = useUser();

  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { isLoading, mutate } = useUpdateUserData();

  if (!user) return null;

  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) {
      return;
    }
    mutate(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variation={"primary"} disabled={isLoading}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}
