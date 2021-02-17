export default {
  common: {
    general: 'General info',
    pictures: 'Pictures',
    noValue: ' - ',
    title: 'Geoscience collections of Estonia',
    previous: 'Previous',
    next: 'Next',
    links: 'Links',
    search: 'Search',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    original: 'Original',
    linkToEdit: 'Edit record',
  },
  link: {
    sarvAPI: 'Public API',
    github: 'GitHub',
    fossils: 'Fossils',
    sarvDOI: 'Research data (DOI)',
    eurocore: 'EUROCORE data portal',
    chitinozoa: 'Baltic chitinozoans',
    turvas: 'Peat studies database',
    geokirjandus: 'Geological Literature',
    geokogud: 'Geocollections portal',
  },
  locality: {
    locality: 'Locality',
    country: 'Country',
    countryFormat: '{name} ({iso})',
    latitude: 'Latitude',
    longitude: 'Longitude',
    depth: 'Depth',
    elevation: 'Elevation',
    coordx: 'X (m)',
    coordy: 'Y (m)',
    epsg: 'EPSG',
    name: 'Name',
    type: 'Type',
    parish: 'Parish',
    settlement: 'Settlement',
    coordinateMethod: 'Coord. method',
    coordinateAgent: 'Coord. agent',
    locationRemarks: 'Location remarks',
    stratigraphyTop: 'Strat. top',
    stratigraphyBase: 'Strat. base',
    remarks: 'Remarks',
    map: 'Map',
    synonyms: 'Synonyms ({number})',
    specimens: 'Specimens ({number})',
    references: 'References ({number})',
    attachments: 'Attachments ({number})',
    samples: 'Samples ({number})',
    stratotypes: 'Stratotypes ({number})',
    coordinateSystem: 'Coordinate system',
    coordinateX: 'X',
    coordinateY: 'Y',
    coordinatePrecision: 'Coordinate precision',
    descriptions: 'Descriptions ({number})',
  },
  localitySynonym: {
    synonym: 'Synonym',
    pages: 'Pages',
    reference: 'Reference',
    remarks: 'Remarks',
  },
  drillcore: {
    id: 'ID',
    name: 'Name',
    boxes: 'Boxes',
    depository: 'Depository',
    remarks: 'Remarks',
    storage: 'Storage',
    driller: 'Driller',
    year: 'Drilling year',
    metersInBox: 'Meters in box',
    boxNumbers: 'Box numbers',
    drillcoreBoxesTitle: 'Boxes ({number})',
    localityDescriptions: 'Descriptions ({number})',
    localityReferences: 'References ({number})',
    attachments: 'Attachments ({number})',
    samples: 'Samples ({number})',
    analyses: 'Analyses ({number})',
    specimens: 'Specimens ({number})',
  },
  drillcoreBox: {
    id: 'ID',
    drillcore: 'Drillcore',
    nr: 'Box nr. {number}',
    depthStart: 'Start (m)',
    depthEnd: 'End (m)',
    depthOther: 'Depth info',
    stratigraphyBaseFree: 'Strat. base text',
    stratigraphyTopFree: 'Strat. top text',
    stratigraphyTop: 'Strat. top',
    stratigraphyBase: 'Strat. base',
    remarks: 'Remarks',
    diameter: 'Diameter',
    author: 'Image author',
    date: 'Image date',
  },
  localityDescription: {
    stratigraphy: 'Stratigraphy',
    depthBase: 'To (m)',
    depthTop: 'From (m)',
    thickness: 'Thickness (m)',
    rock: 'Rock',
    description: 'Description',
    author: 'Author',
  },
  localityReference: {
    reference: 'Reference',
    remarks: 'Remarks',
    pages: 'Pages',
    referenceTitle: 'Pealkiri',
  },
  attachment: {
    author: 'Author',
    description: 'Description',
  },
  samples: {
    id: 'ID',
    number: 'Number',
    depth: 'Depth',
    depthInterval: 'Depth to',
    stratigraphy: 'Stratigraphy',
    collector: 'Collector',
    dateCollected: 'Date collected',
    thickness: 'Thickness',
  },
  stratotype: {
    stratigraphy: 'Stratigraphy',
    type: 'Type',
    depthTop: 'From (m)',
    depthBase: 'To (m)',
    reference: 'Reference',
    remarks: 'Remarks',
  },
  analysis: {
    id: 'ID',
    sampleNumber: 'Sample number',
    depth: 'Depth',
    depthInterval: 'Depth to',
    method: 'Method',
    methodDetails: 'Method details',
    analysedBy: 'Person/Institution',
    date: 'Date',
    thickness: 'Thickness',
  },
  specimen: {
    id: 'ID',
    number: 'Number',
    depth: 'Depth',
    depthInterval: 'Depth to',
    fossilGroup: 'Fossil group',
    kind: 'Type',
    stratigraphy: 'Stratigraphy',
    taxon: 'Taxon',
    thickness: 'Thickness',
  },
  area: {
    id: 'ID',
    areaType: 'Area type',
    maakond: 'Country',
    areaHa: 'Area (ha)',
    depositAreaHa: 'Deposit (ha)',
    description: 'Description',
    egf: 'EGF',
    maardla: 'Deposit (reference to the register)',
    eelis: 'Nature protection (reference to the register)',
    text1: 'Peat area plaan',
    maardlaLink: 'Deposit information in the Estonian Land Board',
    sites: 'Sites ({number})',
    localityReferences: 'References ({number})',
  },
  site: {
    id: 'ID',
    site: 'Site',
    x: 'X (L-EST, m)',
    y: 'Y (L-EST, m)',
    z: 'Z (m)',
    depth: 'Depth / thickness (m)',
  },
  infinite: {
    noMore: '',
    error: '',
    retry: 'Retry',
  },
  gestureHandling: {
    touch: 'Use two fingers to move the map',
    scroll: 'Use ctrl + scroll to zoom the map',
    scrollMac: 'Use \u2318 + scroll to zoom the map',
  },
  table: {
    itemsPerPage: 'Rows per page:',
  },
  footerPreliminary: '2021 | GRIS: GeoResources Information System',
  footer:
    'All materials in the portal are for free usage according to {0} licence, unless indicated otherwise. Portal is part of {1} national research infrastructure and geoscience data platform {2}, hosted by {3}. Built using {4}, available on {5}.',
  footerLinks: {
    sarv: 'Geoscience Database SARV',
    natarc: 'Natural history archives and information network“ (NATARC)',
    el: 'European Union',
  },
}
