import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { AlertComponent } from '../components/alert/alert.component'

import { first } from 'rxjs/operators';
import { DataService } from '../data.service';
import { User } from '../com.mog.technologies';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  //loading = false;
  submitted = false;
  returnUrl: string;

  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private dataService: DataService<User>,
  ) {

  };

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authenticationService.loginDb(this.f.email.value, this.f.password.value).toPromise()
      .then((user) => {
        return this.dataService.auth(user.token)
          .then(() => {
            const participant = {
              $class: 'com.mog.technologies.User',
              'userID': user.id,
              'name': user.username,
              'tokens': 0
            };

            const identity = {
              participant: `com.mog.technologies.User#${user.id}`,
              userID: `${user.id}`,
              options: {}
            };
            return this.dataService.loginLedger(user.card)
              .then(() => {
                this.router.navigate([this.returnUrl]);
              })
          })
      }, (error) => {
        // Display error
        this.alertService.error(error);
        // this.loading = false;
      });
  }
}
