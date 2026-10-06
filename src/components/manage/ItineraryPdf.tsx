
import type { Flight } from "../../utils/useFulInterfaces";

interface ItineraryPdfProps {
    flight: Flight;
    bookingReference: string;
    passengers: {
        name: string;
        seat?: string;
        fareType: Flight["fareType"];
    }[];
    totalPaid: number;
}

export default function ItineraryPdf({
    flight,
    bookingReference,
    passengers,
    totalPaid,
}: ItineraryPdfProps) {
    return (
        <div
            id="customer-itinerary-pdf"
            className="w-[794px] bg-white p-10 text-[#0f172a]"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#1d4ed8]">
                        FlightAI
                    </h1>

                    <p className="mt-1 text-sm text-[#64748b]">
                        Flight Itinerary
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-[#64748b]">
                        Booking Reference
                    </p>

                    <p className="text-lg font-bold">
                        {bookingReference}
                    </p>
                </div>
            </div>

            {/* Flight */}
            <div className="mt-8 rounded-lg border border-[#e2e8f0] p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#64748b]">
                            Departure
                        </p>

                        <p className="text-3xl font-bold">
                            {flight.departureSector}
                        </p>

                        <p className="mt-1 text-sm">
                            {formatTime(flight.departureTime)}
                        </p>

                        <p className="text-xs text-[#64748b]">
                            {formatDate(flight.departureTime)}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-[#64748b]">
                            {flight.flightNumber}
                        </p>

                        <div className="my-2 h-px w-32 bg-[#cbd5e1]" />

                        <p className="text-xs text-[#64748b]">
                            Direct Flight
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-[#64748b]">
                            Arrival
                        </p>

                        <p className="text-3xl font-bold">
                            {flight.destinationSector}
                        </p>

                        <p className="mt-1 text-sm">
                            {formatTime(flight.arrivalTime)}
                        </p>

                        <p className="text-xs text-[#64748b]">
                            {formatDate(flight.arrivalTime)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Passenger details */}
            <div className="mt-6">
                <h2 className="mb-3 text-lg font-bold">
                    Passenger Details
                </h2>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-left text-sm">
                            <th className="p-3">Passenger</th>
                            <th className="p-3">Seat</th>
                            <th className="p-3">Fare Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {passengers.map((passenger, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#e2e8f0] text-sm"
                            >
                                <td className="p-3 font-medium">
                                    {passenger.name}
                                </td>

                                <td className="p-3">
                                    {passenger.seat ?? "Not assigned"}
                                </td>

                                <td className="p-3">
                                    {formatFareType(passenger.fareType)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Baggage */}
            <div className="mt-6">
                <h2 className="mb-3 text-lg font-bold">
                    Baggage Allowance
                </h2>

                <div className="grid grid-cols-2 rounded border border-[#e2e8f0]">
                    <div className="p-4">
                        <p className="text-xs text-[#64748b]">
                            Cabin Baggage
                        </p>

                        <p className="font-semibold">
                            7 kg
                        </p>
                    </div>

                    <div className="border-l border-[#e2e8f0] p-4">
                        <p className="text-xs text-[#64748b]">
                            Check-in Baggage
                        </p>

                        <p className="font-semibold">
                            15 kg
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment */}
            <div className="mt-6 rounded-lg bg-[#f8fafc] p-5">
                <div className="flex justify-between">
                    <span className="text-sm text-[#64748b]">
                        Total Paid
                    </span>

                    <span className="text-xl font-bold">
                        ₹{totalPaid.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-[#e2e8f0] pt-5 text-center text-xs text-[#64748b]">
                <p>
                    Please carry a valid government-issued ID during
                    your journey.
                </p>

                <p className="mt-1">
                    This is a computer-generated itinerary and does
                    not require a signature.
                </p>
            </div>
        </div>
    );
}

function formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatFareType(
    fareType: Flight["fareType"]
) {
    if (!fareType) return "Economy";

    return fareType
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
