import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'omnifood'
  isLoggedIn: boolean
  navbar: boolean = false
  location: string
  
  constructor(private router: Router, private dataSharing: DataSharingService) {
  }

  ngOnInit() {
    this.dataSharing.sharedLocation
    .subscribe(location => {
      this.location = location
      // console.log(location)
    })

    this.dataSharing.sharedIsLoggedIn
    .subscribe(data => this.isLoggedIn = data)

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    })
  }

  toggleNavBar() {
    if(this.navbar) {
      this.navbar = false
    } else {
      this.navbar = true
    }
  }
}
