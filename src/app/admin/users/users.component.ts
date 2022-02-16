import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User> |any;
  selectedUser: User |any;
  action: string |any;

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
   this.refreshData();
  }

  refreshData() {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action']
      }
    );
  }
  handleSuccessfulResponse(response: User[] | undefined) {
    this.users = response;
    console.log(this.users);
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }
  ngOninit() {
    this.users = new Array<User>();

    const user1 = new User();
    user1.id = 1;
    user1.name = 'user1';
    user1.type = 'admin';
    user1.password = 'pass';

    this.users.push(user1);
  
  }
}


