class FullName {
  first: string;
  middle: string;
  last: string;

  // Consider replacing this `any` with a more explicit input model
  constructor(name: any = {}) {
    this.first = name.first || "";
    this.middle = name.middle || "";
    this.last = name.last || "";
  }
}

export class Character {
  id: string;
  livesInAPineappleUnderTheSea: boolean;
  name: FullName;
  species: string;

  // Consider replacing this `any` with a more explicit input model
  constructor(character: any = {}) {
    this.id = character.id || "";
    this.livesInAPineappleUnderTheSea = !!character.livesInAPineappleUnderTheSea;
    this.name = new FullName(character.name || {});
    this.species = character.species || "";
  }
}
