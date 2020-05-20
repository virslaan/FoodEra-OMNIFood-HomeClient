import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  // whether the user is logged in or not
  // private isLoggedIn = new BehaviorSubject<boolean>(true)
  private isLoggedIn = new BehaviorSubject<boolean>(false)
  sharedIsLoggedIn = this.isLoggedIn.asObservable()

  // keep track of current user
  private currentUser = new BehaviorSubject<Object>({ "username": "sachin" })
  sharedCurrentUser = this.currentUser.asObservable()

  // keep track of location
  private location = new BehaviorSubject('delhi')
  sharedLocation = this.location.asObservable()

  // keep track of selected restaurant
  private selectedRestaurant = new BehaviorSubject<Object>(
    {
      "id": 5,
      "name": "Restaurant 2",
      "type": "Chinese",
      "location": "Delhi",
      "contact": "+91-900000000",
      "accessed": 127,
        "image": "../../assets/img/2.jpg",
      "dishes": [
        {
          "id": 6,
          "name": "Restaurant 2",
          "dishName": "Chilly Paneer",
          "dishImage": "../../assets/img/7.jpg",
          "cost": 240,
          "isAdded": false,
          "suggestion": "Best with hakka noodles"
        },
        {
          "id": 7,
          "name": "Restaurant 2",
          "dishName": "Hakka Noodles",
          "dishImage": "../../assets/img/7.jpg",
          "cost": 180,
          "isAdded": false,
          "suggestion": "Best with Paneer Delicacy"
        }
      ]
    }
  )
  sharedSelectedRestaurant = this.selectedRestaurant.asObservable()

  // keep track of items in cart
  
  // private cart = new BehaviorSubject<Array<Object>>([
  //   {
  //     "id": 2,
  //     "name": "Odeon Restaurant",
  //     "dishName": "Shahi Paneer",
  //     "dishImage": "../../assets/img/4.jpg",
  //     "cost": 240,
  //     "isAdded": true,
  //     "suggestion": "Best with naan"
  //   },
  //   {
  //     "id": 3,
  //     "name": "Odeon Restaurant",
  //     "dishName": "Lachha Paratha",
  //     "dishImage": "../../assets/img/5.jpg",
  //     "cost": 80,
  //     "isAdded": true,
  //     "suggestion": "Best with Paneer Dishes"
  //   },
  //   {
  //     "id": 4,
  //     "name": "Odeon Restaurant",
  //     "dishName": "Chowmein",
  //     "dishImage": "../../assets/img/6.jpg",
  //     "cost": 180,
  //     "isAdded": true,
  //     "suggestion": ""
  //   }
  // ])
  private cart = new BehaviorSubject<Array<Object>>([])
  sharedCart = this.cart.asObservable()

  // track quantities of items in cart
  private quantities = new BehaviorSubject<Array<number>>([])
  sharedQuantities = this.quantities.asObservable()

  constructor() { }

  sendLocation(location: string) {
    this.location.next(location)
  }

  sendRestaurant(restaurant: Object) {
    this.selectedRestaurant.next(restaurant)
  }

  sendCart(cart: Object[]) {
    this.cart.next(cart)
    this.sharedCart.pipe(take(1)).subscribe(cart => console.log(cart))
  }

  sendIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn) 
  }

  sendCurrentUser(user: Object) {
    this.currentUser.next(user)
  }

  sendQuantities(quantities: Array<number>) {
    this.quantities.next(quantities)
  }
}
