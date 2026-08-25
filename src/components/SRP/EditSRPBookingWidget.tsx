import { ActionIcon, Group, Paper, Stack, Text } from "@mantine/core";
import { Pencil } from "lucide-react";

export interface EditSRPBookingWidgetProps {
  departure_sector: string;
  destination_sector: string;
  departure_date: string;
  destination_date: string;
  return_date: string;
  onEdit?: () => void;
}

export default function EditSRPBookingWidget({
  departure_sector,
  destination_sector,
  departure_date,
  destination_date,
  onEdit,
}: EditSRPBookingWidgetProps) {
  return (
    <div className="flex justify-center w-full">
      <Paper withBorder radius="md" p="md" shadow="xs" style={{}}>
        <Group justify="center" align="center">
          <Stack gap={6}>
            <Group gap="sm" align="center">
              <Text fw={700} size="lg">
                {departure_sector}
              </Text>

              <Text c="dimmed" size="sm">
                →
              </Text>

              <Text fw={700} size="lg">
                {destination_sector}
              </Text>

              <Stack gap={0}>
                <Text size="xs" c="dimmed">
                  Departure Date
                </Text>
                <Text size="sm" fw={500} ta="center">
                  {departure_date}
                </Text>
              </Stack>

              <Stack gap={0}>
                <Text size="xs" c="dimmed">
                  Return Date
                </Text>
                <Text size="sm" fw={500} ta="center">
                  {destination_date}
                </Text>
              </Stack>
            </Group>
          </Stack>

          <ActionIcon
            variant="subtle"
            color="dark"
            size="lg"
            radius="md"
            onClick={onEdit}
            aria-label="Edit booking"
          >
            <Pencil size={18} />
          </ActionIcon>
        </Group>
      </Paper>
    </div>
  );
}
