import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AdminModule } from './admin/admin.module';
import { EventCheckinModule } from './event-checkin/event-checkin.module';
import { EventDetailModule } from './event-detail/event-detail.module';
import { EventsModule } from './events/events.module';
import { MemberDetailModule } from './member-detail/member-detail.module';
import { MemberImportModule } from './member-import/member-import.module';
import { CheckedInMembersModule } from '@app/checked-in-members/checked-in-members.module';
import { MembersModule } from './members/members.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SDKBrowserModule } from '../../sdk';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    ShellModule,
    AdminModule,
    EventCheckinModule,
    EventDetailModule,
    EventsModule,
    MemberDetailModule,
    MemberImportModule,
    CheckedInMembersModule,
    MembersModule,
    UserProfileModule,
    AboutModule,
    LoginModule,
    AppRoutingModule,
    SDKBrowserModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
