import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password: string = '';
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar tu correo';
    }

    return this.email.hasError('email') ? 'No es un correo válido' : '';
  }
  constructor(public auth: AuthService, private router: Router
    , private shared: SharedService) {
    if (this.auth.userData) {
      this.router.navigate(['/layout', { outlets: { left: ['profile'] } }]);
    }
  }

  ngOnInit(): void {
  }

  login() {
    let band=false;
    console.log(this.email.value, this.password);
    this.auth.login(this.email.value, this.password).subscribe(response => {
      console.log(response);
      if (response.success === 1) {
        band=true;
        this.shared.setTextHeader('Salir');
        this.router.navigate(['/layout', { outlets: { left: ['profile'] } }]);

      }
    });
    if(!band)alert("Correo / constraseña Incorrecto")
  }
}
