import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataSharingService } from '../../services/data-sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  allRestaurants: any = []
  filteredRestaurants: any = []

  currentLocation: string = "All"
  currentCuisine: string = "All"

  constructor(private data: DataService, private dataSharing: DataSharingService, private router: Router) { }

  ngOnInit(): void {
    this.data.getRestaurants()
    .subscribe(data => {
      this.allRestaurants = data
      this.checkAvailability(this.allRestaurants)
      console.log("YYYYYYYYYYY"+this.allRestaurants)
    })
  }

  checkAvailability(allRestaurants: any) {
    
    let temp = []

    for(let i = 0; i < allRestaurants.length; i++) {
      if(allRestaurants[i].available === "True") {
        temp.push(allRestaurants[i])
      }
    }

    this.allRestaurants = temp
    this.filteredRestaurants = this.allRestaurants

    // REMOVE
    console.log(this.allRestaurants)
  }

  changeLocation(location: string) {
    this.currentLocation = location
    // console.log(this.currentLocation)
    this.filteredRestaurants =[]

    if(location === "All") {
      this.filteredRestaurants = this.allRestaurants
      return
    }

    for(let i=0; i < this.allRestaurants.length; i++) {
      if(this.allRestaurants[i].location === location) {
        this.filteredRestaurants.push(this.allRestaurants[i])
      } 
    }
  }

  changeCuisine(cuisine: string) {
    this.currentCuisine = cuisine
    // console.log(this.currentCuisine)
    this.changeLocation(this.currentLocation)
    let temp: any = []

    if(cuisine === "All") {
      return
    }

    for(let i=0; i < this.filteredRestaurants.length; i++) {
      if(this.filteredRestaurants[i].type === cuisine) {
        temp.push(this.filteredRestaurants[i])
      } 
    }

    this.filteredRestaurants = temp
  }

  goToRestaurant(restaurant: any) {
    this.dataSharing.sendRestaurant(restaurant)
    this.router.navigate(['/restaurant'])    
  }
}
