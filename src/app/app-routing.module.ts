import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccauntsPageComponent } from './accaunts-page/accaunts-page.component';
import { Report1PageComponent } from './report1-page/report1-page.component';
import { Report2PageComponent } from './report2-page/report2-page.component';
import { Report3PageComponent } from './report3-page/report3-page.component';
import { TransactionHistoryPageComponent } from './transaction-history-page/transaction-history-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';
import { ServicesPageComponent } from './services-page/services-page.component';
import { TarifsPageComponent } from './tarifs-page/tarifs-page.component';
import { ReportsActivePageComponent } from './reports-active-page/reports-active-page.component';
import { ReportsPassivePageComponent } from './reports-passive-page/reports-passive-page.component';
import { ReportsArchievePageComponent } from './reports-archieve-page/reports-archieve-page.component';
import { ReportsTarifsPageComponent } from './reports-tarifs-page/reports-tarifs-page.component';
import { ReportsAgePageComponent } from './reports-age-page/reports-age-page.component';
import { ReportsGenderPageComponent } from './reports-gender-page/reports-gender-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { DevicesPageComponent } from './devices-page/devices-page.component';
import { PermissionPageComponent } from './permission-page/permission-page.component';
import { RolesPageComponent } from './roles-page/roles-page.component';
import { FirewallPageComponent } from './firewall-page/firewall-page.component';
import { HistoryChangePageComponent } from './history-change-page/history-change-page.component';
import { EquipmentPageComponent } from './equipment-page/equipment-page.component';
import { PromotionPageComponent } from './promotion-page/promotion-page.component';
import { IpGroupPageComponent } from './ip-group-page/ip-group-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent},
  { path: 'accounts', component: AccauntsPageComponent, canActivate: [AuthGuard] },
  { path: 'report1', component: Report1PageComponent, canActivate: [AuthGuard] },
  { path: 'report2', component: Report2PageComponent, canActivate: [AuthGuard] },
  { path: 'report3', component: Report3PageComponent, canActivate: [AuthGuard] },
  { path: 'historyAccount/:id', component: HistoryChangePageComponent, canActivate: [AuthGuard] },
  { path: 'transaction-history/:id', component: TransactionHistoryPageComponent, canActivate: [AuthGuard] },
  { path: 'tarifs', component: TarifsPageComponent, canActivate: [AuthGuard] },
  { path: 'reportsActive', component: ReportsActivePageComponent, canActivate: [AuthGuard] },
  { path: 'reportsPassive', component: ReportsPassivePageComponent, canActivate: [AuthGuard] },
  { path: 'reportsArchieve', component: ReportsArchievePageComponent, canActivate: [AuthGuard] },
  { path: 'reportsTarif', component: ReportsTarifsPageComponent, canActivate: [AuthGuard] },
  { path: 'reportsEquipment', component: EquipmentPageComponent, canActivate: [AuthGuard] },
  { path: 'reportsAge', component: ReportsAgePageComponent, canActivate: [AuthGuard] },
  { path: 'reportsGender', component: ReportsGenderPageComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsPageComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesPageComponent, canActivate: [AuthGuard] },
  { path: 'promotion', component: PromotionPageComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
  { path: 'permission', component: PermissionPageComponent, canActivate: [AuthGuard] },
  { path: 'devices', component: DevicesPageComponent, canActivate: [AuthGuard] },
  { path: 'group', component: RolesPageComponent, canActivate: [AuthGuard] },
  { path: 'ipgroup', component: IpGroupPageComponent, canActivate: [AuthGuard] },
  { path: 'firewall', component: FirewallPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
