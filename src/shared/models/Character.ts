class FullName {
  first: string;
  middle: string;
  last: string;

  constructor(name) {
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

  constructor(character) {
    this.id = character.id || "";
    this.livesInAPineappleUnderTheSea = !!character.livesInAPineappleUnderTheSea;
    this.name = new FullName(character.name || {});
    this.species = character.species || "";
  }
}
