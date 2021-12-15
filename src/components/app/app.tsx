import React from 'react';
import styles from './app.module.css';
import OrdersForm from '../orders-form/orders-form';
import Card from '../card/card';

function App() {
  return (
    <div className={styles.container}>
      <h1>Place your order</h1>
      <Card>
        <OrdersForm />
      </Card>
    </div>
  );
}

export default App;
