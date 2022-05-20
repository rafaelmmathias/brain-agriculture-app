import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { Producer } from "../../../models/producer";

const baseUrl = API_BASE_URL;

export const getProducers = async () => {
  const response = await axios.get(`${baseUrl}/producers`);
  return response.data;
};

export const createProducer = async (producer: Producer) => {
  const response = await axios.post(`${baseUrl}/producers`, producer);
  return response.data;
};

export const updateProducer = async (producer: Producer) => {
  const response = await axios.put(
    `${baseUrl}/producers/${producer.document}`,
    producer
  );

  return response.data;
};

export const deleteProducer = async (producer: Producer) => {
  const response = await axios.delete(
    `${baseUrl}/producers/${producer.document}`
  );

  return response.data;
};
