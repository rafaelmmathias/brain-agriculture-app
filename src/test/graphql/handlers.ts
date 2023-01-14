import { graphql } from "msw";
import { Producer } from "../../models/producer";
import { getDashboard } from "../data/dashboard.mock.service";
import {
  createProducer,
  db,
  deleteProducerById,
  getProducerById,
  updateProducerById,
} from "../data/db";

import { wait } from "../test-utils";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT_GRAHQL as string;

export const gqlMockClient = graphql.link(apiEndpoint);
const handlers = [
  gqlMockClient.query("GetDashboard", async (req, res, ctx) => {
    await wait(400);
    const dashboard = getDashboard();

    return res(ctx.data(dashboard));
  }),
  gqlMockClient.query("GetProducers", async (req, res, ctx) => {
    const producers = db.producer.getAll();
    return res(ctx.data(producers));
  }),
  gqlMockClient.query("GetProducer", async (req, res, ctx) => {
    const id = req.body?.variables.id;
    const producer = getProducerById(id as string);
    if (producer) return res(ctx.data(producer));
    return res(ctx.status(404));
  }),
  gqlMockClient.mutation("UpdateProducer", async (req, res, ctx) => {
    const { producer } = req.variables;

    const producerToUpdate = getProducerById(producer.id);
    if (producerToUpdate) {
      updateProducerById(producer.id, producer);

      return res(ctx.data(getProducerById(producer.id) as Producer));
    }
  }),
  gqlMockClient.mutation("CreateProducer", async (req, res, ctx) => {
    if (!req.variables.producer) return;
    const { producer } = req.variables;

    createProducer(producer);

    return res(ctx.data(db.producer.getAll()));
  }),
  gqlMockClient.mutation("DeleteProducer", async (req, res, ctx) => {
    if (!req.variables.id) return;

    const id = req.variables.id as any;

    deleteProducerById(id);

    return res(ctx.data(db.producer.getAll()));
  }),
  gqlMockClient.query("GetDashboard", async (req, res, ctx) => {
    const dashboard = getDashboard();

    return res(ctx.data(dashboard));
  }),
  gqlMockClient.query("GetCrops", async (req, res, ctx) => {
    const crops = db.crops.getAll();

    return res(ctx.data(crops));
  }),
];

export { handlers };
