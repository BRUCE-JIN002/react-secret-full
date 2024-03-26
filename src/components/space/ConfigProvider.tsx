import { PropsWithChildren, createContext } from "react";
import { SizeType } from "./Space";

export interface ConfigContextType {
  space?: {
    size?: SizeType;
  };
}

export const ConfigContext = createContext<ConfigContextType>({});

interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {}

export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { space, children } = props;

  return (
    <ConfigContext.Provider value={{ space }}>
      {children}
    </ConfigContext.Provider>
  );
};
