import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfgenerateService {
  documentDefinition: any;
  downloadParameter: string;

  constructor() { }


  generatePdfSwitch(action) {
    switch (action) {
      case 'open': pdfMake.createPdf(this.documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(this.documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(this.documentDefinition).download(this.downloadParameter); break;
      default: pdfMake.createPdf(this.documentDefinition).open(); break;
    }


  }
  setDocumentDefinition(value: any) {
    this.documentDefinition = value;
  }

  setDownloadParameter(value: string) {
    this.downloadParameter = value;
  }

}
