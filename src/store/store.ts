import { create } from "zustand";

interface BearState {
  isUserLoggedIn: boolean;
  email: string;

  destination_sector: string;
  departure_sector: string;
  return_date: string;
  promo_code: string;
  departure_date: string;

  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setDestinationSector: (destinationSector: string) => void;
  setDepartureSector: (departureSector: string) => void;
  setReturnDate: (returnDate: string) => void;
  setPromoCode: (promoCode: string) => void;
  setDepartureDate: (departure_date: string) => void;
}

export const useBearStore = create<BearState>((set) => ({
  isUserLoggedIn: false,
  email: "",

  destination_sector: "",
  departure_sector: "",
  return_date: "",
  promo_code: "",
  departure_date: "",

  setIsUserLoggedIn: (isLoggedIn) => set({ isUserLoggedIn: isLoggedIn }),

  setEmail: (email) => set({ email }),

  setDestinationSector: (destinationSector) =>
    set({ destination_sector: destinationSector }),

  setDepartureSector: (departureSector) =>
    set({ departure_sector: departureSector }),

  setReturnDate: (returnDate) => set({ return_date: returnDate }),

  setPromoCode: (promoCode) => set({ promo_code: promoCode }),

  setDepartureDate: (departure_date: string) => set({ departure_date }),
}));
