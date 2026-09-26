import { Button } from "@mantine/core";
import { useBearStore } from "../../store/store";

export interface Seat {
    id: number;
    seatNumber: string;
    seatClass: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS";
    status: "AVAILABLE" | "OCCUPIED" | "BLOCKED";
    seatRow: number;
    seatColumn: number;
    price: number
}

export interface SeatProps {
    seat: Seat;
    selected?: boolean;
    onSelect?: (seat: Seat) => void;
}

export default function SeatComp({
    seat,
    selected = false,
    onSelect,
}: SeatProps) {
    const isAvailable = seat.status === "AVAILABLE";
    const isOccupied = seat.status === "OCCUPIED";
    const isBlocked = seat.status === "BLOCKED";

    const flights = useBearStore((store) => store.flights)

    const seats = useBearStore((store) => store.seats)

    const isSameFareType = flights.every((flight) => flight.fareType === seat.seatClass)

    return (
        <Button
            variant={selected ? "filled" : "light"}
            disabled={!isAvailable && isSameFareType}
            onClick={() => onSelect?.(seat)}
            className={`
    h - 10 w - 12 p - 0
    rounded - md
    text - xs font - semibold
    transition - all

    ${isOccupied
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isBlocked
                        ? "bg-red-100 text-red-400 cursor-not-allowed"
                        : selected
                            ? "bg-teal-700 text-white hover:bg-teal-800"
                            : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }
    `}
            title={`${seat.seatNumber} • ${seat.seatClass} • ${seat.status} `}
        >
            {seat.seatNumber}
        </Button>

    );
}
