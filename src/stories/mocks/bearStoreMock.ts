// stories/mocks/bearStoreMock.ts

import type { BearState } from "../../store/store";

export const mockBearState: Partial<BearState> = {
    isUserLoggedIn: true,

    email: "test@example.com",

    destination_sector: "DXB",
    departure_sector: "DEL",

    departure_date: "2026-09-15",
    return_date: "2026-09-20",

    promo_code: "",

    numberOfPassengers: 1,

    passengers: [],

    ContactDetails: {
        contactPerson: "John Doe",
        mobileNumber: "9876543210",
        email: "test@example.com",
    },

    flights: [
        {
            arrivalTime: "2026-09-15T10:00:00Z",
            departureTime: "2026-09-15T06:00:00Z",
            // flightID: "123",
            baggageAllowance: [
                "DOMESTIC_BUSINESS"
            ],
            fareType: "ECONOMY",
            flightNumber: "AI123",
            destinationSector: "DEL",
            departureSector: "DXB",
            // duration: 240,
            // airline: "Air India",
            // currentPrice: 5000,
            // departureSector: "DEL",
            // destinationSector: "DXB",
            id: 1,
            status: "On Time",
            basePrice: [],
            currentPrice: null,
            seatMap: []
        }
    ],
};