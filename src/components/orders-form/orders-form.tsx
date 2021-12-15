import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Order } from '../../models';
import { fetchData, getAvailableTimes, placeOrder } from '../../services/orders-service';
import styles from './orders-form.module.css';

function OrdersForm() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

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

  const handleTimeChange = (ev: SyntheticEvent) => {
    const target = ev.target as HTMLSelectElement;

    console.log(target.value);
    
    setTime(target.value);
  }

  const submitForm = () => {
    const order: Order = {
      date,
      time,
      customerId: "mock-customer-id"
    }

    placeOrder(order)
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
        onChange={handleTimeChange}
      >
        {timeOptions.map((option) => {
          return <option value={option} key={option}>{option}</option>
        })}
      </select>
      <div>
        <button
          className={styles.btn}
          type="button"
          disabled={!time}
          onClick={submitForm}
        >Place order!</button>
      </div>
    </div>
  );
}

export default OrdersForm;
