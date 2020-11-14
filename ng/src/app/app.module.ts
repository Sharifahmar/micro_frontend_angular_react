import { AgmCoreModule } from "@agm/core";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxLoadingModule } from "ngx-loading";
import {
  PerfectScrollbarConfigInterface, PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NGXToastrService } from "./components/extra/toastr/toastr.service";
import { CustomAdapterDatepicker } from './dashboard/helper/datePicker-formatter/CustomAdapterDatepicker';
import { CustomAdapterDatepickerFormatter } from './dashboard/helper/datePicker-formatter/CustomAdapterDatepickerFormatter';
import { InterceptorService } from './dashboard/helper/interceptor/interceptor.service';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { AuthService } from "./shared/auth/auth.service";
import { SharedModule } from "./shared/shared.module";





const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "http://localhost:4200/assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, EmptyRouteComponent],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCERobClkCv1U4mDijGm1FShKva_nxsGJY"
    }),
    PerfectScrollbarModule,
    NgxLoadingModule.forRoot({
      primaryColour: '#ffffff',
      backdropBorderRadius: '3px',
      fullScreenBackdrop: true
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    CustomAdapterDatepicker,
    CustomAdapterDatepickerFormatter,
    // DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    NGXToastrService,
    { provide: NgbDateParserFormatter, useClass: CustomAdapterDatepickerFormatter },
    { provide: NgbDateAdapter, useClass: CustomAdapterDatepicker },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }