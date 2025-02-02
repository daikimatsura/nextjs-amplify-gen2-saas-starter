import type { Schema } from "../../../amplify/data/resource";

type Pricing = Schema["Pricing"]["type"];
const pricingEnum: Pricing[] = ["FREE", "STARTER", "PRO"];

export enum PricingEnum {
  FREE = "フリープラン",
  STARTER = "スタータープラン",
  PRO = "プロフェッショナル",
}

export const isPlan = (value: any): value is Pricing =>
  pricingEnum.includes(value);
