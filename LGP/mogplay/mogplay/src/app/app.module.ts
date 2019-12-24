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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
// import { PurchaseComponent } from './Purchase/Purchase.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./Register/Register.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CategoryBannerComponent } from "./home/components/category-banner/category-banner.component";
import { VideoThumbnailComponent } from "./components/video-thumbnail/video-thumbnail.component";
import { VideoListComponent } from "./components/video-list/video-list.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { BackgroundComponent } from "./layout/background/background.component";
import { ListTitleComponent } from "./components/list-title/list-title.component";
import { LineSeparatorComponent } from "./components/line-separator/line-separator.component";
import { CartPageComponent } from "./cart-page/cart-page.component"
import { CartItemComponent } from "./cart-page/components/cart-item/cart-item.component"
import { ButtonGradientComponent } from "./components/button-gradient/button-gradient.component"
import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgBufferingModule } from "videogular2/buffering";
import { AlertComponent } from './components/alert/alert.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { VideosPageComponent } from './videos-page/videos-page.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
	declarations: [
		AppComponent,
		AlertComponent,
		HomeComponent,
		VideoComponent,
		// PurchaseComponent,
		LoginComponent,
		NavbarComponent,
		CategoryBannerComponent,
		VideoThumbnailComponent,
		VideoListComponent,
		RegisterComponent,
		ProfilePageComponent,
		BackgroundComponent,
		ListTitleComponent,
		LineSeparatorComponent,
		CartPageComponent,
		CartItemComponent,
		ButtonGradientComponent,
		EditProfileComponent,
		ProfileHeaderComponent,
		ButtonGradientComponent,
		VideosPageComponent,
		TermsConditionsComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		AppRoutingModule,
		VgCoreModule,
		VgControlsModule,
		VgBufferingModule
	],
	providers: [
		DataService,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
