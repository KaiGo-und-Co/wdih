import counties from '../data/counties.json'

class CountyModel {
    static getPopulation(id: string) : number{
        const county = counties.find((county: any) => (county.RS === id))
        return county ? county.EWZ : 1; //To prevent division by 0
    }

    static getCounties(id: string) {
        return counties.filter(county => county.BL_ID === id);
    }
}
export default CountyModel;