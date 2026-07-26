import { Button, Select, Stack, Text, Group, Badge } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useState } from "react";

interface DestinationSector {
    name: string;
    code: string;
    airport: string;
}

interface DepartureSector {
    name: string;
    code: string;
    airport: string;
}

interface SectorSelectItem {
    value: string;
    label: string;
    airport: string;
}

const datePickerStyles = {
    label: {
        color: "#d6d6d6",
        fontSize: 12,
        marginBottom: 6,
        fontWeight: 400,

        letterSpacing: "0.5px",
    },

    input: {
        backgroundColor: "#1c1c1c",
        color: "#fff",
        border: "1px solid #575757",
        borderRadius: 0,
        height: 56,
        fontSize: 16,

        "&::placeholder": {
            color: "#8c8c8c",
        },

        "&:focus": {
            borderColor: "#8a8a8a",
        },
    },

    dropdown: {
        backgroundColor: "#1c1c1c",
        border: "1px solid #575757",
        borderRadius: 0,
    },

    calendarHeader: {
        color: "#fff",
    },

    weekday: {
        color: "#999",
        fontWeight: 500,
    },

    day: {
        color: "#fff",

        "&[data-selected]": {
            backgroundColor: "#0E636B",
        },

        "&[data-in-range]": {
            backgroundColor: "#0E636B",
        },

        "&:hover": {
            backgroundColor: "#2d2d2d",
        },
    },
};

const destinationSectors: DestinationSector[] = [
    { name: "Delhi", code: "DEL", airport: "Indira Gandhi International Airport" },
    { name: "Mumbai", code: "BOM", airport: "Chhatrapati Shivaji Maharaj International Airport" },
    { name: "Bengaluru", code: "BLR", airport: "Kempegowda International Airport" },
    { name: "Hyderabad", code: "HYD", airport: "Rajiv Gandhi International Airport" },
    { name: "Chennai", code: "MAA", airport: "Chennai International Airport" },
    { name: "Kolkata", code: "CCU", airport: "Netaji Subhas Chandra Bose International Airport" },
    { name: "Pune", code: "PNQ", airport: "Pune Airport" },
    { name: "Ahmedabad", code: "AMD", airport: "Sardar Vallabhbhai Patel International Airport" },
    { name: "Jaipur", code: "JAI", airport: "Jaipur International Airport" },
    { name: "Lucknow", code: "LKO", airport: "Chaudhary Charan Singh International Airport" },
    { name: "Goa (Dabolim)", code: "GOI", airport: "Dabolim Airport" },
    { name: "Goa (Mopa)", code: "GOX", airport: "Manohar International Airport" },
    { name: "Kochi", code: "COK", airport: "Cochin International Airport" },
    { name: "Chandigarh", code: "IXC", airport: "Chandigarh International Airport" },
    { name: "Srinagar", code: "SXR", airport: "Sheikh ul-Alam International Airport" },
    { name: "Jammu", code: "IXJ", airport: "Jammu Airport" },
    { name: "Leh", code: "IXL", airport: "Kushok Bakula Rimpochee Airport" },
    { name: "Amritsar", code: "ATQ", airport: "Sri Guru Ram Dass Jee International Airport" },
    { name: "Guwahati", code: "GAU", airport: "Lokpriya Gopinath Bordoloi International Airport" },
    { name: "Patna", code: "PAT", airport: "Jay Prakash Narayan Airport" },
    { name: "Bhubaneswar", code: "BBI", airport: "Biju Patnaik International Airport" },
    { name: "Indore", code: "IDR", airport: "Devi Ahilya Bai Holkar Airport" },
    { name: "Nagpur", code: "NAG", airport: "Dr. Babasaheb Ambedkar International Airport" },
    { name: "Varanasi", code: "VNS", airport: "Lal Bahadur Shastri International Airport" },
    { name: "Ranchi", code: "IXR", airport: "Birsa Munda Airport" },
    { name: "Dehradun", code: "DED", airport: "Jolly Grant Airport" },
    { name: "Bagdogra", code: "IXB", airport: "Bagdogra Airport" },
    { name: "Agartala", code: "IXA", airport: "Maharaja Bir Bikram Airport" },
    { name: "Port Blair", code: "IXZ", airport: "Veer Savarkar International Airport" },
    { name: "Visakhapatnam", code: "VTZ", airport: "Visakhapatnam International Airport" },
    { name: "Coimbatore", code: "CJB", airport: "Coimbatore International Airport" },
    { name: "Mangalore", code: "IXE", airport: "Mangalore International Airport" },
    { name: "Madurai", code: "IXM", airport: "Madurai Airport" },
    { name: "Tiruchirappalli", code: "TRZ", airport: "Tiruchirappalli International Airport" },
    { name: "Raipur", code: "RPR", airport: "Swami Vivekananda Airport" },
    { name: "Surat", code: "STV", airport: "Surat Airport" },
    { name: "Vadodara", code: "BDQ", airport: "Vadodara Airport" },
    { name: "Udaipur", code: "UDR", airport: "Maharana Pratap Airport" },
    { name: "Jodhpur", code: "JDH", airport: "Jodhpur Airport" },
    { name: "Aurangabad", code: "IXU", airport: "Chhatrapati Sambhajinagar Airport" },
    { name: "Bhopal", code: "BHO", airport: "Raja Bhoj Airport" },
    { name: "Kanpur", code: "KNU", airport: "Kanpur Airport" },
    { name: "Prayagraj", code: "IXD", airport: "Prayagraj Airport" },
    { name: "Gorakhpur", code: "GOP", airport: "Mahayogi Gorakhnath Airport" },
    { name: "Silchar", code: "IXS", airport: "Silchar Airport" },
    { name: "Imphal", code: "IMF", airport: "Bir Tikendrajit International Airport" },
    { name: "Dimapur", code: "DMU", airport: "Dimapur Airport" },
    { name: "Aizawl", code: "AJL", airport: "Lengpui Airport" },
    { name: "Dibrugarh", code: "DIB", airport: "Dibrugarh Airport" },
    { name: "Jorhat", code: "JRH", airport: "Jorhat Airport" }
];

const departureSector: DepartureSector[] = [
    { name: "Delhi", code: "DEL", airport: "Indira Gandhi International Airport" },
    { name: "Mumbai", code: "BOM", airport: "Chhatrapati Shivaji Maharaj International Airport" },
    { name: "Bengaluru", code: "BLR", airport: "Kempegowda International Airport" },
    { name: "Hyderabad", code: "HYD", airport: "Rajiv Gandhi International Airport" },
    { name: "Chennai", code: "MAA", airport: "Chennai International Airport" },
    { name: "Kolkata", code: "CCU", airport: "Netaji Subhas Chandra Bose International Airport" },
    { name: "Pune", code: "PNQ", airport: "Pune Airport" },
    { name: "Ahmedabad", code: "AMD", airport: "Sardar Vallabhbhai Patel International Airport" },
    { name: "Jaipur", code: "JAI", airport: "Jaipur International Airport" },
    { name: "Lucknow", code: "LKO", airport: "Chaudhary Charan Singh International Airport" },
    { name: "Goa (Dabolim)", code: "GOI", airport: "Dabolim Airport" },
    { name: "Goa (Mopa)", code: "GOX", airport: "Manohar International Airport" },
    { name: "Kochi", code: "COK", airport: "Cochin International Airport" },
    { name: "Chandigarh", code: "IXC", airport: "Chandigarh International Airport" },
    { name: "Srinagar", code: "SXR", airport: "Sheikh ul-Alam International Airport" },
    { name: "Jammu", code: "IXJ", airport: "Jammu Airport" },
    { name: "Leh", code: "IXL", airport: "Kushok Bakula Rimpochee Airport" },
    { name: "Amritsar", code: "ATQ", airport: "Sri Guru Ram Dass Jee International Airport" },
    { name: "Guwahati", code: "GAU", airport: "Lokpriya Gopinath Bordoloi International Airport" },
    { name: "Patna", code: "PAT", airport: "Jay Prakash Narayan Airport" },
    { name: "Bhubaneswar", code: "BBI", airport: "Biju Patnaik International Airport" },
    { name: "Indore", code: "IDR", airport: "Devi Ahilya Bai Holkar Airport" },
    { name: "Nagpur", code: "NAG", airport: "Dr. Babasaheb Ambedkar International Airport" },
    { name: "Varanasi", code: "VNS", airport: "Lal Bahadur Shastri International Airport" },
    { name: "Ranchi", code: "IXR", airport: "Birsa Munda Airport" },
    { name: "Dehradun", code: "DED", airport: "Jolly Grant Airport" },
    { name: "Bagdogra", code: "IXB", airport: "Bagdogra Airport" },
    { name: "Agartala", code: "IXA", airport: "Maharaja Bir Bikram Airport" },
    { name: "Port Blair", code: "IXZ", airport: "Veer Savarkar International Airport" },
    { name: "Visakhapatnam", code: "VTZ", airport: "Visakhapatnam International Airport" },
    { name: "Coimbatore", code: "CJB", airport: "Coimbatore International Airport" },
    { name: "Mangalore", code: "IXE", airport: "Mangalore International Airport" },
    { name: "Madurai", code: "IXM", airport: "Madurai Airport" },
    { name: "Tiruchirappalli", code: "TRZ", airport: "Tiruchirappalli International Airport" },
    { name: "Raipur", code: "RPR", airport: "Swami Vivekananda Airport" },
    { name: "Surat", code: "STV", airport: "Surat Airport" },
    { name: "Vadodara", code: "BDQ", airport: "Vadodara Airport" },
    { name: "Udaipur", code: "UDR", airport: "Maharana Pratap Airport" },
    { name: "Jodhpur", code: "JDH", airport: "Jodhpur Airport" },
    { name: "Aurangabad", code: "IXU", airport: "Chhatrapati Sambhajinagar Airport" },
    { name: "Bhopal", code: "BHO", airport: "Raja Bhoj Airport" },
    { name: "Kanpur", code: "KNU", airport: "Kanpur Airport" },
    { name: "Prayagraj", code: "IXD", airport: "Prayagraj Airport" },
    { name: "Gorakhpur", code: "GOP", airport: "Mahayogi Gorakhnath Airport" },
    { name: "Silchar", code: "IXS", airport: "Silchar Airport" },
    { name: "Imphal", code: "IMF", airport: "Bir Tikendrajit International Airport" },
    { name: "Dimapur", code: "DMU", airport: "Dimapur Airport" },
    { name: "Aizawl", code: "AJL", airport: "Lengpui Airport" },
    { name: "Dibrugarh", code: "DIB", airport: "Dibrugarh Airport" },
    { name: "Jorhat", code: "JRH", airport: "Jorhat Airport" }
];

const renderSectorOption = (sector: SectorSelectItem) => (
    <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col *:gap-1">
            <Text fw={600} size="sm" c="white">
                {sector.label}
            </Text>
            <Text size="xs" c="gray.5">
                {sector.airport}
            </Text>
        </div>
        <Text size="xs" c="gray.5">
            {sector.value}
        </Text>
    </div>
);

export default function BookingWidget() {

    const [value, setValue] = useState<string | null>(null);
    const [destinationTime, setDestinationTime] = useState<string | null>(null);

    return <div className="flex flex-row gap-2 items-center justify-center">
        <div className="flex flex-row gap-1 items-center">
            <Select
                label="Departure sector"
                placeholder="Pick value"
                data={
                    [
                        ...departureSector.map((sector) => ({
                            value: sector.code,
                            label: `${sector.name}`,
                            airport: sector.airport
                        }))
                    ]
                }
                defaultValue="DEL"
                clearable
                styles={{
                    label: {
                        color: "#d6d6d6",
                        fontSize: 12,
                        marginBottom: 6,
                        fontWeight: 400,
                        letterSpacing: "0.5px",
                    },

                    input: {
                        backgroundColor: "#1c1c1c",
                        color: "#fff",
                        border: "1px solid #575757",
                        borderRadius: 0,
                        height: 56,
                        fontSize: 16,

                        "&::placeholder": {
                            color: "#8c8c8c",
                        },

                        "&:focus": {
                            borderColor: "#8a8a8a",
                        },
                    },

                    dropdown: {
                        backgroundColor: "#1c1c1c",
                        border: "1px solid #575757",
                        borderRadius: 0,
                    },

                    option: {
                        color: "#fff",
                        fontSize: 15,

                        "&[data-hovered]": {
                            backgroundColor: "#2d2d2d",
                        },

                        "&[data-checked]": {
                            backgroundColor: "#0057d9",
                            color: "#fff",
                        },
                    },

                    section: {
                        color: "#999",
                    },
                }}
                renderOption={({ option }) => (
                    renderSectorOption(option as SectorSelectItem)
                )}
            />
            <Select
                label="Destination sector"
                placeholder="Pick value"
                data={
                    [
                        ...destinationSectors.map((sector) => ({
                            value: sector.code,
                            label: `${sector.name}`,
                            airport: sector.airport
                        }))
                    ]
                }
                defaultValue="DEL"
                clearable
                styles={{
                    label: {
                        color: "#d6d6d6",
                        fontSize: 12,
                        marginBottom: 6,
                        fontWeight: 400,
                        letterSpacing: "0.5px",

                    },

                    input: {
                        backgroundColor: "#1c1c1c",
                        color: "#fff",
                        border: "1px solid #575757",
                        borderRadius: 0,
                        height: 56,
                        fontSize: 16,

                        "&::placeholder": {
                            color: "#8c8c8c",
                        },

                        "&:focus": {
                            borderColor: "#8a8a8a",
                        },
                    },

                    dropdown: {
                        backgroundColor: "#1c1c1c",
                        border: "1px solid #575757",
                        borderRadius: 0,
                    },

                    option: {
                        color: "#fff",
                        fontSize: 15,

                        "&[data-hovered]": {
                            backgroundColor: "#2d2d2d",
                        },

                        "&[data-checked]": {
                            backgroundColor: "#0057d9",
                            color: "#fff",
                        },
                    },

                    section: {
                        color: "#999",
                    },
                }}
                renderOption={({ option }) => (
                    renderSectorOption(option as SectorSelectItem)
                )}
            />
        </div>
        <div className="flex flex-row gap-1 items-center">
            <DatePickerInput
                label="Departure date"
                placeholder="Pick Date"
                value={value}
                onChange={setValue}
                valueFormat="DD MMM YY"
                minDate={new Date()}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                styles={datePickerStyles}
            />
            <DatePickerInput
                label="Destination date"
                placeholder="Pick Date"
                value={destinationTime}
                onChange={setDestinationTime}
                valueFormat="DD MMM YY"
                minDate={new Date()}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                styles={datePickerStyles}
            />
        </div>
        <div className="self-end">
            <Button
                h={56}
                miw={170}
                radius={0}
                styles={{
                    root: {
                        background: "#0E636B",
                        border: "1px solid #0E636B",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 600,
                        letterSpacing: "0.4px",
                        textTransform: "uppercase",
                        transition: "all .2s",

                        "&:hover": {
                            background: "#14808A",
                            borderColor: "#14808A",
                        },
                    },
                }}
            >
                Search Flights
            </Button>
        </div>
    </div>
}