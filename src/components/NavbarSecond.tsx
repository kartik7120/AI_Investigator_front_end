import { useNavigate } from "react-router"

export default function NavbarSecond() {

    const navigate = useNavigate();

    return (
        <div
            className="
                    mx-auto
                    flex
                    items-center
                    justify-between
                    border
                    border-slate-200/60
                    backdrop-blur-xl
                    w-full
                    px-8
                    py-4
                    rounded-3xl
                "
        >
            <h3 className="text-base font-bold tracking-wide cursor-pointer" onClick={() => {
                navigate("/")
            }}>
                FlightAI
            </h3>
        </div>
    )
}
