
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
        text: ['Décision ',{ text: 'accordant une indemnité différentielle', bold: false},' \n '+titreAgentArrive+' \n ',
        '',{text: agentArrivee.prenom+' '+agentArrivee.nom +' ,'+agentArrivee.fonction.nom, bold:true, fontSize: 14},' \n\n\n'
      ],
        style: 'header',
        alignment: 'center'
      },
      {
        margin: [10, 30, 0, 0],
        text: [{text: 'LE DIRECTEUR GENERAL DU PORT AUTONOME DE DAKAR \n\n', bold: true} ,
        'Vu la Constitution ; \n Vu la loi 87 - 28 du 18 août 1987 autorisant la création de la Société \n ',
        'Nationale du Port Autonome de Dakar, modifiée ; \n',
        'Vu la loi 90 - 07 du 26 juin 1990 relative à l\'organisation et au contrôle des \n',
        'entreprises du Secteur para - public et des personnes morales de droit privé \n',
        'bénéficiant du concours financier de la puissance publique; \n',
        'Vu la loi 97 - 17 du 1er décembre 1997 portant Code du Travail, modifiée ; \n',
        'Vu le décret n° 2014-1213 du 22 septembre 2014 portant appròbation des \n',
        'statuts modifiés de la Nationale du Port Autonome de Dakar; \n',
        'Vu le décret 2017- 1551 du 11 septembre 2017 portant nomination du \n',
        'Directeur Général de la Société Nationale du Port autonome de Dakar; \n',
        'Vu la Convention Collective du Port Autonome de Dakar du 03 juin 2004 ; \n',
        'Vu la délibération n° 00002PAD/CA/PCA du 10 janvier 2019 portant \n',
        'adoption du projet de modification partielle de l\'organigramme de la \n',
        'Direction Générale ; \n',
        'Vu la délibération nº 00003PAD/CA/PCA 10 janvier 2019 portant adoption \n',
        'd\'un nouvel organigramme de la Société Nationale du Port Autonome de \nDakar ;',


        '\nVu la délibération n° 00010PAD/CA/PCA du 04 novembre 2019 portant \n',
        'adoption d\'un nouvel organigramme de la Société Nationale du Port\n',
        'Autonome de Dakar; \n',
        'Vu la décision n° 003940PAD/DG du 20 décembre 2019 portant \n',
        'réorganisation de la Direction Générale de la Société Nationale du Port \n',
        'Autonome de Dakar, modifiée par la décision nº 001091PAD/DG du 02 mars 2020; \n',
        'Vu la décision n°003978PAD/DG du 20 décembre 2019 portant nomination \n',
        'de Responsables à la Direction Générale, notamment le Directeur du Capital Humain; \n',
        'Vu la décision n°004766 PAD/DG/DCH/DAP du 09 juillet 2020 portant \n',
        'nomination d\'agents à la direction du capital humain ;\n',
        '\nVu la note d\'intérim n° 00134 PAD/DG/CQHSE du 03 septembre 2020; \n'
        ],
        style: 'content'
      },
      {
        margin: [200, 20, 0, 0],
        text: ':- D E C I D E -:-',
        fontSize: 14,
      },
      {
        margin: [10, 30, 0, 0],
        text: [{text: 'ARTICLE PREMIER :', bold: true, decoration: 'underline'} ,
        '\n' + titreAgentArrive, {text: ' ' + agentArrivee.prenom + ' ' + agentArrivee.nom, bold: true}, ' matricule de solde ', {text: agentArrivee.matricule, bold: true}, ', ',{text: '.. .. ..', bold: true},', qui a assuré \n',
        'l\'intérim de ' + titreAgentDepart + ' ',{text: agentDepart.prenom + ' ' + agentDepart.nom , bold: true}, ', matricule de solde ',{text: agentDepart.matricule, bold: true},', percevra \n',
        'une indemnité égale à la différence entre son salaire et celui du titulaire au \n',
        'poste pour la période allant du ',{text: dateDepart, bold: true},' au ',{text: dateRetour + ' inclus.', bold: true}
      ],
        fontSize: 14,
      },
      {
        margin: [10, 20, 0, 0],
        text: [{text: 'ARTICLE II :\n', bold: true, decoration: 'underline'} ,
        'Le Directeur du Capital Humain et le Directeur Financier et Comptable sont \n',
        'chargés de l\'exécution de la présente décision. \n',
        ''
        ],
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
        'Dakar, le '+date+' \n\n',
        'Le Directeur Général SNPAD'
        ],
        fontSize: 14,
        bold: true,
        alignment: 'right'
        
      },
      {
        margin: [0, 120, 0, 0],
        text: [
        'ABOUBACAR SEDIKH BEYE'
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