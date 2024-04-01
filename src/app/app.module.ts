import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './navBar/navBar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginaModule } from './paginas/PaginaModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorService } from './interceptores/userInterceptor.service';
import { ClienteModule } from './clientes/ClienteModule';

@NgModule({
  declarations: [								
    AppComponent,
    NavBarComponent            
   ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    PaginaModule,
    HttpClientModule,
    ClienteModule
    
  ],
  providers: [ 
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
