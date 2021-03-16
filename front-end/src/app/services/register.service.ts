import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Answer } from '../models/Answer';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: string = environment.url_api + 'api/register';

  constructor(private _htpp: HttpClient,private shared:SharedService) { }

  register(fullname: string, email: string,
    password: string, dateBirthday: Date) {
      return this._htpp.post<Answer>(this.url, 
        {fullname,email,password,dateBirthday}).pipe(
          map(response =>{
            if(response.success===1){
              
              console.log(response.data);
              this.shared.setUserLogged(response.data)
            }
            return response;
          })
        )
  }
}
