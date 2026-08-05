import { ActionIcon, Paper, Text, Title } from "@mantine/core";
import { Plane } from "lucide-react";

export default function StatsSection() {
    const stats = [
        {
            value: "96",
            title: "Domestic",
            subtitle: "Destinations",
        },
        {
            value: "45",
            title: "International",
            subtitle: "Destinations",
        },
        {
            value: "850 Mn+",
            title: "Happy",
            subtitle: "Customers",
        },
        {
            value: "400+",
            title: "Fleet",
            subtitle: "Strong",
        },
    ];

    return (
        <section className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Card */}
                <Paper
                    radius="xl"
                    className="bg-[#1D17C9] p-12 flex flex-col justify-between min-h-[520px]"
                >
                    <div>
                        <Title
                            order={1}
                            className="text-7xl font-semibold tracking-tight"
                        >
                            2,200+
                        </Title>

                        <Text className="text-5xl leading-tight mt-10 font-light">
                            Daily
                            <br />
                            Flights
                        </Text>
                    </div>

                    {/* <div className="flex justify-end">
                        <ActionIcon
                            radius="xl"
                            size={70}
                            variant="white"
                            color="gray"
                        >
                            <Plane
                                size={32} className="text-[#1D17C9]"
                            />
                        </ActionIcon>
                    </div> */}
                </Paper>

                {/* Right Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                    {stats.map((item) => (
                        <Paper
                            key={item.title}
                            radius="xl"
                            withBorder
                            className="border-blue-200 p-10 flex flex-col justify-center min-h-[245px]"
                        >
                            <Title
                                order={2}
                                className="text-6xl text-[#1D17C9] font-medium"
                            >
                                {item.value}
                            </Title>

                            <Text className="text-3xl text-[#1D17C9] leading-tight mt-4">
                                {item.title}
                                <br />
                                {item.subtitle}
                            </Text>
                        </Paper>
                    ))}
                </div>
            </div>
        </section>
    );
}