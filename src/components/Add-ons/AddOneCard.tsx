import {
    Button,
    Card,
    Group,
    Stack,
    Text,
    Badge,
    Title,
} from "@mantine/core";
import { useBearStore } from "../../store/store";

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
    onRemove?: (addon: SSR) => void;
}

export default function AddonCard({
    addon,
    onAdd,
    onRemove
}: AddonCardProps) {

    const SSRs = useBearStore((store) => store.SSRs)

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

                    <Button
                        onClick={() => onAdd?.(addon)}
                        disabled={addon.quantity === 0 || SSRs.some((ssr) => ssr.id === addon.id)}
                    >
                        Add
                    </Button>

                    {SSRs.some((ssr) => ssr.id === addon.id) && (
                        <Button onClick={() => onRemove?.(addon)}>
                            Remove
                        </Button>
                    )}
                </Group>
            </Stack>
        </Card>
    );
}