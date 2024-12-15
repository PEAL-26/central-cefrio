"use client";
import { createContext, useContext, useState } from "react";
import { AppContextData, AppProviderProps } from "./types";
import { ReactLoading } from "@/libs/react-loading";

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = {
    show: () => setIsLoading(true),
    hide: () => setIsLoading(false),
    visible: isLoading,
  };

  return (
    <AppContext.Provider value={{ loading }}>
      <>
        {children}
        {isLoading && (
          <div className="fixed z-[99999999999999999999] inset-0 bg-black/50 h-screen flex justify-center items-center ">
            <ReactLoading
              type="spinningBubbles"
              color={"#FFF"}
              height={90}
              width={90}
            />
          </div>
        )}
      </>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
