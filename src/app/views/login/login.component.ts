import { Component, Pipe } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentificationType, LoginResponse} from 'src/app/models/app';
import { LoginService } from 'src/app/services/login-cliente.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginResponse: LoginResponse[] = [];
  typeDocument: IdentificationType[] = [
    {Code: "C", name: "CEDULA DE CIUDADANIA"},
    {Code: "P", name: "PASAPORTE"}
  ]; 
    

  constructor(private toastr: ToastrService, public loginService: LoginService, public router : Router){

  }

  LoginForm = new FormGroup({
    typeDocument: new FormControl('', Validators.required),
    document: new FormControl('', [Validators.required, Validators.min(8),Validators.min(11)]),
  });

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  submitForm() {
    const formData = this.LoginForm.value;
    this.loginService.login(formData).subscribe(
      data => {
        if(data != null){
          if(data.persona != null){ 
            this.toastr.success('Persona creada exitosamente', 'Toastr fun!');  
          }else {
            
          }  
        }
      },
      error => {
        console.error('Error al obtener los tipos de identificación:', error);
      }
    ); 
  }


}
