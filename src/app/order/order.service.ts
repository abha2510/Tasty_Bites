import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../order-details/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private backendUrl = 'https://tasty-bites-piji.onrender.com/';

  constructor(private http: HttpClient) {}

  addToCart(item: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/orders`, item);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.backendUrl}/orders`);
  }
  getOrdersByUserId(): Observable<any> {
    // const url = `${this.backendUrl}/user/${userId}/orders`;
    return this.http.get(`${this.backendUrl}/orders`);
  }
  deleteOrder(orderId: number): Observable<any> {
    const url = `${this.backendUrl}/${orderId}`;
    return this.http.delete(url);
  }
  
}
