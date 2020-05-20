import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataSharingService } from '../../services/data-sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  currentUser: any

  blogPosts: any

  constructor(private data: DataService, private dataSharing: DataSharingService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      post: ['', Validators.required]
    });

    this.dataSharing.sharedCurrentUser
    .subscribe(data => {
      this.currentUser = data
    })

    this.data.fetchBlogs()
    .subscribe(data => {
      this.blogPosts = data
      this.getLatestPosts()
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(form: any) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // console.log(formData)

      this.data.postBlog(this.currentUser.username, form.value.title, form.value.post).subscribe(data => {
        console.log(data)

        this.data.fetchBlogs()
        .subscribe(data => {
          this.blogPosts = data
          this.getLatestPosts()
        })
      })

      form.reset()
      this.submitted = false

      // alert('Your blog was added successfully')
  }

  getLatestPosts() {
    let temp = this.blogPosts
    this.blogPosts = []

    for(let i = temp.length-1; i >= Math.max(0, temp.length-5); i--) {
      this.blogPosts.push(temp[i])
    }
  }
}
