import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../order-details/order.model';
import { OrderService } from '../order-details/order.service';

@Component({
  selector: 'app-order-status-dialog',
  templateUrl: './order-status-dialog.component.html',
})
export class OrderStatusDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order },
    private orderService: OrderService
  ) {}

  updateStatus(): void {
    this.orderService.updateOrderStatus(this.data.order.order_id, this.data.order.status).subscribe(
      () => {
        this.dialogRef.close(this.data.order);
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );
  }
}
