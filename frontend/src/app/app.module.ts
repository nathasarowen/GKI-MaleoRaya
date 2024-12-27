import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Pastikan ini tetap ada

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { routes } from './app.routes'; // Pastikan ini sudah benar

@NgModule({
  declarations: [
    AppComponent,        // Komponen utama aplikasi
    LoginComponent,      // Komponen login
    DashboardComponent   // Komponen dashboard
  ],
  imports: [
    BrowserModule,    // Sudah menyertakan CommonModule secara implisit
    CommonModule,     // Tambahkan untuk memastikan
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard], // Tambahkan AuthGuard sebagai provider
  bootstrap: [AppComponent] // Komponen utama yang akan di-boostrap
})
export class AppModule { }
