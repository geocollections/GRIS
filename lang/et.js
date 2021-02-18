export default {
  common: {
    general: 'Üldinfo',
    pictures: 'Pildid',
    noValue: '-',
    title: 'Eesti Geokogude Portaal',
    previous: 'Eelmine',
    next: 'Järgmine',
    links: 'Lingid',
    search: 'Otsing',
    small: 'Väike',
    medium: 'Keskmine',
    large: 'Suur',
    original: 'Originaal',
    linkToEdit: 'Muuda kirjet',
  },
  link: {
    sarvAPI: 'Avalik API',
    github: 'GitHub',
    fossils: 'Baltoskandia fossiilid',
    sarvDOI: 'SARV-DOI teadusandmete repositoorium',
    eurocore: 'EUROCORE puursüdamike portaal',
    chitinozoa: 'Kitiinikute andmebaas',
    turvas: 'Turbauuringute andmebaas',
    geokirjandus: 'Eesti maapõue kirjandus',
    geokogud: 'Geokogude portaal',
  },
  locality: {
    locality: 'Lokaliteet',
    country: 'Riik',
    countryFormat: '{name}',
    latitude: 'Lat',
    longitude: 'Long',
    depth: 'Sügavus',
    elevation: 'Kõrgus',
    coordx: 'X (m)',
    coordy: 'Y (m)',
    epsg: 'EPSG',
    name: 'Nimi',
    type: 'Tüüp',
    parish: 'Vald',
    settlement: 'Asutusüksus',
    coordinateMethod: 'Koord. meetod',
    coordinateAgent: 'Koord. määraja',
    locationRemarks: 'Asukoha kirjeldus',
    stratigraphyTop: 'Strat. algus',
    stratigraphyBase: 'Strat. lõpp',
    remarks: 'Lisainfo',
    map: 'Kaart',
    synonyms: 'Sünonüümid ({number})',
    specimens: 'Eksemplarid ({number})',
    references: 'Kirjandus ({number})',
    attachments: 'Failid ({number})',
    samples: 'Proovid ({number})',
    stratotypes: 'Stratotüübid ({number})',
    coordinateSystem: 'Kordinaatsüsteem',
    coordinateX: 'X',
    coordinateY: 'Y',
    coordinatePrecision: 'Koordinaatide täpsus',
    descriptions: 'Kirjeldused ({number})',
    drillcore: 'Puursüdamik',
  },

  localitySynonym: {
    synonym: 'Sünonüüm',
    pages: 'Leheküljed',
    reference: 'Viide',
    remarks: 'Lisainfo',
  },
  drillcore: {
    id: 'ID',
    name: 'Nimi',
    boxes: 'Südamikukaste',
    depository: 'Hoidla',
    remarks: 'Lisainfo',
    storage: 'Hoiukoht',
    driller: 'Puurija',
    year: 'Puurimise aasta',
    metersInBox: 'Meetreid kastis',
    boxNumbers: 'Kastinumbrid',
    drillcoreBoxesTitle: 'Kastid ({number})',
    localityDescriptions: 'Kirjeldused ({number})',
    localityReferences: 'Kirjandus ({number})',
    attachments: 'Failid ({number})',
    samples: 'Proovid ({number})',
    analyses: 'Analüüsid ({number})',
    specimens: 'Eksemplarid ({number})',
  },
  drillcoreBox: {
    id: 'ID',
    drillcore: 'Puursüdamik',
    nr: 'Kast nr {number}',
    depthStart: 'Algus (m)',
    depthEnd: 'Lõpp (m)',
    depthOther: 'Muud sügavused',
    stratigraphyBaseFree: 'Strat. algus (tekst)',
    stratigraphyTopFree: 'Strat. lõpp (tekst)',
    stratigraphyTop: 'Strat. algus',
    stratigraphyBase: 'Strat. lõpp',
    remarks: 'Lisainfo',
    diameter: 'Diameeter',
    author: 'Foto autor',
    date: 'Foto kuupäev',
  },
  localityDescription: {
    stratigraphy: 'Stratigraafia',
    depthBase: 'Kuni (m)',
    depthTop: 'Alates (m)',
    thickness: 'Paksus (m)',
    rock: 'Kivim',
    description: 'Kirjeldus',
    author: 'Autor',
  },
  localityReference: {
    reference: 'Kirje',
    remarks: 'Lisainfo',
    pages: 'Lk',
    referenceTitle: 'Pealkiri',
  },
  attachment: {
    author: 'Autor',
    description: 'Kirjeldus',
  },
  samples: {
    id: 'ID',
    number: 'Nr',
    depth: 'Sügavus',
    depthInterval: 'Süg. kuni',
    stratigraphy: 'Stratigraafia',
    collector: 'Koguja',
    dateCollected: 'Kogumise aeg',
    thickness: 'Paksus',
  },
  analysis: {
    id: 'ID',
    sampleNumber: 'Proovi nr',
    depth: 'Sügavus',
    depthInterval: 'Süg. kuni',
    method: 'Metoodika',
    methodDetails: 'Met. detailid',
    analysedBy: 'Isik/asutus',
    date: 'Aeg',
    thickness: 'Paksus',
  },
  specimen: {
    id: 'ID',
    number: 'Nr',
    depth: 'Sügavus',
    depthInterval: 'Süg. kuni',
    fossilGroup: 'Fossiilirühm',
    kind: 'Tüüp',
    stratigraphy: 'Stratigraafia',
    taxon: 'Takson',
    thickness: 'Paksus',
  },
  stratotype: {
    stratigraphy: 'Stratigraafia',
    type: 'Tüüp',
    depthTop: 'Alates (m)',
    depthBase: 'Kuni (m)',
    reference: 'Viide',
    remarks: 'Lisainfo',
  },
  area: {
    id: 'ID',
    areaType: 'Ala tüüp',
    maakond: 'Maakond',
    areaHa: 'Ala (ha)',
    depositAreaHa: 'Maardla (ha)',
    description: 'Iseloomustus',
    egf: 'EGF',
    maardla: 'Maardla (viide registrisse)',
    eelis: 'Looduskaitse (viide registrisse)',
    text1: 'Turbaala plaan',
    maardlaLink: 'Maardla info Maa-ameti geoportaalis',
    sites: 'Proovipunktid ({number})',
    localityReferences: 'Kirjandus ({number})',
  },
  site: {
    id: 'ID',
    site: 'Proovipunkt',
    x: 'X (L-EST, m)',
    y: 'Y (L-EST, m)',
    z: 'Z (m)',
    depth: 'Sügavus / paksus (m)',
  },
  infinite: {
    noMore: '',
    error: '',
    retry: 'Proovi uuesti',
  },
  gestureHandling: {
    touch: 'Kasuta kahte näppu kaardi liigutamiseks',
    scroll: 'Kasuta ctrl + scroll kaardi suumimiseks',
    scrollMac: 'Kasuta \u2318 + scroll kaardi suumimiseks',
  },
  table: {
    itemsPerPage: 'Ridade arv:',
  },
  footerPreliminary: '2021 | GRIS: GeoRessursside InfoSüsteem',
  footer:
    'Siin leiduvad materjalid on enamasti kasutamiseks {0} litsentsi alusel, kui pole näidatud teisiti. Portaal on osaks {1} teadustaristust ning infosüsteemist {2}, majutab {3}. Tarkvara on loodud kasutades {4}, raamistikku ning kättesaadav {5}.',
  footerLinks: {
    sarv: 'Geoloogia infosüsteem SARV',
    natarc: 'Loodusteaduslikud arhiivid ja infovõrgustik (NATARC)',
    el: 'Euroopa Liit',
  },
}
