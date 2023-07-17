import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { MenuService } from './menu/menu.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderStatusDialogComponent } from './order-status-dialog/order-status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SocketIoModule } from 'ngx-socket-io';
import { Socket } from 'socket.io-client';
import { SocketIoConfig } from 'ngx-socket-io';

const socketConfig: SocketIoConfig = { url: 'https://tasty-bites-piji.onrender.com/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    OrderComponent,
    MenuComponent,
    OrderDetailsComponent,
    OrderStatusDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [AuthGuard,MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
