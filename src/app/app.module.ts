import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextComponent } from './component/text/text.component';
import { DivComponent } from './component/div/div.component';
import { TemplateComponent } from './component/template/template.component';
import { ExampleComponent } from './page/example/example.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    DivComponent,
    TemplateComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    DivComponent,
    TemplateComponent,
    TextComponent
  ]
})
export class AppModule { }
