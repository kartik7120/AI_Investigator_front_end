import { BASE_URL } from "../../contants";
import { useBearStore } from "../../store/store";
import SRPPageBookingWidgetModal from "./SRPPageBookingWidgetModal";
import { useQuery } from "@tanstack/react-query";
import SRPFareDropdown from "./SRPFareDropdown";
import {
  ConvertUTCToDateAndTime,
  FlightDuration,
} from "../../utils/ConvertUTCToDateAndTime";
import type { Fare } from "./SRPFareCard";
import { useEffect } from "react";
import { Modal, Button, Text, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";

function getBaggageAndFees(
  baggage: BaggageAllowance[],
  baseFare: Price[],
): Fare[] {
  const fares: Fare[] = [];

  for (const price of baseFare) {
    const baggageAllowance = baggage.find((ba) =>
      ba.fareType.endsWith(price.fareType),
    );

    if (!baggageAllowance) {
      continue;
    }

    fares.push({
      name: price.fareType,
      price: price.currentPrice,
      baggage: `${baggageAllowance.checkInBaggageAllowance} kg`,
      changeFee: "Upto ₹7000",
      cancellationFee: "₹5000",
      miles: "0",
      lowestPrice: false,
      FareType: price.fareType,
      cabinBaggageAllowance: `${baggageAllowance.cabinBaggageAllowance} kg`,
    });
  }

  return fares;
}

export interface Price {
  fareType: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS";
  basePrice: number;
  currentPrice: number;
}

export interface BaggageAllowance {
  fareType: string;
  cabinBaggageAllowance: number;
  checkInBaggageAllowance: number;
}

export interface GetFlightResponse {
  id: number;
  flightNumber: string;
  departureSector: string;
  destinationSector: string;
  departureTime: string;
  arrivalTime: string;
  currentPrice: Price[];
  baggageAllowance: BaggageAllowance[];
  basePrice: Price[];
}

async function getSearchFlights(
  destination_sector: string | null,
  departure_sector: string | null,
  departure_date: string | null,
  return_date: string | null,
  promo_code: string | null,
): Promise<GetFlightResponse[]> {
  const resp = await fetch(BASE_URL + "/getFlights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      destination_sector,
      departure_sector,
      return_date,
      promo_code,
      departure_date,
    }),
  });

  if (!resp.ok) {
    throw new Error(
      `Failed to fetch flights. Status: ${resp.status}`,
    );
  }

  return await resp.json();
}

export default function SRPPage() {
  const DepartureSector = useBearStore(
    (store) => store.departure_sector,
  );

  const DestinatonSector = useBearStore(
    (store) => store.destination_sector,
  );

  const PromoCode = useBearStore(
    (store) => store.promo_code,
  );

  const DepartureDate = useBearStore(
    (store) => store.departure_date,
  );

  const DestinationDate = useBearStore(
    (store) => store.return_date,
  );

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const {
    data: searchFlightData,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
    isFetching,
  } = useQuery<GetFlightResponse[], Error>({
    queryKey: [
      "getFlights",
      DestinatonSector,
      DepartureSector,
      DepartureDate,
      DestinationDate,
      PromoCode,
    ],

    queryFn: () =>
      getSearchFlights(
        DestinatonSector,
        DepartureSector,
        DepartureDate,
        DestinationDate,
        PromoCode,
      ),
  });

  useEffect(() => {
    if (
      DepartureDate === "" ||
      DestinatonSector === "" ||
      DepartureSector === "" ||
      DestinationDate === ""
    ) {
      open();
    }
  }, [
    DepartureDate,
    DestinatonSector,
    DepartureSector,
    DestinationDate,
  ]);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="No Search Data Found"
        centered
        closeOnClickOutside={false}
      >
        <Stack align="center">
          <Text ta="center" c="dimmed">
            We couldn't find any flight search information.
            Please return to the home page and search again.
          </Text>

          <Button
            fullWidth
            onClick={() => {
              close();
              navigate("/");
            }}
          >
            Go to Home
          </Button>
        </Stack>
      </Modal>
      <div>
        <SRPPageBookingWidgetModal
          departure_date={DepartureDate}
          departure_sector={DepartureSector}
          destination_sector={DestinatonSector}
          destination_date={DestinationDate}
          return_date={DestinationDate}
        />
      </div>

      <div className="flex flex-col items-center gap-4">

        {/* =========================
            LOADING STATE
        ========================== */}

        {isPending && (
          <div className="flex flex-col items-center gap-2 py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

            <p className="text-gray-600">
              Searching for flights...
            </p>
          </div>
        )}

        {/* =========================
            ERROR STATE
        ========================== */}

        {isError && (
          <div className="flex flex-col items-center gap-3 py-10">
            <p className="text-red-600">
              Unable to load flights.
            </p>

            <p className="text-sm text-gray-500">
              {error.message}
            </p>

            <button
              onClick={() => refetch()}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* =========================
            SUCCESS - NO FLIGHTS
        ========================== */}

        {isSuccess && searchFlightData.length === 0 && (
          <div className="py-10 text-center">
            <h2 className="text-lg font-semibold">
              No flights found
            </h2>

            <p className="text-sm text-gray-500">
              Try changing your departure date or destination.
            </p>
          </div>
        )}

        {/* =========================
            SUCCESS - FLIGHTS
        ========================== */}

        {isSuccess && searchFlightData.length > 0 && (
          <>
            {isFetching && (
              <p className="text-sm text-gray-500">
                Updating flight results...
              </p>
            )}

            {searchFlightData.map((val) => {
              const departure = new Date(val.departureTime);
              const arrival = new Date(val.arrivalTime);

              const departureDateTime =
                ConvertUTCToDateAndTime(val.departureTime);

              return (
                <SRPFareDropdown
                  key={val.id}
                  FlightNumbers={val.flightNumber}
                  arrival_time={
                    ConvertUTCToDateAndTime(val.arrivalTime).time
                  }
                  departure_sector={val.departureSector}
                  destination_sector={val.destinationSector}
                  departure_time={departureDateTime.time}
                  departure_date={departureDateTime.date}
                  duration={FlightDuration(
                    departure,
                    arrival,
                  )}
                  fares={getBaggageAndFees(
                    val.baggageAllowance,
                    val.basePrice,
                  )}
                  departure_city=""
                  destination_city=""
                  lowest_price={3000}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}