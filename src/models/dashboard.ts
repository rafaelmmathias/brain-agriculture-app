import { Producer } from "./producer";

export type GroupedCrops = {
  id: string;
  name: string;
  producers: Producer[];
};

export type Dashboard = {
  farms: number;
  hectares: number;
  crops: GroupedCrops[];
};
