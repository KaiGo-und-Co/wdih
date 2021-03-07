const {DateTime} = require('luxon');

class CaseModel {
    baseUrl = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query'

    async getCases(county: string, days = 7){
        const end = DateTime.now().startOf('day').toFormat('yyyy-LL-dd HH:mm:ss');
        const start = DateTime.now().startOf('day').minus({days}).toFormat('yyyy-LL-dd HH:mm:ss');

        const args = {
            where: encodeURIComponent(`IdLandkreis = '${county}' AND Meldedatum >= TIMESTAMP '${start}' AND Meldedatum <= TIMESTAMP '${end}'`),
            outFields: 'AnzahlFall,Meldedatum',
            returnGeometry: 'false',
            f: 'json',
        }

        const query = Object.entries(args).map((k: any) => `${k[0]}=${k[1]}`).join('&');
        const url = `${this.baseUrl}?${query}`;
        const res = await window.fetch(url);
        const cases = await res.json();

        return cases.features.map((fall: any) => fall.attributes);
    }

    async get7DayCases(id: string, days = 3) {
        const cases = await this.getCases(id, days + 6);

        let sevenDayCases: number[] = [];

        for (let i = days; i > 0; i--){
            const end = DateTime.now().startOf('day').minus({days: i - 1}).toMillis();
            const start = DateTime.now().startOf('day').minus({days: i + 6}).toMillis();

            const c = cases
                .filter((fall: any) => fall.Meldedatum >= start && fall.Meldedatum <= end)
                .reduce((acc: number, cur: any) => (acc + cur.AnzahlFall), 0);
            sevenDayCases.push(c)
        }

        return sevenDayCases
    }

}
export default CaseModel;