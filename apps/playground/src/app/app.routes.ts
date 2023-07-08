import { Route } from '@angular/router';
import { SvgsComponent } from './svgs/svgs.component';
import { DesignsComponent } from './designs/designs.component';
import { LanderComponent } from './pages/lander/lander.component';
import { RayformbuildComponent } from './designs/rayformbuild/rayformbuild.component';
import { CompinteractComponent } from './designs/compinteract/compinteract.component';
import { RestapiComponent } from './designs/restapi/restapi.component';
import { Rayformbuild2Component } from './designs/rayformbuild2/rayformbuild2.component';
import { ArrayformsComponent } from './designs/arrayforms/arrayforms.component';
import { Open2Component } from './svgs/open2/open2.component';


export const appRoutes: Route[] = [


 // Default route
  { path: '', redirectTo: '/lander', pathMatch: 'full' },

  { path: 'server', component:RestapiComponent  },
  { path: 'cols', component: CompinteractComponent },
  { path: 'work0', component: ArrayformsComponent },
  { path: 'work1', component: RayformbuildComponent },
  { path: 'work2', component: Rayformbuild2Component},
  { path: 'svg', component: SvgsComponent },
  { path: 'svg2', component: Open2Component },
  { path: 'designs', component: DesignsComponent },
  { path: 'lander', component: LanderComponent },



  // The following line is the default route, always keep it at the bottom
  { path: '**', component: LanderComponent },



];

