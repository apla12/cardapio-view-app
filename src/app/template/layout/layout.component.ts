import { AfterViewInit, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  classeBody = '';
  //currentLogin: UsuarioLogado;
  classeEsconderMenus = '';

  showTemplate = false;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    //private sharedService: SharedService
  ) {

    this.matIconRegistry.addSvgIcon("sesi-logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/sesi.svg")
    ); this.matIconRegistry.addSvgIcon("senai-logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/senai.svg")
    );
  }

  ngOnInit() {
    //if (this.sharedService.isLoggedIn()) {
    this.showTemplate = true;
    this.classeBody = 'content-wrapper';

    //if (window.location.href.includes('preview')) {
    this.classeEsconderMenus = 'hidden-in-preview';
    this.classeBody = '';
    //}
    //}
  }

}
