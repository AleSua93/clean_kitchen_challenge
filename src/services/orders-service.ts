import { DAYS } from '../constants';
import sampleJson from '../mocks/random-orders.json';
import { Order } from '../models';

export const fetchData = (): Promise<Array<any>> => {
  return Promise.resolve(sampleJson);
}

export const getAvailableTimes = (orders: Order[], date: string) => {
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

  let options: string[] = [];
  const isMonday = (new Date(date)).getDay() === DAYS.MONDAY;
  
  ordersByDeliveryTime.forEach((val, key) => {
    if (val < 2) options.push(key)
  });

  return options;
}