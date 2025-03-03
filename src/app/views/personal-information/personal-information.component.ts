import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/models/app';
import { LoginService } from 'src/app/services/login-cliente.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent {

  loginResponse: LoginResponse[] = [];

  constructor(private toastr: ToastrService, public loginService: LoginService, public router : Router){

  }
  ngOnInit() {
    this.dataPerson();
  }

  LoginForm = new FormGroup({
    firstName: new FormControl({value: '', disabled: true}, Validators.required ),
    secondName: new FormControl({value: '', disabled: true}, Validators.required),
    surname: new FormControl({value: '', disabled: true}, Validators.required),
    secondSurname: new FormControl({value: '', disabled: true}, Validators.required),
    phone: new FormControl({value: '', disabled: true}, Validators.required),
    address: new FormControl({value: '', disabled: true}, Validators.required),
    residence: new FormControl({value: '', disabled: true}, Validators.required),
  });

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  dataPerson() {
    const array = localStorage.getItem('dataLogin');

    const formData = this.LoginForm.value;
    console.log(array)
    this.loginService.login(JSON.parse(array!)).subscribe(
      data => {
        if(data != null){
          if(data.persona != null){      
            this.LoginForm.patchValue({
              firstName: data.persona.firstName,
              secondName: data.persona.secondName,
              surname: data.persona.surname,
              secondSurname: data.persona.secondSurname,
              phone:data.persona.phone.toString() ,
              address : data.persona.address,
              residence: data.persona.residence,
            })
          }else {
            this.showSuccess();
          }  
        }
      },
      error => {
        console.error('Error al obtener los tipos de identificación:', error);
      }
    );
    
    
  }
}
