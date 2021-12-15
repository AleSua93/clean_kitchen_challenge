import React from 'react';
import mondayOrders from '../mocks/monday-orders.json';
import weekdayOrders from '../mocks/weekday-orders.json';
import { getAvailableTimes } from './orders-service';

describe('Orders Service', () => {
  test('10:30 should not be an available time on a weekday if # orders >= 2', () => {
    const availableTimes = getAvailableTimes(weekdayOrders, '2021-12-29');

    expect(availableTimes).not.toContain('10:30')
    expect(availableTimes).toContain('12:30')
    expect(availableTimes).toContain('18:30')
  });

  test('10:30 should not be an available time on a Monday if # orders >= 4', () => {
    const availableTimes = getAvailableTimes(mondayOrders, '2021-12-27');

    expect(availableTimes).not.toContain('10:30')
    expect(availableTimes).toContain('12:30')
    expect(availableTimes).toContain('18:30')
  });
})
