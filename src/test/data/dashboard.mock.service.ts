import { groupBy } from "lodash";
import { db } from "./db";
import StateColors from "./sate-colors.json";

type Colors = {
  [key: string]: string;
};

const getSumAllPlantedCrops = () => {
  const producers = db.producer.getAll();

  const groupedCrops = new Map();
  producers.forEach((value) => {
    value.plantedCrops.forEach((crop) => {
      if (!groupedCrops.has(crop.id)) {
        groupedCrops.set(crop.id, {
          ...crop,
          count: 1,
        });
      } else {
        const values = groupedCrops.get(crop.id);

        groupedCrops.set(crop.id, {
          ...crop,
          count: values.count + 1,
        });
      }
    });
  });

  return Array.from(groupedCrops.values());
};

const getSummedAllFarmsHectares = () => {
  const allFarms = db.producer.getAll();
  return allFarms.reduce((acc, curr) => {
    return acc + curr.hectares;
  }, 0);
};

const getAllFarmStatesGrouped = () => {
  const allFarms = db.producer.getAll();
  const states = groupBy(allFarms, "state");
  const colors = StateColors as Colors;

  return Object.entries(states).map(([key, values]) => ({
    state: key,
    color: colors[key] || undefined,
    count: values.length,
  }));
};

const getAllFarmSoilTypesGrouped = () => {
  const allFarms = db.producer.getAll();
  return allFarms.reduce(
    (acc, curr) => {
      acc.farmableArea = acc.farmableArea + curr.farmableArea;
      acc.vegetationArea = acc.vegetationArea + curr.vegetationArea;
      return acc;
    },
    { vegetationArea: 0, farmableArea: 0 }
  );
};

export const getDashboard = () => {
  const farms = db.producer.count();

  const hectares = getSummedAllFarmsHectares();
  const groupedStates = getAllFarmStatesGrouped();
  const groupedCrops = getSumAllPlantedCrops();
  const soilTypes = getAllFarmSoilTypesGrouped();

  return {
    farms,
    hectares: hectares,
    states: groupedStates,
    crops: groupedCrops,
    soilTypes,
  };
};
