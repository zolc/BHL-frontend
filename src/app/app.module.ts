import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared/shared.module';


import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { AuthModule } from './auth/auth.module';

import { uiReducer } from './ui/ui.reducer';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { dashboardReducer } from './dashboard/dashboard.reducer';
import { DashboardEffects } from './dashboard/dashboard.effects';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { environment } from '../environments/environment';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.graphQlUrl
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    ApolloModule.forRoot(provideClient),
    AppRoutingModule,
    StoreModule.provideStore({
      auth: authReducer,
      ui: uiReducer,
      dashboard: dashboardReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(DashboardEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
