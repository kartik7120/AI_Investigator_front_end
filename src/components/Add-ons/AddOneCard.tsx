import {
    Button,
    Card,
    Group,
    Stack,
    Text,
    Badge,
    Title,
} from "@mantine/core";

export interface SSR {
    id: number;
    type: string;
    quantity: number;
    fareType: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS";
    price: number;
    flightID: number;
}

interface AddonCardProps {
    addon: SSR;
    onAdd?: (addon: SSR) => void;
}

export default function AddonCard({
    addon,
    onAdd,
}: AddonCardProps) {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
        >
            <Stack gap="md">
                {/* Header */}
                <Group justify="space-between" align="flex-start">
                    <div>
                        <Title order={4}>{addon.type}</Title>
                    </div>

                    <Badge variant="light">
                        {addon.fareType.replace("_", " ")}
                    </Badge>
                </Group>

                {/* Price */}
                <div>
                    <Text size="sm" c="dimmed">
                        Price
                    </Text>

                    <Text size="xl" fw={700}>
                        ₹{addon.price.toLocaleString("en-IN")}
                    </Text>
                </div>

                {/* Availability */}
                <Group justify="space-between">
                    <Text size="sm">
                        Available: <strong>{addon.quantity}</strong>
                    </Text>

                    <Button
                        onClick={() => onAdd?.(addon)}
                        disabled={addon.quantity === 0}
                    >
                        Add
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
}