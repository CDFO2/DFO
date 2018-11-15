import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { ReportsComponent } from './reports/reports.component';
import { ManageComponent } from './manage/manage.component';
import { NoPageComponent } from './no-page/no-page.component';
import { WelcomeComponent } from "./welcome/welcome.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ProfileComponent } from "./profile/profile.component";
import { CartComponent } from "./cart/cart.component";
import { TmpComponent } from "./tmp/tmp.component";

//Array of routes
export const routes: Routes = [
    //{path: '', component: HomeComponent},
    {path: '', pathMatch: 'full', redirectTo: 'welcome'},
    {path: 'welcome', component: WelcomeComponent, data: {breadcrumb: 'Home'}},
    {path: 'dashboard', component: DashboardComponent, data: {breadcrumb: 'Dashboard'}},
    {path: 'requests', component: RequestsComponent, data: {breadcrumb: 'Requests'}},
    {path: 'catalogue', component: WelcomeComponent, data: {breadcrumb: 'Catalogue'}},
    {path: 'catalogue/:category', component: CatalogComponent, data: {breadcrumb: 'Catalogue Category'}},
    {path: 'reports', component: ReportsComponent, data: {breadcrumb: 'Reports'}},
    {path: 'manage', component: ManageComponent, data: {breadcrumb: 'Manage'}},
    {path: 'cart', component: CartComponent, data: {breadcrumb: 'Cart'}},
    {path: 'profile', component: ProfileComponent, data: {breadcrumb: 'My Profile'}},
    {path: 'notifications', component: NotificationsComponent, data: {breadcrumb: 'Notifications'}},
    {path: 'tmp', component: TmpComponent, data: {breadcrumb: 'Temp'}},
    {path: '**', component: NoPageComponent}

];