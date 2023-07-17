import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { AuthService } from '../auth.service';
import { Order } from '../order-details/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const loggedInUserId = this.authService.getLoggedInUser()?.id;
    this.getOrders(loggedInUserId);
  }

  getOrders(order_id: string): void {
    this.orderService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        // Remove the deleted order from the displayed orders
        this.orders = this.orders.filter(order => order.order_id !== orderId);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
