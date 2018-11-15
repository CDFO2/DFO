import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { ReportsComponent } from './reports/reports.component';
import { ManageComponent } from './manage/manage.component';
import { NoPageComponent } from './no-page/no-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
import { WelcomeComponent } from './welcome/welcome.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { SidebarModule } from 'ng-sidebar';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TmpComponent } from './tmp/tmp.component';
import { DropDownService } from './tmp/dropdown.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    DashboardComponent,
    RequestsComponent,
    ReportsComponent,
    ManageComponent,
    NoPageComponent,
    WelcomeComponent,
    CatalogComponent,
    NotificationsComponent,
    ProfileComponent,
    CartComponent,
    AlertComponent,
    TmpComponent,
    ],
  imports: [
    BrowserModule, 
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    SidebarModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    MatDialogModule,  
    MatButtonModule,
    BrowserAnimationsModule
  ],
  entryComponents:[ AlertComponent ],
  providers: [
    CartService,
    CookieService,
    DropDownService
    ],

  bootstrap: [AppComponent],
  })

export class AppModule { }
