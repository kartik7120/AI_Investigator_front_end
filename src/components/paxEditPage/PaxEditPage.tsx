import React from 'react'
import { useBearStore } from '../../store/store';
import PaxDetailsForm from './PaxDetailsForm';

export default function PaxEditPage() {

    const passengerCount = useBearStore((store) => store.passengers);
    return (
        <div>
            <PaxDetailsForm passengerCount={passengerCount.length} />
        </div>
    )
}
