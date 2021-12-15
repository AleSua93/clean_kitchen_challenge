import { DAYS } from '../constants';
import sampleJson from '../mocks/random-orders.json';
import { Order } from '../models';

export const fetchData = async (): Promise<Array<any>> => {
  // TODO fetch the actual data here
  return Promise.resolve(sampleJson);
}

export const placeOrder = (order: Order) => {
  console.log('Placing order!', order);  
}

/**
 * Returns the available times to place an order in.
 * This is the most logic-heavy function in the challenge, so that's why I'm
 * documenting it :)
 * @constructor
 * @param {Order[]} orders - Array of all existing orders
 * @param {string} date - The selected date, in YYYY-MM-DD format
 */
export const getAvailableTimes = (orders: Order[], date: string) => {
  // Get an object with a times as keys and # of orders as value, for the given date
  const ordersByDeliveryTime = new Map();
  orders
    .filter((o: Order) => {
      return o.date === date;
    })
    .forEach((o: Order) => {
      if (ordersByDeliveryTime.has(o.time)) {
        ordersByDeliveryTime.set(o.time, ordersByDeliveryTime.get(o.time) + 1)
      } else {
        ordersByDeliveryTime.set(o.time, 1)
      }
    });

  // Determine max number of orders based on the day
  const isMonday = (new Date(date)).getDay() === DAYS.MONDAY;
  const maxNumberOfOrders = isMonday ? 4 : 2; 

  // Define possible and available times
  const possibleTimes: string[] = ['10:30', '12:30', '18:30'];
  const availableTimes: string[] = [];

  // Each time is only available if there are no orders, or if num of orders are < max
  possibleTimes.forEach((time) => {
    if (
      ordersByDeliveryTime.get(time) < maxNumberOfOrders ||
      !ordersByDeliveryTime.has(time)
    ) {
        availableTimes.push(time);
    }
  })

  return availableTimes;
}