import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetail;
  constructor(private router:Router,private appService:AppService) { 
    let data = JSON.parse(localStorage.getItem('data'));
    this.userDetail = data[this.appService.currentRow];
  }  

  ngOnInit() {
  }

  backToHome(){
    this.router.navigate(['/home']);
  }

}
