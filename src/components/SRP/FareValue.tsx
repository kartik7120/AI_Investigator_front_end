import { Box, Text } from "@mantine/core";

interface FareValueProps {
  value: string;
}

export default function FareValue({ value }: FareValueProps) {
  const isComplementary = value.toLowerCase() === "complimentary";

  return (
    <Box
      h={45}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Text size="sm" c="dimmed" td={isComplementary ? "underline" : undefined}>
        {value}
      </Text>
    </Box>
  );
}
