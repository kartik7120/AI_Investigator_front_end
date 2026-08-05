import { Container, SimpleGrid } from "@mantine/core";
import DestinationCard, { type Destination } from "./destinationCard";

const destinations: Destination[] = [
    {
        id: 1,
        country: "United Arab Emirates",
        city: "Dubai",
        bookingUntil: "31 Aug 26",
        cabin: "Business Class Return",
        price: "INR 150,963",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 2,
        country: "Netherlands",
        city: "Amsterdam",
        bookingUntil: "31 Aug 26",
        cabin: "Business Class Return",
        price: "INR 292,226",
        image:
            "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 3,
        country: "United Arab Emirates",
        city: "Dubai",
        bookingUntil: "31 Aug 26",
        cabin: "First Class Return",
        price: "INR 387,742",
        image:
            "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 4,
        country: "United States",
        city: "Boston",
        bookingUntil: "31 Aug 26",
        cabin: "Business Class Return",
        price: "INR 437,061",
        image:
            "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 5,
        country: "United States",
        city: "Washington D.C.",
        bookingUntil: "31 Aug 26",
        cabin: "Business Class Return",
        price: "INR 440,565",
        image:
            "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 6,
        country: "South Africa",
        city: "Cape Town",
        bookingUntil: "31 Aug 26",
        cabin: "First Class Return",
        price: "INR 978,547",
        image:
            "https://images.unsplash.com/photo-1585061528750-3baca2cb6a10?auto=format&fit=crop&w=1200&q=80",
    },
];
export default function DestinationOffers() {
    return (
        <Container size="xl" py={80}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing="xl"
                verticalSpacing="xl"
            >
                {destinations.map((destination) => (
                    <DestinationCard
                        key={destination.id}
                        destination={destination}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
}
