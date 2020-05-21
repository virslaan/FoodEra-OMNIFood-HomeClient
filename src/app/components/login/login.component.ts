import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AlertsService } from 'angular-alert-module';

import { DataSharingService } from '../../services/data-sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean
  currentUser: any
  userdb: any = []

  constructor(private dataSharing: DataSharingService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataSharing.sharedIsLoggedIn
    .subscribe(data => this.isLoggedIn = data)

    this.data.fetchUsers()
    .subscribe(data => this.userdb = data)
  }

  login(username: string, password: string) {

    if(!username) {
      alert('username is required')
      return
    }
    if(!password) {
      alert('password is required')
      return
    }

    for(let i = 0; i < this.userdb.length; i++) {
      if(this.userdb[i].name === username) {
        if(this.userdb[i].password === password) {
          this.isLoggedIn = true
          this.currentUser = this.userdb[i]

          this.dataSharing.sendIsLoggedIn(this.isLoggedIn)
          this.dataSharing.sendCurrentUser(this.currentUser)

          if(username === "admin") {
            window.location.href='http://localhost:4401'
            return
          } else {
            this.dataSharing.sendCurrentUser({ "username": username })
            this.router.navigate(['/home'])
            return
          }
        }
        alert('wrong password')
        return
      }
    }
    alert('user not registered')
  }

  register(username: string, password: string) {
    
    this.data.registerUser(username, password)
    .subscribe(data => {
      console.log(data)
    })
  }
}
