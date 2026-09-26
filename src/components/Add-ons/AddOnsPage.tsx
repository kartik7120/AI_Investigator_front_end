import NavbarSecond from '../NavbarSecond'
import AddOnPageTabs from './AddOnPageTabs'

export default function AddOnsPage() {

    return (
        <div className='flex flex-col gap-y-4'>
            <NavbarSecond />
            <div className='flex flex-row justify-between items-center'>
                <AddOnPageTabs />
            </div>
        </div>
    )
}
