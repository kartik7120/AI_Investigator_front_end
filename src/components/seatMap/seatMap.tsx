import { useQuery } from '@tanstack/react-query';
import { useBearStore } from '../../store/store'
import SeatComp, { type Seat } from './Seat';
import { Alert, Button, Loader, Text } from '@mantine/core';
import { CircleAlert } from "lucide-react";
import { BASE_URL } from '../../contants';
import React from 'react';
import { useNavigate } from 'react-router';

/**
 * Problems;
 * The seat button color when not selected is not green or teal
 * We should only allow seat selection based on the number of passengers in the booking
 * Add a navbar at the top to navigtate to the home page
 * Only those seats should be visible that are available in that fare type, rest should appear blocked
 */

async function getSeatMap(flightID: number) {

    const resp = await fetch(`${BASE_URL}/getSeatMap/${flightID}`)

    return resp.json();
}

export default function SeatMap() {
    const flights = useBearStore((store) => store.flights);

    const seats = useBearStore((store) => store.seats);
    const onAddSeat = useBearStore((store) => store.addSeat);
    const onRemoveSeat = useBearStore((store) => store.removeSeat);

    const passengerCount = useBearStore((store) => store.numberOfPassengers)
    const navigate = useNavigate();

    const flightId = flights[0]?.id;

    const {
        data,
        error,
        isError,
        isLoading,
    } = useQuery<Seat[]>({
        queryKey: ["getSeatMap", flightId],
        queryFn: () => getSeatMap(flightId!),
        enabled: !!flightId,
    });

    console.log(`seat map data = ${data}`)

    /*
     * No flight selected
     */
    if (!flightId) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <Text c="dimmed">
                    Please select a flight first.
                </Text>
            </div>
        );
    }

    /*
     * Loading
     */
    if (isLoading) {
        return (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                <Loader size="md" />

                <Text size="sm" c="dimmed">
                    Loading seat map...
                </Text>
            </div>
        );
    }

    /*
     * Error
     */
    if (isError) {

        console.log(`error loading seat map = ${error}`)
        return (
            <div className="mx-auto max-w-xl p-4">
                <Alert
                    variant="light"
                    color="red"
                    title="Unable to load seat map"
                    icon={<CircleAlert size={18} />}
                >
                    {error instanceof Error
                        ? error.message
                        : "Something went wrong while loading the seat map."}
                </Alert>
            </div>
        );
    }

    /*
     * No seats returned
     */
    if (!data || data.length === 0) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <Text c="dimmed">
                    No seats are available for this flight.
                </Text>
            </div>
        );
    }

    /*
     * Handle seat selection
     */
    const handleSeatSelection = (seat: Seat) => {
        const isSelected = seats.some(
            (selectedSeat) => selectedSeat.id === seat.id
        );

        if (seats.length >= passengerCount) {
            return;
        }

        if (isSelected) {
            onRemoveSeat(seat);
        } else {
            onAddSeat(seat);
        }
    };

    const handleSeatMap = () => {

        console.log("Navigate to payment page")

        navigate("/payment")
    }

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Header */}
            <div className="text-center">
                <Text fw={600} size="lg">
                    Select your seat
                </Text>

                <Text size="sm" c="dimmed">
                    Choose a seat for your flight
                </Text>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-teal-50 border border-teal-200" />
                    <span>Available</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-blue-500" />
                    <span>Selected</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gray-300" />
                    <span>Occupied</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-red-100" />
                    <span>Blocked</span>
                </div>
            </div>

            {/* Selected seats */}
            <div className="w-full max-w-xl rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <Text fw={600}>
                        Selected seats
                    </Text>

                    <Text size="sm" c="dimmed">
                        {seats.length} selected
                    </Text>
                </div>

                {data && data.length > 0 ? (
                    <div className="mt-3 flex flex-col gap-2">
                        {Array.from(
                            { length: Math.max(...data.map((seat) => seat.seatRow)) },
                            (_, rowIndex) => {
                                const row = rowIndex + 1;

                                const rowSeats = data
                                    .filter((seat) => seat.seatRow === row)
                                    .sort((a, b) => a.seatColumn - b.seatColumn);

                                return (
                                    <div
                                        key={row}
                                        className="flex items-center justify-center"
                                    >
                                        {/* Row number */}
                                        <div className="w-8 text-center text-sm text-gray-500">
                                            {row}
                                        </div>

                                        {/* Seats */}
                                        {rowSeats.map((seat) => (
                                            <React.Fragment key={seat.id}>
                                                {seat.seatColumn === 4 && (
                                                    <div className="w-8" />
                                                )}

                                                <div className="mx-1">
                                                    <SeatComp
                                                        seat={seat}
                                                        selected={seats.some(
                                                            (selectedSeat) =>
                                                                selectedSeat.id === seat.id
                                                        )}
                                                        onSelect={handleSeatSelection}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <Text mt="sm" c="dimmed">
                        No seats available.
                    </Text>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
                <div className="flex justify-end">
                    <Button
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                        onClick={handleSeatMap}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
