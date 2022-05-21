import {
  getManyCropsById,
  getPlantedCrops,
  updateProducerById,
} from "./../data/db";
import { rest } from "msw";
import { db, getProducerById } from "../data/db";
import { groupBy } from "lodash";
import { delayedResponse } from "../utils";
import { v4 as uuidv4 } from 'uuid';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const handlers = [
  rest.get(`${apiEndpoint}/producers`, async (req, res, ctx) => {
    const producers = db.producer.getAll();
    return res(ctx.json(producers));
  }),
  rest.get(`${apiEndpoint}/producers/:id`, async (req, res, ctx) => {
    const producer = getProducerById(req.params.id as string);
    return delayedResponse(ctx.json(producer));
  }),

  rest.put(`${apiEndpoint}/producers/:id`, async (req, res, ctx) => {
    const id = req.params.id as string;
    const producer = getProducerById(id);
    if (producer) {
      const updatedProducer = req.body;

      updateProducerById(id, updatedProducer);

      return res(ctx.json(db.producer.getAll()));
    }
  }),

  rest.post(`${apiEndpoint}/producers`, async (req, res, ctx) => {
    if (!req.body) return;

    const data = req.body as any;

    db.producer.create({
      id: uuidv4(),
      ...data,
      plantedCrops: getManyCropsById(data.plantedCrops),
    });

    return res(ctx.json(db.producer.getAll()));
  }),

  rest.delete(`${apiEndpoint}/producers/:id`, async (req, res, ctx) => {
    db.producer.delete({
      where: {
        id: {
          equals: req.params.id as string,
        },
      },
    });

    return delayedResponse(ctx.json(db.producer.getAll()));
  }),

  rest.get(`${apiEndpoint}/dashboard`, async (req, res, ctx) => {
    const farms = db.producer.count();
    const allFarms = db.producer.getAll();
    const hectares = allFarms.reduce((acc, curr) => {
      return acc + curr.hectares;
    }, 0);
    const states = groupBy(allFarms, "state");
    const groupedStates = Object.entries(states).map(([key, values]) => ({
      state: key,
      count: values.length,
    }));
    const groupedCrops = getPlantedCrops();

    const soilTypes = allFarms.reduce(
      (acc, curr) => {
        acc.farmableArea = acc.farmableArea + curr.farmableArea;
        acc.vegetationArea = acc.vegetationArea + curr.vegetationArea;
        return acc;
      },
      { vegetationArea: 0, farmableArea: 0 }
    );

    return res(
      ctx.json({
        farms,
        hectares: hectares,
        states: groupedStates,
        crops: groupedCrops,
        soilTypes,
      })
    );
  }),

  rest.get(`${apiEndpoint}/crops`, async (req, res, ctx) => {
    const crops = db.crops.getAll();
    return delayedResponse(ctx.json(crops));
  }),
];

export { handlers };
