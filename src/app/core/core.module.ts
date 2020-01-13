import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './core.state';
import {DevToolsService} from './services/dev-tools.service';
import {FeaturesModule} from '../features/features.module';
import {environment} from '../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesModule,
    // ngrx
    StoreModule.forRoot(reducers, {metaReducers}), !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    DevToolsService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ds: DevToolsService) => () => {},
      deps: [DevToolsService],
      multi: true
    }
  ]
})
export class CoreModule { }
