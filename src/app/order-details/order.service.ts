import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private backendUrl = 'https://tasty-bites-piji.onrender.com/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.backendUrl);
  }
  updateOrderStatus(order_id: number, status: string): Observable<any> {
    const updateUrl = `${this.backendUrl}/${order_id}`;
    const updatedOrder = { status: status };
    return this.http.put(updateUrl, updatedOrder);
  }
  getOrdersByUserId(order_id: string): Observable<Order[]> {
    const url = `${this.backendUrl}/orders/${order_id}`;
    return this.http.get<Order[]>(url);
  }
  
  deleteOrder(order_id: string): Observable<any> {
    const url = `${this.backendUrl}/orders/${order_id}`;
    return this.http.delete(url);
  }
  
}
