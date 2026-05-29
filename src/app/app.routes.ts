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
import { FindBooking } from './features/booking-rooms/find-booking/find-booking';
import { EditProfile } from './features/profile/edit-profile/edit-profile';
import { PaymentPage } from './features/payment/payment-page/payment-page';
import { PaymentSuccess } from './features/payment/payment-success/payment-success';
import { PaymentFailure } from './features/payment/payment-failure/payment-failure';
import { AdminRegister } from './features/admin/admin-register/admin-register';
import { EditBookings } from './features/admin/edit-bookings/edit-bookings';
import { ManageBookings } from './features/admin/manage-bookings/manage-bookings';
import { EditRoom } from './features/admin/edit-room/edit-room';
import { AddRoom } from './features/admin/add-room/add-room';
import { ManageRooms } from './features/admin/manage-rooms/manage-rooms';

export const routes: Routes = [

  // ==========================
  // PUBLIC ROUTES
  // ==========================
  {
    path: '',
    children: [
      { path: 'home', component: Home },
      { path: 'rooms', component: AllRooms },
      { path: 'find-booking', component: FindBooking },

      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },

  // ==========================
  // CUSTOMER ROUTES
  // ==========================
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'room-details/:roomId',
        component: RoomDetails
      },
      {
        path: 'profile',
        component: ProfilePage
      },
      {
        path: 'edit-profile',
        component: EditProfile
      },

      // PAYMENT
      {
        path: 'payment/:bookingReference/:amount',
        component: PaymentPage
      },
      {
        path: 'payment-success/:bookingReference',
        component: PaymentSuccess
      },
      {
        path: 'payment-failed/:bookingReference',
        component: PaymentFailure
      }
    ]
  },

  // ==========================
  // ADMIN ROUTES
  // ==========================
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: AdminPage
      },
      {
        path: 'register',
        component: AdminRegister
      },

      // ROOM MANAGEMENT
      {
        path: 'manage-rooms',
        component: ManageRooms
      },
      {
        path: 'add-room',
        component: AddRoom
      },
      {
        path: 'edit-room/:roomId',
        component: EditRoom
      },

      // BOOKING MANAGEMENT
      {
        path: 'manage-bookings',
        component: ManageBookings
      },
      {
        path: 'edit-booking/:bookingCode',
        component: EditBookings
      }
    ]
  },

  // ==========================
  // REDIRECTS
  // ==========================
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
