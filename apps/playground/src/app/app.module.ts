import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SvgsModule } from './svgs/svgs.module';
import { DesignsModule } from './designs/designs.module';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload'}),

    SvgsModule,
    DesignsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
