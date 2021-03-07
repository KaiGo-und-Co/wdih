const {DateTime} = require('luxon');

class CaseModel {
    url = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=IdLandkreis%20%3D%20\'16070\'&outFields=AnzahlFall,AnzahlTodesfall,Meldedatum,Datenstand,NeuerFall,NeuerTodesfall,Refdatum,NeuGenesen,AnzahlGenesen,IstErkrankungsbeginn&returnGeometry=false&f=json';

    constructor() {
    }

    async get7DayCases() {
        const lastWeek = DateTime.now().minus({weeks: 1}).startOf('day').toMillis();
        const res = await window.fetch(this.url);
        const cases = await res.json();
        const sevenDayCases = cases.features
            .map((fall: any) => fall.attributes)
            .filter((fall: any) => fall.Meldedatum >= lastWeek)
            .reduce((acc: number, cur: any) => (acc + cur.AnzahlFall), 0);
        return sevenDayCases;
    }

}
export default CaseModel;