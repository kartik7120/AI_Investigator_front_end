import {
    Button,
    Card,
    Checkbox,
    Divider,
    Select,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useState } from "react";

type Passenger = {
    title: string;
    firstName: string;
    lastName: string;
};

type PassengerErrors = {
    title?: string;
    firstName?: string;
    lastName?: string;
};

type ContactDetails = {
    contactPerson: string;
    mobileNumber: string;
    email: string;
};

type ContactErrors = {
    contactPerson?: string;
    mobileNumber?: string;
    email?: string;
};

interface PaxDetailsFormProps {
    passengerCount: number;
}

export default function PaxDetailsForm({
    passengerCount,
}: PaxDetailsFormProps) {
    const [passengers, setPassengers] = useState<Passenger[]>(
        Array.from({ length: passengerCount }, () => ({
            title: "",
            firstName: "",
            lastName: "",
        }))
    );

    const [passengerErrors, setPassengerErrors] = useState<
        PassengerErrors[]
    >(
        Array.from({ length: passengerCount }, () => ({}))
    );

    const [contactDetails, setContactDetails] =
        useState<ContactDetails>({
            contactPerson: "",
            mobileNumber: "",
            email: "",
        });

    const [contactErrors, setContactErrors] =
        useState<ContactErrors>({});

    const [confirmed, setConfirmed] = useState(false);

    const updatePassenger = (
        index: number,
        field: keyof Passenger,
        value: string
    ) => {
        setPassengers((current) =>
            current.map((passenger, passengerIndex) =>
                passengerIndex === index
                    ? {
                        ...passenger,
                        [field]: value,
                    }
                    : passenger
            )
        );

        // Remove error as soon as user provides a value
        setPassengerErrors((current) =>
            current.map((errors, passengerIndex) =>
                passengerIndex === index
                    ? {
                        ...errors,
                        [field]: value.trim()
                            ? undefined
                            : errors[field],
                    }
                    : errors
            )
        );
    };

    const updateContactDetails = (
        field: keyof ContactDetails,
        value: string
    ) => {
        setContactDetails((current) => ({
            ...current,
            [field]: value,
        }));

        if (value.trim()) {
            setContactErrors((current) => ({
                ...current,
                [field]: undefined,
            }));
        }
    };

    const validatePassengers = () => {
        const errors: PassengerErrors[] = passengers.map(
            (passenger) => {
                const passengerError: PassengerErrors = {};

                if (!passenger.title.trim()) {
                    passengerError.title = "Title is required";
                }

                if (!passenger.firstName.trim()) {
                    passengerError.firstName =
                        "First name is required";
                }

                if (!passenger.lastName.trim()) {
                    passengerError.lastName =
                        "Last name is required";
                }

                return passengerError;
            }
        );

        setPassengerErrors(errors);

        return errors.every(
            (error) => Object.keys(error).length === 0
        );
    };

    const validateContactDetails = () => {
        const errors: ContactErrors = {};

        if (!contactDetails.contactPerson.trim()) {
            errors.contactPerson = "Contact person is required";
        }

        if (!contactDetails.mobileNumber.trim()) {
            errors.mobileNumber = "Mobile number is required";
        }

        if (!contactDetails.email.trim()) {
            errors.email = "Email address is required";
        }

        setContactErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        const passengersValid = validatePassengers();
        const contactValid = validateContactDetails();

        if (!passengersValid || !contactValid || !confirmed) {
            return;
        }

        const payload = {
            passengers,
            contactDetails,
        };

        console.log("Passenger details:", payload);

        // mutation.mutate(payload);
    };

    return (
        <div className="min-h-screen bg-[#101213] px-4 py-8 text-white">
            <div className="mx-auto max-w-[770px]">

                {/* Page Title */}
                <Title
                    order={1}
                    className="mb-6 text-3xl font-normal"
                >
                    Complete your passenger details
                </Title>

                {/* Important Information */}
                <Card
                    radius="sm"
                    padding="lg"
                    className="mb-4 border-0 bg-[#17191a]"
                >
                    <Text
                        size="sm"
                        fw={500}
                        className="mb-4"
                    >
                        Important information
                    </Text>

                    <Divider className="mb-5 border-[#252829]" />

                    <Stack gap="md">
                        <Text size="xs" c="dimmed">
                            1. Added flexibility in case plans change...
                        </Text>

                        <Text size="xs" c="dimmed">
                            2. Travel to India: All passengers travelling
                            to India on international flights are required
                            to complete the Air Suvidha Self Declaration
                            Form within 24 hours before departure to avoid
                            delays during boarding or arrival...
                        </Text>
                    </Stack>
                </Card>

                {/* Passenger Details */}
                {passengers.map((passenger, index) => (
                    <Card
                        key={index}
                        radius="sm"
                        padding="lg"
                        className="mb-4 border-0 bg-[#17191a]"
                    >
                        <Text
                            size="sm"
                            fw={500}
                            className="mb-3"
                        >
                            Passenger {index + 1} (Adult)
                        </Text>

                        <Text
                            size="xs"
                            c="dimmed"
                            className="mb-5"
                        >
                            Names must exactly match passport details
                            and should be entered using English
                            characters only. They can't be changed after
                            your booking is complete.
                        </Text>

                        <Stack gap="md">

                            {/* Title */}
                            <Select
                                label="Title"
                                placeholder="Select title"
                                value={passenger.title}
                                onChange={(value) =>
                                    updatePassenger(
                                        index,
                                        "title",
                                        value ?? ""
                                    )
                                }
                                error={
                                    passengerErrors[index]?.title
                                }
                                data={[
                                    {
                                        value: "Mr",
                                        label: "Mr",
                                    },
                                    {
                                        value: "Mrs",
                                        label: "Mrs",
                                    },
                                    {
                                        value: "Ms",
                                        label: "Ms",
                                    },
                                    {
                                        value: "Miss",
                                        label: "Miss",
                                    },
                                ]}
                                className="max-w-[225px]"
                            />

                            {/* Name */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <TextInput
                                    label="First name"
                                    placeholder="First name"
                                    value={passenger.firstName}
                                    error={
                                        passengerErrors[index]
                                            ?.firstName
                                    }
                                    onChange={(event) =>
                                        updatePassenger(
                                            index,
                                            "firstName",
                                            event.currentTarget.value
                                        )
                                    }
                                />

                                <TextInput
                                    label="Last name"
                                    placeholder="Last name"
                                    value={passenger.lastName}
                                    error={
                                        passengerErrors[index]
                                            ?.lastName
                                    }
                                    onChange={(event) =>
                                        updatePassenger(
                                            index,
                                            "lastName",
                                            event.currentTarget.value
                                        )
                                    }
                                />

                            </div>
                        </Stack>
                    </Card>
                ))}

                {/* Contact Details */}
                <Card
                    radius="sm"
                    padding="lg"
                    className="mb-4 border-0 bg-[#17191a]"
                >
                    <Text
                        size="sm"
                        fw={500}
                        className="mb-5"
                    >
                        Contact details
                    </Text>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <Select
                            label="Contact person"
                            placeholder="Select contact person"
                            value={contactDetails.contactPerson}
                            error={contactErrors.contactPerson}
                            onChange={(value) =>
                                updateContactDetails(
                                    "contactPerson",
                                    value ?? ""
                                )
                            }
                            data={passengers.map((_, index) => ({
                                value: index.toString(),
                                label: `Passenger ${index + 1}`,
                            }))}
                        />

                        <TextInput
                            label="Mobile number"
                            placeholder="Mobile number"
                            value={contactDetails.mobileNumber}
                            error={contactErrors.mobileNumber}
                            onChange={(event) =>
                                updateContactDetails(
                                    "mobileNumber",
                                    event.currentTarget.value
                                )
                            }
                        />

                        <TextInput
                            label="Email address"
                            placeholder="Email address"
                            value={contactDetails.email}
                            error={contactErrors.email}
                            onChange={(event) =>
                                updateContactDetails(
                                    "email",
                                    event.currentTarget.value
                                )
                            }
                        />

                    </div>
                </Card>

                {/* Confirmation */}
                <Card
                    radius="sm"
                    padding="lg"
                    className="mb-5 border-0 bg-[#17191a]"
                >
                    <Checkbox
                        checked={confirmed}
                        onChange={(event) =>
                            setConfirmed(
                                event.currentTarget.checked
                            )
                        }
                        label={
                            <Text size="sm">
                                I confirm that all the passenger details
                                and conditions mentioned above are correct.
                            </Text>
                        }
                    />
                </Card>

                {/* Save */}
                <Button
                    fullWidth
                    size="md"
                    disabled={!confirmed}
                    onClick={handleSave}
                >
                    Save Passenger Details
                </Button>

            </div>
        </div>
    );
}