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

export const mockDataForTripSummary: Partial<BearState> = {
    numberOfPassengers: 2,

    departure_sector: "DEL",
    destination_sector: "DXB",
    departure_date: "2026-09-20",
    return_date: "2026-09-27",

    flights: [
        {
            id: 51,
            flightNumber: "AI123",
            departureSector: "DEL",
            destinationSector: "DXB",
            departureTime: "2026-09-20T10:30:00",
            arrivalTime: "2026-09-20T13:00:00",
            fareType: "ECONOMY",
            basePrice: [{
                basePrice: 8000,
                currentPrice: 8500,
                fareType: "ECONOMY",
            }],
            currentPrice: null,
            baggageAllowance: [
                "DOMESTIC_ECONOMY"
            ],
            status: "On Time",
            seatMap: [],
        },
        {
            id: 52,
            flightNumber: "AI456",
            departureSector: "DXB",
            destinationSector: "DEL",
            departureTime: "2026-09-27T15:30:00",
            arrivalTime: "2026-09-27T20:00:00",
            fareType: "ECONOMY",
            basePrice: [{
                basePrice: 8500,
                currentPrice: 9000,
                fareType: "ECONOMY",
            }],
            currentPrice: null,
            baggageAllowance: [
                "DOMESTIC_ECONOMY"
            ],
            status: "On Time",
            seatMap: [],
        },
    ],
};

