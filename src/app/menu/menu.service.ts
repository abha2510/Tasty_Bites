import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private backendUrl = 'https://tasty-bites-piji.onrender.com/menu';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl);
  }

  addDish(dish: any): Observable<any> {
    return this.http.post(this.backendUrl, dish);
  }

  updateDish(dishId: string, dish: any): Observable<any> {
    const url = `${this.backendUrl}/${dishId}`;
    return this.http.put(url, dish);
  }

  deleteDish(dishId: string): Observable<any> {
    const url = `${this.backendUrl}/${dishId}`;
    return this.http.delete(url);
  }

  getDish(dishId: string): Observable<any> {
    const url = `${this.backendUrl}/${dishId}`;
    return this.http.get(url);
  }
}
