import { Component, OnInit } from '@angular/core';
import {ListingService} from './listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { last } from '../../../node_modules/@angular/router/src/utils/collection';
import { parse } from 'querystring';
import { AppService } from '../app.service'


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  listData=[];
  showTable:boolean = false;
  display = 'none';
  today;
  rowEdited;
  newUser:boolean = false;
  userDataExist = null;
  user = {
    first_name:'',
    last_name:'',
    phone:'',
    email:'',
    dob:'',
    active:''
  }
  constructor(private service:ListingService,private router:Router,private appService:AppService) {
    this.today = new Date().toJSON().split('T')[0];
    this.service.getData().subscribe((data: any) => {
      console.log("response",data.users.length);
        if(data){
        this.userDataExist = true;
        this.showTable = true;
        this.listData = data['users'];
        this.listData.forEach(element => {
          if(element.dob){
            var date = new Date(element.dob);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            if (dt < 10) {
            dt = '0' + dt;
              }
            if (month < 10) {
              month = '0' + month;
            }
            console.log(year+'-' + month + '-'+dt);
            console.log("date",date);
            element.dob = year+'-' + month + '-'+dt;
          }        

        });
        localStorage.setItem("data", JSON.stringify(this.listData));
      }
      
     },
       error => {
         console.log(" error", error);
         this.userDataExist = false;
       })
   }

  ngOnInit() {
   
  }

  goToUserDetials(row){
    this.appService.currentRow = row;
    this.router.navigate(['/userDetails']);
  }

  editData(row){
    this.newUser = false;
    console.log("rowData",this.listData[row]);
    this.rowEdited = row;
    this.user.first_name = this.listData[row]['first_name'];
    this.user.last_name = this.listData[row]['last_name'];
    this.user.phone = this.listData[row]['phone'];
    this.user.email = this.listData[row]['email'];
    this.user.active = this.listData[row]['active'];
    this.user.dob = this.listData[row]['dob']
    this.display='block'; 
  }

  updateData(){
    let allData = JSON.parse(localStorage.getItem('data'));
    console.log("get data",allData);
    console.log("second",allData[1]);
    let index = this.rowEdited
    if (~index) {
       allData[index] = this.user;
  }
  console.log("final",allData);
  this.listData = allData;
  localStorage.setItem("data", JSON.stringify(this.listData));
  this.display='none'; 
  }

  deleteData(row){
    let allData = JSON.parse(localStorage.getItem('data'));
    console.log("delete",row);
    if (row > -1) {
      allData.splice(row, 1);
    }
    this.listData = allData;
    localStorage.setItem("data", JSON.stringify(this.listData));
    if(this.listData.length<=0)
    this.showTable=false;
    this.userDataExist = false;
    
  }

  addData(){
    let allData = JSON.parse(localStorage.getItem('data'));
    allData.push(this.user);
    this.listData = allData;
    localStorage.setItem("data", JSON.stringify(this.listData));
    this.display='none';
    if(this.listData.length>0)
    this.showTable=true;
  }

  openModal(){
    this.newUser = true;
    this.user = {
      first_name:'',
      last_name:'',
      phone:'',
      email:'',
      dob:'',
      active:''
    }
    this.display='block'; 
 }
 onCloseHandled(){
  this.display='none'; 
}

  

}
