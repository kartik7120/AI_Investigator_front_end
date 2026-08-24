import { Box, Button, Card, Stack, Text } from "@mantine/core";
import FareValue from "./FareValue";
import type { Fare } from "./SRPFareCard";

interface FareCardProps {
  fare: Fare;
}

export default function FareCard({ fare }: FareCardProps) {
  return (
    <Card
      radius="md"
      p={0}
      withBorder
      style={{
        overflow: "hidden",
        backgroundColor: "#17191a",
        borderColor: "#252829",
      }}
    >
      {/* Fare header */}
      <Box
        p="md"
        style={{
          backgroundColor: fare.lowestPrice ? "#125323" : "#103b28",
        }}
      >
        <Text size="lg" fw={600} c="white">
          {fare.name}
        </Text>

        <Text size="md" fw={600} c="white" mt={4}>
          INR {fare.price.toLocaleString()}
        </Text>

        {fare.lowestPrice && (
          <Text size="xs" fw={600} c="white" mt="md">
            Lowest price
          </Text>
        )}
      </Box>

      {/* Fare benefits */}
      <Stack gap={0} p="md">
        <div className="flex flex-row gap-2 justify-between items-center">
          <Text size="md" c="white" mt="md">
            Baggage Allowance
          </Text>
          <FareValue value={fare.baggage} />
        </div>

        <div className="flex flex-row gap-2 justify-between items-center">
          <Text size="md" c="white" mt="md">
            Change Flight Fees
          </Text>

          <FareValue value={fare.changeFee} />
        </div>
        <div className="flex flex-row gap-2 justify-between items-center">
          <Text size="md" c="white" mt="md">
            Cancellation Fees
          </Text>

          <FareValue value={fare.cancellationFee} />
        </div>
        <div className="flex flex-row gap-2 justify-between items-center">
          <Text size="md" c="white" mt="md">
            Distance
          </Text>
          <FareValue value={fare.miles} />
        </div>

        <Button variant="outline" color="gray" fullWidth mt="md" radius="md">
          Select
        </Button>
      </Stack>
    </Card>
  );
}
