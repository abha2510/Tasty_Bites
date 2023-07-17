export interface Order {
    _id: string;
    order_id: number;
    customer_name: string;
    dishes: any[]; 
    status: string;
    total_price: number;
    dish_name: string; 
    image: string; 
    price: number;
    quantity: number;
  }
  