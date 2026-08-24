import {
  Badge,
  Card,
  Divider,
  Group,
  Paper,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import { ChevronDown, Check, Plane } from "lucide-react";

import type { Fare } from "./SRPFareCard";

interface SRPFareDropdownProps {
  FlightNumbers: string;
  fares: Fare[];
  departure_time: string;
  arrival_time: string;
  departure_date: string;
  departure_sector: string;
  destination_sector: string;
  departure_city: string;
  destination_city: string;
  duration: string;
  lowest_price: number;
}

export default function SRPFareDropdown(props: SRPFareDropdownProps) {
  const {
    FlightNumbers,
    fares,
    departure_time,
    arrival_time,
    departure_date,
    departure_sector,
    destination_sector,
    departure_city,
    destination_city,
    duration,
    lowest_price,
  } = props;

  return (
    <Popover
      width="target"
      position="bottom"
      withArrow
      shadow="lg"
      radius="md"
      offset={6}
    >
      <Popover.Target>
        <Paper
          withBorder
          radius="md"
          style={{
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Main flight information */}
          <Group
            justify="space-between"
            align="stretch"
            px="xl"
            py="lg"
            wrap="nowrap"
          >
            {/* Departure */}
            <Stack gap={2} miw={100}>
              <Text size="xs" c="dimmed">
                {departure_date}
              </Text>

              <Text size="xl" fw={500}>
                {departure_time}
              </Text>

              <Text fw={600}>{departure_sector}</Text>

              <Text size="sm" c="dimmed">
                {departure_city}
              </Text>
            </Stack>

            {/* Duration */}
            <Stack gap={4} justify="center" align="center" style={{ flex: 1 }}>
              <Text size="sm" c="dimmed">
                {duration}
              </Text>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Divider style={{ flex: 1 }} />

                <Plane
                  size={14}
                  style={{
                    marginLeft: 6,
                    transform: "rotate(90deg)",
                  }}
                />
              </div>

              <Text size="sm" td="underline" c="dimmed">
                Connects in Dubai
              </Text>
            </Stack>

            {/* Arrival */}
            <Stack gap={2} miw={130} align="center">
              <Text size="xs" c="dimmed">
                {departure_date}
              </Text>

              <Text size="xl" fw={500}>
                {arrival_time}
              </Text>

              <Text fw={600}>{destination_sector}</Text>

              <Text size="sm" c="dimmed">
                {destination_city}
              </Text>
            </Stack>

            {/* Fare summary */}
            <Stack gap={2} align="flex-end" justify="center" miw={180}>
              <Group gap={8}>
                <Text size="sm" c="green" fw={500}>
                  Economy Class
                </Text>

                <ChevronDown size={20} color="red" />
              </Group>

              <Text size="sm">
                from{" "}
                <Text span size="xl" fw={500} c="green">
                  INR {lowest_price.toLocaleString("en-IN")}
                </Text>
              </Text>

              <Text size="xs" c="green" fw={600}>
                Lowest price
              </Text>
            </Stack>
          </Group>

          {/* Flight numbers */}
          <Group
            px="xl"
            py="sm"
            gap="xl"
            style={{
              borderTop: "1px solid var(--mantine-color-dark-4)",
            }}
          >
            {FlightNumbers.split(",").map((flightNumber) => (
              <Group key={flightNumber} gap="xs">
                <Plane size={18} />

                <Text size="sm" c="dimmed">
                  {flightNumber.trim()}
                </Text>
              </Group>
            ))}
          </Group>
        </Paper>
      </Popover.Target>

      {/* Fare cards */}
      <Popover.Dropdown p="md">
        <Group align="stretch" wrap="nowrap" gap="md">
          {fares.map((fare) => (
            <FareOption key={fare.FareType} fare={fare} />
          ))}
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}

interface FareOptionProps {
  fare: Fare;
}

function FareOption({ fare }: FareOptionProps) {
  return (
    <Card
      withBorder
      radius="md"
      padding="lg"
      style={{
        flex: 1,
        minWidth: 240,
      }}
    >
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={700}>{fare.FareType}</Text>

          <Badge variant="light" color="green">
            Available
          </Badge>
        </Group>

        <Stack gap={0}>
          <Text size="xs" c="dimmed">
            Fare
          </Text>

          <Text size="xl" fw={700}>
            INR {Number(fare.price).toLocaleString("en-IN")}
          </Text>
        </Stack>

        <Divider />

        <Stack gap="xs">
          <Group gap="xs">
            <Check size={16} />

            <Text size="sm">{fare.baggage} kg check-in baggage</Text>
          </Group>

          <Group gap="xs">
            <Check size={16} />

            <Text size="sm">{fare.cabinBaggageAllowance} kg cabin baggage</Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
