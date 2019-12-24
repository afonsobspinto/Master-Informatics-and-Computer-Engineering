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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
// import { PurchaseComponent } from './Purchase/Purchase.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './Register/Register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { VideosPageComponent } from './videos-page/videos-page.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'terms', component: TermsConditionsComponent },
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'user/:id', component: ProfilePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'video/:id', component: VideoComponent, canActivate: [AuthenticationGuard] },
  { path: 'user/:id/edit', component: EditProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'video/:id', component: VideoComponent, canActivate: [AuthenticationGuard] },
  { path: 'videos', component: VideosPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
