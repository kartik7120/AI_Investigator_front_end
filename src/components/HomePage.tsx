import BookingWidget from "../stories/BookingWidget";
import StatsSection from "./bottomStates";
import DestinationOffers from "./destinationOffers";
import Navbar from "./navbar";
import Offers from "./Offers";
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles

import '@mantine/carousel/styles.css';
export default function HomePage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-100 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-black dark:text-white">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-52 -left-52 h-[500px] w-[500px] rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10" />
                <div className="absolute top-1/3 right-[-150px] h-[450px] w-[450px] rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
                <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-300/10 blur-3xl dark:bg-indigo-500/10" />

                {/* Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(100,116,139,0.12)_1px,transparent_1px)] bg-[length:28px_28px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
            </div>

            {/* Navbar */}
            <header className="fixed top-0 left-0 z-50 w-full">
                <Navbar />
            </header>

            <main className="relative z-10">

                {/* Hero */}
                <section className="flex min-h-screen items-center justify-center px-6 pt-28 pb-16">
                    <div className="w-full max-w-7xl">
                        <BookingWidget />
                    </div>
                </section>

                {/* Destinations */}
                <section className="mx-auto max-w-7xl px-6 py-20">
                    <DestinationOffers />
                </section>

                {/* Offers */}
                <section className="bg-white/60 px-6 py-20 backdrop-blur-sm dark:bg-slate-900/40">
                    <div className="mx-auto max-w-7xl">
                        <Offers />
                    </div>
                </section>

                {/* Stats */}
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <StatsSection />
                </section>

            </main>
        </div>
    );
}