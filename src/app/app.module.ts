import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BigMouthApiService } from './services/big-mouth-api.service';
import { BigMouthWebTestComponent } from './big-mouth-web-test/big-mouth-web-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BigMouthWebTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [BigMouthApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
