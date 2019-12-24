/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from './Register.service';
import { Router } from '@angular/router';

import { MustMatch } from '../helpers/must-match.validator';


// import {AlertService} from '@/services';

@Component({
  selector: 'app-user',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

    loading = false;
    submitted = false;

  private participant;
  private identity;
  private errorMessage;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passwordConfirmation = new FormControl('', [Validators.required, Validators.minLength(6)]);
  username = new FormControl('', Validators.required);


  constructor(private router: Router, public serviceUser: RegisterService, fb: FormBuilder) {
    this.registerForm = fb.group({
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      username: this.username
    }, {
      validator: MustMatch('password', 'passwordConfirmation')
    });
  };

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
  }

  addParticipant(): Promise<any> {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user = {
      'username': this.username.value,
      'email': this.email.value,
      'password': this.password.value,
      'passwordConfirmation': this.passwordConfirmation.value,
    };

    return this.serviceUser.addParticipant(user)
      .then((res) => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }
}
