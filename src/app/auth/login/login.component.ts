import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { AuthService } from 'src/app/service/auth.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { SpinnerService } from 'src/app/template/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm = this.fb.group({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private spinner: SpinnerService,
    private fb: FormBuilder,
    private validator: ValidateBrService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
  }


  login() {
    this.spinner.showSpinner();

    const user = this.loginForm.getRawValue();

    this.authService.tentarLogar(user.username, user.password)
      .subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/home']);
        this.spinner.stopSpinner();

      }, HttpErrorResponse => {
        this.spinner.stopSpinner();
        this.snackBarService.erro('Usuário e/ou senha incorreto(s).');
      })
  }
}
