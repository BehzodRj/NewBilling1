import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccauntsPageComponent } from './accaunts-page/accaunts-page.component';
import { TransactionHistoryPageComponent } from './transaction-history-page/transaction-history-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';
import { ServicesPageComponent } from './services-page/services-page.component';
import { TarifsPageComponent } from './tarifs-page/tarifs-page.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { DevicesPageComponent } from './devices-page/devices-page.component';
import { FirewallPageComponent } from './firewall-page/firewall-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent},
  { path: 'accounts', component: AccauntsPageComponent, canActivate: [AuthGuard] },
  { path: 'transaction-history/:id', component: TransactionHistoryPageComponent, canActivate: [AuthGuard] },
  { path: 'tarifs', component: TarifsPageComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportPageComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsPageComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesPageComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
  { path: 'devices', component: DevicesPageComponent, canActivate: [AuthGuard] },
  { path: 'firewall', component: FirewallPageComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: ReportPageComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
