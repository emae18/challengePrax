import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from '../../services/upload.service';
import { SharedService } from 'src/app/services/shared.service';
import { DocumentService } from 'src/app/services/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogged } from 'src/app/models/userLogged';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  text_search = 'Limpiar';
  documents:Document[];
  userL:UserLogged;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  constructor(private uploadService: UploadService, private shared: SharedService
    , private cdr: ChangeDetectorRef,private documentService: DocumentService,
    private router: Router, private auth:AuthService) { 
  }
  ngOnInit(): void {
    
    this.shared.eUserLogged.subscribe(res => {
      if(!!res) {
        this.userL = res;
        this.cdr.detectChanges();
      }
    })
    this.shared.eDocuments.subscribe(res => {
      if (!!res) {
        this.documents = res;
        this.cdr.detectChanges();
      }
    })
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
       
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          // = JSON.stringify(event.body);
          console.log(event.body);
          this.documentService.uploadDocuments(event.body.name, event.body.link,this.userL.id)
          .subscribe(response => {
            console.log(response);
            if (response.success === 1) {
              alert("Su documento fue subido con éxito")
              this.router.navigate(['/layout',{outlets:{left:['profile']}}]);
              this.files=[];
              this.documentService.getDocuments(this.auth.userData.email).subscribe(res=>{
                console.log("lo loagraste?"+res.data)
                this.shared.setDocuments(res.data);
              })
            }else{
              window.location.reload();

            }
          });
        }
      });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  download(path: string){
    window.open(path);
  }
}
