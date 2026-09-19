
export interface Flight {
    id: number;
    flightNumber: string;
    departureSector: string;
    destinationSector: string;
    departureTime: string;
    arrivalTime: string;
    currentPrice: Price[];
    baggageAllowance: BaggageAllowance[];
    basePrice: Price[];
    fareType: FareType | null;

    status: string | null;

    seatMap: Seat[];
}

export interface Price {
    fareType: FareType;
    basePrice: number;
    currentPrice: number;
}

export interface BaggageAllowance {
    fareType: BaggageAllowanceType;
    cabinBaggageAllowance: number;
    checkInBaggageAllowance: number;
}

export interface Seat {
    id: number;
    seatNumber: string;
    seatClass: FareType;
    status: SeatStatus;
    flight: Flight;
}

export type FareType =
    | "ECONOMY"
    | "PREMIUM_ECONOMY"
    | "BUSINESS";

export type BaggageAllowanceType =
    | "DOMESTIC_ECONOMY"
    | "DOMESTIC_PREMIUM_ECONOMY"
    | "DOMESTIC_BUSINESS";

export type SeatStatus =
    | "AVAILABLE"
    | "OCCUPIED"
    | "BLOCKED";

