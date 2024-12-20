import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Sesuaikan dengan lokasi komponen Anda
import { AuthGuard } from './guards/auth.guard'; // Sesuaikan dengan lokasi AuthGuard Anda
import { routes } from './app.routes'; // Pastikan file app.routes.ts sudah ada

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes) // Menambahkan routing ke aplikasi
  ],
  providers: [AuthGuard], // Menambahkan provider untuk AuthGuard
  bootstrap: [AppComponent]
})
export class AppModule { }
