import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cardapio } from 'src/app/model/cardapio';
import { CardapioService } from 'src/app/service/cardapio.service';
import { SpinnerService } from 'src/app/template/spinner.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-cardapio-new',
  templateUrl: './cardapio-new.component.html',
  styleUrls: ['./cardapio-new.component.scss']
})
export class CardapioNewComponent implements OnInit {

  form: FormGroup;
  qrcode: string;

  constructor(
    private spinner: SpinnerService,
    private fb: FormBuilder,
    private cardapioService: CardapioService,
    private snackBarService: SnackBarService,
  ) {
    this.form = this.fb.group({
      categoria: [''],
      file: [null]
    })
  }

  ngOnInit() { }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      file: file
    });
    this.form.get('file').updateValueAndValidity()
  }

  save() {
    this.spinner.showSpinner();

    const cardapio: Cardapio = new Cardapio();
    cardapio.categoria = this.form.value.categoria;
    cardapio.file = this.form.value.file;

    console.log(cardapio);

    this.cardapioService.addCardapio(cardapio).subscribe(
      response => {
        this.spinner.stopSpinner();
        console.log('passou');
        //gerar QRCode
        this.qrcode = cardapio.file.name;
      }, errorResponse => {
        this.spinner.stopSpinner();
        this.snackBarService.erro(errorResponse.error.errors);
      })
  }




}
