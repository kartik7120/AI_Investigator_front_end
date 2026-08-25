import { Modal } from "@mantine/core";
import { useState } from "react";
import EditSRPBookingWidget, {
  type EditSRPBookingWidgetProps,
} from "./EditSRPBookingWidget";
import BookingWidget from "../../stories/BookingWidget";

export default function SRPPageBookingWidgetModal(
  props: EditSRPBookingWidgetProps,
) {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal onClose={() => setOpened(false)} opened={opened} size="auto">
        <BookingWidget />
      </Modal>

      <EditSRPBookingWidget {...props} onEdit={() => setOpened(true)} />
    </div>
  );
}
