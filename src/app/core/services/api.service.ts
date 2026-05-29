import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly BASE_URL = 'http://localhost:9090/api';

}