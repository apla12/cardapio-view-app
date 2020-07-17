import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavService } from '../menu/nav.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavItem } from '../menu/nav-item';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  @ViewChild('appDrawer', { static: true }) appDrawer: ElementRef;
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  //empresaAtual: Empresa = null;
  //currentLogin: UsuarioLogado;
  public innerWidth: number;

  navItems: NavItem[] = [
    {
      displayName: 'Meus Dados',
      iconName: 'assignment_ind',
      route: 'meusDados',
    },
    {
      displayName: 'Cardápios',
      iconName: 'list_alt',
      route: '',
      children: [
        {
          displayName: 'Incluir Cardápio',
          iconName: 'playlist_play',
          route: 'cardapio-new'
        },
        {
          displayName: 'Listar Cardápios',
          iconName: 'playlist_add',
          route: 'cardapios-list'
        },
      ]
    },
  ];

  constructor(private navService: NavService,
    //public sharedService: SharedService,
    public _DomSanitizer: DomSanitizer,
    private router: Router) {
    router.events.subscribe(() => {
      if (this.innerWidth < 500) {
        this.drawer.close();
        this.sidenav.close();
      }
    })
  }

  ngOnInit() {
    /*
    this.currentLogin = this.sharedService.getCurrentLogin();
    this.sharedService.onEmpresaEscolhida.subscribe(empresa => this.empresaAtual = empresa);
    if (this.currentLogin) {
      this.empresaAtual = this.currentLogin.empresa;
    }
    */
  }

  ngAfterContentInit() {
    this.navService.appDrawer = this.appDrawer;
    this.innerWidth = window.innerWidth;
  }

  public signOut() {
    //this.sharedService.logOut();
  }

}
