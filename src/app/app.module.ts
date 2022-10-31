import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import syncfusion file manager module from file manager package
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { PdfViewerAllModule } from '@syncfusion/ej2-angular-pdfviewer';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileManagerAllModule,
    DialogModule,
    DocumentEditorContainerAllModule,
    PdfViewerAllModule,
    SpreadsheetAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
