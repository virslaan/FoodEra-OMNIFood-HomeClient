import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataSharingService } from '../../services/data-sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  quantities: Array<number>
  cart: any = []
  total: number = 0

  registerForm: FormGroup;
  submitted = false;

  constructor(private data: DataService, private dataSharing: DataSharingService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataSharing.sharedQuantities
    .subscribe(data => {
      this.quantities = data
      this.total = this.quantities[this.quantities.length-1]
    })

    this.dataSharing.sharedCart
    .subscribe(data => {
      this.cart = data
    })

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      rating: ['', [Validators.min(1), Validators.max(10)]]
    });
  }

  removeFromCart(dish: any, i: number) {
    
    this.total -= (dish.cost * this.quantities[i])
    this.cart.splice(i, 1)
    this.quantities.splice(i, 1)
    dish.isAdded = false
    this.dataSharing.sendCart(this.cart)
    // this.dataSharing.sendQuantities(this.quantities)
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(form: any) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      } 

      if (this.cart.length == 0) {
        alert('Your cart is empty')
        return
      }

      // console.log(formData)

      this.data.postOrder(form.value.name, this.cart[0].name, form.value.location, this.total, form.value.rating)
      .subscribe(data => console.log(data))

      alert('Your order was placed successfully')

      setTimeout(()=> {
        this.router.navigate(['/home'])
      }, 1000)
  }

}
