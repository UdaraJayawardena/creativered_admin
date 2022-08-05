import {NgtUniversalModule} from '@ng-toolkit/universal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterContentComponent} from './basic-content/footer-content/footer-content.component';
import {PageTitleComponent} from './basic-content/main-content/dashboard-content/page-title/page-title.component';
import {TableDetailsComponent} from './basic-content/main-content/dashboard-content/table-details/table-details.component';
import {NavbarContentComponent} from './basic-content/navbar-content/navbar-content.component';
import {PageTitleReportsComponent} from './basic-content/main-content/reports-content/page-title-reports/page-title-reports.component';
import {PageTitleSystemComponent} from './basic-content/main-content/system-content/page-title-system/page-title-system.component';
import {ProductPageContentComponent} from './basic-content/main-content/product-content/product-page-content/product-page-content.component';
import {ProductTableDetailComponent} from './basic-content/main-content/product-content/product-table-detail/product-table-detail.component';
import {AddproductPageTitleComponent} from './basic-content/main-content/addproduct-content/addproduct-page-title/addproduct-page-title.component';
import {AddproductTabpanelContentComponent} from './basic-content/main-content/addproduct-content/addproduct-tabpanel-content/addproduct-tabpanel-content.component';
import {CustomerPageTitleComponent} from './basic-content/main-content/customer-content/customer-page-title/customer-page-title.component';
import {CustomerContentComponent} from './basic-content/main-content/customer-content/customer-content.component';
import {AddproductContentComponent} from './basic-content/main-content/addproduct-content/addproduct-content.component';
import {DashboardContentComponent} from './basic-content/main-content/dashboard-content/dashboard-content.component';
import {ProductContentComponent} from './basic-content/main-content/product-content/product-content.component';
import {ReportsContentComponent} from './basic-content/main-content/reports-content/reports-content.component';
import {SystemContentComponent} from './basic-content/main-content/system-content/system-content.component';
import {HttpClientModule} from '@angular/common/http';
import {GoogleChartsModule} from 'angular-google-charts';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {LoadingSpinnerComponent} from './basic-content/main-content/loading-spinner/loading-spinner.component';
import {ImageserviceService} from './services/imageservice.service';
import {AuthGuard} from './auth.guard';
import {AdminServiceService} from './services/admin-service.service';
import {NgxEditorModule} from 'ngx-editor';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatePickerComponent} from './basic-content/main-content/ngb-date-picker/ngb-date-picker.component';
import {FusionChartsModule} from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import *  as FusionMaps from 'fusioncharts/fusioncharts.maps';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as World from 'fusioncharts/maps/fusioncharts.world';
import {DirectForgetComponent} from './basic-content/main-content/direct-forget/direct-forget.component';

FusionChartsModule.fcRoot(FusionCharts, FusionMaps, World, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    SystemContentComponent,
    ReportsContentComponent,
    ProductContentComponent,
    DashboardContentComponent,
    routingComponents,
    AddproductContentComponent,
    PageTitleComponent,
    TableDetailsComponent,
    NavbarContentComponent,
    FooterContentComponent,
    PageTitleReportsComponent,
    PageTitleSystemComponent,
    ProductPageContentComponent,
    ProductTableDetailComponent,
    AddproductPageTitleComponent,
    AddproductTabpanelContentComponent,
    CustomerPageTitleComponent,
    CustomerContentComponent,
    LoadingSpinnerComponent,
    NgbDatePickerComponent,
    DirectForgetComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CommonModule,
    NgtUniversalModule,
    NgxEditorModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    AngularFontAwesomeModule,
    NgbModule,
    FusionChartsModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [ImageserviceService,
    AuthGuard,
    AdminServiceService],
})
export class AppModule {
}
