import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";


/** valida senha */
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*["!@#$%¨&*()_+'])[A-Za-z\d"!@#$%¨&*()_+']{7,14}$/
};

export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(15),
  Validators.pattern(regExps.password)
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordAgain').value && control.dirty)
  }
}

export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.passwordAgain.value;

  return password === passwordConfirmation ? null : {passwordsNotEqual: true}
}

/** valida dominio email - essa é a blacklist */
const tipoEmail = ['@gmail', '@hotmail', '@outlook', '@live.com', '@uol', '@bol', '@yahoo', '@ymail', '@globomail'];

export function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (tipoEmail.some(t => email.indexOf(t) > -1)) {
    return {
      emailDomain: true
    }
  }
  return null;
}

export function cnoFormValidator(control: FormControl) {
  const cno = control.value;
  if(cno == null){
    return {cnoInvalido: true};
  }
  else{
    if (validarCnoFormato(cno)) {
    }
    else{
      return {cnoInvalido: true};
    }
  }
}

export function validarCnoFormato(cno) {
  let cei = cno.replace(/[^\d]+/g, '');

  if (cei == "") {
    return true;
  }

  if (cei.length != 12) {
    return false;
  }

  let peso = "74185216374";
  let soma = 0;

  //Faz um for para multiplicar os números do CEI digitado pelos números do peso.
  //E somar o total de cada número multiplicado.
  for (let i = 1; i < 12; i++) {
    let fator: number = Number(peso.substring(i - 1, i));
    let valor: number = Number(cei.substring(i - 1, i));
    soma += (fator * valor);
  }

  //Pega o length do resultado da soma e desconta 2 para pegar somente a dezena.
  let len: number = Number(soma.toString().length - 2);

  //pega a dezena
  let dezena: number = Number(soma.toString().substring(len));

  //pega o algarismo da dezena
  let algdezena: number = Number(dezena.toString().substring(0, 1));

  //pega o algarismo da unidade
  let unidade = parseInt(soma+'') - (parseInt(((soma / 10)+'')) * 10);
  // let unidade = soma - ((soma / 10) * 10);

  //soma o algarismo da dezena com o algarismo da unidade.
  soma = algdezena + unidade;

  //pega o dígito (último número) do cei digitado.
  let digitoCEI = cei.substring(11);
  let digitoEncontrado = 10 - soma;

  if (digitoCEI != digitoEncontrado) {
    return false;
  } else {
    return true;
  }
}

export function otpValidator(generatedOtpText: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const otpInvalido = control.value && control.value.length == 6 && generatedOtpText != control.value;
    return otpInvalido ? {'otpInvalido': {value: control.value}} : null;
  };
}
