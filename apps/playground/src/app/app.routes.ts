import { Route } from '@angular/router';
import { SvgsComponent } from './svgs/svgs.component';
import { DesignsComponent } from './designs/designs.component';
import { LanderComponent } from './pages/lander/lander.component';


export const appRoutes: Route[] = [


 // Default route
  { path: '', redirectTo: '/lander', pathMatch: 'full' },

  { path: 'svgs', component: SvgsComponent },
  { path: 'designs', component: DesignsComponent },
  { path: 'lander', component: LanderComponent },



  // The following line is the default route, always keep it at the bottom
  { path: '**', component: LanderComponent },



];

