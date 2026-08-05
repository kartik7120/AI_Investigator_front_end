import {
    Card,
    Image,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Container,
} from "@mantine/core";

export interface Destination {
    id: number;
    country: string;
    city: string;
    bookingUntil: string;
    cabin: string;
    price: string;
    image: string;
}

export default function DestinationCard({ destination }: { destination: Destination }) {
    return (
        <Card
            padding={0}
            radius={0}
            bg="#181818"
            style={{
                overflow: "hidden",
                cursor: "pointer",
                transition: "all .3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <Card.Section>
                <Image
                    src={destination.image}
                    h={190}
                    alt={destination.city}
                    style={{
                        transition: "transform .5s",
                    }}
                />
            </Card.Section>

            <Stack gap={8} py={28} px="md" align="center">
                <Text
                    size="10"
                    fw={600}
                    tt="uppercase"
                    c="#C7A96A"
                    style={{
                        letterSpacing: 4,
                    }}
                >
                    {destination.country}
                </Text>

                <Title
                    order={2}
                    c="#F5E7C4"
                    style={{
                        fontFamily: "Georgia, serif",
                        fontWeight: 500,
                    }}
                >
                    {destination.city}
                </Title>

                <Text c="gray.3" size="sm">
                    Book until {destination.bookingUntil}
                </Text>

                <Text c="gray.3" size="sm">
                    {destination.cabin}
                </Text>

                <Text
                    fw={700}
                    size="xl"
                    c="#fff"
                    mt={6}
                >
                    from {destination.price}*
                </Text>
            </Stack>
        </Card>
    );
}

// export default function DestinationOffers() {
//     return (
//         <Container size="xl" py={80}>
//             <SimpleGrid
//                 cols={{ base: 1, sm: 2, lg: 3 }}
//                 spacing="xl"
//                 verticalSpacing="xl"
//             >
//                 {destinations.map((destination) => (
//                     <DestinationCard
//                         key={destination.id}
//                         destination={destination}
//                     />
//                 ))}
//             </SimpleGrid>
//         </Container>
//     );
// }