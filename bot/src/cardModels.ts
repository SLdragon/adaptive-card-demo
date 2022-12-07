import { TurnContext } from "botbuilder";

/**
 * Adaptive Card data model. Properties can be referenced in an adaptive card via the `${var}`
 * Adaptive Card syntax.
 */
 export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface PetData {
  id: number;
  name: string;
  category: Category;
  photoUrls: string[];
  tags: Tag[];
  status: string;
}


export interface ErrorData {
  description: string;
}

export interface LinkUnfurlingHandler {
  handleLinkReceived(
    context: TurnContext,
    link: string,
  )
}
