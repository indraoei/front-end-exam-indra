import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'; 

@Injectable()
export class APIServiceService {

  id : number;
  name : string = "";
  email : string = "";
  address : string = "";
  company : string = "";
  UserList : object[] = [];
  Completed : boolean = false;

  constructor(private http : Http) { 
    this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe(
      result => {
        for(var x=0; x<result.json().length; x++){
        var user = result.json()[x];
        var obj = {
        "id" : user.id,
        "name" : user.name,
        "email" : user.email,
        "address" : user.address.city,
        "company" : user.company.name
        };
        this.UserList.push(obj)
      };
      },
      error => { 
        console.log(error);
      }
    );
  }




  AddUser (nama,email,address,company) : void {
      var id = this.UserList[this.UserList.length-1]["id"]+1;
      var list = {"id" : id, "name" : this.name, "email" : this.email, "address" : this.address, "company" : this.company };
      this.UserList.push(list);
  }
  
  GetData() : object[]{
    for (var i = 0; i < this.UserList.length; i++) {
      
      var list = this.UserList[i];
      if ( ! list["deleted"]) {
        this.UserList.push(list);
      }
    } 
    return this.UserList;
  }

  DeleteUser(id) : void {
    
        for (var i = 0; i < this.UserList.length; i++) {
          if (this.UserList[i]["id"] == id) {
            this.UserList[i]["deleted"] = true;
            break;
          }
        }
        console.log(this.UserList);
        this.UserList.splice(i,1)
      }

  CompleteUser(e, id){
    
        for (var i = 0; i < this.UserList.length; i++) {
          if (this.UserList[i]["id"] == id) {
            
            if (e.target.checked) {
              this.UserList[i]["completed"] = true;
              this.Completed = true;
            }
            else{
              this.UserList[i]["completed"] = false;
              this.Completed = false;
            }
            
            break;
          }
        }
    
        console.log(this.UserList);
      }

    }

