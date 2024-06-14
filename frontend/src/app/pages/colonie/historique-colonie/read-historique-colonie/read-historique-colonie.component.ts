import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fury-read-historique-colonie',
  templateUrl: './read-historique-colonie.component.html',
  styleUrls: ['./read-historique-colonie.component.scss']
})
export class ReadHistoriqueColonieComponent implements OnInit {
    @Input() base64String: string | null = null;
    file: File | null = null;
    fileContent: string | null = null;
  
    constructor() {}
  
    ngOnInit(): void {
      if (this.base64String) {
        // Example usage with base64toFile function
        this.file = this.base64toFile(this.base64String, 'application/pdf', 'fichier.pdf');
        this.loadFileContent();
      }
    }
  

    loadFileContent(): void {
      if (this.file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (this.file && this.file.type.startsWith('text')) {
            this.fileContent = reader.result as string;
          } else if (this.file && this.file.type === 'application/pdf') {
            const pdfWindow = window.open("");
            pdfWindow.document.write(
              "<iframe width='100%' height='100%' src='" + encodeURI(reader.result as string) + "'></iframe>"
            );
          } else {
            this.fileContent = 'Type de fichier non pris en charge pour l\'affichage.';
          }
        };
  
        reader.readAsDataURL(this.file); 
      }
    }
    base64toBlob(base64Data: string, contentType: string): Blob {
      const sliceSize = 512;
      const byteCharacters = atob(base64Data);
      const byteArrays: Uint8Array[] = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      return new Blob(byteArrays, { type: contentType });
    }
    base64toFile(base64Data: string, contentType: string, fileName: string): File {
      const blob = this.base64toBlob(base64Data, contentType);
      return new File([blob], fileName, { type: contentType });
    }
}
