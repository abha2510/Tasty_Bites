import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { OrderService } from '../order/order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu: any[] = [];
  selectedDishes: number[] = [];
  customerName: string = '';

  constructor(
    private menuService: MenuService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMenu();
    this.setCustomerName();
  }

  getMenu(): void {
    this.menuService.getMenu().subscribe(
      (response) => {
        this.menu = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setCustomerName(): void {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser && loggedInUser.username) {
      this.customerName = loggedInUser.username;
    }
  }

  addToCart(dishId: number): void {
    const item = {
      dish_ids: [dishId],
      customer_name: this.customerName
    };

    this.orderService.addToCart(item).subscribe(
      (response) => {
        console.log(response);
        alert(response.message);
        // Reset customer name
        this.customerName = '';
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
