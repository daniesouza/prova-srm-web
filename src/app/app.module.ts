import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LancamentosModule} from './lancamentos/lancamentos.module';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    LancamentosModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
