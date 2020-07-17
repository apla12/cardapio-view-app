import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SpinnerService } from 'src/app/template/spinner.service';
import { PasswordValidation, RepeatPasswordValidator, RepeatPasswordEStateMatcher } from 'src/app/commons/validator-util';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  formGroup = this.fb.group({
    nome: new FormControl(null, [Validators.required]),
    nomeEmpresa: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl('', PasswordValidation),
    passwordAgain: new FormControl('')
  },
    { validator: RepeatPasswordValidator });

  hide = true;
  passwordsMatcher = new RepeatPasswordEStateMatcher;
  mensagem;
  errors: String[];
  matcher = new MyErrorStateMatcher();

  constructor(
    private spinner: SpinnerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
  }

  preparaCadastrar(event) {
    event.preventDefault();
    //this.cadastrando = true;
  }

  cadastrar() {
    this.spinner.showSpinner();

    const usuario: Usuario = new Usuario();
    usuario.nome = this.formGroup.get('nome').value;
    usuario.nomeEmpresa = this.formGroup.get('nomeEmpresa').value;
    usuario.username = this.formGroup.get('username').value;
    usuario.password = btoa(this.formGroup.get('password').value);

    console.log(usuario);
    this.authService.salvar(usuario).subscribe(response => {
      
      this.spinner.stopSpinner();
      this.snackBarService.sucesso('Cadastro realizado com sucesso! Efetue o login.');
    
    }, errorResponse => {
      this.spinner.stopSpinner();
      this.snackBarService.erro(errorResponse.error.errors);
    })
  }

}
