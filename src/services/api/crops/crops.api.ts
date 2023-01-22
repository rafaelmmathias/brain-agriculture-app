import { Crops } from "@/models/producer";
import { getCropsQuery } from "./queries";
import { gqlRequest } from "../gql-client";

export const getCropsFetcher = () => gqlRequest<Crops[]>(getCropsQuery);
