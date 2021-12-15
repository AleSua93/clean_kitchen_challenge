import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Order } from '../../models';
import { fetchData, getAvailableTimes } from '../../services/orders-service';
import styles from './orders-form.module.css';

function OrdersForm() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    fetchData().then(setOrders);
  }, []);

  useEffect(() => {
    const availableTimes = getAvailableTimes(orders, date);

    setTimeOptions(availableTimes);
  }, [date])

  const handleDateChange = (ev: SyntheticEvent) => {
    const target = ev.target as HTMLInputElement;
    const selectedDate = target.value;

    setDate(selectedDate);
  }
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        onChange={handleDateChange}
        min={new Date().toISOString().split("T")[0]} // Minimum date is current date
        type="date"
      />
      <select
        className={styles.input}
        disabled={!date}
      >
        <option value="" disabled selected>Select time</option>
        {timeOptions.map((option) => {
          return <option value={option} key={option}>{option}</option>
        })}
      </select>
      <div>
        <button className={styles.btn} type="button">Place order!</button>
      </div>
    </div>
  );
}

export default OrdersForm;
