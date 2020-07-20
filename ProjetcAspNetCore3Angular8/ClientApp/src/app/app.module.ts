import { ValorImovelService } from './services/valor-imovel.service';
import { TipoService } from './services/tipo.service';
import { ImovelService } from './services/imovel.service';
import { EnderecoService } from './services/endereco.service';
import { CustomSpinnerService } from './services/custom-spinner.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CustomHttpInterceptor } from './providers/http-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GerenciarImovelComponent } from './components/gerenciar-imovel/gerenciar-imovel.component';
import { DetalheImovelComponent } from './components/detalhe-imovel/detalhe-imovel.component';
import { CustomSpinnerComponent } from './components/spinner/custom-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GerenciarImovelComponent,
    CustomSpinnerComponent,
    DetalheImovelComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    NgbModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'gerenciar', component: GerenciarImovelComponent },
      { path: 'imovel/:id', component: DetalheImovelComponent },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    CustomSpinnerService,
    EnderecoService,
    ImovelService,
    TipoService,
    NgSelectConfig,
    ɵs,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    ValorImovelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
