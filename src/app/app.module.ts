import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {PlayersModule} from './features/players/players.module';
import {FeaturesModule} from './features/features.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // core & shared
    CoreModule,
    SharedModule,
    FeaturesModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
