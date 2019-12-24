import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MustMatch } from '../helpers/must-match.validator';
import { User } from '../models/User';
import { Video } from '../models/Video';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from '../services/alert.service';
import { DataService } from 'app/data.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  loading = false;
  emailSubmitted = false;
  passwordSubmitted = false;


  editEmailForm: FormGroup;
  editPasswordForm: FormGroup;


  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passwordConfirmation = new FormControl('', [Validators.required, Validators.minLength(6)]);

  id: number;
  user: User;
  userBlockchain: any;
	uploadedVideos: Video[];
  isMe: boolean;
  private sub: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private dataService: DataService<User>

  ) {
    this.editEmailForm = fb.group({
      email: this.email,
    });

    this.editPasswordForm = fb.group({
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    }, {
        validator: MustMatch('password', 'passwordConfirmation')
      });


  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.reload();  // In a real app: dispatch action to load the details here.
    });
  }

  get fEmail() {
    return this.editEmailForm.controls;
  }

  get fPassword() {
    return this.editPasswordForm.controls;
  }

  editEmailFormSubmit() {
    this.emailSubmitted = true;

    if (this.editEmailForm.invalid) {
      return;
    }

    this.userService.editEmail(this.email.value, this.user).
      subscribe(resp => {
        if (resp.email) {// received an User so its updated
          this.alertService.success('Your email was successfully updated.');
          this.emailSubmitted = false;
          setTimeout(
            function () {
              location.reload();
            }, 1500);
        };
      });
  }

  editPasswordFormSubmit() {
    this.passwordSubmitted = true;


    if (this.editPasswordForm.invalid) {
      return;
    }

    this.userService.editPassword(this.password.value, this.user)
      .subscribe(resp => {
        if (resp.email) { // received an User so its updated
          this.alertService.success('Your password was successfully updated.');
          this.editPasswordForm.reset();
          this.passwordSubmitted = false;
        }
      });
  }

  reload() {
    this.userService.getUser(this.id).subscribe(_user => {
      this.user = _user;
    
      this.dataService.getUser(this.authenticationService.currentUserValue.id).then(_user => {
        this.userBlockchain = _user.data;
        
        this.userService.getUploadedVideos(this.id).subscribe(_videos => {
          this.uploadedVideos = _videos;
              
          this.isMe = this.authenticationService.currentUserValue.id === this.id;
        })
      })

      
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
