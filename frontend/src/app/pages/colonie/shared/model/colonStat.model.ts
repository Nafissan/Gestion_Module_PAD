export class ColonStat {
    totalColons: number;
    age7to10: number;
    age10to15: number;
    age15to18: number;
    maleCount: number;
    femaleCount: number;
    constructor(totalColons: number, age7to10: number, age10to15: number, age15to18: number, male: number, female: number) {
      this.totalColons = totalColons;
      this.age7to10 = age7to10;
      this.age10to15 = age10to15;
      this.age15to18 = age15to18;
      this.maleCount = male;
      this.femaleCount = female;

    }
}