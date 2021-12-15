export interface Order {
  date: string,
  time: string,
  orderId?: string, // We won't have an id until we have submitted the order
  customerId: string
}