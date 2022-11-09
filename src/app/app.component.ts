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
  public hostUrl: string = 'https://localhost:44352/';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations',
    getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
    uploadUrl: this.hostUrl + 'api/FileManager/Upload',
    downloadUrl: this.hostUrl + 'api/FileManager/Download'
  };
 
  public service = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document = 'PDF_Succinctly.pdf';
  public docContainer: DocumentEditorContainerComponent | undefined;
  public dialog : DialogComponent | undefined;

  fileOpen(args: FileOpenEventArgs) {
    const fileDetailsObj: any = args.fileDetails!;
    let fileName: string = fileDetailsObj["name"];
    let filePath: string = fileDetailsObj['filterPath'].replace(/\\/g, '/') + fileName;
    let fileType: string = fileDetailsObj['type'];

    if (fileType == '.pdf') {
      let responseText: any = this.getFileStream(filePath, true);
      // var pdfviewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
      // pdfviewer.load(responseText, null);
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
          if (!isPDF) {
            // open SFDT text in document editor
           // this.container.documentEditor.open(ajax.responseText);
          } else {
            var pdfviewer = (<any>document.getElementById('pdfViewer'))
              .ej2_instances[0];
            pdfviewer.load(ajax.responseText, null);
            //opens the file in pdf viewer
            //this.pdfView.load(ajax.responseText, null);
          }
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
