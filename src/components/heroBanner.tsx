import { Button, Container, Text, Title } from "@mantine/core";

export function HeroImageRight() {
    return (
        <section
            className="
                relative
                bg-[#11284b]
                bg-cover
                bg-center
                py-24
            "
            style={{
                backgroundImage: `
                linear-gradient(
                    250deg,
                    rgba(130,201,30,0) 0%,
                    #062343 70%
                ),
                url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80")
            `,
            }}
        >
            <Container size="lg">
                <div className="flex flex-col lg:flex-row justify-between items-center">

                    {/* Content */}
                    <div className="py-10 lg:py-20 lg:mr-24 max-w-xl">

                        <Title
                            className="
                                text-white
                                font-medium
                                leading-tight
                                text-4xl
                                md:text-5xl
                            "
                            style={{
                                fontFamily: "Outfit",
                            }}
                        >
                            A{" "}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{
                                    from: "pink",
                                    to: "yellow",
                                }}
                            >
                                fully featured
                            </Text>{" "}
                            React components library
                        </Title>

                        <Text
                            mt={30}
                            className="
                                text-white/75
                                text-lg
                                leading-8
                                max-w-xl
                            "
                        >
                            Build fully functional accessible web applications
                            with ease – Mantine includes more than 100
                            customizable components and hooks to cover you in
                            any situation.
                        </Text>

                        <Button
                            mt={40}
                            size="xl"
                            variant="gradient"
                            gradient={{
                                from: "pink",
                                to: "yellow",
                            }}
                            className="
                                px-12
                                text-xl
                                w-full
                                md:w-auto
                            "
                            styles={{
                                label: {
                                    fontFamily: "Outfit",
                                },
                            }}
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Optional Right Side Image */}
                    <div className="hidden lg:block">
                        {/* Insert an illustration, Lottie, AI graphic, etc. */}
                    </div>

                </div>
            </Container>
        </section>
    );
}