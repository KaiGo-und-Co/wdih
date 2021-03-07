const {DateTime} = require('luxon');

class CaseModel {
    baseUrl = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query'

    constructor() {
    }

    async get7DayCases(id: string) {
        const end = DateTime.now().startOf('day').toFormat('yyyy-LL-dd HH:mm:ss');
        const start = DateTime.now().startOf('day').minus({days: 10}).toFormat('yyyy-LL-dd HH:mm:ss');

        const args = {
            where: encodeURIComponent(`IdLandkreis = '${id}' AND Meldedatum >= TIMESTAMP '${start}' AND Meldedatum <= TIMESTAMP '${end}'`),
            outFields: 'AnzahlFall,Meldedatum',
            returnGeometry: 'false',
            f: 'json',
        }

        const query = Object.entries(args).map((k: any) => `${k[0]}=${k[1]}`).join('&');
        const url = `${this.baseUrl}?${query}`;

        console.log(url);

        const lastWeek = DateTime.now().minus({weeks: 1}).startOf('day').toMillis();
        const res = await window.fetch(url);
        const cases = await res.json();
        const sevenDayCases = cases.features
            .map((fall: any) => fall.attributes)
            .filter((fall: any) => fall.Meldedatum >= lastWeek)
            .reduce((acc: number, cur: any) => (acc + cur.AnzahlFall), 0);
        return sevenDayCases;
    }

}
export default CaseModel;