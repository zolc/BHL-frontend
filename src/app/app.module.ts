import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreModule.provideStore({
      auth: authReducer
    }),
    EffectsModule.run(AuthEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
