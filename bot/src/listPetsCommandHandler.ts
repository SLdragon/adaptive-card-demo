import { Activity, TurnContext } from "botbuilder";
import {
  CommandMessage,
  TeamsFxBotCommandHandler,
  TriggerPatterns,
  MessageBuilder,
} from "@microsoft/teamsfx";
import petListItem from "./data/petListItemTemplate.json"
import { PetData } from "./cardModels";
import * as fs from "fs";

/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class ListPetsCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "list pets";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage,
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    const pets: PetData[] = this.getMockData();
    const listTemplate = JSON.parse(fs.readFileSync(__dirname + "/adaptiveCards/petListCard.json", "utf8"));
    for (let i=0;i<pets.length;i++) {
      const item = JSON.stringify(petListItem).replace("${name}", pets[i].name)
                          .replace("${status}", pets[i].status)
                          .replace("${imageUrl}", pets[i].photoUrls[0])
                          .replace("${id}", pets[i].id.toString());
      listTemplate.body[0].columns[0].items.push(JSON.parse(item))
    }

    return MessageBuilder.attachAdaptiveCard(listTemplate, null);

  }

  private getMockData(): PetData[] {
    const pets = [];
    for (var i = 1; i <= 4; i++) {
      const petData: PetData = JSON.parse(fs.readFileSync(__dirname + "/data/pet" + i + ".json", "utf8")) as PetData;
      pets.push(petData);
    }
    return pets;
  }
}
