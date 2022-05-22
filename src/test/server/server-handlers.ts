import {
  createProducer,
  deleteProducerById,
  updateProducerById,
} from "./../data/db";
import { rest } from "msw";
import { db, getProducerById } from "../data/db";
import { API_BASE_URL } from "../../config";
import { getDashboard } from "../data/dashboard.mock.service";
import { delayedResponse } from "../test-utils";

const apiEndpoint = API_BASE_URL;

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

    createProducer(data);

    return res(ctx.json({}));
  }),

  rest.delete(`${apiEndpoint}/producers/:id`, async (req, res, ctx) => {
    deleteProducerById(req.params.id as string);

    return delayedResponse(ctx.json({}));
  }),

  rest.get(`${apiEndpoint}/dashboard`, async (req, res, ctx) => {
    const dashboard = getDashboard();

    return res(ctx.json(dashboard));
  }),

  rest.get(`${apiEndpoint}/crops`, async (req, res, ctx) => {
    const crops = db.crops.getAll();
    return delayedResponse(ctx.json(crops));
  }),
];

export { handlers };
