export type Crops = {
  id: string;
  name: string;
};

export type Producer = {
  document: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  hectares: number;
  farmableArea: number;
  vegetationArea: number;
  plantedCrops: Crops[];
};
