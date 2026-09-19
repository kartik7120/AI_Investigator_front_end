import type { Price } from "./useFulInterfaces";

export const calculateLowestPrice = (prices: Price[]) => {

    return Math.min(...prices.map(({ currentPrice }) => currentPrice));
}