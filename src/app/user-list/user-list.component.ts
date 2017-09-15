import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private data: APIServiceService) { }

  ngOnInit() {
    this.data.GetUser()
  }
  Delete(id){
    for (var i = 0; i<this.data.UserList.length; i++){
      if(id == this.data.UserList[i]['id']){
        this.data.UserList.splice(i,1);
      }
    }
  }
  AddUser () : void {
    if (this.data.name != "") {

      var obj : object = { "Name" : this.data.name, "deleted" : false, "completed" : false};

      if (this.data.UserList.length != 0) {
        var lastId = this.data.UserList[this.data.UserList.length - 1]["id"];
        obj = { "id" : lastId + 1,  "Name" : this.data.name, "deleted" : false, "completed" : false };
      }
      else {
        obj = { "id" : 1,  "Name" : this.data.name, "deleted" : false, "completed" : false };
      }

    }
  }

}
