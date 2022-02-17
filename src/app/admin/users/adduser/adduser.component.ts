import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @Input()
  user:User |any;

  @Output()
  userAddedEvent=new EventEmitter();
  newUser: User | undefined ;
  message :string | undefined;
  password :string | undefined;

  constructor(private httpClientService : HttpClientService,
    private router :Router) { }

  ngOnInit(){
    this.newUser=Object.assign({},this.user);
  }

  addUser() {
    this.httpClientService.addUser(this.user).subscribe(user=> {
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
