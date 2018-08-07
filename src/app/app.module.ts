import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import {routes} from './app.route';

import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
	{
		path: '',
		component: ListingComponent
	},
	{
		path: 'home',
		component: ListingComponent
	},
	{
		path: 'userDetails',
		component: UserDetailsComponent
	},
	{
		path: '**',
		component: ListingComponent
	}
];

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
