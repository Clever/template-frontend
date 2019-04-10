import { ApiEndpoint } from "../ApiEndpoint";
import { Character } from "src/shared/models";
import { NotFoundError } from "src/server/app/errors";

export class GetCharacterEndpoint extends ApiEndpoint {
  async handler(req, res) {
    const { characterID } = req.params;

    if (characterID !== "spongebob") {
      throw new NotFoundError(`Character ${characterID} not found`);
    }

    // spongebob-service doesn't actually exist so I'm mocking out a response from it
    // const response = await Clients.spongeBobService.getCharacter(characterID);
    const response = {
      character: {
        id: "spongebob",
        name: {
          // Though this structure doesn't have a `middle` key, the `Character` data model will add
          // it and set it to ""
          first: "SpongeBob",
          last: "SquarePants",
        },
        species: "sponge",
        livesInAPineappleUnderTheSea: true,
      }
    };

    const character = new Character(response.character);
    res.json({ character });
  }
}
