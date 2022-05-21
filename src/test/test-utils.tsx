import {
  fireEvent,
  render as rtlRender,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store as appStore } from "../app/store";

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

function render(
  ui: any,
  { preloadedState, store = appStore, ...renderOptions }: any = {}
) {
  function Wrapper({ children }: any) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
