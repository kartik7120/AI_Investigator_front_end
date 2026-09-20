import React, { useEffect } from 'react'
import { useBearStore } from '../../store/store';
import PaxDetailsForm from './PaxDetailsForm';
import TripSummary from '../Add-ons/TripSummary';

export default function PaxEditPage() {

    const numberOfPassengers = useBearStore((store) => store.numberOfPassengers)

    const flights = useBearStore((store) => store.flights)

    useEffect(() => {
        console.log(flights)
    }, [flights])

    return (
        <div className='flex flex-row justify-between items-center gap-x-5'>
            <div className='flex-1'>
                <PaxDetailsForm passengerCount={numberOfPassengers} />
            </div>
            <div className='m-4'>
                <TripSummary flightIds={
                    flights.map((flight) => flight.id)
                } />
            </div>
        </div>
    )
}
