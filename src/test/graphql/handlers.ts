import { graphql } from "msw";
import { API_BASE_URL_GRAPH_QL, ENVIRONMENT } from "@/config";
import { Producer } from "@/models/producer";
import { getDashboard } from "../data/dashboard.mock.service";
import {
  createProducer,
  db,
  deleteProducerById,
  getProducerById,
  updateProducerById,
} from "../data/db";

import { wait } from "../test-utils";

const apiEndpoint = API_BASE_URL_GRAPH_QL;
const isTesting = ENVIRONMENT === "test";
const getRandom = () => {
  return Math.floor(Math.random() * 3) * 1000;
};
const TIMEOUT = () => (isTesting ? 0 : getRandom());
export const gqlMockClient = graphql.link(apiEndpoint);
const handlers = [
  gqlMockClient.query("GetDashboard", async (req, res, ctx) => {
    await wait(TIMEOUT());
    const dashboard = getDashboard();
    // if (Math.floor(Math.random() * 5) === 1) return res(ctx.status(401));
    return res(ctx.data(dashboard));
  }),
  gqlMockClient.query("GetProducers", async (req, res, ctx) => {
    const producers = db.producer.getAll();
    // if (Math.floor(Math.random() * 5) === 1) return res(ctx.status(401));
    await wait(TIMEOUT());
    return res(ctx.data(producers));
  }),
  gqlMockClient.query("GetProducer", async (req, res, ctx) => {
    const id = req.body?.variables.id;
    const producer = getProducerById(id as string);
    await wait(TIMEOUT());
    if (producer) return res(ctx.data(producer));
    return res(ctx.status(404));
  }),
  gqlMockClient.mutation("UpdateProducer", async (req, res, ctx) => {
    const { producer } = req.variables;

    const producerToUpdate = getProducerById(producer.id);
    if (producerToUpdate) {
      await wait(TIMEOUT());
      updateProducerById(producer.id, producer);

      return res(ctx.data(getProducerById(producer.id) as Producer));
    }
  }),
  gqlMockClient.mutation("CreateProducer", async (req, res, ctx) => {
    if (!req.variables.producer) return;
    const { producer } = req.variables;

    createProducer(producer);
    await wait(TIMEOUT());
    return res(ctx.data(db.producer.getAll()));
  }),
  gqlMockClient.mutation("DeleteProducer", async (req, res, ctx) => {
    if (!req.variables.id) return;

    const id = req.variables.id as any;
    await wait(TIMEOUT());
    deleteProducerById(id);
    return res(ctx.data(db.producer.getAll()));
    // return res(ctx.status(401));
  }),
  gqlMockClient.query("GetCrops", async (req, res, ctx) => {
    const crops = db.crops.getAll();
    // if (Math.floor(Math.random() * 5) === 1) return res(ctx.status(401));
    await wait(TIMEOUT());
    return res(ctx.data(crops));
  }),
];

export { handlers };
