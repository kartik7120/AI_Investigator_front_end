import React from "react";

import {
  Box,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { ArrowRight, ChevronUp, Plane } from "lucide-react";
import FareCard from "./FareCard";

export interface Fare {
  name: string;
  price: number;
  baggage: string;
  changeFee: string;
  cancellationFee: string;
  miles: string;
  lowestPrice?: boolean;
}

interface FlightResultCardProps {
  departureSector: string;
  destinationSector: string;

  departureTime: string;
  arrivalTime: string;

  departureDate: string;
  arrivalDate: string;

  duration: string;
  connection?: string;

  departureCity: string;
  destinationCity: string;

  fares: Fare[];
}

const cabins = [
  {
    name: "Economy",
    price: "INR 52,862",
  },
  {
    name: "Premium Economy",
    price: "INR 98,196",
  },
  {
    name: "Business",
    price: "INR 144,991",
  },
  {
    name: "First",
    price: "INR 471,132",
  },
];

const benefits = [
  "Regular seat selection",
  "Baggage",
  "Change fee",
  "Refund fee",
  "Skywards Miles",
  "Upgrade to Business",
];

export default function FlightResultCard({
  departureSector,
  destinationSector,
  departureTime,
  arrivalTime,
  departureDate,
  arrivalDate,
  duration,
  connection,
  departureCity,
  destinationCity,
  fares,
}: FlightResultCardProps) {
  return (
    <Paper
      withBorder
      radius="md"
      p={0}
      style={{
        overflow: "hidden",
        backgroundColor: "#151718",
        borderColor: "#292c2d",
      }}
    >
      {/* ------------------------------------------------ */}
      {/* FLIGHT SUMMARY                                   */}
      {/* ------------------------------------------------ */}

      <Box p="xl">
        <Group justify="space-between" align="flex-start">
          {/* Departure */}
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              {departureDate}
            </Text>

            <Text size="xl" fw={500}>
              {departureTime}
            </Text>

            <Text fw={500}>{departureSector}</Text>

            <Text size="sm" c="dimmed">
              {departureCity}
            </Text>
          </Stack>

          {/* Flight duration */}
          <Stack
            gap={6}
            style={{
              flex: 1,
              maxWidth: 330,
              marginTop: 18,
            }}
          >
            <Group justify="center">
              <Text size="xs" c="dimmed">
                {duration}
              </Text>
            </Group>

            <Group gap={0} wrap="nowrap">
              <Box
                style={{
                  height: 1,
                  backgroundColor: "#444",
                  flex: 1,
                }}
              />

              <ArrowRight size={15} color="#555" />
            </Group>

            {connection && (
              <Text size="sm" ta="center" td="underline" c="dimmed">
                {connection}
              </Text>
            )}
          </Stack>

          {/* Arrival */}
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              {arrivalDate}
            </Text>

            <Text size="xl" fw={500}>
              {arrivalTime}
            </Text>

            <Text fw={500}>{destinationSector}</Text>

            <Text size="sm" c="dimmed">
              {destinationCity}
            </Text>
          </Stack>

          {/* Price */}
          <Stack gap={2} align="flex-end" style={{ minWidth: 180 }}>
            <Text size="sm" c="teal.3">
              Economy Class
            </Text>

            <Text size="sm" c="teal.3">
              from{" "}
              <Text component="span" size="xl" fw={600}>
                INR {fares[0]?.price.toLocaleString()}
              </Text>
              <ChevronUp
                size={20}
                style={{
                  marginLeft: 8,
                  verticalAlign: "middle",
                }}
              />
            </Text>

            <Text size="xs" fw={600} c="teal.3">
              Lowest price
            </Text>
          </Stack>
        </Group>
      </Box>

      <Divider color="#303334" />

      {/* ------------------------------------------------ */}
      {/* FLIGHT SEGMENTS                                  */}
      {/* ------------------------------------------------ */}

      <Group px="xl" py="md" gap="xl">
        <Group gap="xs">
          <ThemeIcon variant="transparent" size="sm" c="teal.3">
            <Plane size={18} />
          </ThemeIcon>

          <Text size="sm" c="dimmed">
            B777
          </Text>

          <Text size="sm" c="dimmed">
            EK511
          </Text>
        </Group>

        <Group gap="xs">
          <ThemeIcon variant="transparent" size="sm" c="teal.3">
            <Plane size={18} />
          </ThemeIcon>

          <Text size="sm" c="dimmed">
            B777
          </Text>

          <Text size="sm" c="dimmed">
            EK193
          </Text>
        </Group>
      </Group>

      <Divider color="#303334" />

      {/* ------------------------------------------------ */}
      {/* CABIN SELECTOR                                   */}
      {/* ------------------------------------------------ */}

      <Box px="xl" pt="md">
        <SimpleGrid cols={4}>
          {cabins.map((cabin, index) => (
            <Box
              key={cabin.name}
              py="xs"
              style={{
                borderBottom:
                  index === 0 ? "2px solid #9ee6c1" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <Text size="md" c={index === 0 ? "teal.3" : "dimmed"}>
                {cabin.name}
              </Text>

              <Text size="sm" mt={4} c={index === 0 ? "teal.3" : "dimmed"}>
                from{" "}
                <Text component="span" fw={index === 0 ? 600 : 400}>
                  {cabin.price}
                </Text>
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* ------------------------------------------------ */}
      {/* FARE COMPARISON                                  */}
      {/* ------------------------------------------------ */}

      <Box p="xl">
        <Group align="flex-start" gap="md" wrap="nowrap">
          {/* Benefits column */}
          <Box
            style={{
              width: 205,
              flexShrink: 0,
              paddingTop: 65,
            }}
          >
            <Text size="sm" ta="right" c="dimmed" mb="xs">
              Fare benefits (per person)
            </Text>

            <Text size="sm" ta="right" td="underline" c="dimmed" mb="xl">
              Compare all services
            </Text>

            <Stack gap={0}>
              {benefits.map((benefit) => (
                <Box
                  key={benefit}
                  h={45}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text size="sm" c="dimmed" ta="right">
                    {benefit}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Fare cards */}
          <SimpleGrid
            cols={Math.min(fares.length, 2)}
            spacing="md"
            style={{
              flex: 1,
              maxWidth: 570,
            }}
          >
            {fares.map((fare) => (
              <FareCard key={fare.name} fare={fare} />
            ))}
          </SimpleGrid>
        </Group>
      </Box>
    </Paper>
  );
}
