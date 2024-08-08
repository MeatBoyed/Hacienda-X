import en from "./messages/en.json";

type Messages = typeof en;

// Example of type safe messages for passing Dict to components
type HeroDict = typeof en.Index.Hero;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
