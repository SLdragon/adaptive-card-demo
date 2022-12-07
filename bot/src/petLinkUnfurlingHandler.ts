import { CardFactory, MessagingExtensionResult, TurnContext } from "botbuilder";
import { LinkUnfurlingHandler, PetData } from "./cardModels";
import * as fs from "fs";

/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class PetLinkUnfurlingHandler implements LinkUnfurlingHandler {
  async handleLinkReceived(
    context: TurnContext,
    link: string,
  ): Promise<MessagingExtensionResult> {
    console.log(link);
    const idRegex = /pet\/(\d+)$/;

    const matches = link.match(idRegex);

    if (!matches || matches.length !== 2) {
      return null;
    }

    const cardData: PetData = this.getMockData(matches[1]);

    const attachment = CardFactory.thumbnailCard('Pet Information Card', "Name: " + cardData.name,
      [cardData.photoUrls[0]]);

    const result = {
      attachmentLayout: 'list' as any,
      type: 'result' as any,
      attachments: [attachment],
    };

    return result;
  }

  private getMockData(id: string): PetData {
    const petData: PetData = JSON.parse(fs.readFileSync(__dirname + "/data/pet" + id + ".json", "utf8")) as PetData;
    return petData;
  }
}
