import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/Answer';
import { Document } from '../models/document';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url: string = environment.url_api + 'api/document/';

  constructor(private _http: HttpClient, private shared: SharedService) { }


  public getDocuments(email: string): Observable<Answer> {
    return this._http.get<Answer>(this.url + email);
  }
  uploadDocuments(nameFile:string,path:string,userId:number) {
    return this._http.post<Answer>(this.url,
      { nameFile,path,userId }).pipe(
        map(response => {
          if (response.success === 1) {
            console.log(response.data);
          }else{
            window.location.reload();
          }
          return response;
        })
      )

  }
}
