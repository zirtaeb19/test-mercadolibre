import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ItemsComponent } from './items/items.component';
import { ItemsDetailComponent } from './items-detail/items-detail.component';
import { MessageService } from './message.service';
import { MessagesComponent }    from './messages/messages.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'test-mercado-libre' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    ItemsComponent,
    ItemsDetailComponent,
    MessagesComponent
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
