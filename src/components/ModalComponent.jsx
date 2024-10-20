"use client";

import { Button, Modal } from "flowbite-react";
import { TiTick } from "react-icons/ti";

export default function ModalComponent({ message, openModal, setOpenModal }) {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <TiTick className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="success" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
