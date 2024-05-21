
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Interim } from 'src/app/pages/gestion-interim/shared/model/interim.model';

import {formatDate} from "../formatageDate";

export let genererPDFInterim = function (interim: Interim) {

  let agentDepart = interim.agentDepart
  let agentArrivee = interim.agentArrive
  let titreAgentDepart = interim.agentDepart.sexe.toLowerCase() == 'm' ? 'Monsieur' : interim.agentDepart.matrimoniale.toLowerCase() == 'marié(e)' ? 'Madame' : 'Mademoiselle'
  let titreAgentArrive = interim.agentArrive.sexe.toLowerCase() == 'm' ? 'Monsieur' : interim.agentArrive.matrimoniale.toLowerCase() == 'marié(e)' ? 'Madame' : 'Mademoiselle'
  let dateDepart = formatDate(new Date(interim.dateDepart))
  let dateRetour = formatDate(new Date(interim.dateRetour))
  let date = formatDate(new Date())
  let numero = interim.id
  
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  var docDefinition = {
    content: [
      {
        margin: 20,
        columns: [
          // {
          //   image: 'icon.png',
          //   width: 60
          // },
          {
            margin: [10, 0, 0, 0],
            width: 290,
            height: 100,
            fontSize: 10,
            bold: true,
            text: 'PORT AUTONOME DE DAKAR \nDIRECTION DU CAPITAL HUMAIN\nDIVISION DE L\'ADMINISTRATION DU PERSONNEL',
          },
          {
            margin: [0, 0, 0, 0],
            text: 'N '+numero+' PAD/DG/DCH/DAP',
            fontSize: 10,
          }
        ]

      },
      {
        margin: [0, 60, 0, 0],
        text: ['NOTE ',{ text: 'D\'INTERIM', bold: false}
      ],
        style: 'header',
        alignment: 'center'
      },
      {
        margin: [10, 30, 0, 0],
        text: [
          'Pendant l\'absence de Monsieur Mouhamadoul Habib GNANG,\n',
          'Cordonnateur de la  Cellule Audit Interne (CAI), du 27 février au 02 mars\n',
          '2020 inclus,l\' sera assuré par Monsieur Mouhamadou Moussa LY,Adjoint\n',
          'au Coordonnateur,chargé de la supervision des missions d\'audit .\n\n',
          
          'Il est chargé de la signature des documents administratifs sous le timbre \n',
          'Pour le Coodornnateur de la Cellule Audit Interne et Management des \n',
          'Risques, le Coordonnateur Adjoint'
        ],
        style: 'content'
      },
      {
        margin: [200, 20, 0, 0],
        text: ':- D E C I D E -:-',
        fontSize: 14,
      },
     

      {
        margin: [10, 20, 0, 0],
        text: [{text: 'AMPLIATIONS :\n', bold: true, decoration: 'underline'} ,
        '1 DG \n1 Intéressée \n2 DCH / DFC \n1 DP / DAP \n1 CQHE \n4 Classeur'
        ],
        fontSize: 14,
        bold: true,
        
      },
      {
        margin: [0, -80, 10, 0],
        text: [
        'POUR LE DIRECTEUR GENERAL \n',
        'ET PAR INTERIM LE SECRETAIRE GENERAL\n\n\n\n\n\n\n',
     
        
        ],
        fontSize: 14,
        bold: true,
        alignment: 'right'
        
      },
      {
        margin: [0, 120, 0, 0],
        text: [
          'Mme Nafissatou BA NIANG'
        ],
        fontSize: 14,
        bold: true,
        alignment: 'right'
        
      }
    ],

    styles: {
      header: {
        fontSize: 20,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      },
      content: {
        fontSize: 13,
        lineHeight: 1.5,
        alignment: 'justify',
      }
    }
  }
  pdfMake.createPdf(docDefinition).open();
}