import { Injectable } from '@angular/core';
import {Subject } from "rxjs"
import { UserLogged } from '../models/userLogged';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //app-header
  private textHeader=new Subject<string>();
  public eTextHeader = this.textHeader.asObservable();
  public setTextHeader(text){
    this.textHeader.next(text);
  }

  //User
  private userLogged = new Subject<UserLogged>();
  public eUserLogged = this.userLogged.asObservable();
  public setUserLogged(user){
    console.log(user);
    this.userLogged.next(user);
  }

  //Documents
  private Documents = new Subject<Document[]>();
  public eDocuments = this.Documents.asObservable();
  public setDocuments(docs){
    console.log(docs);
    this.Documents.next(docs);
  }

}
