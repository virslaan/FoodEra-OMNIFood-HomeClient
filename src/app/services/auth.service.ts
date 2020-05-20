import { Injectable } from '@angular/core';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean

  constructor(private dataSharing: DataSharingService) { 
    this.dataSharing.sharedIsLoggedIn
    .subscribe(data => this.isAuthenticated = data)
  }

  isUserAuthenticated() {
    return this.isAuthenticated
  }
}
