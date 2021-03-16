import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserLogged } from '../../models/userLogged';
import { AuthService } from '../../services/auth.service';
import { DocumentService } from '../../services/document.service';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username="";
  email="";
  fullname="";
  dateBirthday="";
  createdOn="";
  id=0;
  constructor(private shared: SharedService,private auth: AuthService
    ,private cdr: ChangeDetectorRef, private user: UserService
    , private docs:DocumentService) {
    this.user.getUser(this.auth.userData.email).subscribe(res=>{
      console.log("hoal"+res)
      /* let userRes:UserLogged;
      userRes.fullname=res.data.fullname;
      userRes.email=res.data.email;
      userRes.createdOn=res.data.createdOn;
      userRes.dateBirthday=res.data.dateBirthday;
      userRes .username=res.data.username; */
      shared.setUserLogged(res.data);
      /*this.username=res.data.username;
      this.email=res.data.email;
      this.fullname=res.data.fullname;
      this.dateBirthday=res.data.dateBirthday;
      this.createdOn=res.data.createdOn;
      this.id=res.data.id; */
    });
    
   }

  ngOnInit(): void {
    this.shared.eUserLogged.subscribe(res => {
      if (!!res) {
        this.username = res.username;
        this.email=res.email;
        this.fullname=res.fullname;
        this.dateBirthday=res.dateBirthday;
        this.createdOn=res.createdOn;
        this.cdr.detectChanges();
      }
    })
  }

  public cargarDocs():void {

      this.docs.getDocuments(this.auth.userData.email).subscribe(res=>{
        console.log("lo loagraste?"+res.data)
        this.shared.setDocuments(res.data);
      })
      
   
  }

}
