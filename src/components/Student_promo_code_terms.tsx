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
    FileText,
    IdCard,
    Info,
    Plane,
    RefreshCw,
    ShieldCheck,
    Ticket,
    UserCheck,
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
                    The <strong>STUDENT15</strong> promotional offer provides
                    eligible students with a discount of{" "}
                    <strong>up to 15%</strong> on qualifying flight bookings
                    made through Skyward Airlines.
                </Text>

                <Paper
                    p="md"
                    radius="md"
                    bg="#F4F7FC"
                    withBorder
                >
                    <Group justify="space-between">
                        <div>
                            <Text size="xs" c="dimmed" fw={600}>
                                PROMO CODE
                            </Text>

                            <Text
                                fw={800}
                                size="xl"
                                c={SKYWARD_BLUE}
                                style={{ letterSpacing: "2px" }}
                            >
                                STUDENT15
                            </Text>
                        </div>

                        <CopyButton value="STUDENT15">
                            {({ copied, copy }) => (
                                <Tooltip
                                    label={copied ? "Copied!" : "Copy code"}
                                >
                                    <ActionIcon
                                        variant="light"
                                        color={copied ? "green" : "blue"}
                                        size="lg"
                                        onClick={copy}
                                    >
                                        {copied ? (
                                            <Check size={18} />
                                        ) : (
                                            <Clipboard size={18} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                </Paper>

                <Text c="dimmed" size="sm">
                    The discount is subject to availability, applicable fare
                    types, booking conditions, and the restrictions described
                    in these Terms & Conditions.
                </Text>
            </Stack>
        ),
    },

    {
        value: "eligibility",
        title: "Eligibility",
        icon: UserCheck,
        content: (
            <List
                spacing="sm"
                size="sm"
                icon={
                    <ThemeIcon
                        size={22}
                        radius="xl"
                        color="blue"
                    >
                        <Check size={14} />
                    </ThemeIcon>
                }
            >
                <List.Item>
                    The passenger must qualify as a{" "}
                    <strong>student</strong> at the time of booking and/or
                    travel.
                </List.Item>

                <List.Item>
                    A valid student identification document may be required
                    to verify eligibility.
                </List.Item>

                <List.Item>
                    The student ID must be valid and must belong to the
                    passenger travelling on the booking.
                </List.Item>

                <List.Item>
                    Skyward Airlines reserves the right to request proof of
                    student status at any point before or during travel.
                </List.Item>

                <List.Item>
                    If valid student documentation cannot be provided when
                    requested, the promotional discount may be cancelled and
                    the passenger may be required to pay the applicable fare
                    difference.
                </List.Item>
            </List>
        ),
    },

    {
        value: "promo-code",
        title: "Promo Code Usage",
        icon: Ticket,
        content: (
            <List
                spacing="sm"
                size="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    The promo code <strong>STUDENT15</strong> must be entered
                    during the applicable booking process.
                </List.Item>

                <List.Item>
                    The promotion must be applied before completing the
                    booking.
                </List.Item>

                <List.Item>
                    The discount cannot be applied retroactively to an
                    existing booking.
                </List.Item>

                <List.Item>
                    Only eligible bookings will receive the promotional
                    discount.
                </List.Item>

                <List.Item>
                    The promotional code may be subject to usage limits and
                    availability.
                </List.Item>

                <List.Item>
                    Unless otherwise stated, the promo code cannot be combined
                    with other promotional codes or discounts.
                </List.Item>
            </List>
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
                    The promotion offers <strong>up to 15% off</strong>{" "}
                    eligible fares.
                </List.Item>

                <List.Item>
                    The actual discount may vary depending on the selected
                    flight, fare type, route, travel date, and availability.
                </List.Item>

                <List.Item>
                    The discount applies only to the portion of the fare that
                    is eligible under this promotion.
                </List.Item>

                <List.Item>
                    Taxes, airport charges, government fees, service charges,
                    baggage fees, seat-selection fees, and other applicable
                    charges may not be eligible for the discount.
                </List.Item>

                <List.Item>
                    The final price displayed at checkout will be the amount
                    payable for the booking.
                </List.Item>
            </List>
        ),
    },

    {
        value: "restrictions",
        title: "Flight & Booking Restrictions",
        icon: Plane,
        content: (
            <List
                spacing="sm"
                size="sm"
                icon={<Check size={18} color={SKYWARD_BLUE} />}
            >
                <List.Item>
                    The promotion is valid only on flights and fares
                    designated as eligible for the STUDENT15 offer.
                </List.Item>

                <List.Item>
                    Certain routes, flights, fare classes, travel dates, or
                    booking periods may be excluded.
                </List.Item>

                <List.Item>
                    Promotional fares are subject to availability and may be
                    withdrawn once allocated promotional inventory has been
                    sold.
                </List.Item>

                <List.Item>
                    The promotion does not guarantee availability on every
                    flight.
                </List.Item>

                <List.Item>
                    The offer may not be available for bookings made through
                    third-party travel agencies or external booking platforms
                    unless explicitly stated.
                </List.Item>
            </List>
        ),
    },

    {
        value: "validity",
        title: "Validity Period",
        icon: Calendar,
        content: (
            <Stack gap="md">
                <Text>
                    The STUDENT15 promotion is available for a{" "}
                    <strong>limited time only</strong>.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Paper
                        p="md"
                        radius="md"
                        withBorder
                        bg="#F8FAFF"
                    >
                        <Text size="xs" c="dimmed" fw={700}>
                            BOOKING PERIOD
                        </Text>

                        <Text fw={700} mt={4}>
                            [Start Date] – [End Date]
                        </Text>
                    </Paper>

                    <Paper
                        p="md"
                        radius="md"
                        withBorder
                        bg="#F8FAFF"
                    >
                        <Text size="xs" c="dimmed" fw={700}>
                            TRAVEL PERIOD
                        </Text>

                        <Text fw={700} mt={4}>
                            [Start Date] – [End Date]
                        </Text>
                    </Paper>
                </SimpleGrid>

                <Text size="sm" c="dimmed">
                    Bookings must be completed within the applicable
                    promotional period to qualify.
                </Text>

                <Text size="sm">
                    Skyward Airlines reserves the right to extend, modify,
                    suspend, or terminate the promotion at any time, subject
                    to applicable law.
                </Text>
            </Stack>
        ),
    },

    {
        value: "verification",
        title: "Student Verification",
        icon: IdCard,
        content: (
            <Stack gap="md">
                <Text>
                    Passengers using this promotion may be required to present
                    a valid student ID during check-in or at another point
                    during their journey.
                </Text>

                <Text fw={600}>
                    Acceptable documentation may include:
                </Text>

                <List
                    spacing="sm"
                    icon={<Check size={18} color={SKYWARD_BLUE} />}
                >
                    <List.Item>
                        A valid university or college student ID.
                    </List.Item>

                    <List.Item>
                        A valid student enrollment document.
                    </List.Item>

                    <List.Item>
                        Another officially recognized document confirming
                        current student status.
                    </List.Item>
                </List>

                <Text size="sm" c="dimmed">
                    The document must be valid and must correspond to the
                    passenger named on the booking.
                </Text>
            </Stack>
        ),
    },

    {
        value: "changes",
        title: "Changes, Cancellations & Refunds",
        icon: RefreshCw,
        content: (
            <Stack gap="md">
                <Text>
                    Any changes or cancellations to a booking made using the
                    STUDENT15 promotion will be subject to the fare rules
                    applicable to that booking.
                </Text>

                <List
                    spacing="sm"
                    icon={<Check size={18} color={SKYWARD_BLUE} />}
                >
                    <List.Item>
                        The promotional discount may not be transferable to
                        another passenger.
                    </List.Item>

                    <List.Item>
                        If a booking is cancelled, the promotional code cannot
                        automatically be reused unless explicitly permitted.
                    </List.Item>

                    <List.Item>
                        Any refund will be calculated according to the
                        applicable fare rules and booking conditions.
                    </List.Item>

                    <List.Item>
                        Changing a flight may result in additional fare
                        differences, taxes, fees, or charges.
                    </List.Item>
                </List>
            </Stack>
        ),
    },

    {
        value: "transferability",
        title: "Transferability",
        icon: ShieldCheck,
        content: (
            <Stack gap="md">
                <Text>
                    The STUDENT15 promo code and any resulting discount are
                    intended for the eligible student making the booking.
                </Text>

                <List
                    spacing="sm"
                    icon={<Check size={18} color={SKYWARD_BLUE} />}
                >
                    <List.Item>Cannot be sold or transferred.</List.Item>

                    <List.Item>
                        Cannot be exchanged for cash.
                    </List.Item>

                    <List.Item>
                        Cannot be transferred to another passenger.
                    </List.Item>

                    <List.Item>
                        Cannot be used for purposes other than the eligible
                        booking.
                    </List.Item>
                </List>

                <Text size="sm" c="dimmed">
                    Skyward Airlines reserves the right to cancel bookings
                    where it reasonably believes that the promotion has been
                    misused.
                </Text>
            </Stack>
        ),
    },

    {
        value: "fraud",
        title: "Fraud & Misuse",
        icon: ShieldCheck,
        content: (
            <Stack gap="md">
                <Text>
                    Skyward Airlines reserves the right to reject or cancel
                    any booking where the promo code has been used
                    fraudulently, incorrectly, or in violation of these Terms
                    & Conditions.
                </Text>

                <Text fw={600}>
                    This may include:
                </Text>

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
                        Providing false student information.
                    </List.Item>

                    <List.Item>
                        Using an invalid or fraudulent student ID.
                    </List.Item>

                    <List.Item>
                        Attempting to circumvent promotional restrictions.
                    </List.Item>

                    <List.Item>
                        Using the promo code through unauthorized channels.
                    </List.Item>

                    <List.Item>
                        Reselling or commercially exploiting the promotional
                        fare.
                    </List.Item>
                </List>

                <Text size="sm" c="dimmed">
                    Where permitted by applicable law, Skyward Airlines may
                    recover any improperly obtained discount.
                </Text>
            </Stack>
        ),
    },

    {
        value: "availability",
        title: "Availability",
        icon: Calendar,
        content: (
            <Text>
                The promotion is subject to availability and may not be
                offered on every flight. The availability of the discount does
                not guarantee availability of seats at the same fare if the
                booking is changed or modified.
            </Text>
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
                    The promotion is subject to applicable Skyward Airlines
                    fare rules, conditions of carriage, and booking terms.
                </List.Item>

                <List.Item>
                    All bookings are subject to availability.
                </List.Item>

                <List.Item>
                    The promotion is valid only for eligible passengers,
                    flights, and fares.
                </List.Item>

                <List.Item>
                    Skyward Airlines reserves the right to correct pricing or
                    promotional errors.
                </List.Item>

                <List.Item>
                    Skyward Airlines reserves the right to modify these Terms
                    & Conditions where permitted by applicable law.
                </List.Item>

                <List.Item>
                    In the event of a conflict between these Terms & Conditions
                    and the general fare rules, the applicable fare rules will
                    govern unless otherwise stated.
                </List.Item>
            </List>
        ),
    },
];

export default function StudentPromoTerms() {
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

                {/* Header */}
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
                        STUDENT EXCLUSIVE
                    </Badge>

                    <Title
                        order={1}
                        ta="center"
                        fw={800}
                        c={SKYWARD_NAVY}
                        fz={{ base: 34, md: 52 }}
                    >
                        Save up to{" "}
                        <Text
                            span
                            inherit
                            c={SKYWARD_GOLD}
                        >
                            15%
                        </Text>{" "}
                        on your next journey
                    </Title>

                    <Text
                        ta="center"
                        c="dimmed"
                        maw={680}
                        size="lg"
                    >
                        Eligible students can enjoy exclusive savings on
                        qualifying Skyward Airlines flights with our
                        STUDENT15 promotional offer.
                    </Text>

                    <Text size="sm" c="dimmed">
                        Last Updated: [DD Month YYYY]
                    </Text>
                </Stack>

                {/* Promo Card */}
                <Paper
                    radius="xl"
                    p={{ base: 24, md: 36 }}
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
                        <Stack gap="xs">
                            <Text
                                c="#FFC107"
                                fw={700}
                                size="sm"
                                tt="uppercase"
                                style={{ letterSpacing: "2px" }}
                            >
                                Student Exclusive
                            </Text>

                            <Title
                                order={2}
                                c="white"
                                fz={{ base: 30, md: 42 }}
                                fw={800}
                            >
                                Your journey.
                                <br />
                                Your privilege.
                            </Title>

                            <Text
                                c="rgba(255,255,255,.75)"
                                maw={480}
                            >
                                Get up to 15% off eligible flights when you
                                book using the STUDENT15 promo code.
                            </Text>
                        </Stack>

                        {/* Promo Code */}
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
                                    fz={{ base: 30, md: 38 }}
                                    style={{
                                        letterSpacing: "4px",
                                    }}
                                >
                                    STUDENT15
                                </Text>

                                <CopyButton value="STUDENT15">
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

                {/* Quick Info */}
                <SimpleGrid
                    cols={{ base: 1, sm: 3 }}
                    spacing="md"
                    mb={40}
                >
                    <InfoCard
                        icon={<Ticket size={22} />}
                        title="Up to 15% Off"
                        description="On eligible flight fares"
                    />

                    <InfoCard
                        icon={<IdCard size={22} />}
                        title="Student ID Required"
                        description="Valid proof of student status"
                    />

                    <InfoCard
                        icon={<Calendar size={22} />}
                        title="Limited Time"
                        description="Subject to availability"
                    />
                </SimpleGrid>

                {/* Terms Heading */}
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
                        carefully before using the STUDENT15 promo code.
                    </Text>
                </Stack>

                {/* Terms Accordion */}
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

                {/* Important Information */}
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
                                Important Information
                            </Title>

                            <Text size="sm">
                                <strong>Student ID Required:</strong>{" "}
                                Eligible passengers must be able to provide
                                valid proof of student status when requested.
                            </Text>

                            <Text size="sm">
                                <strong>Limited-Time Offer:</strong> The
                                STUDENT15 promotion is available for a limited
                                period and is subject to availability.
                            </Text>

                            <Text size="sm">
                                <strong>Up to 15% Off:</strong> The advertised
                                discount represents the maximum possible
                                discount. The actual discount may vary
                                depending on the applicable fare and booking
                                conditions.
                            </Text>
                        </Stack>
                    </Group>
                </Paper>

                {/* Contact */}
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
                                Need help?
                            </Title>

                            <Text
                                c="rgba(255,255,255,.7)"
                                size="sm"
                            >
                                Have questions about STUDENT15 or your
                                booking? Our customer support team is here to
                                help.
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
                                Contact Support
                            </Button>
                        </Group>
                    </SimpleGrid>
                </Paper>

                {/* Footer Disclaimer */}
                <Text
                    ta="center"
                    c="dimmed"
                    size="xs"
                    mt={30}
                    maw={750}
                    mx="auto"
                >
                    Terms & Conditions apply. Up to 15% off eligible fares.
                    Valid student ID required. Offer available for a limited
                    time and subject to availability. Other restrictions may
                    apply.
                </Text>
            </Container>
        </Box>
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