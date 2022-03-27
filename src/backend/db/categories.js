import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Self care",
    description: "test description",
  },
  {
    _id: uuid(),
    categoryName: "Law of attraction",
    description: "test description",
  },
  {
    _id: uuid(),
    categoryName: "Guided meditations",
    description: "test description",
  },
];
