import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { TarifsPageComponent } from './tarifs-page/tarifs-page.component';
import { AccauntsPageComponent } from './accaunts-page/accaunts-page.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HeaderComponent } from './header/header.component';
import { FirewallPageComponent } from './firewall-page/firewall-page.component';
import { TransactionHistoryPageComponent } from './transaction-history-page/transaction-history-page.component';
import { DevicesPageComponent } from './devices-page/devices-page.component';
import { ReportsActivePageComponent } from './reports-active-page/reports-active-page.component';
import { ReportsPassivePageComponent } from './reports-passive-page/reports-passive-page.component';
import { ReportsArchievePageComponent } from './reports-archieve-page/reports-archieve-page.component';
import { ReportsTarifsPageComponent } from './reports-tarifs-page/reports-tarifs-page.component';
import { ReportsAgePageComponent } from './reports-age-page/reports-age-page.component';
import { ReportsGenderPageComponent } from './reports-gender-page/reports-gender-page.component';
import { PermissionPageComponent } from './permission-page/permission-page.component';
import { RolesPageComponent } from './roles-page/roles-page.component';
import { HistoryChangePageComponent } from './history-change-page/history-change-page.component';
import { GroupPageComponent } from './group-page/group-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    TarifsPageComponent,
    AccauntsPageComponent,
    TransactionsPageComponent,
    ServicesPageComponent,
    UsersPageComponent,
    HeaderComponent,
    FirewallPageComponent,
    TransactionHistoryPageComponent,
    DevicesPageComponent,
    ReportsActivePageComponent,
    ReportsPassivePageComponent,
    ReportsArchievePageComponent,
    ReportsTarifsPageComponent,
    ReportsAgePageComponent,
    ReportsGenderPageComponent,
    PermissionPageComponent,
    RolesPageComponent,
    HistoryChangePageComponent,
    GroupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
