import { useBearStore } from "../../store/store"
import TripSummary from "../Add-ons/TripSummary"
import NavbarSecond from "../navbarSecond"
import SeatMap from "./seatMap"

export default function SeatMapPage() {

    const flights = useBearStore((store) => store.flights)

    return (
        <div className="flex flex-col gap-y-4">
            <NavbarSecond />
            <div className="flex flex-row items-center justify-between m-4">
                <div className="flex-1">
                    <SeatMap />
                </div>
                <div className="self-start">
                    <TripSummary flightIds={flights.map((flight) => flight.id)} />
                </div>
            </div>
        </div>
    )
}
