import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './core/not-found.component';
import {LancamentosRoutingModule} from './lancamentos/lancamentos-routing.module';
import {NaoAutorizadoComponent} from './core/nao-autorizado.component';


const routes: Routes = [

  {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: NotFoundComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LancamentosRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
