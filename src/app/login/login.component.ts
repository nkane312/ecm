import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  private loginEmail: string;
  private loginPassword: string;
  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
  }

  onSubmit(data){
    console.dir(data);
    /*
    this.userService.login(data.email, data.password).subscribe((result)=> {
      if (result){
        this.router.navigate(['']);
      }
    });
    */
  }
}
