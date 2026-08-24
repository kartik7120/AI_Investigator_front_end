import { Modal } from "@mantine/core";
import React, { useState } from "react";
import EditSRPBookingWidget from "./EditSRPBookingWidget";
import BookingWidget from "../../stories/BookingWidget";

export default function SRPPageBookingWidgetModal() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal onClose={() => setOpened(false)} opened={opened} size="auto" >
        <BookingWidget />
      </Modal>

      <EditSRPBookingWidget
        departure_date="12 Jul"
        destination_date="11 Nov"
        departure_sector="DEL"
        destination_sector="BOM"
        onEdit={() => setOpened(true)}
      />
    </div>
  );
}
