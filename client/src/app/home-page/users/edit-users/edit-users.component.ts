import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/data/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit, OnDestroy {
  user: User = {} as User;
  errorFlag: boolean = false;
  errorMessage: string = '';
  userEditForm: FormGroup = {} as FormGroup;
  submitted: boolean = false;
  image: any;
  imageArray: Uint8Array = new Uint8Array();
  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit(): void {

    this.userEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.route.params.pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const id = params['id'];
        this.usersService.getUserById(id)
        .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (user: User) => {
              this.user = user;
              var originalBase64ImageStr = Buffer.from(this.user.picture).toString('utf8');
              this.image = 'data:image/png;base64,' + originalBase64ImageStr;
              this.setFormValues();
            },
            error: (error: any) => {
              console.log(error);
            }
      });
    });
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setFormValues(): void {
    this.userEditForm.setValue({
      name: this.user.name,
      phoneNumber: this.user.phoneNumber,
      role: this.user.role
    });
  }  

  onSubmit(): void {

    this.submitted = true;
    this.user = this.userEditForm.value;
    let binary = '';
    let bytes = this.imageArray;
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let base64String = window.btoa(binary);
    this.user.picture = base64String;
  
    if(this.userEditForm.invalid) {
      return;
    }

    this.usersService.updateUser(this.user)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.router.navigate(['../../listusers'], {relativeTo: this.route});
        },
        error: (error: any) => {
          console.log(error)
        }
    });
  }

  cancelEditUser(): void {
    this.router.navigate(['../../listusers'], {relativeTo: this.route});
  }

  changeRole(e: any) {
    this.userEditForm.get('role')?.setValue(e.target.value, {
    onlySelf: true
    });
  }
  
  onFileChange(event: any) {
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
  
      const dataUrlReader = new FileReader();
      dataUrlReader.readAsDataURL(file);
      dataUrlReader.onload = () => {
        this.userEditForm.patchValue({
          picture: dataUrlReader.result
        });
        this.image = dataUrlReader.result;
      };
  
      const arrayBufferReader = new FileReader();
      arrayBufferReader.readAsArrayBuffer(file);
      arrayBufferReader.onloadend = () => {
        this.imageArray = new Uint8Array(arrayBufferReader.result as ArrayBuffer);
      };
    }
  }

}

