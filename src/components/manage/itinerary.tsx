import {
    Badge,
    Button,
    Card,
    Divider,
    Group,
    Modal,
    Stack,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    ArrowLeft,
    Armchair,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Download,
    Luggage,
    MapPin,
    Plane,
    Tag,
    User,
    XCircle,
} from "lucide-react";

import type { Flight } from "../../utils/useFulInterfaces";
import ItineraryPdf from "./ItineraryPdf";
import { downloadItinerary } from "./downloadItinerary";
import { useNavigate } from "react-router";

interface Passenger {
    id?: number;
    name: string;
    seat?: string;
    fareType: Flight["fareType"];
}

interface ItineraryPageProps {
    flight: Flight;
    bookingReference: string;
    passengers: Passenger[];
    totalPaid: number;

    bookedOn?: string;
    terminal?: string;
    gate?: string;

    onBack?: () => void;
    onDownload?: () => void;
    onCancel?: () => void;
}

export default function Itinerary({
    flight,
    bookingReference,
    passengers,
    totalPaid,
    bookedOn = new Date().toLocaleString("en-IN"),
    terminal = "T3",
    gate = "A12",
    onBack,
    onDownload,
    onCancel,
}: ItineraryPageProps) {
    const [cancelOpened, { open: openCancel, close: closeCancel }] =
        useDisclosure(false);

    const navigate = useNavigate();

    const selectedFare =
        flight.fareType ??
        flight.currentPrice?.[0]?.fareType ??
        "ECONOMY";

    const duration = calculateDuration(
        flight.departureTime,
        flight.arrivalTime
    );

    const selectedBaggage = flight.baggageAllowance?.find(
        (item) =>
            item.fareType ===
            (`DOMESTIC_${selectedFare}` as typeof item.fareType)
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <div style={{
                position: "absolute",
                left: "-10000px",
                top: 0,
                width: "794px",
            }}>
                <ItineraryPdf
                    flight={flight}
                    bookingReference={bookingReference}
                    passengers={passengers}
                    totalPaid={totalPaid}
                />
            </div>
            {/* --------------------------------------------------------------- */}
            {/* HEADER                                                          */}
            {/* --------------------------------------------------------------- */}

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <button
                        onClick={() => {
                            navigate("/manage");
                        }}
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Manage Bookings
                    </button>
                </div>
            </header>

            {/* --------------------------------------------------------------- */}
            {/* PAGE                                                            */}
            {/* --------------------------------------------------------------- */}

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page heading */}
                <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600">
                        <Plane size={23} />
                    </div>

                    <div>
                        <Title order={2} className="!text-3xl !font-bold">
                            Trip Itinerary
                        </Title>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <div>
                                Booking Reference{" "}
                                <span className="ml-1 rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-800">
                                    {bookingReference}
                                </span>
                            </div>

                            <div className="hidden h-5 w-px bg-slate-200 sm:block" />

                            <div className="flex items-center gap-1.5">
                                <CalendarDays size={15} />
                                Booked on {bookedOn}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                    {/* =========================================================== */}
                    {/* LEFT                                                         */}
                    {/* =========================================================== */}

                    <div className="space-y-5">
                        {/* --------------------------------------------------------- */}
                        {/* FLIGHT DETAILS                                            */}
                        {/* --------------------------------------------------------- */}

                        <Card
                            withBorder
                            radius="md"
                            padding="lg"
                            className="!border-slate-200"
                        >
                            {/* Flight header */}
                            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <div>
                                        <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
                                            <span>{flight.departureSector}</span>

                                            <Plane
                                                size={18}
                                                className="rotate-90 text-blue-600"
                                            />

                                            <span>{flight.destinationSector}</span>
                                        </div>

                                        <Text size="sm" c="dimmed" mt={4}>
                                            {formatDate(flight.departureTime)}
                                            <span className="mx-2">•</span>
                                            {flight.flightNumber}
                                        </Text>
                                    </div>

                                    <Badge
                                        size="lg"
                                        variant="light"
                                        color={
                                            flight.status?.toLowerCase() === "cancelled"
                                                ? "red"
                                                : "green"
                                        }
                                    >
                                        {flight.status ?? "Confirmed"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Journey */}
                            <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-5">
                                {/* Departure */}
                                <div>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {flight.departureSector}
                                    </p>

                                    <p className="mt-1 max-w-[180px] text-sm text-slate-500">
                                        {getAirportName(flight.departureSector)}
                                    </p>

                                    <p className="mt-4 text-2xl font-bold text-slate-900">
                                        {formatTime(flight.departureTime)}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {formatDate(flight.departureTime)}
                                    </p>
                                </div>

                                {/* Flight line */}
                                <div className="flex min-w-[150px] flex-col items-center">
                                    <span className="mb-2 text-xs font-medium text-slate-500">
                                        {duration}
                                    </span>

                                    <div className="flex w-full items-center">
                                        <div className="h-2 w-2 rounded-full bg-blue-600" />

                                        <div className="flex-1 border-t border-dashed border-blue-300" />

                                        <Plane
                                            size={24}
                                            className="rotate-90 text-blue-600"
                                        />

                                        <div className="flex-1 border-t border-dashed border-blue-300" />

                                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-slate-700">
                                        {flight.flightNumber}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Direct flight
                                    </p>
                                </div>

                                {/* Arrival */}
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-slate-900">
                                        {flight.destinationSector}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {getAirportName(flight.destinationSector)}
                                    </p>

                                    <p className="mt-4 text-2xl font-bold text-slate-900">
                                        {formatTime(flight.arrivalTime)}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {formatDate(flight.arrivalTime)}
                                    </p>
                                </div>
                            </div>

                            {/* Meta information */}
                            <div className="mt-8 grid grid-cols-2 divide-x rounded-lg border border-slate-200 bg-slate-50 py-4 sm:grid-cols-4">
                                <FlightInfo
                                    icon={<MapPin size={18} />}
                                    label="Terminal"
                                    value={terminal}
                                />

                                <FlightInfo
                                    icon={<MapPin size={18} />}
                                    label="Gate"
                                    value={gate}
                                />

                                <FlightInfo
                                    icon={<CheckCircle2 size={18} />}
                                    label="Status"
                                    value={flight.status ?? "On Time"}
                                    valueClass="text-green-600"
                                />

                                <FlightInfo
                                    icon={<Clock3 size={18} />}
                                    label="Duration"
                                    value={duration}
                                />
                            </div>
                        </Card>

                        {/* --------------------------------------------------------- */}
                        {/* PASSENGER DETAILS + TAKEN SEAT                            */}
                        {/* --------------------------------------------------------- */}

                        <Card
                            withBorder
                            radius="md"
                            padding="lg"
                            className="!border-slate-200"
                        >
                            <Group gap="sm" mb="lg">
                                <User size={20} className="text-blue-700" />

                                <Text fw={700} size="md">
                                    Passenger Details
                                </Text>
                            </Group>

                            <div className="overflow-hidden rounded-lg border border-slate-200">
                                <Table verticalSpacing="md">
                                    <Table.Thead>
                                        <Table.Tr className="!bg-slate-50">
                                            <Table.Th>#</Table.Th>
                                            <Table.Th>Passenger</Table.Th>
                                            <Table.Th>Seat</Table.Th>
                                            <Table.Th>Fare Type</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>

                                    <Table.Tbody>
                                        {passengers.map((passenger, index) => (
                                            <Table.Tr key={passenger.id ?? index}>
                                                <Table.Td>
                                                    <span className="text-slate-500">
                                                        {index + 1}
                                                    </span>
                                                </Table.Td>

                                                <Table.Td>
                                                    <div className="font-semibold text-slate-800">
                                                        {passenger.name}
                                                    </div>

                                                    <div className="text-xs text-slate-500">
                                                        Adult
                                                    </div>
                                                </Table.Td>

                                                {/* TAKEN SEAT */}
                                                <Table.Td>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                                            <Armchair size={18} />
                                                        </div>

                                                        <div>
                                                            <p className="font-bold text-slate-900">
                                                                {passenger.seat ?? "Not assigned"}
                                                            </p>

                                                            {passenger.seat && (
                                                                <p className="text-xs text-slate-500">
                                                                    Assigned seat
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Table.Td>

                                                <Table.Td>
                                                    <Badge variant="light" color="blue">
                                                        {formatFareType(passenger.fareType)}
                                                    </Badge>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </Card>

                        {/* --------------------------------------------------------- */}
                        {/* BAGGAGE                                                    */}
                        {/* --------------------------------------------------------- */}

                        <Card
                            withBorder
                            radius="md"
                            padding="lg"
                            className="!border-slate-200"
                        >
                            <Group gap="sm" mb="lg">
                                <Luggage size={20} className="text-blue-700" />

                                <Text fw={700}>Baggage Allowance</Text>
                            </Group>

                            <div className="overflow-hidden rounded-lg border border-slate-200">
                                <Table verticalSpacing="md">
                                    <Table.Thead>
                                        <Table.Tr className="!bg-slate-50">
                                            <Table.Th>Fare Type</Table.Th>
                                            <Table.Th>Cabin Baggage</Table.Th>
                                            <Table.Th>Check-in Baggage</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>

                                    <Table.Tbody>
                                        {flight.baggageAllowance?.map((item) => {
                                            const isCurrentFare =
                                                item.fareType ===
                                                `DOMESTIC_${selectedFare}`;

                                            return (
                                                <Table.Tr key={item.fareType}>
                                                    <Table.Td>
                                                        <div className="flex items-center gap-2">
                                                            <span className="h-2 w-2 rounded-full bg-blue-600" />

                                                            <span>
                                                                {formatBaggageType(item.fareType)}
                                                            </span>

                                                            {isCurrentFare && (
                                                                <Badge size="xs" variant="light">
                                                                    Your Fare
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </Table.Td>

                                                    <Table.Td>
                                                        {item.cabinBaggageAllowance} kg
                                                    </Table.Td>

                                                    <Table.Td>
                                                        {item.checkInBaggageAllowance} kg
                                                    </Table.Td>
                                                </Table.Tr>
                                            );
                                        })}
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </Card>

                        {/* --------------------------------------------------------- */}
                        {/* FARE DETAILS                                               */}
                        {/* --------------------------------------------------------- */}


                    </div>

                    {/* =========================================================== */}
                    {/* RIGHT SIDEBAR                                                */}
                    {/* =========================================================== */}

                    <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
                        {/* Payment */}
                        <Card
                            withBorder
                            radius="md"
                            padding="lg"
                            className="!border-slate-200"
                        >
                            <Text size="sm" fw={600} c="dimmed">
                                Total Paid
                            </Text>

                            <div className="mt-1 flex items-center gap-3">
                                <Text size="30px" fw={700}>
                                    ₹{totalPaid.toLocaleString("en-IN")}
                                </Text>

                                <Badge color="green" variant="light">
                                    Paid
                                </Badge>
                            </div>

                            <div className="mt-5 flex items-center gap-3">
                                <CreditCard
                                    size={20}
                                    className="text-slate-500"
                                />

                                <div>
                                    <Text size="xs" c="dimmed">
                                        Payment Method
                                    </Text>

                                    <Text size="sm" fw={600}>
                                        **** 4242 (Visa)
                                    </Text>
                                </div>
                            </div>

                            <Divider my="lg" />

                            <Stack gap="sm">
                                <Button
                                    fullWidth
                                    size="md"
                                    leftSection={<Download size={18} />}
                                    onClick={
                                        () => downloadItinerary(bookingReference)
                                    }
                                >
                                    Download Itinerary
                                </Button>

                                <Button
                                    fullWidth
                                    size="md"
                                    variant="outline"
                                    color="red"
                                    leftSection={<XCircle size={18} />}
                                    onClick={openCancel}
                                >
                                    Cancel Flight
                                </Button>
                            </Stack>
                        </Card>

                        {/* Trip Summary */}
                        <Card
                            withBorder
                            radius="md"
                            padding="lg"
                            className="!border-slate-200"
                        >
                            <Group gap="sm" mb="lg">
                                <CalendarDays
                                    size={20}
                                    className="text-blue-700"
                                />

                                <Text fw={700}>Trip Summary</Text>
                            </Group>

                            <Stack gap="lg">
                                <SummaryItem
                                    label="From"
                                    value={flight.departureSector}
                                    subValue={`${formatTime(
                                        flight.departureTime
                                    )}, ${formatDate(flight.departureTime)}`}
                                />

                                <SummaryItem
                                    label="To"
                                    value={flight.destinationSector}
                                    subValue={`${formatTime(
                                        flight.arrivalTime
                                    )}, ${formatDate(flight.arrivalTime)}`}
                                />

                                <SummaryItem
                                    label="Duration"
                                    value={duration}
                                />

                                <SummaryItem
                                    label="Fare"
                                    value={formatFareType(selectedFare)}
                                />

                                {selectedBaggage && (
                                    <SummaryItem
                                        label="Baggage"
                                        value={`${selectedBaggage.checkInBaggageAllowance} kg`}
                                    />
                                )}
                            </Stack>
                        </Card>
                    </aside>
                </div>
            </main>

            {/* --------------------------------------------------------------- */}
            {/* CANCEL MODAL                                                    */}
            {/* --------------------------------------------------------------- */}

            <Modal
                opened={cancelOpened}
                onClose={closeCancel}
                title="Cancel Flight"
                centered
            >
                <Stack>
                    <Text c="dimmed">
                        Are you sure you want to cancel this flight?
                        Cancellation charges may apply according to the fare
                        rules.
                    </Text>

                    <Group justify="flex-end" mt="sm">
                        <Button variant="default" onClick={closeCancel}>
                            Keep Booking
                        </Button>

                        <Button
                            color="red"
                            onClick={() => {
                                closeCancel();
                                onCancel?.();
                            }}
                        >
                            Yes, Cancel Flight
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </div>
    );
}

/* ======================================================================== */
/* Small Components                                                         */
/* ======================================================================== */

function FlightInfo({
    icon,
    label,
    value,
    valueClass = "",
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClass?: string;
}) {
    return (
        <div className="flex items-center gap-3 px-4">
            <div className="text-slate-500">{icon}</div>

            <div>
                <p className="text-xs text-slate-500">{label}</p>

                <p
                    className={`mt-1 text-sm font-semibold ${valueClass}`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

function SummaryItem({
    label,
    value,
    subValue,
}: {
    label: string;
    value: string;
    subValue?: string;
}) {
    return (
        <div className="grid grid-cols-[85px_1fr] gap-3">
            <Text size="sm" c="dimmed">
                {label}
            </Text>

            <div>
                <Text size="sm" fw={700}>
                    {value}
                </Text>

                {subValue && (
                    <Text size="xs" c="dimmed" mt={2}>
                        {subValue}
                    </Text>
                )}
            </div>
        </div>
    );
}

/* ======================================================================== */
/* Helpers                                                                  */
/* ======================================================================== */

function calculateDuration(
    departure: string,
    arrival: string
): string {
    const start = new Date(departure).getTime();
    const end = new Date(arrival).getTime();

    const minutes = Math.max(
        0,
        Math.floor((end - start) / 60000)
    );

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
}

function formatTime(date: string): string {
    return new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatFareType(
    fareType: Flight["fareType"]
): string {
    if (!fareType) return "Economy";

    return fareType
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatBaggageType(type: string): string {
    return type
        .replace("DOMESTIC_", "")
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getAirportName(sector: string): string {
    const airports: Record<string, string> = {
        DEL: "Indira Gandhi International Airport",
        DXB: "Dubai International Airport",
        SIN: "Singapore Changi Airport",
        BLR: "Kempegowda International Airport",
        BOM: "Chhatrapati Shivaji Maharaj International Airport",
        HYD: "Rajiv Gandhi International Airport",
        MAA: "Chennai International Airport",
        CCU: "Netaji Subhas Chandra Bose International Airport",
    };

    return airports[sector] ?? `${sector} Airport`;
}