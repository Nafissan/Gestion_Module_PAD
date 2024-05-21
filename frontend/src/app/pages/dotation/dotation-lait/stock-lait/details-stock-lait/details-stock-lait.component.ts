import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Stock } from '../../shared/models/stock.model';
import { SuiviStock } from '../../shared/models/suiviStock.model';
import { SuiviStockService } from '../../shared/suiviStock.service';

@Component({
  selector: 'fury-details-stock-lait',
  templateUrl: './details-stock-lait.component.html',
  styleUrls: ['./details-stock-lait.component.scss']
})
export class DetailsStockLaitComponent implements OnInit {

  static id = 100;
  stock: Stock;

  suiviStocks: SuiviStock[] = [];
  suiviStocksCat1: SuiviStock[] = [];
  suiviStocksCat2: SuiviStock[] = [];
  suiviStocksCat3: SuiviStock[] = [];


  suiviStocksAcquisitionCat1: SuiviStock[] = [];
  suiviStocksAcquisitionCat2: SuiviStock[] = [];
  suiviStocksAcquisitionCat3: SuiviStock[] = [];


  suiviStocksDotationCat1: SuiviStock[] = [];
  suiviStocksDotationCat2: SuiviStock[] = [];
  suiviStocksDotationCat3: SuiviStock[] = [];

  suiviStocksCorrectionCat1: SuiviStock[] = [];
  suiviStocksCorrectionCat2: SuiviStock[] = [];
  suiviStocksCorrectionCat3: SuiviStock[] = [];

  quantiteTotalSock1: number=0;
  quantiteTotalSock2: number=0;
  quantiteTotalSock3: number=0;

  quantiteAcquisitionStock1: number=0;
  quantiteAcquisitionStock2: number=0;
  quantiteAcquisitionStock3: number=0;

  quantiteDotationStock1: number=0;
  quantiteDotationStock2: number=0;
  quantiteDotationStock3: number=0;

  pourcentage1: number=0;
  pourcentage2: number=0;
  pourcentage3: number=0;

  quantiteCorrectionStock1: number=0;
  quantiteCorrectionStock2: number=0;
  quantiteCorrectionStock3: number=0;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DetailsStockLaitComponent>,
    private suiviStockService: SuiviStockService
  ) { }

  ngOnInit() {
    // this.defaults = {} as Interim;
    this.stock = this.defaults;
    this.getSuiviStocks();
  }

  getSuiviStocks() {
    this.suiviStockService.getAll().subscribe(
      (response) => {
        this.suiviStocks = response.body;
        this.suiviStocks = this.suiviStocks.filter(s => s.stock.id === this.stock.id);

        //**Filter le Stock par catégorie et par operation */
        this.suiviStocksAcquisitionCat1 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 1' && s.operation === 'acquisition')
        this.suiviStocksAcquisitionCat2 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 2' && s.operation === 'acquisition');
        this.suiviStocksAcquisitionCat3 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 3' && s.operation === 'acquisition');
        //**Quantité Stock 1 */
        this.suiviStocksAcquisitionCat1.forEach(
          a => {
            this.quantiteAcquisitionStock1 += a.quantite;
          }
        );

        //**Quantité Stock 2 */
        this.suiviStocksAcquisitionCat2.forEach(
          a => {
            this.quantiteAcquisitionStock2 += a.quantite;
          }
        );

        //**Quantité Stock 3 */
        this.suiviStocksAcquisitionCat3.forEach(
          a => {
            this.quantiteAcquisitionStock3 += a.quantite;
          }
        );

         //**Filter le Stock par catégorie et par operation */
         this.suiviStocksDotationCat1 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 1' && s.operation === 'attribution')
         this.suiviStocksDotationCat2 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 2' && s.operation === 'attribution');
         this.suiviStocksDotationCat3 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 3' && s.operation === 'attribution');
         //**Quantité Stock 1 */
         this.suiviStocksDotationCat1.forEach(
           a => {
             this.quantiteDotationStock1 += a.quantite;
           }
         );
 
         //**Quantité Stock 2 */
         this.suiviStocksDotationCat2.forEach(
           a => {
             this.quantiteDotationStock2 += a.quantite;
           }
         );
 
         //**Quantité Stock 3 */
         this.suiviStocksDotationCat3.forEach(
           a => {
             this.quantiteDotationStock3 += a.quantite;
           }
         );


         

          //**Filter le Stock par catégorie et par operation */
          this.suiviStocksCorrectionCat1 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 1' && s.operation === 'correction')
          this.suiviStocksCorrectionCat2 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 2' && s.operation === 'correction');
          this.suiviStocksCorrectionCat3 = this.suiviStocks.filter(s => s.categorieLait.libelle === 'NAN 3' && s.operation === 'correction');
          //**Quantité Stock 1 */
          this.suiviStocksCorrectionCat1.forEach(
            a => {
              this.quantiteCorrectionStock1 += a.quantite;
            }
          );
  
          //**Quantité Stock 2 */
          this.suiviStocksCorrectionCat2.forEach(
            a => {
              this.quantiteCorrectionStock2 += a.quantite;
            }
          );
  
          //**Quantité Stock 3 */
          this.suiviStocksCorrectionCat3.forEach(
            a => {
              this.quantiteCorrectionStock3 += a.quantite;
            }
          );

       //**Calcul Total */
       
       this.quantiteTotalSock1 = this.quantiteAcquisitionStock1 - this.quantiteDotationStock1 + this.quantiteCorrectionStock1;
       this.quantiteTotalSock2 = this.quantiteAcquisitionStock2 - this.quantiteDotationStock2 + this.quantiteCorrectionStock2;
       this.quantiteTotalSock3 = this.quantiteAcquisitionStock3 - this.quantiteDotationStock3 + this.quantiteCorrectionStock3;

      //**Calcul Pourcentage */
      
      },
      (err) => {
      },
      () => {
      }
    );
  }
}
