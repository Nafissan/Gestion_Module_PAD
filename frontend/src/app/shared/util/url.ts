import { SidenavItem } from "src/app/layout/sidenav/sidenav-item/sidenav-item.interface";

export let menus = [
  {
    id: 1,
    name: "Gestion Attestation",
    icon: "settings",
    position: 6,
    parent: null,
    privilege: "MENU_GESTION_ATTESTATION",
  },

  {
    id: 2,
    name: "Demande Attestation",
    icon: "list",
    routeOrFunction: "/gestion-attestation/demande-attestation",
    position: 5,
    privilege: "MENU_DEMANDE_ATTESTATION",

    parent: {
      id: 1,
      name: "Gestion Attestation",
      icon: "settings",
      position: 40,
      parent: null,
      privilege: "MENU_Gestion_Attestation",
    },
  },

  {
    id: 3,
    name: "Suivi Attestation",
    routeOrFunction: "/gestion-attestation/suivi-attestation",
    position: 5,
    privilege: "MENU_SUIVI_ATTESTATION",
    parent: {
      id: 1,
      name: "Gestion Attestation",
      icon: "settings",
      position: 40,
      parent: null,
      privilege: "MENU_Gestion_Attestation",
    },
  },

  {
    id: 4,
    name: "Gestion Conges",
    icon: "settings",
    position: 7,
    privilege: "MENU_GESTION_CONGE",
    parent: null,
  },

  {
    id: 5,
    name: "Planification",
    icon: "calendar_today",
    position: 5,
    privilege: "MENU_PLANNIFICATION",
    parent: {
      id: 4,
      name: "Gestion Conges",
      icon: "settings",
      position: 20,
      privilege: "MENU_GESTION_CONGE",
      parent: null,
    },
  },

  {
    id: 6,
    name: "Dossier Conge",
    routeOrFunction: "/gestion-conge/dossier-conge",
    position: 5,
    privilege: "MENU_DOSSIER_CONGE",
    parent: {
      id: 5,
      name: "Planification",
      icon: "calendar_today",
      position: 5,
      privilege: "MENU_PLANNIFICATION",
      parent: null,
    },
  },

  {
    id: 7,
    name: "Planning Direction",
    routeOrFunction: "/gestion-conge/planning-direction",
    position: 10,
    privilege: "MENU_PLANNING_DIRECTION",
    parent: {
      id: 5,
      name: "Planification",
      icon: "calendar_today",
      position: 5,
      privilege: "MENU_PLANNIFICATION",
      parent: null,
    },
  },

  {
    id: 8,
    name: "Conge",
    routeOrFunction: "/gestion-conge/conge",
    position: 10,
    privilege: "MENU_CONGE",
    parent: {
      id: 5,
      name: "Planification",
      icon: "calendar_today",
      position: 5,
      privilege: "MENU_PLANNIFICATION",
      parent: null,
    },
  },

  {
    id: 9,
    name: "Suivi Conge",
    position: 5,
    icon: "hourglass_empty",
    privilege: "MENU_SUIVI_CONGE",
    parent: {
      id: 4,
      name: "Gestion Conges",
      icon: "settings",
      position: 20,
      privilege: "MENU_GESTION_CONGE",
      parent: null,
    },
  },

  {
    id: 10,
    name: "Validation Conge",
    position: 5,
    routeOrFunction: "/gestion-conge/suivi-conge",
    privilege: "MENU_VALIDATION_CONGE",
    parent: {
      id: 9,
      name: "Suivi Conge",
      position: 5,
      privilege: "MENU_SUIVI_CONGE",
      parent: null,
    },
  },

  {
    id: 11,
    name: "Envoi Planning",
    position: 10,
    privilege: "MENU_ENVOI_PLANNING",
    routeOrFunction: "/gestion-conge/envoi-planning",
    parent: {
      id: 9,
      name: "Suivi Conge",
      position: 5,
      privilege: "MENU_SUIVI_CONGE",
      parent: null,
    },
  },

  {
    id: 12,
    name: "Valider Planning",
    position: 15,
    privilege: "MENU_VALIDER_PLANNING",
    routeOrFunction: "/gestion-conge/valider-planning",
    parent: {
      id: 9,
      name: "Suivi Conge",
      position: 5,
      privilege: "MENU_SUIVI_CONGE",
      parent: null,
    },
  },

  {
    id: 14,
    name: "Gestion Comptes",
    icon: "settings",
    position: 1,
    privilege: "MENU_GESTION_COMPTE",
    parent: null,
  },

  {
    id: 15,
    name: "Comptes",
    icon: "security",
    routeOrFunction: "/gestion-utilisateurs/compte",
    position: 5,
    privilege: "MENU_COMPTE",
    parent: {
      id: 14,
      name: "Gestion Comptes",
      icon: "settings",
      position: 10,
      privilege: "MENU_GESTION_COMPTE",
      parent: null,
    },
  },

  {
    id: 16,
    name: "Roles",
    icon: "masks",
    routeOrFunction: "/gestion-utilisateurs/role",
    position: 10,
    privilege: "MENU_ROLE",
    parent: {
      id: 14,
      name: "Gestion Comptes",
      icon: "settings",
      position: 10,
      privilege: "MENU_GESTION_COMPTE",
      parent: null,
    },
  },

  {
    id: 17,
    name: "Espace Agent",
    icon: "settings",
    position: 5,
    privilege: "MENU_ESPACE_AGENT",
    parent: null,
  },

  {
    id: 18,
    name: "Mon espace privé",
    icon: "account_circle",
    routeOrFunction: "/espace-salaries-pad/informations-agents",
    position: 22,
    privilege: "MENU_ESPACE_PRIVE",
    parent: {
      id: 17,
      name: "Espace Agent",
      icon: "settings",
      position: 6,
      privilege: "MENU_ESPACE_AGENT",
      parent: null,
    },
  },

  {
    id: 19,
    name: "Gestion Agents",
    icon: "settings",
    position: 3,
    privilege: "MENU_GESTION_AGENT",
    parent: null,
  },

  {
    id: 20,
    name: "Agent",
    icon: "groups",
    routeOrFunction: "/gestion-personnel/agent",
    privilege: "MENU_AGENT",
    position: 5,
    parent: {
      id: 19,
      name: "Gestion Agents",
      icon: "settings",
      position: 15,
      privilege: "MENU_GESTION_AGENT",
      parent: null,
    },
  },

  {
    id: 21,
    name: "Gestion Unite Org.",
    icon: "settings",
    position: 2,
    privilege: "MENU_GESTION_UNITE_ORG",
    parent: null,
  },

  {
    id: 22,
    name: "Niveau Hiérarchique",
    icon: "leaderboard",
    routeOrFunction: "/gestion-unite-organisationnelle/niveau-hierarchique",
    position: 5,
    privilege: "MENU_NIVEAU_HIERACHIQUE",
    parent: {
      id: 21,
      name: "Gestion Unite Org.",
      icon: "settings",
      position: 30,
      privilege: "MENU_GESTION_UNITE_ORG",
      parent: null,
    },
  },

  {
    id: 23,
    name: "Unité Organisationnelle",
    icon: "business",
    routeOrFunction: "/gestion-unite-organisationnelle/unite-organisationnelle",
    position: 10,
    privilege: "MENU_UNITE_ORGANISATIONNELLE",
    parent: {
      id: 21,
      name: "Gestion Unite Org.",
      icon: "settings",
      position: 30,
      privilege: "MENU_GESTION_UNITE_ORG",
      parent: null,
    },
  },

  {
    id: 24,
    name: "Fonction",
    icon: "work",
    routeOrFunction: "/gestion-unite-organisationnelle/fonction",
    position: 20,
    privilege: "MENU_FONCTION",
    parent: {
      id: 21,
      name: "Gestion Unite Org.",
      icon: "settings",
      position: 30,
      privilege: "MENU_GESTION_UNITE_ORG",
      parent: null,
    },
  },

  {
    id: 25,
    name: "Gestion Absence",
    icon: "settings",
    position: 5,
    privilege: "MENU_GESTION_ABSENCE",
    parent: null,
  },

  {
    id: 35,
    name: "Demande d'absence",
    icon: "call_missed_outgoing",
    routeOrFunction: "/gestion-absence/absence",
    position: 15,
    privilege: "MENU_DEMANDE_ABSENCE",
    parent: {
      id: 25,
      name: "Gestion Absence",
      icon: "settings",
      position: 25,
      privilege: "MENU_GESTION_ABSENCE",
      parent: null,
    },
  },
  {
    id: 26,
    name: "Motif Absence",
    icon: "help_outline",
    routeOrFunction: "/gestion-absence/motif-absence",
    position: 30,
    privilege: "MENU_MOTIF_ABSENCE",
    parent: {
      id: 25,
      name: "Gestion Absence",
      icon: "settings",
      position: 25,
      privilege: "MENU_GESTION_ABSENCE",
      parent: null,
    },
  },
  {
    id: 27,
    name: "Suivi Absence",
    icon: "hourglass_empty",
    position: 25,
    privilege: "MENU_SUIVI_ABSENCE",
    parent: {
      id: 25,
      name: "Gestion Absence",
      icon: "settings",
      position: 25,
      privilege: "MENU_GESTION_ABSENCE",
      parent: null,
    },
  },
  {
    id: 28,
    name: "Validation Absence",
    routeOrFunction: "/gestion-absence/etape-absence",
    position: 20,
    privilege: "MENU_VALIDATION_ABSENCE",
    parent: {
      id: 27,
      name: "Suivi Absence",
      position: 25,
      privilege: "MENU_SUIVI_ABSENCE",
      parent: null,
    },
  },
  {
    id: 29,
    name: "Validation Absence DCH",
    routeOrFunction: "/gestion-absence/valider-absence",
    position: 30,
    privilege: "MENU_VALIDATION_ABSENCE_DCH",
    parent: {
      id: 27,
      name: "Suivi Absence",
      position: 25,
      privilege: "MENU_SUIVI_ABSENCE",
      parent: null,
    },
  },
  {
    id: 30,
    name: "Absence Direction",
    routeOrFunction: "/gestion-absence/suivi-absence",
    position: 40,
    privilege: "MENU_ABSENCE_DIRECTION",
    parent: {
      id: 27,
      name: "Suivi Absence",
      position: 25,
      privilege: "MENU_SUIVI_ABSENCE",
      parent: null,
    },
  },

  {
    id: 36,
    name: "Mes Demandes Traitées",
    routeOrFunction: "/gestion-absence/etape-absence/demande-traitee",
    position: 50,
    privilege: "MENU_VALIDATION_ABSENCE_DCH",
    parent: {
      id: 27,
      name: "Suivi Absence",
      position: 25,
      privilege: "MENU_SUIVI_ABSENCE",
      parent: null,
    },
  },
  {
    id: 36,
    name: "Mes Demandes Traitées",
    routeOrFunction: "/gestion-absence/etape-absence/demande-traitee",
    position: 50,
    privilege: "MENU_VALIDATION_ABSENCE",
    parent: {
      id: 27,
      name: "Suivi Absence",
      position: 25,
      privilege: "MENU_SUIVI_ABSENCE",
      parent: null,
    },
  },
  {
    id: 31,
    name: "Gestion Interim",
    icon: "settings",
    position: 8,
    privilege: "MENU_GESTION_INTERIM",
    parent: null,
  },
  {
    id: 32,
    name: "Interim",
    icon: "list",
    routeOrFunction: "/gestion-interim/interim",
    position: 5,
    privilege: "MENU_INTERIM",
    parent: {
      id: 31,
      name: "Gestion Interim",
      icon: "settings",
      position: 35,
      privilege: "MENU_GESTION_INTERIM",
      parent: null,
    },
  },
  {
    id: 33,
    name: "Suivi Interim",
    routeOrFunction: "/gestion-interim/etape-interim",
    position: 5,
    privilege: "MENU_SUIVI_INTERIM",
    parent: {
      id: 31,
      name: "Gestion Interim",
      icon: "settings",
      position: 35,
      privilege: "MENU_GESTION_INTERIM",
      parent: null,
    },
  },
  {
    id: 34,
    name: "Dossier Interim",
    icon: "list",
    routeOrFunction: "/gestion-interim/dossier-interim",
    position: 5,
    privilege: "MENU_DOSSIER_INTERIM",
    parent: {
      id: 31,
      name: "Gestion Interim",
      icon: "settings",
      position: 35,
      privilege: "MENU_GESTION_INTERIM",
      parent: null,
    },
  },
  {
    id: 35,
    name: "Paramétrage",
    icon: "settings",
    routeOrFunction: "/parametrage",
    position: 5,
    privilege: "MENU_PARAMETRAGE"
  },
  {
    id: 36,
    name: "Continents",
    routeOrFunction: "/parametrage/continent",
    icon: "list",
    position: 5,
    privilege: "MENU_CONTINENT",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 37,
    name: "Pays",
    routeOrFunction: "/parametrage/pays",
    icon: "list",
    position: 5,
    privilege: "MENU_PAYS",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 38,
    name: "Zones",
    routeOrFunction: "/parametrage/zone",
    icon: "list",
    position: 5,
    privilege: "MENU_ZONE",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 39,
    name: "Villes",
    routeOrFunction: "/parametrage/ville",
    icon: "list",
    position: 5,
    privilege: "MENU_VILLE",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage/ville",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 40,
    name: "Types de Partenariat",
    routeOrFunction: "/parametrage/type-partenariat",
    icon: "list",
    position: 5,
    privilege: "MENU_TYPE_PARTENAIRE",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage/type-partenariat",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 41,
    name: "Gestion partenariat",
    icon: "settings",
    routeOrFunction: "/gestion-partenariat",
    position: 5,
    privilege: "MENU_GESTION_PARTENARIAT",
    parent: null
  },
  {
    id: 42,
    name: "Propects - Partenaires",
    icon: "list",
    routeOrFunction: "/gestion-partenariat/partenariat",
    position: 5,
    privilege: "MENU_PARTENARIAT",
    parent :   {
      id: 41,
      name: "Gestion partenariat",
      icon: "list",
      routeOrFunction: "/gestion-partenariat",
      position: 5,
      privilege: "MENU_GESTION_PARTENARIAT"
    },
  },
  {
    id: 43,
    name: "Conventions",
    icon: "list",
    routeOrFunction: "/gestion-partenariat/convention",
    position: 5,
    privilege: "MENU_CONVENTION",
    parent :   {
      id: 41,
      name: "Gestion partenariat",
      icon: "list",
      routeOrFunction: "/gestion-partenariat",
      position: 5,
      privilege: "MENU_GESTION_PARTENARIAT"
    },
  },
  {
    id: 44,
    name: "Plan de prospection",
    icon: "list",
    routeOrFunction: "/gestion-partenariat/plan-prospection",
    position: 5,
    privilege: "MENU_PLAN_PROSPECTION",
    parent :   {
      id: 41,
      name: "Gestion partenariat",
      icon: "list",
      routeOrFunction: "/gestion-partenariat",
      position: 5,
      privilege: "MENU_GESTION_PARTENARIAT"
    },
  },
  {
    id: 45,
    name: "Gestion activité",
    routeOrFunction: "/gestion-activite",
    icon: "settings",
    position: 5,
    privilege: "MENU_GESTION_ACTIVITE"
  },
  {
    id: 46,
    name: "Activités",
    routeOrFunction: "/gestion-activite/activite",
    icon: "list",
    position: 5,
    privilege: "MENU_ACTIVITE",
    parent :   {
      id: 45,
      name: "Gestion activité",
      routeOrFunction: "/gestion-activite",
      position: 5,
      privilege: "MENU_GESTION_ACTIVITE"
    },
  },
  {
    id: 47,
    name: "Evénements",
    routeOrFunction: "/gestion-activite/evenement",
    icon: "list",
    position: 5,
    privilege: "MENU_EVENEMENT",
    parent :   {
      id: 45,
      name: "Gestion activité",
      routeOrFunction: "/gestion-activite",
      position: 5,
      privilege: "MENU_GESTION_ACTIVITE"
    },
  },
  {
    id: 48,
    name: "Type dotation",
    routeOrFunction: "/parametrage/type-dotation-lait",
    position: 5,
    privilege: "MENU_TYPE_DOTATION_LAIT",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage/type-dotation-lait",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 49,
    name: "Fournisseur Lait",
    routeOrFunction: "/parametrage/fournisseur-lait",
    position: 5,
    privilege: "MENU_FOURNISSEUR_LAIT",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage/fournisseur-lait",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    },
  },
  {
    id: 50,
    name: "Marque Lait",
    routeOrFunction: "/parametrage/marque-lait",
    position: 5,
    privilege: "MENU_MARQUE_LAIT",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage/marque-lait",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    },
  },
  {
    id: 51,
    name: "Categorie Lait",
    routeOrFunction: "/parametrage/categorie-lait",
    
    position: 5,
    privilege: "MENU_CATEGORIE_LAIT",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage/categorie-lait",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    },
  },
  {
    id: 52,
    name: "Dotation de lait",
    routeOrFunction: "/dotation",
    icon: "list",
    position: 5,
    privilege: "MENU_DOTATION"
  },
  {
    id: 53,
    name: "Demande",
    routeOrFunction: "/dotation/demande-lait",
    // icon: "list",
    position: 5,
    privilege: "MENU_DEMANDE_LAIT",
    parent: {
      id: 52,
      name: "Dotation de lait",
      routeOrFunction: "/dotation",
      icon: "list",
      position: 5,
      privilege: "MENU_DOTATION"
    },
  },
  {
    id: 54,
    name: "Stock",
    routeOrFunction: "/dotation/stock-lait",
    // icon: "list",
    position: 5,
    privilege: "MENU_STOCK_LAIT",
    parent: {
      id: 52,
      name: "Dotation de lait",
      routeOrFunction: "/dotation",
      icon: "list",
      position: 5,
      privilege: "MENU_DOTATION"
    },  
    
  }, {
    id: 55,
    name: "Comité",
    icon: "list",
    routeOrFunction: "/gestion-partenariat/comite",
    position: 5,
    privilege: "MENU_COMITE",
    parent :   {
      id: 41,
      name: "Gestion partenariat",
      icon: "list",
      routeOrFunction: "/gestion-partenariat",
      position: 5,
      privilege: "MENU_GESTION_PARTENARIAT"
    },
  }, {
    id: 56,
    name: "Point Focal",
    icon: "list",
    routeOrFunction: "/gestion-partenariat/pointfocal",
    position: 5,
    privilege: "MENU_POINTFOCAL",
    parent :   {
      id: 41,
      name: "Gestion partenariat",
      icon: "list",
      routeOrFunction: "/gestion-partenariat",
      position: 5,
      privilege: "MENU_GESTION_PARTENARIAT"
    },
  },
  {
    id: 58,
    name: "Domaine",
    icon: "list",
    routeOrFunction: "/parametrage/domaine",
    position: 5,
    privilege: "MENU_DOMAINE",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  {
    id: 59,
    name: "Validation Dotation",
    routeOrFunction: "/dotation/suivi-demande-lait",
    position: 5,
    privilege: "MENU_STOCK_LAIT",
    parent: {
      id: 52,
      name: "Dotation de lait",
      routeOrFunction: "/dotation",
      icon: "list",
      position: 5,
      privilege: "MENU_DOTATION"
    },
  },
  {
    id: 63,
    name: "Tableau de bord Dotation",
    routeOrFunction: "/dotation/dashboard-lait",
    icon: "settings",
    position: 1,
    pathMatchExact: true,
    parent: null,
    privilege: "MENU_STOCK_LAIT",
  },
  {
    id: 61,
    name: "Tableau de bord Partenariat",
    routeOrFunction: "/dashboards/partenariat",
    icon: "settings",
    position: 1,
    pathMatchExact: true,
    parent: null,
    privilege: "MENU_DASHBOARD_CONVENTION"
  },
  {
    id: 62,
    name: "Tableau de bord Portail",
    routeOrFunction: "/dashboard",
    icon: "settings",
    position: 4,
    pathMatchExact: true,
    parent: null,
    privilege: "MENU_DASHBOARD"
  },

  {
    id: 63,
    name: "Invalidation Dotation",
    routeOrFunction: "/dotation/suivi-demande-lait",
    icon: "settings",
    position: 1,
    pathMatchExact: true,
    parent: null,
    privilege: "INVALIDER_ATTRIBUTION"
  },
  {
    id: 64,
    name: "Notifications",
    routeOrFunction: "/parametrage/notification",
    icon: "list",
    position: 5,
    privilege: "MENU_NOTIFICATION",
    parent: {
      id: 35,
      name: "Paramétrage",
      routeOrFunction: "/parametrage",
      position: 5,
      privilege: "MENU_PARAMETRAGE",
      parent: null,
    }
  },
  
];

export let getMenu = function (privileges) {
  //TODO: Filtrage menu selon les privileges : Décommenter ligne suivante pour l'activer
  let newMenu = menus
  newMenu = newMenu.filter((menu) => privileges.includes(menu.privilege))
  newMenu = newMenu.sort((a, b) => (a.id > b.id ? 1 : -1));
  return formatdata(newMenu, undefined);
};

export let formatdata = function (data, root) {
  let t = {};
  if (!data) return data;
  data.forEach((element) => {
    Object.assign((t[element.id] = t[element.id] || {}), element);
    if (element.parent == null) {
      element.parent = new SidenavItem(element);
      element.parent.id = undefined;
    }
    t[element.parent.id] = t[element.parent.id] || {};
    t[element.parent.id].subItems = t[element.parent.id].subItems || [];
    t[element.parent.id].subItems.push(t[element.id]);
  });

  return t[root].subItems;
};
