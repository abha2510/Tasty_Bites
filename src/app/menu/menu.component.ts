import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  formData: any = {}; 
  newDishForm: any = {}; // Define newDishForm as an object


  constructor(private menuService: MenuService) {
    this.newDishForm = {
      dish_name: '',
      price: null
    };
  }
  

  ngOnInit(): void {
    this.getMenu();
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


  addDish(): void {
    this.formData.dish_id = this.menu.length + 1;
  
    // Search for dish image based on the dish name
    const dishName = this.formData.dish_name;
    this.searchImageByDishName(dishName).then((imageUrl) => {
      this.formData.image = imageUrl;
  
      this.menuService.addDish(this.formData).subscribe(
        (response) => {
          console.log(response);
          alert(response.message); // Display the response message
          this.getMenu();
          this.formData = {
            availability: 'yes',
            dish_id: null,
            dish_name: '',
            price: null,
            image: ''
          }; // Reset the form data
        },
        (error) => {
          console.error(error);
        }
      );
      
    });
  }
  
  // searchImageByDishName(dishName: string): Promise<string> {
  //   const accessKey = 'uDcBVQri-rXtXgX30ZAH5uPy7R34eaEpE81uGEj3KWE'; 
  //   const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dishName)}&client_id=${accessKey}`;
  
  //   return axios.get(url)
  //     .then((response) => {
  //       const results = response.data.results;
  //       if (results.length > 0) {
  //         const imageUrl = results[0].urls.regular;
  //         return imageUrl;
  //       } else {
  //         throw new Error('No image found for the dish name');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       throw new Error('Error searching for dish image');
  //     });
  // }

  searchImageByDishName(dishName: string): Promise<string> {
    const accessKey = 'uDcBVQri-rXtXgX30ZAH5uPy7R34eaEpE81uGEj3KWE';
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dishName)}&client_id=${accessKey}`;
  
    return axios.get(url)
      .then((response) => {
        const results = response.data.results;
        if (results.length > 0) {
          const imageUrl = results[0].urls.regular;
          return imageUrl;
        } else {
          // No image found for the dish name
          console.warn('No image found for the dish name');
          // Return a default image URL or an empty string
          return 'https://example.com/default-image.jpg';
        }
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Error searching for dish image');
      });
  }
  
  
  updateDish(dishId: string): void {
    this.menuService.updateDish(dishId, this.formData).subscribe(
      (response) => {
        console.log(response);
        this.getMenu();
        this.formData = {};
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteDish(dishId: string): void {
    this.menuService.deleteDish(dishId).subscribe(
      (response) => {
        console.log(response);
        this.getMenu();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDish(dishId: string): void {
    this.menuService.getDish(dishId).subscribe(
      (response) => {
        console.log(response);
        // Handle the retrieved dish data
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
}
