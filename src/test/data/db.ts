import { factory, manyOf, primaryKey } from "@mswjs/data";
import producers from "./producers-data.json";
import crops from "./crops-data.json";

const models = {
  producer: {
    id: primaryKey(String),
    document: String,
    name: String,
    farmName: String,
    city: String,
    state: String,
    hectares: Number,
    farmableArea: Number,
    vegetationArea: Number,
    plantedCrops: manyOf("crops"),
  },
  crops: {
    id: primaryKey(String),
    name: String,
  },
};

export const db = factory(models);
export type Model = keyof typeof db;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));

export const getCropsById = (id: string) => {
  return db.crops.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
};

export const getManyCropsById = (ids: string[]) => {
  return db.crops.findMany({
    where: {
      id: {
        in: ids.map((crop: any) => crop.id || crop.value || crop),
      },
    },
  });
};

export const getProducerById = (id: string) => {
  return db.producer.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
};

export const updateProducerById = (id: string, data: any) => {
  return db.producer.update({
    where: {
      id: {
        equals: id,
      },
    },
    data: {
      ...data,
      plantedCrops: getManyCropsById(data.plantedCrops),
    },
  });
};

export const getPlantedCrops = () => {
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

export const initializeDb = () => {
  crops.forEach((crop: any) => {
    db.crops.create(crop);
  });

  producers.forEach((producer: any) => {
    const crops = [] as any;
    if (producer.plantedCrops) {
      producer.plantedCrops.forEach((plantedCrop: any) => {
        const crop = db.crops.findFirst({
          where: {
            id: {
              equals: plantedCrop,
            },
          },
        });
        crops.push(crop);
      });
    }

    db.producer.create({ ...producer, plantedCrops: crops });
  });
};

initializeDb();
