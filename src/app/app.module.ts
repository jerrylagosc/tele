import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { MaterialModule } from './material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './page/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { infoStore } from './store';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { addRegistroReducer } from './reducers/registro.reducer';
import { ControlErrorComponent } from './utils/control-error/control-error.component';
import { ControlMessageService } from './services/control-message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ControlErrorComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({registro: addRegistroReducer})
  ],
  providers: [
    infoStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
