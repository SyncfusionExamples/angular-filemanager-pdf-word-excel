import { Component } from '@angular/core';
import { FileOpenEventArgs } from '@syncfusion/ej2-angular-filemanager';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'file-manager-integration';
  public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations'
  };
  public service = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document = 'PDF_Succinctly.pdf';
  public docContainer: DocumentEditorContainerComponent | undefined;
  public dialog : DialogComponent | undefined;

  public ngOnInit(): void {
   this.dialog?.hide();
  }

  fileOpen(args: FileOpenEventArgs) {
    const fileDetailsObj: any = args.fileDetails!;
    let fileName: string = fileDetailsObj["name"];
    let filePath: string = fileDetailsObj['filterPath'].replace(/\\/g, '/') + fileName;
    let fileType: string = fileDetailsObj['type'];

    if (fileType == '.pdf') {
      let responseText: any = this.getFileStream(filePath, true);
      var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      pdfviewer.load(responseText, null);
    }
    else if (fileType == '.docx') {
      // let responseText: any = this.getFileStream(filePath, false);
      // this.container.documentEditor.open(responseText);
    }
    else if (fileType == '.xlsx') {
      // this.showExcelViewer(fileName);
      // this.getBlob(fileName, filePath);
    }

  

  }

  getFileStream(filePath: string, isPDF: boolean) {
    let ajax: XMLHttpRequest = new XMLHttpRequest();
    ajax.open('POST', this.hostUrl + 'api/FileManager/GetDocument', true);
    ajax.setRequestHeader('content-type', 'application/json');

    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200 || ajax.status === 304) {
          return ajax.responseText;
        }
      }
      return null;
    };
    ajax.send(
      JSON.stringify({
        FileName: filePath,
        Action: !isPDF ? 'ImportFile' : 'LoadPDF',
      })
    );
  }

}
