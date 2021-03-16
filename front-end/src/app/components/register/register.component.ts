import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User: any = ['Super Admin', 'Author', 'Reader'];

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  fullname: string="";
  password: string="";
  cPassword: string="";
  dateBirthday= new FormControl(new Date());
  terms:boolean=false;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar tu correo';
    }

    return this.email.hasError('email') ? 'Por favor ingrese correo válido' : '';
  }

  constructor(public auth: AuthService, private router: Router, private register: RegisterService) {
    if (this.auth.userData) {
      this.router.navigate(['/layout', { outlets: { left: ['profile'] } }]);
    }
  }

  ngOnInit(): void {
  }

  //my methods
  signUp() {
    if(this.password===this.cPassword && this.cPassword.length>0){
      if(this.terms){
        if(!this.email.invalid){
          this.register.register(this.fullname,this.email.value, this.password,this.dateBirthday.value)
          .subscribe(response => {
            console.log(response);
            if (response.success === 1) {
              alert("Su cuenta fue creada")
              this.router.navigate(['/home/login']);
            }
          });
        }
      }else{
        alert("Debe aceptar los términos y condiciones")
      }
    }else{
      alert("Las contraseñas no son iguales")
    }
    //console.log(this.fullname+" "+this.email.value+" "+this.password+ " " +this.dateBirthday.value)
  }
  setDateBirthday(typ:string, e: MatDatepickerInputEvent<Date>){
    this.dateBirthday.setValue(e.value);
  }
  setTerms(e){
    this.terms=!this.terms;
  }
}
