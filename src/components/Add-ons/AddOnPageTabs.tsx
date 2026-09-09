import { Tabs } from "@mantine/core";
import { useBearStore } from "../../store/store";
import { useEffect, useState } from "react";
import classes from "./Demo.module.css";
import { BASE_URL } from "../../contants";
import { useQueries } from "@tanstack/react-query";
import AddonCard from "./AddOneCard";
import type { Flight } from "../../utils/useFulInterfaces";

export interface SSRDto {
    id: number;
    type: string;
    quantity: number;
    fareType: string;
    price: number;
    flightID: number;
}

async function fetchFlightSSR(
    flightId: string,
    fareType: string
): Promise<SSRDto> {
    const resp = await fetch(`${BASE_URL}/getFlightSSRs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            flightID: flightId,
            fareType: fareType,
        }),
    });

    if (!resp.ok) {
        throw new Error(
            `Failed to fetch SSR data (${resp.status})`
        );
    }

    return resp.json();
}

export default function AddOnPageTabs() {
    const flights = useBearStore((state) => state.flights);

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

    const [value, setValue] = useState<string | null>(
        flights.length > 0 ? `flight-${flights[0].id}` : null
    );

    const [controlsRefs, setControlsRefs] = useState<
        Record<string, HTMLButtonElement | null>
    >({});

    const setControlRef =
        (val: string) => (node: HTMLButtonElement | null) => {
            setControlsRefs((current) => ({
                ...current,
                [val]: node,
            }));
        };

    // Select first flight when flights are loaded
    useEffect(() => {
        if (flights.length > 0 && value === null) {
            setValue(`flight-${flights[0].id}`);
        }
    }, [flights, value]);

    const results = useQueries({
        queries: flights.map((flight) => ({
            queryKey: ["flightSSR", flight.id, flight.fareType],
            queryFn: () =>
                fetchFlightSSR(
                    flight.id.toString(),
                    flight.fareType || "ECONOMY"
                ),
            enabled: !!flight.id,
        })),
    });

    return (
        <div className="w-full h-full">
            <Tabs
                variant="unstyled"
                orientation="horizontal"
                classNames={classes}
                value={value}
                onChange={setValue}
            >
                {/* Tabs */}
                <Tabs.List
                    ref={setRootRef}
                    grow
                    className="relative"
                >
                    {flights.map((flight) => {
                        const tabValue = `flight-${flight.id}`;

                        return (
                            <Tabs.Tab
                                key={flight.id}
                                value={tabValue}
                                ref={setControlRef(tabValue)}
                                className="flex-1 text-center py-2 border-b-2 border-transparent hover:border-gray-400 focus:outline-none focus:border-gray-400"
                            >
                                {flight.departureSector} -{" "}
                                {flight.destinationSector}
                            </Tabs.Tab>
                        );
                    })}
                </Tabs.List>

                {/* Panels */}
                {flights.map((flight, index) => {
                    const result = results[index];
                    const tabValue = `flight-${flight.id}`;

                    return (
                        <Tabs.Panel
                            key={flight.id}
                            value={tabValue}
                            className="p-4"
                        >
                            {/* Loading */}
                            {result.isLoading && (
                                <div className="flex justify-center items-center py-10">
                                    <p className="text-gray-500">
                                        Loading add-ons...
                                    </p>
                                </div>
                            )}

                            {/* Error */}
                            {result.isError && (
                                <div className="flex flex-col justify-center items-center py-10">
                                    <p className="text-red-500 font-medium">
                                        Failed to load add-ons
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {result.error instanceof Error
                                            ? result.error.message
                                            : "Something went wrong"}
                                    </p>
                                </div>
                            )}

                            {/* Success */}
                            {result.isSuccess && result.data && (
                                <AddonCard
                                    addon={{
                                        fareType:
                                            (result.data.fareType ??
                                                "ECONOMY") as Exclude<
                                                    Flight["fareType"],
                                                    null
                                                >,
                                        flightID: result.data.flightID,
                                        id: result.data.id,
                                        price: result.data.price,
                                        quantity: result.data.quantity,
                                        type: result.data.type,
                                    }}
                                />
                            )}
                        </Tabs.Panel>
                    );
                })}
            </Tabs>
        </div>
    );
}