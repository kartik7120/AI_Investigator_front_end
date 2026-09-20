import React, { useEffect } from 'react'
import { useBearStore } from '../../store/store';
import PaxDetailsForm from './PaxDetailsForm';

export default function PaxEditPage() {

    const passengerCount = useBearStore((store) => store.passengers);

    const flights = useBearStore((store) => store.flights)

    useEffect(() => {
        console.log(flights)
    }, [flights])

    return (
        <div>
            <PaxDetailsForm passengerCount={passengerCount.length} />
        </div>
    )
}
