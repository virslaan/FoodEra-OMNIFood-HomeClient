import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataSharingService } from '../../services/data-sharing.service';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Donate } from './donate';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;

  shelters = [
    {
      "name": "The Albright Shelter",
      "location": "Delhi",
      "contact": "9833712993",
      "image": "../../../assets/img/shelter-1.jpg"
    },
    {
      "name": "State Homeless Shelter",
      "location": "Delhi",
      "contact": "9833432993",
      "image": "../../../assets/img/shelter-2.jpg"
    }
  ]
  restaurantarr: any[];

  constructor(private data: DataService, private http:HttpClient,private dataSharing: DataSharingService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      helper: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      description: [''],
      contact: ['', [Validators.required, Validators.min(6000000000), Validators.max(10000000000)]],
      image: ['']
    });
  }

  lol()
  {
    this.http.get("http://localhost:8000/api/order").subscribe((result: Donate[]) => {
      result.forEach(x => {
        this.shelters.push(x);
        });
    });
    
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(form: any) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      } 
      
      this.data.postDonation(form.value.helper, form.value.location, form.value.description, form.value.contact.toString(), form.value.email, form.value.image)
      .subscribe(data => console.log(data))

      form.reset()
      this.submitted = false

      alert('Your request was received successfully, we will schedule a pickup soon.')

  }

}
