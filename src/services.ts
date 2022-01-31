/**
 *
 * Cart with total cost less then 10€ will be charged 10€ - CartValue
 *
 * eg.
 * CartValue: 5€
 * fee: 5€ (10€ - 5€)
 * @param totalCost sum of prices of all items (without other fees)
 * @returns minimum amount fee
 */
export function computeMinimumCartCharges(totalCost: number) {
  if (totalCost > 10) {
    return 0;
  } else {
    return 10 - totalCost;
  }
}

/**
 * A minimum delivery fee of 2€ is charged for every 1000m of delivery distance
 * Additional 1€ is charged for every 500m (inclusive)
 *
 * 1) Delivery is fee if cart amount is greater than 10€
 * 2) Delivery fee is capped at 15€
 *
 *
 * Example 1: If the delivery distance is 1499 meters,
 * the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
 * Example 2: If the delivery distance is 1500 meters,
 * the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
 * Example 3: If the delivery distance is 1501 meters,
 * the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
 * @param deliveryDistance Total Delivery distance in meters
 * @returns delivery fee
 */
export function computeDeliveryFee(
  deliveryDistance: number,
  totalCartAmount: number
) {
  if (totalCartAmount >= 100) {
    return 0;
  }

  const baseFee = 2;
  const additionalFee = 1;
  const baseDistance = 1000;
  const additionalDistance = 500;

  const extraDistance = deliveryDistance - baseDistance;
  const extraDistanceFactor = Math.ceil(extraDistance / additionalDistance);
  const extraFee = extraDistanceFactor * additionalFee;
  const totalFee = extraFee + baseFee;
  return Math.min(totalFee, 15); // return fee or 15€ if fee is greater than 15€
}

/**
 * If the number of items is five or more,
 * an additional 50 cent surcharge is added for each item above four
 *
 *
 * @param numberOfItems Total number of items in cart
 *
 */
export function computeSurplusItemsFee(numberOfItems: number) {
  if (numberOfItems >= 5) {
    return (numberOfItems - 4) * 0.5;
  }
  return 0;
}

/**
 * During the Friday rush (3 - 7 PM UTC),
 * the delivery fee (the total fee including possible surcharges) will be multiplied by 1.1x.
 * However, the fee is capped at max 15€.
 *
 * @param date date of the order placement
 * @param totalCartAmount total amount of the cart
 * @returns extra charge for rush hour delivery
 */
export function computeRushHourFee(date: Date, deliveryFee: number) {
  // monday = 1, sunday = 0 i.e. friday is 5
  const day = date.getDay();
  // hours return in 24 hour format
  const hour = date.getHours();

  if (day === 5 && hour >= 15 && hour <= 19) {
    const fee = 1.1 * deliveryFee;
    // when fee is above the maximum fee, cap it at 15€
    if (fee > 15) {
      return deliveryFee - 15;
    } else {
      return fee - deliveryFee;
    }
  } else {
    return 0;
  }
}

export type TCartTotal = {
  minimumCartCharge: number;
  deliveryFee: number;
  surplusItemFee: number;
  rushHourFee: number;
  total: number;
};

export function computeTotal(
  cartCost: number,
  numberOfItems: number,
  datetime: Date,
  deliveryDistance: number
): TCartTotal {
  const minimumCartCharge = computeMinimumCartCharges(cartCost);
  const deliveryFee = computeDeliveryFee(deliveryDistance, cartCost);
  const surplusItemFee = computeSurplusItemsFee(numberOfItems);
  const rushHourFee = computeRushHourFee(datetime, deliveryFee);
  const total =
    cartCost + minimumCartCharge + deliveryFee + surplusItemFee + rushHourFee;

  return {
    minimumCartCharge,
    deliveryFee,
    surplusItemFee,
    rushHourFee: rushHourFee,
    total,
  };
}
