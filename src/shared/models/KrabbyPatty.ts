export enum Sauce {
  KETCHUP = "ketchup",
  MUSTARD = "mustard",
  SECRET_FORMULA = "secretFormula",
}

export class KrabbyPatty {
  cheese: boolean;
  id: string;
  numPickles: number;
  sauces: Sauce[];
  seasonings: string[];

  constructor(krabbyPatty) {
    this.cheese = !!krabbyPatty.cheese;
    this.id = krabbyPatty.id || "";
    this.numPickles = krabbyPatty.numPickles || 0;
    this.sauces = krabbyPatty.sauces || [];
    this.seasonings = krabbyPatty.seasonings || [];
  }
}
