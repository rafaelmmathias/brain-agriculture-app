import { Producer } from "./producer";

export type GroupedStates = {
  state: string;
  count: number;
};
export type GroupedCrops = {
  id: string;
  name: string;
  producers: Producer[];
};

export type SoilTypes = {
  vegetationArea: number;
  farmableArea: number;
}

export type Dashboard = {
  farms: number;
  hectares: number;
  crops: GroupedCrops[];
  states: GroupedStates[];
  soilTypes: SoilTypes
};
