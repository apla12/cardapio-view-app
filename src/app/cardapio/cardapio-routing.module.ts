import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardapioListComponent } from './cardapio-list/cardapio-list.component';
import { CardapioNewComponent } from './cardapio-new/cardapio-new.component';
import { AuthGuard } from '../auth/auth.guard';
import { LayoutComponent } from '../template/layout/layout.component';


const routes: Routes = [
  {
    path: 'cardapio', component: LayoutComponent, children: [
      { path: 'new', component: CardapioNewComponent },
      { path: 'list', component: CardapioListComponent },
      { path: '', redirectTo: '/cardapio/list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioRoutingModule { }
