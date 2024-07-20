import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'test-1',
    loadChildren: () => import('./pages/test-1/test-1.module').then(m => m.Test1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'test-2',
    loadChildren: () => import('./pages/test-2/test-2.module').then( m => m.Test2PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard  
    },
  {
    path: 'test-3',
    loadChildren: () => import('./pages/test-3/test-3.module').then( m => m.Test3PageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./results/results.module').then( m => m.ResultsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
