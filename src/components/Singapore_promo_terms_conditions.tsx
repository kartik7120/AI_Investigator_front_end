import {
    Accordion,
    ActionIcon,
    Badge,
    Box,
    Button,
    Card,
    Container,
    CopyButton,
    Group,
    List,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
} from "@mantine/core";

import {
    AlertCircle,
    ArrowRight,
    Calendar,
    Check,
    Clipboard,
    Clock3,
    FileText,
    Info,
    Plane,
    RefreshCw,
    Route,
    ShieldCheck,
    Ticket,
} from "lucide-react";

import type { ReactNode } from "react";

const SKYWARD_BLUE = "#1D17C9";
const SKYWARD_NAVY = "#14213D";
const SKYWARD_GOLD = "#EFA900";

const sections = [
    {
        value: "promotion-details",
        title: "Promotion Details",
        icon: Ticket,
        content: (
            <Stack gap="sm">
                <Text>
                    The <strong>SKYAEARLY10</strong> promotion allows eligible
                    customers to receive <strong>10% off</strong> the base
                    fare of qualifying flights from{" "}
                    <strong>Singapore (SIN) to Dubai (DXB)</strong>.
                </Text>

                <Paper
                    p="md"
                    radius="md"
                    bg="#F4F7FC"
                    withBorder
                >
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <PromoDetail
                            label="PROMO CODE"
                            value="SKYAEARLY10"
                        />

                        <PromoDetail
                            label="ROUTE"
                            value="SIN → DXB"
                        />

                        <PromoDetail
                            label="DISCOUNT"
                            value="10% OFF"
                        />
                    </SimpleGrid>
                </Paper>

                <Text c="dimmed" size="sm">
                    To qualify, the booking must be made at least{" "}
                    <strong>7 calendar days</strong> before the scheduled
                    departure date of the eligible flight.
                </Text>
            </Stack>
        ),
    },

    {
        value: "eligibility",
        title: "Eligibility",
        icon: ShieldCheck,
        content: (
            <List
                spacing="sm"
                size="sm"
                icon={
                    <ThemeIcon size={22} radius="xl" color="blue">
                        <Check size={14} />
                    </ThemeIcon>
                }
            >
                <List.Item>
                    The itinerary must be an eligible{" "}
                    <strong>SIN → DXB</strong> flight.
                </List.Item>

                <List.Item>
                    The booking must satisfy the minimum{" "}
                    <strong>7-day advance booking</strong> requirement.
                </List.Item>

                <List.Item>
                    The promotional fare must be available at the time of
                    booking.
                </List.Item>

                <List.Item>
                    The promo code must be entered during the booking process.
                </List.Item>

                <List.Item>
                    All other applicable fare and booking conditions must be
                    met.
                </List.Item>

                <List.Item>
                    No student status, membership, or other special
                    eligibility is required unless otherwise stated.
                </List.Item>
            </List>
        ),
    },

    {
        value: "advance-booking",
        title: "Advance Booking Requirement",
        icon: Clock3,
        content: (
            <Stack gap="md">
                <Text>
                    The key requirement for this promotion is the difference
                    between the <strong>booking date</strong> and the{" "}
                    <strong>departure date</strong>.
                </Text>

                <Paper
                    p="lg"
                    radius="lg"
                    withBorder
                    bg="#F8FAFF"
                >
                    <Group align="center" wrap="nowrap">
                        <ThemeIcon
                            size={48}
                            radius="xl"
                            color="blue"
                            variant="light"
                        >
                            <Clock3 size={24} />
                        </ThemeIcon>

                        <div>
                            <Text fw={800} size="lg" c={SKYWARD_NAVY}>
                                7+ Days Advance Booking
                            </Text>

                            <Text size="sm" c="dimmed">
                                Your booking must be made at least 7 calendar
                                days before departure.
                            </Text>
                        </div>
                    </Group>
                </Paper>

                <Text fw={700}>Examples</Text>

                <Card withBorder radius="lg" padding={0}>
                    <SimpleGrid
                        cols={3}
                        spacing={0}
                        style={{
                            borderBottom:
                                "1px solid var(--mantine-color-gray-2)",
                        }}
                    >
                        <Text p="sm" fw={700} size="sm">
                            Booking Date
                        </Text>

                        <Text p="sm" fw={700} size="sm">
                            Departure Date
                        </Text>

                        <Text p="sm" fw={700} size="sm">
                            Eligible
                        </Text>
                    </SimpleGrid>

                    <BookingExample
                        booking="1 August"
                        departure="8 August"
                        eligible
                    />

                    <BookingExample
                        booking="1 August"
                        departure="10 August"
                        eligible
                    />

                    <BookingExample
                        booking="1 August"
                        departure="7 August"
                        eligible={false}
                    />

                    <BookingExample
                        booking="1 August"
                        departure="5 August"
                        eligible={false}
                    />
                </Card>

                <Text size="sm" c="dimmed">
                    If the time between booking and scheduled departure is
                    less than 7 days, the promotional discount will not apply.
                </Text>
            </Stack>
        ),
    },

    {
        value: "discount",
        title: "Discount",
        icon: Ticket,
        content: (
            <List
                spacing="sm"
                size="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    Eligible customers receive <strong>10% off</strong> the
                    applicable base fare.
                </List.Item>

                <List.Item>
                    The discount applies only to the eligible base fare.
                </List.Item>

                <List.Item>
                    The discount does not apply to taxes or government
                    charges.
                </List.Item>

                <List.Item>
                    The discount does not apply to airport fees or other
                    mandatory charges.
                </List.Item>

                <List.Item>
                    Optional services such as baggage, seat selection, meals,
                    and other ancillary services are excluded unless
                    specifically stated.
                </List.Item>

                <List.Item>
                    The discount may not apply to certain promotional or
                    restricted fare classes.
                </List.Item>

                <List.Item>
                    The promotion is subject to availability.
                </List.Item>
            </List>
        ),
    },

    {
        value: "promo-code",
        title: "Promo Code Usage",
        icon: Clipboard,
        content: (
            <List
                spacing="sm"
                size="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    The promo code{" "}
                    <strong>SKYAEARLY10</strong> must be entered during the
                    applicable booking process.
                </List.Item>

                <List.Item>
                    The code must be applied before completing the booking.
                </List.Item>

                <List.Item>
                    The discount cannot be applied retroactively.
                </List.Item>

                <List.Item>
                    Only one promotional code may be used per eligible booking
                    unless otherwise stated.
                </List.Item>

                <List.Item>
                    The promo code cannot be exchanged for cash.
                </List.Item>

                <List.Item>
                    The promo code is not transferable.
                </List.Item>

                <List.Item>
                    The promo code may not be sold or commercially distributed.
                </List.Item>

                <List.Item>
                    The promo code is valid only during the promotional
                    period.
                </List.Item>
            </List>
        ),
    },

    {
        value: "route-restrictions",
        title: "Flight & Route Restrictions",
        icon: Route,
        content: (
            <Stack gap="md">
                <Paper
                    p="lg"
                    radius="lg"
                    bg="#F4F7FC"
                    withBorder
                >
                    <Group wrap="nowrap">
                        <ThemeIcon
                            size={45}
                            radius="xl"
                            color="blue"
                            variant="light"
                        >
                            <Plane size={22} />
                        </ThemeIcon>

                        <div>
                            <Text size="xs" fw={700} c="dimmed">
                                ELIGIBLE ROUTE
                            </Text>

                            <Text
                                size="xl"
                                fw={800}
                                c={SKYWARD_NAVY}
                            >
                                Singapore (SIN) → Dubai (DXB)
                            </Text>
                        </div>
                    </Group>
                </Paper>

                <Text fw={700}>The promotion may not apply to:</Text>

                <List
                    spacing="sm"
                    icon={<AlertCircle size={18} color="#E67700" />}
                >
                    <List.Item>
                        Other departure airports in Singapore.
                    </List.Item>

                    <List.Item>
                        Other destinations in the United Arab Emirates.
                    </List.Item>

                    <List.Item>
                        Connecting or multi-city itineraries.
                    </List.Item>

                    <List.Item>Codeshare flights.</List.Item>

                    <List.Item>
                        Flights operated by partner airlines.
                    </List.Item>

                    <List.Item>Certain fare classes.</List.Item>

                    <List.Item>Group bookings.</List.Item>

                    <List.Item>
                        Flights specifically excluded from the promotion.
                    </List.Item>
                </List>

                <Text size="sm" c="dimmed">
                    Eligible flights and fares will be determined by Skyward
                    Airlines and displayed during the booking process.
                </Text>
            </Stack>
        ),
    },

    {
        value: "promotional-period",
        title: "Promotional Period",
        icon: Calendar,
        content: (
            <Stack gap="md">
                <Text>
                    The SKYAEARLY10 promotion is available for a{" "}
                    <strong>limited time only</strong>.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <PromoDetail
                        label="BOOKING PERIOD"
                        value="[Start Date] – [End Date]"
                    />

                    <PromoDetail
                        label="TRAVEL PERIOD"
                        value="[Start Date] – [End Date]"
                    />
                </SimpleGrid>

                <Text size="sm" c="dimmed">
                    Bookings must be completed during the applicable booking
                    period and satisfy the 7-day advance purchase requirement.
                </Text>

                <Text size="sm">
                    Skyward Airlines may extend, modify, suspend, or terminate
                    the promotion at its discretion, subject to applicable
                    law.
                </Text>
            </Stack>
        ),
    },

    {
        value: "availability",
        title: "Availability",
        icon: Ticket,
        content: (
            <Stack gap="md">
                <Text>
                    The promotion is subject to{" "}
                    <strong>limited availability</strong>.
                </Text>

                <Text>
                    The fact that a flight is operating on the SIN → DXB route
                    does not guarantee that the promotional fare will be
                    available.
                </Text>

                <Paper
                    p="lg"
                    radius="lg"
                    bg="#FFF8E8"
                    withBorder
                    style={{
                        borderColor: "#FFE3A3",
                    }}
                >
                    <Group align="flex-start" wrap="nowrap">
                        <ThemeIcon
                            color="yellow"
                            variant="light"
                            size={42}
                            radius="xl"
                        >
                            <Info size={21} />
                        </ThemeIcon>

                        <Text size="sm">
                            Promotional inventory may sell out before the end
                            of the promotional period. Once the promotional
                            inventory has been exhausted, the standard
                            applicable fare will be displayed.
                        </Text>
                    </Group>
                </Paper>
            </Stack>
        ),
    },

    {
        value: "changes",
        title: "Changes to Bookings",
        icon: RefreshCw,
        content: (
            <Stack gap="md">
                <Text>
                    Bookings made using SKYAEARLY10 are subject to the fare
                    rules associated with the purchased ticket.
                </Text>

                <List
                    spacing="sm"
                    icon={<Check size={18} color={SKYWARD_BLUE} />}
                >
                    <List.Item>
                        The promotional discount may no longer be available
                        after changing your flight.
                    </List.Item>

                    <List.Item>
                        The new flight must independently satisfy the
                        promotion's eligibility requirements if the discount
                        is to be retained.
                    </List.Item>

                    <List.Item>
                        Applicable fare differences, taxes, fees, or change
                        charges may apply.
                    </List.Item>

                    <List.Item>
                        The 7-day advance booking requirement may be
                        recalculated based on the new departure date.
                    </List.Item>
                </List>
            </Stack>
        ),
    },

    {
        value: "cancellations",
        title: "Cancellations & Refunds",
        icon: RefreshCw,
        content: (
            <List
                spacing="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    Any refund will be calculated according to the applicable
                    fare conditions.
                </List.Item>

                <List.Item>
                    The promotional discount is not separately refundable as
                    cash.
                </List.Item>

                <List.Item>
                    The promo code cannot automatically be reused after
                    cancellation.
                </List.Item>

                <List.Item>
                    Applicable cancellation fees or charges may be deducted
                    from the refund.
                </List.Item>
            </List>
        ),
    },

    {
        value: "combination",
        title: "Combination With Other Offers",
        icon: Ticket,
        content: (
            <List
                spacing="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    SKYAEARLY10 cannot be combined with another promotional
                    code unless explicitly stated otherwise.
                </List.Item>

                <List.Item>
                    The offer cannot be combined with other percentage-based
                    discounts.
                </List.Item>

                <List.Item>
                    The offer cannot be combined with special corporate,
                    employee, student, or membership fares.
                </List.Item>

                <List.Item>
                    If multiple promotions are available, only the promotion
                    providing the applicable eligible discount may be applied.
                </List.Item>
            </List>
        ),
    },

    {
        value: "fraud",
        title: "Fraud & Misuse",
        icon: ShieldCheck,
        content: (
            <Stack gap="md">
                <Text>
                    Skyward Airlines reserves the right to reject, cancel, or
                    modify any booking where it reasonably believes the
                    promotion has been misused.
                </Text>

                <Text fw={700}>Examples of misuse include:</Text>

                <List
                    spacing="sm"
                    icon={
                        <AlertCircle
                            size={18}
                            color="#E67700"
                        />
                    }
                >
                    <List.Item>
                        Unauthorized distribution of the promo code.
                    </List.Item>

                    <List.Item>
                        Attempting to manipulate booking dates to qualify for
                        the promotion.
                    </List.Item>

                    <List.Item>
                        Providing inaccurate booking information.
                    </List.Item>

                    <List.Item>
                        Using automated or unauthorized booking methods.
                    </List.Item>

                    <List.Item>
                        Reselling promotional fares.
                    </List.Item>

                    <List.Item>
                        Attempting to circumvent promotional restrictions.
                    </List.Item>
                </List>

                <Text size="sm" c="dimmed">
                    Where permitted by law, Skyward Airlines may recover
                    discounts obtained through fraudulent or unauthorized use.
                </Text>
            </Stack>
        ),
    },

    {
        value: "important",
        title: "Important Booking Information",
        icon: Info,
        content: (
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <PromoDetail
                    label="ROUTE"
                    value="SIN → DXB"
                />

                <PromoDetail
                    label="ADVANCE PURCHASE"
                    value="7+ DAYS"
                />

                <PromoDetail
                    label="DISCOUNT"
                    value="10% OFF"
                />

                <PromoDetail
                    label="PROMO CODE"
                    value="SKYAEARLY10"
                />
            </SimpleGrid>
        ),
    },

    {
        value: "general",
        title: "General Conditions",
        icon: FileText,
        content: (
            <List
                spacing="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    All bookings are subject to availability.
                </List.Item>

                <List.Item>
                    All fares are subject to Skyward Airlines' applicable fare
                    rules and Conditions of Carriage.
                </List.Item>

                <List.Item>
                    Taxes, fees, surcharges, and other applicable charges are
                    payable by the passenger unless explicitly included.
                </List.Item>

                <List.Item>
                    Skyward Airlines reserves the right to correct pricing,
                    technical, or promotional errors.
                </List.Item>

                <List.Item>
                    Skyward Airlines reserves the right to modify or withdraw
                    this promotion where permitted by applicable law.
                </List.Item>

                <List.Item>
                    Skyward Airlines may refuse a promotional discount where
                    the booking does not satisfy the stated eligibility
                    requirements.
                </List.Item>

                <List.Item>
                    These Terms & Conditions should be read together with the
                    general terms applicable to Skyward Airlines bookings.
                </List.Item>
            </List>
        ),
    },

    {
        value: "how-to-use",
        title: "How to Use SKYAEARLY10",
        icon: ArrowRight,
        content: (
            <Stack gap="md">
                <HowToStep
                    number="01"
                    title="Search"
                    description="Search for an eligible Singapore (SIN) → Dubai (DXB) flight."
                />

                <HowToStep
                    number="02"
                    title="Plan Ahead"
                    description="Make sure your booking date is at least 7 days before your departure date."
                />

                <HowToStep
                    number="03"
                    title="Apply the Code"
                    description="Enter SKYAEARLY10 in the promotional code field."
                />

                <HowToStep
                    number="04"
                    title="Save"
                    description="If the flight and booking satisfy all requirements, 10% off the eligible base fare will be applied."
                />

                <HowToStep
                    number="05"
                    title="Complete Your Booking"
                    description="Review the final fare, taxes, fees, and other charges before completing your purchase."
                />
            </Stack>
        ),
    },

    {
        value: "faq",
        title: "Frequently Asked Questions",
        icon: Info,
        content: (
            <Stack gap="lg">
                <Faq
                    question="Can I use SKYAEARLY10 for any flight?"
                    answer="No. The promotion is specifically intended for eligible SIN → DXB flights."
                />

                <Faq
                    question="What happens if I book only 5 days before departure?"
                    answer="The promotion will not apply because the booking does not satisfy the minimum 7-day advance booking requirement."
                />

                <Faq
                    question="Does the 10% discount apply to taxes?"
                    answer="No. The discount applies to the eligible base fare. Taxes, fees, and other charges may still apply."
                />

                <Faq
                    question="Can I use another promo code with SKYAEARLY10?"
                    answer="Generally, no. SKYAEARLY10 cannot be combined with other promotional codes unless explicitly stated."
                />

                <Faq
                    question="Can I use the code after making my booking?"
                    answer="No. The promo code must be applied during the eligible booking process and cannot normally be added retroactively."
                />

                <Faq
                    question="Can I change my flight after booking?"
                    answer="Changes are subject to the fare rules of your ticket. Additional charges or fare differences may apply, and the promotional discount may not be retained if the new itinerary is not eligible."
                />

                <Faq
                    question="Is the promotion available indefinitely?"
                    answer="No. SKYAEARLY10 is a limited-time promotion and is also subject to promotional inventory availability."
                />
            </Stack>
        ),
    },
];

export default function SkyEarlyPromoTerms() {
    return (
        <Box
            mih="100vh"
            py={{ base: 30, md: 60 }}
            style={{
                background:
                    "linear-gradient(180deg, #F4F7FC 0%, #FFFFFF 50%, #F4F7FC 100%)",
            }}
        >
            <Container size="lg">

                {/* HEADER */}
                <Stack align="center" gap="sm" mb={45}>
                    <Badge
                        size="lg"
                        radius="xl"
                        variant="light"
                        leftSection={<Plane size={15} />}
                        styles={{
                            root: {
                                backgroundColor: "#FFF4D6",
                                color: "#C47F00",
                            },
                        }}
                    >
                        PLAN AHEAD & SAVE
                    </Badge>

                    <Title
                        order={1}
                        ta="center"
                        fw={800}
                        c={SKYWARD_NAVY}
                        fz={{ base: 34, md: 52 }}
                    >
                        Plan ahead.
                        <br />
                        Fly for{" "}
                        <Text
                            span
                            inherit
                            c={SKYWARD_GOLD}
                        >
                            less.
                        </Text>
                    </Title>

                    <Text
                        ta="center"
                        c="dimmed"
                        maw={700}
                        size="lg"
                    >
                        Save <strong>10%</strong> on eligible SIN → DXB flights
                        when you book your journey at least{" "}
                        <strong>7 days before departure.</strong>
                    </Text>

                    <Text size="sm" c="dimmed">
                        Last Updated: [DD Month YYYY]
                    </Text>
                </Stack>

                {/* HERO PROMO CARD */}
                <Paper
                    radius="xl"
                    p={{ base: 24, md: 40 }}
                    mb={40}
                    style={{
                        background:
                            "linear-gradient(135deg, #111C3D 0%, #1D17C9 100%)",
                        overflow: "hidden",
                    }}
                >
                    <SimpleGrid
                        cols={{ base: 1, md: 2 }}
                        spacing={35}
                    >
                        <Stack gap="sm">
                            <Group gap="xs">
                                <Badge
                                    color="yellow"
                                    variant="filled"
                                    size="lg"
                                >
                                    10% OFF
                                </Badge>

                                <Badge
                                    variant="light"
                                    color="gray"
                                    size="lg"
                                >
                                    SIN → DXB
                                </Badge>
                            </Group>

                            <Title
                                order={2}
                                c="white"
                                fz={{ base: 30, md: 42 }}
                                fw={800}
                            >
                                The earlier
                                <br />
                                you book, the more you save.
                            </Title>

                            <Text
                                c="rgba(255,255,255,.75)"
                                maw={500}
                            >
                                Make your travel plans early and enjoy 10%
                                off the eligible base fare on qualifying
                                Singapore to Dubai flights.
                            </Text>

                            <Group mt="sm" gap="xs">
                                <ThemeIcon
                                    variant="light"
                                    color="yellow"
                                    radius="xl"
                                >
                                    <Clock3 size={17} />
                                </ThemeIcon>

                                <Text
                                    c="white"
                                    fw={600}
                                    size="sm"
                                >
                                    Book 7+ days before departure
                                </Text>
                            </Group>
                        </Stack>

                        {/* PROMO CODE */}
                        <Paper
                            radius="lg"
                            p="xl"
                            bg="rgba(255,255,255,.1)"
                            style={{
                                border:
                                    "1px solid rgba(255,255,255,.2)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Stack align="center" gap="xs">
                                <Text
                                    c="rgba(255,255,255,.7)"
                                    size="xs"
                                    fw={700}
                                    tt="uppercase"
                                >
                                    Use Promo Code
                                </Text>

                                <Text
                                    c="#FFC107"
                                    fw={900}
                                    fz={{ base: 28, md: 35 }}
                                    style={{
                                        letterSpacing: "3px",
                                    }}
                                >
                                    SKYAEARLY10
                                </Text>

                                <CopyButton value="SKYAEARLY10">
                                    {({ copied, copy }) => (
                                        <Button
                                            onClick={copy}
                                            variant="white"
                                            color="dark"
                                            radius="xl"
                                            leftSection={
                                                copied ? (
                                                    <Check size={17} />
                                                ) : (
                                                    <Clipboard size={17} />
                                                )
                                            }
                                        >
                                            {copied
                                                ? "Copied!"
                                                : "Copy Promo Code"}
                                        </Button>
                                    )}
                                </CopyButton>
                            </Stack>
                        </Paper>
                    </SimpleGrid>
                </Paper>

                {/* QUICK INFO */}
                <SimpleGrid
                    cols={{ base: 1, sm: 3 }}
                    spacing="md"
                    mb={40}
                >
                    <InfoCard
                        icon={<Route size={22} />}
                        title="SIN → DXB"
                        description="Eligible Singapore to Dubai flights"
                    />

                    <InfoCard
                        icon={<Clock3 size={22} />}
                        title="7+ Days"
                        description="Book at least 7 days before departure"
                    />

                    <InfoCard
                        icon={<Ticket size={22} />}
                        title="10% Off"
                        description="On eligible base fares"
                    />
                </SimpleGrid>

                {/* TERMS */}
                <Stack gap={5} mb="lg">
                    <Title
                        order={2}
                        c={SKYWARD_NAVY}
                        fz={{ base: 26, md: 32 }}
                    >
                        Terms & Conditions
                    </Title>

                    <Text c="dimmed">
                        Please read the following terms and conditions
                        carefully before using the SKYAEARLY10 promo code.
                    </Text>
                </Stack>

                <Card
                    radius="xl"
                    padding={0}
                    withBorder
                    style={{
                        overflow: "hidden",
                    }}
                >
                    <Accordion
                        variant="separated"
                        multiple
                        styles={{
                            item: {
                                border: 0,
                                borderBottom:
                                    "1px solid var(--mantine-color-gray-2)",
                                borderRadius: 0,
                            },

                            control: {
                                padding: "20px 24px",
                            },

                            panel: {
                                padding: "0 24px 24px 72px",
                            },

                            label: {
                                fontWeight: 650,
                                color: SKYWARD_NAVY,
                            },
                        }}
                    >
                        {sections.map((section) => {
                            const Icon = section.icon;

                            return (
                                <Accordion.Item
                                    key={section.value}
                                    value={section.value}
                                >
                                    <Accordion.Control
                                        icon={
                                            <ThemeIcon
                                                size={38}
                                                radius="md"
                                                variant="light"
                                                color="blue"
                                            >
                                                <Icon size={20} />
                                            </ThemeIcon>
                                        }
                                    >
                                        {section.title}
                                    </Accordion.Control>

                                    <Accordion.Panel>
                                        {section.content}
                                    </Accordion.Panel>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                </Card>

                {/* BOOKING SUMMARY */}
                <Paper
                    radius="xl"
                    p={{ base: 22, md: 30 }}
                    mt={35}
                    withBorder
                    style={{
                        borderColor: "#D9E2F3",
                        backgroundColor: "#F5F8FF",
                    }}
                >
                    <Group
                        align="flex-start"
                        wrap="nowrap"
                    >
                        <ThemeIcon
                            size={45}
                            radius="xl"
                            color="blue"
                            variant="light"
                        >
                            <Info size={23} />
                        </ThemeIcon>

                        <Stack gap="xs">
                            <Title
                                order={4}
                                c={SKYWARD_NAVY}
                            >
                                Before you book
                            </Title>

                            <Text size="sm">
                                <strong>Route:</strong> SIN → DXB
                            </Text>

                            <Text size="sm">
                                <strong>Advance Purchase:</strong> 7+ days
                            </Text>

                            <Text size="sm">
                                <strong>Discount:</strong> 10% off eligible
                                base fare
                            </Text>

                            <Text size="sm">
                                <strong>Promo Code:</strong>{" "}
                                <strong>SKYAEARLY10</strong>
                            </Text>

                            <Text size="sm" c="dimmed">
                                The discount will be displayed during the
                                booking process when all eligibility
                                requirements have been satisfied.
                            </Text>
                        </Stack>
                    </Group>
                </Paper>

                {/* CONTACT */}
                <Paper
                    radius="xl"
                    p={{ base: 24, md: 35 }}
                    mt={25}
                    style={{
                        backgroundColor: SKYWARD_NAVY,
                    }}
                >
                    <SimpleGrid
                        cols={{ base: 1, md: 2 }}
                    >
                        <Stack gap={4}>
                            <Title order={3} c="white">
                                Ready to plan ahead?
                            </Title>

                            <Text
                                c="rgba(255,255,255,.7)"
                                size="sm"
                            >
                                Search for an eligible SIN → DXB flight and
                                use SKYAEARLY10 during checkout.
                            </Text>
                        </Stack>

                        <Group justify="flex-end">
                            <Button
                                variant="white"
                                color="dark"
                                radius="xl"
                                rightSection={
                                    <ArrowRight size={17} />
                                }
                            >
                                Book Your Flight
                            </Button>
                        </Group>
                    </SimpleGrid>
                </Paper>

                {/* FOOTER */}
                <Text
                    ta="center"
                    c="dimmed"
                    size="xs"
                    mt={30}
                    maw={800}
                    mx="auto"
                >
                    10% off eligible SIN–DXB base fares when booked 7+ days
                    before departure. Use promo code SKYAEARLY10. Limited-time
                    offer. Subject to availability, fare restrictions and
                    applicable Terms & Conditions.
                </Text>
            </Container>
        </Box>
    );
}

/* ---------------------------------- */
/* Helper Components                   */
/* ---------------------------------- */

function PromoDetail({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <Paper
            p="md"
            radius="md"
            withBorder
            bg="white"
        >
            <Text
                size="xs"
                c="dimmed"
                fw={700}
            >
                {label}
            </Text>

            <Text
                fw={800}
                size="lg"
                c={SKYWARD_BLUE}
                mt={3}
            >
                {value}
            </Text>
        </Paper>
    );
}

function BookingExample({
    booking,
    departure,
    eligible,
}: {
    booking: string;
    departure: string;
    eligible: boolean;
}) {
    return (
        <SimpleGrid
            cols={3}
            spacing={0}
            style={{
                borderBottom:
                    "1px solid var(--mantine-color-gray-2)",
            }}
        >
            <Text p="sm" size="sm">
                {booking}
            </Text>

            <Text p="sm" size="sm">
                {departure}
            </Text>

            <Group p="sm" gap={6}>
                <ThemeIcon
                    size={22}
                    radius="xl"
                    color={eligible ? "green" : "red"}
                    variant="light"
                >
                    {eligible ? (
                        <Check size={13} />
                    ) : (
                        <AlertCircle size={13} />
                    )}
                </ThemeIcon>

                <Text
                    size="sm"
                    fw={600}
                    c={eligible ? "green" : "red"}
                >
                    {eligible ? "Yes" : "No"}
                </Text>
            </Group>
        </SimpleGrid>
    );
}

function InfoCard({
    icon,
    title,
    description,
}: {
    icon: ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Paper
            radius="lg"
            p="lg"
            withBorder
            bg="white"
        >
            <Group wrap="nowrap">
                <ThemeIcon
                    size={44}
                    radius="md"
                    variant="light"
                    color="blue"
                >
                    {icon}
                </ThemeIcon>

                <Stack gap={2}>
                    <Text fw={700} c={SKYWARD_NAVY}>
                        {title}
                    </Text>

                    <Text size="xs" c="dimmed">
                        {description}
                    </Text>
                </Stack>
            </Group>
        </Paper>
    );
}

function HowToStep({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <Group align="flex-start" wrap="nowrap">
            <ThemeIcon
                size={42}
                radius="xl"
                variant="filled"
                color="blue"
            >
                <Text size="sm" fw={800}>
                    {number}
                </Text>
            </ThemeIcon>

            <Stack gap={2}>
                <Text fw={700} c={SKYWARD_NAVY}>
                    {title}
                </Text>

                <Text size="sm" c="dimmed">
                    {description}
                </Text>
            </Stack>
        </Group>
    );
}

function Faq({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    return (
        <Stack gap={4}>
            <Text fw={700} c={SKYWARD_NAVY}>
                {question}
            </Text>

            <Text size="sm" c="dimmed">
                {answer}
            </Text>
        </Stack>
    );
}