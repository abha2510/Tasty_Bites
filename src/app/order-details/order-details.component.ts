import { Component, Inject, OnInit } from '@angular/core';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatusDialogComponent } from '../order-status-dialog/order-status-dialog.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-order',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  public orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    @Inject(Socket) private socket: any
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.listenForOrderStatusUpdates();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openStatusDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      width: '250px',
      data: { order: order },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the updated status here
        console.log(result);
        // You can update the order status in the UI or take any other action
      }
    });
  }

  listenForOrderStatusUpdates(): void {
    this.socket.on('order_status_update', (updatedOrder:Order) => {
      const orderIndex = this.orders.findIndex(
        (order) => order.order_id === updatedOrder.order_id
      );
      if (orderIndex !== -1) {
        this.orders[orderIndex] = updatedOrder;
      }
    });
  }
}
