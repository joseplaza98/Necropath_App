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
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
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
    loadChildren: () => import('./pages/Unidades/Unidad 1/Activities/test-1/test-1.module').then(m => m.Test1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'test-2',
    loadChildren: () => import('./pages/Unidades/Unidad 2/Activities/test-2/test-2.module').then( m => m.Test2PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard  
    },
  {
    path: 'test-3',
    loadChildren: () => import('./pages/Unidades/Unidad 3/Activities/test-3/test-3.module').then( m => m.Test3PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'results',
    loadChildren: () => import('./pages/results/results.module').then( m => m.ResultsPageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'u1-tema-1',
    loadChildren: () => import('./pages/Unidades/Unidad 1/u1-tema-1/u1-tema-1.module').then( m => m.U1Tema1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'u2-tema-1',
    loadChildren: () => import('./pages/Unidades/Unidad 2/u2-tema-1/u2-tema-1.module').then( m => m.U2Tema1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'intro-u1',
    loadChildren: () => import('./pages/Unidades/Unidad 1/intro-u1/intro-u1.module').then( m => m.IntroU1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'intro-u2',
    loadChildren: () => import('./pages/Unidades/Unidad 2/intro-u2/intro-u2.module').then( m => m.IntroU2PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'intro-u3',
    loadChildren: () => import('./pages/Unidades/Unidad 3/intro-u3/intro-u3.module').then( m => m.IntroU3PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'u3-tema-1',
    loadChildren: () => import('./pages/Unidades/Unidad 3/u3-tema-1/u3-tema-1.module').then( m => m.U3Tema1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'quiz-1',
    loadChildren: () => import('./pages/Unidades/Unidad 1/Activities/quiz-1/quiz-1.module').then( m => m.Quiz1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'quiz-2',
    loadChildren: () => import('./pages/Unidades/Unidad 1/Activities/quiz-2/quiz-2.module').then( m => m.Quiz2PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'u2-quiz-1',
    loadChildren: () => import('./pages/Unidades/Unidad 2/Activities/u2-quiz-1/u2-quiz-1.module').then( m => m.U2Quiz1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'u3-quiz-1',
    loadChildren: () => import('./pages/Unidades/Unidad 3/Activities/u3-quiz-1/u3-quiz-1.module').then( m => m.U3Quiz1PageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'syllabus',
    loadChildren: () => import('./syllabus/syllabus.module').then( m => m.SyllabusPageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then( m => m.EditUserPageModule),
    canActivate: [AuthGuard]  // Protege la ruta home con el AuthGuard
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
