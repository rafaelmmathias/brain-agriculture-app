import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render as rtlRender,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { context, createResponseComposition } from "msw";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProducerList } from "@/features/producers/components";

/**
 * This method was necessary because the structure of
 * antd select component.
 * more details:
 * https://github.com/ant-design/ant-design/issues/22074
 */
export const selectOption = async (
  container: HTMLElement,
  testId: string,
  optionLabelToSelect: string
) => {
  // eslint-disable-next-line testing-library/no-node-access
  let select = container.querySelector(
    `[data-testid='${testId}'] > .ant-select-selector`
  );
  expect(select).not.toBeNull();
  let selectElement = select as Element;
  fireEvent.mouseDown(selectElement);

  const element = await waitFor(() => screen.findByText(optionLabelToSelect));
  userEvent.click(element);
};

export const getFormElements = () => {
  const totalSizeInput = screen.getByTestId("total-size-input");
  const farmableInput = screen.getByTestId("farmable-input");
  const vegetationInput = screen.getByTestId("vegetation-input");
  const documentInput = screen.getByTestId("document-input");
  const farmNameInput = screen.getByTestId("farm-name-input");
  const producerNameInput = screen.getByTestId("producer-name-input");
  const cityInput = screen.getByTestId("city-input");
  const stateInput = screen.getByTestId("state-input");
  const plantedCrops = screen.getByTestId("planted-crops-input");
  const submitButton = screen.getByTestId("button-submit");

  return {
    totalSizeInput,
    farmableInput,
    vegetationInput,
    documentInput,
    farmNameInput,
    producerNameInput,
    cityInput,
    stateInput,
    submitButton,
    plantedCrops,
  };
};

export const fillProducerFormAndSubmit = async (
  container: HTMLElement,
  payload: any
) => {
  const {
    documentInput,
    producerNameInput,
    farmNameInput,
    cityInput,
    totalSizeInput,
    farmableInput,
    vegetationInput,
    submitButton,
  } = getFormElements();

  userEvent.type(documentInput, payload.document);
  userEvent.type(producerNameInput, payload.name);
  userEvent.type(farmNameInput, payload.farmName);
  userEvent.type(cityInput, payload.city);

  userEvent.type(totalSizeInput, payload.hectares.toString());
  userEvent.type(farmableInput, payload.farmableArea.toString());
  userEvent.type(vegetationInput, payload.vegetationArea.toString());
  userEvent.click(submitButton);
  await waitFor(() => screen.findByText("Selecione pelo menos uma cultura"));

  await selectOption(container, "state-input", "Alagoas");
  await selectOption(container, "planted-crops-input", "Soja");

  await waitForElementToBeRemoved(() =>
    screen.queryByText("Selecione pelo menos uma cultura")
  );

  userEvent.click(submitButton);
};

export const wait = async (ms = 0) =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

function render(
  ui: any,
  { path = "/", route = "/", ...renderOptions }: any = {}
) {
  if (route) {
    window.history.pushState({}, "", route);
  }
  function Wrapper({ children }: any) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 5000,
          staleTime: 5000,
        },
      },
    });

    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path={"/producers"} element={<ProducerList />} />
            <Route path={path} element={children} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
