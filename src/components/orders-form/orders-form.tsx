import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Order } from '../../models';
import { fetchData, getAvailableTimes, placeOrder } from '../../services/orders-service';
import styles from './orders-form.module.css';

function OrdersForm() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("default");

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

    setTime(target.value);
  }

  const submitForm = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const order: Order = {
      customerId: "mock-customer-id",
      date, time
    }

    placeOrder(order)
  }

  return (
    <form className={styles.container} onSubmit={submitForm}>
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
        defaultValue={time}
      >
        <option value="default" disabled hidden>
          Choose delivery time
        </option>
        {timeOptions.map((option) => {
          return <option value={option} key={option}>{option}</option>
        })}
      </select>
      <div>
        <button
          className={styles.btn}
          type="submit"
          disabled={!timeOptions.includes(time)}
        >Place order!</button>
      </div>
    </form>
  );
}

export default OrdersForm;
