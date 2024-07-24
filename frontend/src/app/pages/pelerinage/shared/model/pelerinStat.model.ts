export class PelerinStat {
    totalPelerins: number;
    age40to50: number;
    age50to60: number;
    age60to70: number;
    maleCount: number;
    femaleCount: number;
    constructor(totalPelerins: number, age40to50: number, age50to60: number, age60to70: number, male: number, female: number) {
      this.totalPelerins = totalPelerins;
      this.age40to50 = age40to50;
      this.age50to60 = age50to60;
      this.age60to70 = age60to70;
      this.maleCount = male;
      this.femaleCount = female;

    }
}