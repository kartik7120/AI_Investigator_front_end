
import {
    Card,
    Divider,
    Group,
    Stack,
    Text,
    ThemeIcon,
} from "@mantine/core";

import {
    Plane,
    Luggage,
    BriefcaseBusiness,
    Users,
    IndianRupee,
    Clock,
} from "lucide-react";

import { BASE_URL } from "../../contants";
import type { Flight } from "../../utils/useFulInterfaces";
import { useQueries } from "@tanstack/react-query";
import { useBearStore } from "../../store/store";

interface TripSummaryProps {
    flightIds: number[];
}

async function getFlightById(flightId: number): Promise<Flight> {
    const resp = await fetch(`${BASE_URL}/getFlight/${flightId}`, {
        method: "GET",
    });

    if (!resp.ok) {
        throw new Error(`Failed to fetch flight data (${resp.status})`);
    }

    return resp.json();
}

function formatDateTime(dateTime: string) {
    const date = new Date(dateTime);

    return {
        date: date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        time: date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
    };
}

export default function TripSummary({ flightIds }: TripSummaryProps) {
    const numberOfPassengers = useBearStore(
        (state) => state.numberOfPassengers
    );

    const results = useQueries({
        queries: flightIds.map((flightId) => ({
            queryKey: ["flight", flightId],
            queryFn: () => getFlightById(flightId),
            enabled: !!flightId,
        })),
    });

    console.log(results)

    const isLoading = results.some((result) => result.isLoading);
    const hasError = results.some((result) => result.isError);

    const fetchedFlights = results
        .map((result) => result.data)
        .filter((flight): flight is Flight => flight !== undefined);

    /*
     * Calculate base fare from the current price of every flight.
     */
    const baseFare = fetchedFlights.reduce((total, flight) => {
        return total + Number(flight.currentPrice ?? 0);
    }, 0);

    const baggageFare = 0;
    const seatFare = 0;
    const addonFare = 0;

    const totalFare =
        baseFare + baggageFare + seatFare + addonFare;

    if (isLoading) {
        return (
            <Card
                shadow="sm"
                radius="md"
                withBorder
                className="w-full max-w-md bg-white"
            >
                <Text size="sm" c="dimmed">
                    Loading trip summary...
                </Text>
            </Card>
        );
    }

    if (hasError) {
        return (
            <Card
                shadow="sm"
                radius="md"
                withBorder
                className="w-full max-w-md bg-white"
            >
                <Text size="sm" c="red">
                    Failed to load trip summary.
                </Text>
            </Card>
        );
    }

    return (
        <Card
            shadow="sm"
            radius="md"
            withBorder
            className=""
        >
            <Stack gap="md">

                {/* Header */}
                <div>
                    <Text fw={700} size="lg" className="text-gray-900">
                        Trip Summary
                    </Text>

                    <Text size="sm" c="dimmed">
                        {numberOfPassengers}{" "}
                        {numberOfPassengers === 1
                            ? "Passenger"
                            : "Passengers"}
                    </Text>
                </div>

                <Divider />

                {/* Flights */}
                <Stack gap="sm">
                    <Text fw={600} size="sm" className="text-gray-800">
                        Flights
                    </Text>

                    {fetchedFlights.length === 0 ? (
                        <Text size="sm" c="dimmed">
                            No flights selected
                        </Text>
                    ) : (
                        fetchedFlights.map((flight) => {
                            const departure = formatDateTime(
                                flight.departureTime
                            );

                            const arrival = formatDateTime(
                                flight.arrivalTime
                            );

                            /*
                             * Find baggage allowance corresponding
                             * to the selected fare.
                             */
                            const baggage = flight.baggageAllowance?.find(
                                (allowance) => {
                                    if (
                                        flight.fareType === "ECONOMY"
                                    ) {
                                        return (
                                            allowance.fareType ===
                                            "DOMESTIC_ECONOMY"
                                        );
                                    }

                                    if (
                                        flight.fareType ===
                                        "PREMIUM_ECONOMY"
                                    ) {
                                        return (
                                            allowance.fareType ===
                                            "DOMESTIC_PREMIUM_ECONOMY"
                                        );
                                    }

                                    if (
                                        flight.fareType === "BUSINESS"
                                    ) {
                                        return (
                                            allowance.fareType ===
                                            "DOMESTIC_BUSINESS"
                                        );
                                    }

                                    return false;
                                }
                            );

                            return (
                                <div
                                    key={flight.id}
                                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                                >
                                    <Stack gap="sm">

                                        {/* Route */}
                                        <Group
                                            justify="space-between"
                                            align="center"
                                        >
                                            <Group gap="xs">
                                                <ThemeIcon
                                                    variant="light"
                                                    size="sm"
                                                    radius="xl"
                                                >
                                                    <Plane size={14} />
                                                </ThemeIcon>

                                                <Text fw={600} size="sm">
                                                    {flight.departureSector}
                                                </Text>

                                                <Text
                                                    size="sm"
                                                    c="dimmed"
                                                >
                                                    →
                                                </Text>

                                                <Text fw={600} size="sm">
                                                    {flight.destinationSector}
                                                </Text>
                                            </Group>

                                            <Text
                                                size="xs"
                                                c="dimmed"
                                            >
                                                {flight.flightNumber}
                                            </Text>
                                        </Group>

                                        {/* Departure / Arrival */}
                                        <div className="grid grid-cols-2 gap-3">

                                            <div>
                                                <Text
                                                    size="xs"
                                                    c="dimmed"
                                                >
                                                    Departure
                                                </Text>

                                                <Group
                                                    gap={4}
                                                    mt={2}
                                                >
                                                    <Clock size={13} />

                                                    <Text
                                                        size="xs"
                                                        fw={500}
                                                    >
                                                        {departure.time}
                                                    </Text>
                                                </Group>

                                                <Text
                                                    size="xs"
                                                    c="dimmed"
                                                    mt={2}
                                                >
                                                    {departure.date}
                                                </Text>
                                            </div>

                                            <div>
                                                <Text
                                                    size="xs"
                                                    c="dimmed"
                                                >
                                                    Arrival
                                                </Text>

                                                <Group
                                                    gap={4}
                                                    mt={2}
                                                >
                                                    <Clock size={13} />

                                                    <Text
                                                        size="xs"
                                                        fw={500}
                                                    >
                                                        {arrival.time}
                                                    </Text>
                                                </Group>

                                                <Text
                                                    size="xs"
                                                    c="dimmed"
                                                    mt={2}
                                                >
                                                    {arrival.date}
                                                </Text>
                                            </div>

                                        </div>

                                        <Divider />

                                        {/* Fare */}
                                        <Group justify="space-between">
                                            <Text
                                                size="xs"
                                                c="dimmed"
                                            >
                                                Fare
                                            </Text>

                                            <Text
                                                size="xs"
                                                fw={600}
                                            >
                                                {flight.fareType ??
                                                    "Economy"}
                                            </Text>
                                        </Group>

                                        {/* Baggage */}
                                        {baggage && (
                                            <Stack gap={5}>
                                                <Text
                                                    size="xs"
                                                    fw={600}
                                                >
                                                    Baggage
                                                </Text>

                                                <Group
                                                    justify="space-between"
                                                >
                                                    <Group gap="xs">
                                                        <BriefcaseBusiness
                                                            size={15}
                                                        />

                                                        <Text size="xs">
                                                            Cabin
                                                        </Text>
                                                    </Group>

                                                    <Text
                                                        size="xs"
                                                        fw={500}
                                                    >
                                                        {
                                                            baggage.cabinBaggageAllowance
                                                        }{" "}
                                                        kg
                                                    </Text>
                                                </Group>

                                                <Group
                                                    justify="space-between"
                                                >
                                                    <Group gap="xs">
                                                        <Luggage
                                                            size={15}
                                                        />

                                                        <Text size="xs">
                                                            Check-in
                                                        </Text>
                                                    </Group>

                                                    <Text
                                                        size="xs"
                                                        fw={500}
                                                    >
                                                        {
                                                            baggage.checkInBaggageAllowance
                                                        }{" "}
                                                        kg
                                                    </Text>
                                                </Group>
                                            </Stack>
                                        )}

                                        {/* Flight fare */}
                                        <Group
                                            justify="space-between"
                                            mt={2}
                                        >
                                            <Text
                                                size="xs"
                                                c="dimmed"
                                            >
                                                Flight fare
                                            </Text>

                                            <Text
                                                size="sm"
                                                fw={700}
                                            >
                                                ₹
                                                {Number(
                                                    flight.currentPrice
                                                    ?? 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </Text>
                                        </Group>
                                    </Stack>
                                </div>
                            );
                        })
                    )}
                </Stack>

                <Divider />

                {/* Passengers */}
                <Group justify="space-between">
                    <Group gap="xs">
                        <Users size={17} />

                        <Text size="sm">
                            Passengers
                        </Text>
                    </Group>

                    <Text size="sm" fw={600}>
                        {numberOfPassengers}
                    </Text>
                </Group>

                <Divider />

                {/* Fare Breakdown */}
                <Stack gap="xs">
                    <Text
                        fw={600}
                        size="sm"
                        className="text-gray-800"
                    >
                        Fare Details
                    </Text>

                    <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                            Base fare
                        </Text>

                        <Text size="sm">
                            ₹
                            {baseFare.toLocaleString("en-IN")}
                        </Text>
                    </Group>

                    <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                            Seats
                        </Text>

                        <Text size="sm">
                            ₹
                            {seatFare.toLocaleString("en-IN")}
                        </Text>
                    </Group>

                    <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                            Add-ons
                        </Text>

                        <Text size="sm">
                            ₹
                            {addonFare.toLocaleString("en-IN")}
                        </Text>
                    </Group>
                </Stack>

                <Divider />

                {/* Total */}
                <Group
                    justify="space-between"
                    align="center"
                >
                    <Group gap="xs">
                        <ThemeIcon
                            variant="light"
                            radius="xl"
                            size="sm"
                        >
                            <IndianRupee size={14} />
                        </ThemeIcon>

                        <Text fw={700} size="md">
                            Total Fare
                        </Text>
                    </Group>

                    <Text fw={800} size="lg">
                        ₹
                        {totalFare.toLocaleString(
                            "en-IN"
                        )}
                    </Text>
                </Group>

            </Stack>
        </Card>
    );
}

