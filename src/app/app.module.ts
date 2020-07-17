import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnQrcodeModule } from 'an-qrcode';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRoutingModule } from './auth/login-routing.module';
import { CardapioModule } from './cardapio/cardapio.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { AuthService } from './service/auth.service';
import { CardapioService } from './service/cardapio.service';
import { LayoutComponent } from './template/layout/layout.component';
import { MenuBarComponent } from './template/menu-bar/menu-bar.component';
import { MenuComponent } from './template/menu/menu.component';
import { NavService } from './template/menu/nav.service';
import { TokenInterceptor } from './token.interceptor';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = { dropSpecialCharacters: false };

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    MenuComponent,
    LayoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialFileInputModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatPaginatorModule,
    LoginRoutingModule,
    CardapioModule,
    AnQrcodeModule,
    NgxMaskModule.forRoot(options),
    BrowserAnimationsModule
  ],
  providers: [
    NavService,
    AuthService,
    CardapioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
