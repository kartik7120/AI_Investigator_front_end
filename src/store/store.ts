import { create } from "zustand";
import type { ContactDetails, Passenger } from "../components/paxEditPage/PaxDetailsForm";
import type { Flight } from "../utils/useFulInterfaces";
import type { SSRDto } from "../components/Add-ons/AddOnPageTabs";
import type { Seat } from "../components/seatMap/Seat";

export interface BearState {
  isUserLoggedIn: boolean;
  email: string;

  destination_sector: string;
  departure_sector: string;
  return_date: string;
  promo_code: string;
  departure_date: string;
  passengers: Passenger[];
  ContactDetails: ContactDetails;
  numberOfPassengers: number
  flights: Flight[];
  SSRs: SSRDto[];
  seats: Seat[];

  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setDestinationSector: (destinationSector: string) => void;
  setDepartureSector: (departureSector: string) => void;
  setReturnDate: (returnDate: string) => void;
  setPromoCode: (promoCode: string) => void;
  setDepartureDate: (departure_date: string) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setContactDetails: (contactDetails: ContactDetails) => void;
  setNumberOfPassengers: (numberOfPassengers: number) => void;
  setFlights: (flights: Flight[]) => void;
  addSSRs: (addon: SSRDto) => void;
  removeSSRs: (addon: SSRDto) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seat: Seat) => void;
}

export const useBearStore = create<BearState>((set, get) => ({
  isUserLoggedIn: false,
  email: "",
  numberOfPassengers: 1,
  destination_sector: "",
  departure_sector: "",
  return_date: "",
  promo_code: "NOPROMO",
  departure_date: "",
  passengers: [],
  ContactDetails: {
    contactPerson: "",
    mobileNumber: "",
    email: "",
  },
  flights: [],
  SSRs: [],
  seats: [],

  addSeat(seat: Seat) {
    const s = get().seats;

    set({ seats: [...s, seat] })
  },

  removeSeat(seat: Seat) {
    const s = get().seats;

    set({
      seats: s.filter((st) => {
        if (st.id !== seat.id) {
          return true
        }
      })
    })
  },

  setFlights: (flights) => set({ flights: flights }),

  setIsUserLoggedIn: (isLoggedIn) => set({ isUserLoggedIn: isLoggedIn }),

  setPassengers: (passengers) => set({ passengers: passengers }),

  setEmail: (email) => set({ email }),

  setDestinationSector: (destinationSector) =>
    set({ destination_sector: destinationSector }),

  setDepartureSector: (departureSector) =>
    set({ departure_sector: departureSector }),

  setReturnDate: (returnDate) => set({ return_date: returnDate }),

  setPromoCode: (promoCode) => set({ promo_code: promoCode }),

  setDepartureDate: (departure_date: string) => set({ departure_date }),

  setContactDetails: (contactDetails: ContactDetails) => set({ ContactDetails: contactDetails }),

  setNumberOfPassengers(numberOfPassengers) {
    set({ numberOfPassengers })
  },

  addSSRs(addon) {
    const currSSRs = get().SSRs;

    set({
      SSRs: [...currSSRs, addon]
    })
  },
  removeSSRs(addon) {

    const currSSRs = get().SSRs

    set(
      {
        SSRs: currSSRs.filter((ssr) => ssr.id !== addon.id)
      }
    )
  }
}));
