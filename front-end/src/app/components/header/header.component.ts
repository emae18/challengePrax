import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  texto = "";
  constructor(public auth: AuthService, private router: Router,
    private shared: SharedService, private cdr: ChangeDetectorRef) {
    this.user = auth.userData;
    this.texto = this.user ? "Salir" : "Ingresar";
  }

  ngOnInit(): void {
    this.shared.eTextHeader.subscribe(res => {
      if (!!res) {
        this.texto = res;
        this.cdr.detectChanges();
      }
    })
  }
  logout() {
    this.auth.logout();
    this.shared.setTextHeader('Ingresar');
    this.router.navigate(['home/login']);
  }

}
