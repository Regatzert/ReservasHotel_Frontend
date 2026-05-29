import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home';
import { AllRooms } from './features/booking-rooms/all-rooms/all-rooms';
import { RoomDetails } from './features/booking-rooms/room-details/room-details';
import { authGuard } from './core/guards/auth.guard';
import { ProfilePage } from './features/profile/profile-page/profile-page';
import { adminGuard } from './core/guards/admin.guard';
import { AdminPage } from './features/admin/admin-page/admin-page';

export const routes: Routes = [

  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'home', component: Home},
  {path: 'rooms', component: AllRooms},
  {path: 'room-details/:roomId', canActivate: [authGuard], component: RoomDetails},
  {path: 'profile', canActivate: [authGuard], component: ProfilePage},
  {path: 'admin', canActivate: [adminGuard], component: AdminPage},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},

];
