import { factory, manyOf, primaryKey } from "@mswjs/data";
import producers from "./producers-data.json";
import crops from "./crops-data.json";
import { v4 as uuidv4 } from "uuid";
import { Crops, Producer } from "../../models/producer";

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
    color: String,
    name: String,
  },
};

export const db = factory(models);
export type Model = keyof typeof db;

export const getCropsById = (id: string) => {
  return db.crops.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });
};

export const getManyCropsById = (ids: string[] | Crops[]) => {
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

export const deleteProducerById = (id: string) => {
  db.producer.delete({
    where: {
      id: {
        equals: id,
      },
    },
  });
};

export const createProducer = (producer: Producer) => {
  db.producer.create({
    ...producer,
    id: uuidv4(),
    plantedCrops: getManyCropsById(producer.plantedCrops),
  });
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
export const clearDb = () => {
  Object.entries(db).forEach(([key, model]) => {
    model.deleteMany({
      where: {
        id: {
          notIn: ["X"],
        },
      },
    });
  });
};
initializeDb();
