import { Activity, TurnContext } from "botbuilder";
import {
  CommandMessage,
  TeamsFxBotCommandHandler,
  TriggerPatterns,
  MessageBuilder,
} from "@microsoft/teamsfx";
import helloWorldCard from "./adaptiveCards/petCard.json";
import errorCard from "./adaptiveCards/errorCard.json";
import { ErrorData, PetData } from "./cardModels";
import * as fs from "fs";

/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class GetPetCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = new RegExp("get +pet/(\\d+)");

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage,
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);
    const matches = message.text.match(this.triggerPatterns as RegExp);
    
    try{
      const cardData: PetData = this.getMockData(matches[1]);
      return MessageBuilder.attachAdaptiveCard<PetData>(helloWorldCard, cardData);
    }
    catch(error){
      return MessageBuilder.attachAdaptiveCard<ErrorData>(errorCard, {description: "Cannot find pet by id"});
    }
  }

  private getMockData(id: string) : PetData {
      const petData: PetData = JSON.parse(fs.readFileSync(__dirname + "/data/pet" + id + ".json", "utf8")) as PetData;
      return petData;
  }
}
