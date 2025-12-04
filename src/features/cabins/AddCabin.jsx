import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <div>
      <Button
        variation={"primary"}
        size={"medium"}
        onClick={() => {
          setisOpenModal(!isOpenModal);
        }}
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal
          onClose={() => {
            setisOpenModal(!isOpenModal);
          }}
        >
          <CreateCabinForm
            onCloseModal={() => {
              setisOpenModal(!isOpenModal);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
