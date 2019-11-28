import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from "./app-routing.module";
import { UserModule } from "./user/user.module";

import { HeaderComponent } from "./header/header.component";
import { AppComponent } from "./app.component";
import { ChatModule } from './chat/chat.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    ChatModule,
    ToastrModule.forRoot({timeOut: 1200})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
