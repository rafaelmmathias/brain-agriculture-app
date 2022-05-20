import {
  getManyCropsById,
  getPlantedCrops,
  updateProducerByDocument,
} from "./../data/db";
import { rest } from "msw";
import { db, getProducerByDocument } from "../data/db";
import { groupBy } from "lodash";
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const handlers = [
  rest.get(`${apiEndpoint}/producers`, async (req, res, ctx) => {
    const producers = db.producer.getAll();
    return res(ctx.json(producers));
  }),

  rest.put(`${apiEndpoint}/producers/:document`, async (req, res, ctx) => {
    const document = req.params.document as string;
    const producer = getProducerByDocument(document);
    if (producer) {
      const updatedProducer = req.body;
      updateProducerByDocument(document, updatedProducer);

      return res(ctx.json(db.producer.getAll()));
    }
  }),

  rest.post(`${apiEndpoint}/producers`, async (req, res, ctx) => {
    if (!req.body) return;

    const data = req.body as any;

    db.producer.create({
      ...data,
      plantedCrops: getManyCropsById(
        data.plantedCrops.map(({ id }: { id: string }) => id)
      ),
    });

    return res(ctx.json(db.producer.getAll()));
  }),

  rest.delete(`${apiEndpoint}/producers/:document`, async (req, res, ctx) => {
    db.producer.delete({
      where: {
        document: {
          equals: req.params.document as string,
        },
      },
    });

    return res(ctx.json(db.producer.getAll()));
  }),

  rest.get(`${apiEndpoint}/dashboard`, async (req, res, ctx) => {
    const farms = db.producer.count();
    const allFarms = db.producer.getAll();
    const hectares = allFarms.reduce((acc, curr) => {
      return acc + curr.hectares;
    }, 0);

    const groupedStates = groupBy(allFarms, "state");
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
];

export { handlers };
