import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private ENCRYPTION_KEY = 'dennis-secrete-key';

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(
      value,
      this.ENCRYPTION_KEY
    ).toString();
  }

  decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(
      value,
      this.ENCRYPTION_KEY
    );

    return bytes.toString(CryptoJS.enc.Utf8);
  }

  saveToken(token: string): void {
    localStorage.setItem(
      'token',
      this.encrypt(token)
    );
  }

  getToken(): string | null {

    const token = localStorage.getItem('token');

    if (!token) return null;

    return this.decrypt(token);
  }

  saveRole(role: string): void {
    localStorage.setItem(
      'role',
      this.encrypt(role)
    );
  }

  getRole(): string | null {

    const role = localStorage.getItem('role');

    if (!role) return null;

    return this.decrypt(role);
  }

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

}
