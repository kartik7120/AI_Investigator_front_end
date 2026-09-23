import { Button, Tabs } from "@mantine/core";
import { useBearStore } from "../../store/store";
import { useEffect, useState } from "react";
import classes from "./Demo.module.css";
import { BASE_URL } from "../../contants";
import { useQueries } from "@tanstack/react-query";
import AddonCard from "./AddOneCard";
import type { Flight } from "../../utils/useFulInterfaces";
import TripSummary from "./TripSummary";
import { useNavigate } from "react-router";

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
): Promise<SSRDto[]> {
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

    const addSSRs = useBearStore((store) => store.addSSRs)
    const removeSSRs = useBearStore((store) => store.removeSSRs)

    const navigate = useNavigate();

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

    if (results.some((result) => result.isLoading || result.isFetching)) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading add-ons...</p>
            </div>
        );
    }

    if (results.some((result) => result.isError)) {
        console.log("error occured in the add-ons page")
    }

    async function handleOnAdd(addons: SSRDto) {
        addSSRs(addons)
    }

    async function handleOnRemove(addons: SSRDto) {
        removeSSRs(addons)
    }

    function handleAddonsNextButton() {

        // Handle the addtions of the add-ons in the booking draft


        navigate("/seatMap")
    }

    return (
        <div className="w-full h-full flex flex-row items-center justify-between m-4">
            <div className="flex-1 self-start">
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {result.data.map((addon) => (
                                            <AddonCard
                                                key={addon.id}
                                                addon={{
                                                    fareType: addon.fareType as Exclude<
                                                        Flight["fareType"],
                                                        null
                                                    >,
                                                    flightID: addon.flightID,
                                                    id: addon.id,
                                                    price: addon.price,
                                                    quantity: addon.quantity,
                                                    type: addon.type,
                                                }}
                                                onAdd={() => handleOnAdd(addon)}
                                                onRemove={() => handleOnRemove(addon)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Tabs.Panel>
                        );
                    })}
                </Tabs>
            </div>
            <div>
                <TripSummary flightIds={flights.map((flight) => flight.id)} />
            </div>
            <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
                <div className="flex justify-end">
                    <Button
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                        onClick={handleAddonsNextButton}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}