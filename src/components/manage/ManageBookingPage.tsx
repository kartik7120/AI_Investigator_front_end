import React from 'react';
import { TextInput, Button, Container, Title, Text, Anchor, Paper, Stack } from '@mantine/core';

export function ManageBooking() {
    return (
        <div className="min-h-screen bg-gray-100 font-sans pb-16">
            {/* Hero Header Section */}
            <div
                className="relative bg-cover bg-center py-16 px-4 text-center border-b border-gray-200"
                style={{
                    // Styled with a subtle background image resembling airplane seating
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80")',
                }}
            >
                <Container size="md">
                    <Text className="uppercase tracking-[0.2em] text-xs font-semibold text-gray-600 mb-2">
                        Manage
                    </Text>
                    <Title order={1} className="text-4xl sm:text-5xl font-serif text-gray-800 mb-4 font-normal">
                        Manage your booking
                    </Title>
                    <Text className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
                        Enter your details to see your itinerary, make changes and add extra services.
                    </Text>
                </Container>
            </div>

            {/* Main Content Area */}
            <Container size="md" className="-mt-6 relative z-10">
                {/* Form Card */}
                <Paper shadow="sm" radius="none" className="p-6 sm:p-8 bg-white border border-gray-200 mb-8">

                    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                            <TextInput
                                placeholder="Booking reference"
                                size="md"
                                classNames={{
                                    input: 'rounded-none border-gray-400 focus:border-red-600 h-12 text-gray-800 placeholder-gray-500',
                                }}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <TextInput
                                placeholder="Last name"
                                size="md"
                                classNames={{
                                    input: 'rounded-none border-gray-400 focus:border-red-600 h-12 text-gray-800 placeholder-gray-500',
                                }}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <Button
                                type="submit"
                                fullWidth
                                size="md"
                                className="bg-[#d71921] hover:bg-[#b51219] text-white rounded-none h-12 font-semibold text-base transition-colors"
                            >
                                Retrieve Booking
                            </Button>
                        </div>
                    </form>
                </Paper>

                {/* Informational Section Card */}
                <Paper shadow="sm" radius="none" className="p-6 sm:p-10 bg-white border border-gray-200">
                    <Title order={2} className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-red-600 inline-block">
                        Tailor your experience
                    </Title>

                    <Text className="text-gray-700 text-sm leading-relaxed mb-6">
                        There's so much you can do with our booking management tool and you can take control of your journey in just a few clicks. It's easy and secure - just have your booking reference and your last name ready to get started.
                    </Text>

                    <Stack className="text-sm text-gray-700">
                        <ul className="list-disc pl-5 space-y-4 marker:text-gray-800">
                            <li>
                                <span className="font-bold text-gray-900 block sm:inline">Manage your booking</span>
                                <p className="mt-1">
                                    You can edit and manage all your travel needs online. Book a dietary meal if you have a specific diet, upgrade your seat, and add a hotel or car rental to your booking. You can also book services like Chauffeur-drive.
                                </p>
                            </li>
                            <li>
                                <span className="font-bold text-gray-900 block sm:inline">Check your itinerary</span>
                                <p className="mt-1">
                                    View, print or email your flight itinerary. Check your flight details and make changes to your booking.
                                </p>
                            </li>
                            <li>
                                <span className="font-bold text-gray-900 block sm:inline">Select a seat</span>
                                <p className="mt-1">
                                    Choose where you want to sit on the plane. Explore our immersive 3D seat map and get a feel for the experience before you select your seat. Choosing your seat on the flight also means your family or friends can sit together when you're flying in a large group. Through Manage your booking you can change your seat at any time up until check-in.
                                </p>
                            </li>
                            <li>
                                <span className="font-bold text-gray-900 block sm:inline">Update your email address and contact number</span>
                                <p className="mt-1">
                                    Save time at the airport and check-in online between 48 hours and 90 minutes before your flight. You can also use mobile check-in and download your boarding pass on your phone. When you check-in online, you can choose your seat for free.
                                </p>
                            </li>
                            <li>
                                <span className="font-bold text-gray-900 block sm:inline">Buy excess baggage allowance</span>
                                <p className="mt-1">
                                    Check your baggage allowance for your checked-in baggage and carry-on baggage. If you need extra baggage, plan ahead and enjoy significant savings from 15% to 45% by purchasing online before you travel on select routes. Check our baggage rules before you fly.
                                </p>
                            </li>
                        </ul>
                    </Stack>
                </Paper>
            </Container>
        </div>
    );
}

export default ManageBooking;