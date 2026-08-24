import { Button, Select, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";

import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";

const PROMO_RULES = {
  "Summer Sale": {
    discount: 30,
    bookingDeadline: "2026-08-31",
  },

  "Autumn Escape": {
    discount: 20,
    bookingDeadline: "2026-10-31",
  },

  "Festive Offer": {
    discount: 25,
    bookingDeadline: "2026-10-31",
  },

  "Winter Sale": {
    discount: 20,
    bookingDeadline: "2026-12-31",
  },

  Student15: {
    discount: 15,
    requiresStudentId: true,
  },

  SkyAEarly10: {
    discount: 10,
    departure: "SIN",
    destination: "DXB",
    minDaysBeforeDeparture: 7,
  },
} as const;

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
    // color: "#d6d6d6",
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

    "&:hover": {
      borderColor: "#8a8a8a",
      cursor: "pointer",
    },
  },
};

const destinationSectors: DestinationSector[] = [
  {
    name: "Delhi",
    code: "DEL",
    airport: "Indira Gandhi International Airport",
  },
  { name: "Dubai", code: "DXB", airport: "Dubai International Airport" },
  {
    name: "Mumbai",
    code: "BOM",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
  },
  {
    name: "Bengaluru",
    code: "BLR",
    airport: "Kempegowda International Airport",
  },
  {
    name: "Hyderabad",
    code: "HYD",
    airport: "Rajiv Gandhi International Airport",
  },
  { name: "Chennai", code: "MAA", airport: "Chennai International Airport" },
  {
    name: "Kolkata",
    code: "CCU",
    airport: "Netaji Subhas Chandra Bose International Airport",
  },
  { name: "Pune", code: "PNQ", airport: "Pune Airport" },
  {
    name: "Ahmedabad",
    code: "AMD",
    airport: "Sardar Vallabhbhai Patel International Airport",
  },
  { name: "Jaipur", code: "JAI", airport: "Jaipur International Airport" },
  {
    name: "Lucknow",
    code: "LKO",
    airport: "Chaudhary Charan Singh International Airport",
  },
  { name: "Goa (Dabolim)", code: "GOI", airport: "Dabolim Airport" },
  { name: "Goa (Mopa)", code: "GOX", airport: "Manohar International Airport" },
  { name: "Kochi", code: "COK", airport: "Cochin International Airport" },
  {
    name: "Chandigarh",
    code: "IXC",
    airport: "Chandigarh International Airport",
  },
  {
    name: "Srinagar",
    code: "SXR",
    airport: "Sheikh ul-Alam International Airport",
  },
  { name: "Jammu", code: "IXJ", airport: "Jammu Airport" },
  { name: "Leh", code: "IXL", airport: "Kushok Bakula Rimpochee Airport" },
  {
    name: "Amritsar",
    code: "ATQ",
    airport: "Sri Guru Ram Dass Jee International Airport",
  },
  {
    name: "Guwahati",
    code: "GAU",
    airport: "Lokpriya Gopinath Bordoloi International Airport",
  },
  { name: "Patna", code: "PAT", airport: "Jay Prakash Narayan Airport" },
  {
    name: "Bhubaneswar",
    code: "BBI",
    airport: "Biju Patnaik International Airport",
  },
  { name: "Indore", code: "IDR", airport: "Devi Ahilya Bai Holkar Airport" },
  {
    name: "Nagpur",
    code: "NAG",
    airport: "Dr. Babasaheb Ambedkar International Airport",
  },
  {
    name: "Varanasi",
    code: "VNS",
    airport: "Lal Bahadur Shastri International Airport",
  },
  { name: "Ranchi", code: "IXR", airport: "Birsa Munda Airport" },
  { name: "Dehradun", code: "DED", airport: "Jolly Grant Airport" },
  { name: "Bagdogra", code: "IXB", airport: "Bagdogra Airport" },
  { name: "Agartala", code: "IXA", airport: "Maharaja Bir Bikram Airport" },
  {
    name: "Port Blair",
    code: "IXZ",
    airport: "Veer Savarkar International Airport",
  },
  {
    name: "Visakhapatnam",
    code: "VTZ",
    airport: "Visakhapatnam International Airport",
  },
  {
    name: "Coimbatore",
    code: "CJB",
    airport: "Coimbatore International Airport",
  },
  {
    name: "Mangalore",
    code: "IXE",
    airport: "Mangalore International Airport",
  },
  { name: "Madurai", code: "IXM", airport: "Madurai Airport" },
  {
    name: "Tiruchirappalli",
    code: "TRZ",
    airport: "Tiruchirappalli International Airport",
  },
  { name: "Raipur", code: "RPR", airport: "Swami Vivekananda Airport" },
  { name: "Surat", code: "STV", airport: "Surat Airport" },
  { name: "Vadodara", code: "BDQ", airport: "Vadodara Airport" },
  { name: "Udaipur", code: "UDR", airport: "Maharana Pratap Airport" },
  { name: "Jodhpur", code: "JDH", airport: "Jodhpur Airport" },
  {
    name: "Aurangabad",
    code: "IXU",
    airport: "Chhatrapati Sambhajinagar Airport",
  },
  { name: "Bhopal", code: "BHO", airport: "Raja Bhoj Airport" },
  { name: "Kanpur", code: "KNU", airport: "Kanpur Airport" },
  { name: "Prayagraj", code: "IXD", airport: "Prayagraj Airport" },
  { name: "Gorakhpur", code: "GOP", airport: "Mahayogi Gorakhnath Airport" },
  { name: "Silchar", code: "IXS", airport: "Silchar Airport" },
  {
    name: "Imphal",
    code: "IMF",
    airport: "Bir Tikendrajit International Airport",
  },
  { name: "Dimapur", code: "DMU", airport: "Dimapur Airport" },
  { name: "Aizawl", code: "AJL", airport: "Lengpui Airport" },
  { name: "Dibrugarh", code: "DIB", airport: "Dibrugarh Airport" },
  { name: "Jorhat", code: "JRH", airport: "Jorhat Airport" },
  { name: "Singapore", code: "SIN", airport: "Singapore Changi Airport" },
];

const departureSector: DepartureSector[] = [
  {
    name: "Delhi",
    code: "DEL",
    airport: "Indira Gandhi International Airport",
  },
  { name: "Dubai", code: "DXB", airport: "Dubai International Airport" },
  { name: "Singapore", code: "SIN", airport: "Singapore Changi Airport" },
  {
    name: "Mumbai",
    code: "BOM",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
  },
  {
    name: "Bengaluru",
    code: "BLR",
    airport: "Kempegowda International Airport",
  },
  {
    name: "Hyderabad",
    code: "HYD",
    airport: "Rajiv Gandhi International Airport",
  },
  { name: "Chennai", code: "MAA", airport: "Chennai International Airport" },
  {
    name: "Kolkata",
    code: "CCU",
    airport: "Netaji Subhas Chandra Bose International Airport",
  },
  { name: "Pune", code: "PNQ", airport: "Pune Airport" },
  {
    name: "Ahmedabad",
    code: "AMD",
    airport: "Sardar Vallabhbhai Patel International Airport",
  },
  { name: "Jaipur", code: "JAI", airport: "Jaipur International Airport" },
  {
    name: "Lucknow",
    code: "LKO",
    airport: "Chaudhary Charan Singh International Airport",
  },
  { name: "Goa (Dabolim)", code: "GOI", airport: "Dabolim Airport" },
  { name: "Goa (Mopa)", code: "GOX", airport: "Manohar International Airport" },
  { name: "Kochi", code: "COK", airport: "Cochin International Airport" },
  {
    name: "Chandigarh",
    code: "IXC",
    airport: "Chandigarh International Airport",
  },
  {
    name: "Srinagar",
    code: "SXR",
    airport: "Sheikh ul-Alam International Airport",
  },
  { name: "Jammu", code: "IXJ", airport: "Jammu Airport" },
  { name: "Leh", code: "IXL", airport: "Kushok Bakula Rimpochee Airport" },
  {
    name: "Amritsar",
    code: "ATQ",
    airport: "Sri Guru Ram Dass Jee International Airport",
  },
  {
    name: "Guwahati",
    code: "GAU",
    airport: "Lokpriya Gopinath Bordoloi International Airport",
  },
  { name: "Patna", code: "PAT", airport: "Jay Prakash Narayan Airport" },
  {
    name: "Bhubaneswar",
    code: "BBI",
    airport: "Biju Patnaik International Airport",
  },
  { name: "Indore", code: "IDR", airport: "Devi Ahilya Bai Holkar Airport" },
  {
    name: "Nagpur",
    code: "NAG",
    airport: "Dr. Babasaheb Ambedkar International Airport",
  },
  {
    name: "Varanasi",
    code: "VNS",
    airport: "Lal Bahadur Shastri International Airport",
  },
  { name: "Ranchi", code: "IXR", airport: "Birsa Munda Airport" },
  { name: "Dehradun", code: "DED", airport: "Jolly Grant Airport" },
  { name: "Bagdogra", code: "IXB", airport: "Bagdogra Airport" },
  { name: "Agartala", code: "IXA", airport: "Maharaja Bir Bikram Airport" },
  {
    name: "Port Blair",
    code: "IXZ",
    airport: "Veer Savarkar International Airport",
  },
  {
    name: "Visakhapatnam",
    code: "VTZ",
    airport: "Visakhapatnam International Airport",
  },
  {
    name: "Coimbatore",
    code: "CJB",
    airport: "Coimbatore International Airport",
  },
  {
    name: "Mangalore",
    code: "IXE",
    airport: "Mangalore International Airport",
  },
  { name: "Madurai", code: "IXM", airport: "Madurai Airport" },
  {
    name: "Tiruchirappalli",
    code: "TRZ",
    airport: "Tiruchirappalli International Airport",
  },
  { name: "Raipur", code: "RPR", airport: "Swami Vivekananda Airport" },
  { name: "Surat", code: "STV", airport: "Surat Airport" },
  { name: "Vadodara", code: "BDQ", airport: "Vadodara Airport" },
  { name: "Udaipur", code: "UDR", airport: "Maharana Pratap Airport" },
  { name: "Jodhpur", code: "JDH", airport: "Jodhpur Airport" },
  {
    name: "Aurangabad",
    code: "IXU",
    airport: "Chhatrapati Sambhajinagar Airport",
  },
  { name: "Bhopal", code: "BHO", airport: "Raja Bhoj Airport" },
  { name: "Kanpur", code: "KNU", airport: "Kanpur Airport" },
  { name: "Prayagraj", code: "IXD", airport: "Prayagraj Airport" },
  { name: "Gorakhpur", code: "GOP", airport: "Mahayogi Gorakhnath Airport" },
  { name: "Silchar", code: "IXS", airport: "Silchar Airport" },
  {
    name: "Imphal",
    code: "IMF",
    airport: "Bir Tikendrajit International Airport",
  },
  { name: "Dimapur", code: "DMU", airport: "Dimapur Airport" },
  { name: "Aizawl", code: "AJL", airport: "Lengpui Airport" },
  { name: "Dibrugarh", code: "DIB", airport: "Dibrugarh Airport" },
  { name: "Jorhat", code: "JRH", airport: "Jorhat Airport" },
];

const renderSectorOption = (sector: SectorSelectItem) => (
  <div className="flex flex-row items-center justify-between w-full">
    <div className="flex flex-col *:gap-1">
      <Text fw={600} size="sm" c="gray.5">
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

const slogans = [
  "Your journey begins here.",
  "Where will you fly next?",
  "Adventure is just a booking away.",
  "Discover the world, one flight at a time.",
  "Every destination starts with a ticket.",
  "Travel farther. Experience more.",
  "Find your perfect flight in seconds.",
  "The sky isn't the limit—it's the beginning.",
  "Book today. Explore tomorrow.",
  "Your next adventure is waiting.",
  "From takeoff to touchdown, we've got you covered.",
  "Fly smarter. Travel happier.",
];

export default function BookingWidget() {
  const [value, setValue] = useState<string | null>(null);
  const [destinationTime, setDestinationTime] = useState<string | null>(null);
  const [slogan] = useState(
    () => slogans[Math.floor(Math.random() * slogans.length)],
  );

  const [DestinatonSector, setDestinatonSector] = useState<string | null>(null);
  const [DepartureSector, setDepartureSector] = useState<string | null>(null);

  const [promoCode, setPromoCode] = useState<string | null>("No Promo");

  const [, setDisableButton] = useState(false);

  async function handleSearchFlight() {
    try {
      setDisableButton(true);

      const isPromoValid = validatePromoCode();

      if (!isPromoValid) {
        return;
      }

      // Promo is valid
      // Continue with your flight search API

      console.log("Searching flights", {
        departure: DepartureSector,
        destination: DestinatonSector,
        departureDate: value,
        returnDate: destinationTime,
        promoCode,
      });

      if (DestinatonSector === DepartureSector) {
        notifications.show({
          message: "Destination and Departure sector cannot be the same",
          color: "red",
          title: "Invalid Journey",
        });

        setDisableButton(true);
      }

      // await searchFlights(...);
    } catch (error) {
      console.error(error);

      notifications.show({
        title: "Search failed",
        message: "Unable to search flights. Please try again.",
        color: "red",
      });
    } finally {
      setDisableButton(false);
    }
  }
  const validatePromoCode = (): boolean => {
    if (!promoCode || promoCode === "No Promo") {
      return true;
    }

    const rules = PROMO_RULES[promoCode as keyof typeof PROMO_RULES];

    if (!rules) {
      notifications.show({
        title: "Invalid promo code",
        message: `The promo code "${promoCode}" is not valid.`,
        color: "red",
      });

      return false;
    }

    // -----------------------------------------
    // ROUTE VALIDATION
    // -----------------------------------------

    if (
      "departure" in rules &&
      rules.departure &&
      DepartureSector !== rules.departure
    ) {
      notifications.show({
        title: "Promo code not applicable",
        message: `${promoCode} is valid only for flights departing from ${rules.departure}.`,
        color: "red",
        autoClose: 5000,
      });

      return false;
    }

    if (
      "destination" in rules &&
      rules.destination &&
      DestinatonSector !== rules.destination
    ) {
      notifications.show({
        title: "Promo code not applicable",
        message: `${promoCode} is valid only for flights arriving at ${rules.destination}.`,
        color: "red",
        autoClose: 5000,
      });

      return false;
    }

    // -----------------------------------------
    // DEPARTURE DATE REQUIRED
    // -----------------------------------------

    if (!value) {
      notifications.show({
        title: "Departure date required",
        message:
          "Please select a departure date before applying this promo code.",
        color: "red",
        autoClose: 5000,
      });

      return false;
    }

    const departureDate = dayjs(value);
    const today = dayjs();

    // -----------------------------------------
    // BOOK-BY DATE
    // -----------------------------------------

    if (
      "bookingDeadline" in rules &&
      rules.bookingDeadline &&
      today.isAfter(dayjs(rules.bookingDeadline), "day")
    ) {
      notifications.show({
        title: "Promo code expired",
        message: `${promoCode} was valid only for bookings made by ${dayjs(
          rules.bookingDeadline,
        ).format("DD MMM YYYY")}.`,
        color: "red",
        autoClose: 5000,
      });

      return false;
    }

    // -----------------------------------------
    // 7+ DAYS ADVANCE BOOKING
    // -----------------------------------------

    if ("minDaysBeforeDeparture" in rules && rules.minDaysBeforeDeparture) {
      const minimumDepartureDate = today.add(
        rules.minDaysBeforeDeparture,
        "day",
      );

      if (departureDate.isBefore(minimumDepartureDate, "day")) {
        notifications.show({
          title: "Promo code not applicable",
          message: `${promoCode} requires the flight to be booked at least ${rules.minDaysBeforeDeparture} days After Booking date.`,
          color: "red",
          autoClose: 5000,
        });

        return false;
      }
    }

    // -----------------------------------------
    // STUDENT PROMO
    // -----------------------------------------

    if ("requiresStudentId" in rules && rules.requiresStudentId) {
      notifications.show({
        title: "Student ID required",
        message:
          "Student15 requires a valid student ID. Please provide your student ID to continue.",
        color: "red",
        autoClose: 5000,
      });

      return false;
    }

    // -----------------------------------------
    // SUCCESS
    // -----------------------------------------

    notifications.show({
      title: "Promo code applied",
      message: `${promoCode} has been successfully applied. You save up to ${rules.discount}%.`,
      color: "teal",
      autoClose: 4000,
    });

    return true;
  };

  return (
    <div className="flex flex-col gap-10 w-full p-6 *:gap-6 bg-[#1c1c1c]">
      <Title
        h={1}
        mb={20}
        className="text-2xl md:text-3xl lg:text-4xl text-center font-bold"
      >
        {slogan}
      </Title>

      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="flex flex-row gap-1 items-center">
          <Select
            label={
              <Text fw={600} size="sm">
                Departure sector
              </Text>
            }
            value={DepartureSector}
            onChange={setDepartureSector}
            placeholder="Pick value"
            searchable
            data={[
              ...departureSector.map((sector) => ({
                value: sector.code,
                label: `${sector.name}`,
                airport: sector.airport,
              })),
            ]}
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
            renderOption={({ option }) =>
              renderSectorOption(option as SectorSelectItem)
            }
          />
          <Select
            label={
              <Text fw={600} size="sm">
                Destination sector
              </Text>
            }
            value={DestinatonSector}
            searchable
            onChange={setDestinatonSector}
            placeholder="Pick value"
            data={[
              ...destinationSectors.map((sector) => ({
                value: sector.code,
                label: `${sector.name}`,
                airport: sector.airport,
              })),
            ]}
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
            renderOption={({ option }) =>
              renderSectorOption(option as SectorSelectItem)
            }
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <DatePickerInput
            label={
              <Text fw={600} size="sm">
                Departure date
              </Text>
            }
            placeholder="Pick Date"
            value={value}
            onChange={setValue}
            valueFormat="DD MMM YY"
            minDate={new Date()}
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }
            styles={datePickerStyles}
          />
          <DatePickerInput
            label={
              <Text fw={600} size="sm">
                Return date
              </Text>
            }
            placeholder="Pick Date"
            value={destinationTime}
            onChange={setDestinationTime}
            valueFormat="DD MMM YY"
            minDate={new Date()}
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }
            styles={datePickerStyles}
          />
        </div>
        <div className="self-end flex flex-row gap-1 items-center">
          <Select
            h={56}
            // label="Promo Code"
            placeholder="Select promo"
            value={promoCode}
            onChange={setPromoCode}
            data={[
              "No Promo",
              "Summer Sale",
              "Autumn Escape",
              "Winter Sale",
              "Festive Offer",
              "Student15",
              "SkyAEarly10",
            ]}
            defaultValue={"No Promo"}
            radius={0}
            styles={{
              label: {
                color: "#fff",
                marginBottom: 6,
                fontWeight: 500,
              },

              input: {
                height: 56,
                background: "#0E636B",
                border: "1px solid #0E636B",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                transition: "all .2s",

                "&::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "none",
                },

                "&:hover": {
                  background: "#14808A",
                  borderColor: "#14808A",
                },

                "&:focus": {
                  borderColor: "#14808A",
                },
              },

              section: {
                color: "#fff", // dropdown chevron
              },

              dropdown: {
                background: "#0E636B",
                border: "1px solid #14808A",
              },

              option: {
                color: "#fff",

                "&[data-hovered]": {
                  background: "#14808A",
                },

                "&[data-selected]": {
                  background: "#14808A",
                },
              },
            }}
          />
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

            onClick={handleSearchFlight}
          >
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}
