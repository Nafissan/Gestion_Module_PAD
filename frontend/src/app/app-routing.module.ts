import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
 
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'password-oublie',
    loadChildren: () => import('./pages/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'change-password/compte/:id/token/:token',
    loadChildren: () => import('./pages/authentication/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/espace-salaries-pad/espace-salaries-pad.module').then(m => m.EspaceSalariesPadModule),
        pathMatch: 'full'   
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        // pathMatch: 'full' 
      },
      {
        path: 'dashboards',
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule),
      },
      {
        path: 'components',
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
      },
      {
        path: 'page-layouts',
        loadChildren: () => import('./pages/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
      },
      {
        path: 'gestion-conge',
        loadChildren: () => import('./pages/gestion-conge/gestion-conge.module').then(m => m.GestionCongeModule)
      },
      {
        path: 'gestion-absence',
        loadChildren: () => import('./pages/gestion-absence/gestion-absence.module').then(m => m.GestionAbsenceModule)
      },
       { path: 'gestion-unite-organisationnelle',
        loadChildren: () => import('./pages/gestion-unite-organisationnelle/gestion-unite-organisationnelle.module')
          .then(m => m.GestionUniteOrganisationnelleModule)
      },
      {
        path: 'gestion-utilisateurs',
        loadChildren: () => import('./pages/gestion-utilisateurs/gestion-utilisateurs.module').then(m => m.GestionUtilisateursModule)
      },
      {
        path: 'gestion-attestation',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./pages/gestion-demande-attestation/gestion-demande-attestation.module').then(m => m.GestionDemandeAttestationModule)
      },
      {
        path: 'gestion-interim',
        loadChildren: () => import('./pages/gestion-interim/gestion-interim.module').then(m => m.GestionInterimModule)
      },
      {
        path: 'gestion-personnel',
        loadChildren: () => import('./pages/gestion-personnel/gestion-personnel.module').then(m => m.GestionPersonnelModule)
      },
      {
        path: 'espace-salaries-pad',
        loadChildren: () => import('./pages/espace-salaries-pad/espace-salaries-pad.module').then(m => m.EspaceSalariesPadModule)
      },
      {
        path: 'parametrage',
        loadChildren: () => import('./pages/parametrage/parametrage.module').then(m => m.ParametrageModule)
      },
      {
        path: 'gestion-partenariat',
        loadChildren: () => import('./pages/gestion-partenariat/gestion-partenariat.module').then(m => m.GestionPartenariatModule)
      },
      {
        path: 'gestion-activite',
        loadChildren: () => import('./pages/gestion-activite/gestion-activite.module').then(m => m.GestionActiviteModule)
      },
      {
        path: 'dotation',
        loadChildren: () => import('./pages/dotation/dotation-lait/dotation-lait.module').then(m => m.DotationLaitModule)
      },
      {
        path: 'dashboards',
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule),
        // pathMatch: 'full' 
      },
      {
        path: 'gestion-assurance',
        loadChildren: () => import('./pages/gestion-assurance/gestion-assurance.module').then(m => m.GestionAssuranceModule)
      },
      {
        path: 'colonie',
        loadChildren: () => import('./pages/colonie/colonie.module').then(m => m.ColonieModule)
      },{
        path: 'pelerinage',
        loadChildren: () => import('./pages/pelerinage/pelerinage.module').then(m => m.PelerinageModule)
      },
      
    ]
  },
  { path: 'guide', loadChildren: () => import('./pages/guide/guide.module').then(m => m.GuideModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
