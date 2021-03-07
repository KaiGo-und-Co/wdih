import counties from '../data/counties.json'

class CountyModel {
    static getPopulation(id: string) {
        return counties.find((county: any) => (county.RS === id));
    }

    static getCounties(id: string) {
        return counties.filter(county => county.BL_ID === id);
    }
}
export default CountyModel;