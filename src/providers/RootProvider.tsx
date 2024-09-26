import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { FC } from "react";
import BasketProvider from "./BasketProvider";

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

type props = {
  children: React.ReactNode;
};

const RootProvider: FC<props> = ({ children }) => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <BasketProvider>
          <Centered>{children}</Centered>
        </BasketProvider>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default RootProvider;
