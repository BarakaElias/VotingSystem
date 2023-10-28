import { createContext, useContext, useState } from "react";
const AwardCycleContext = createContext();

export const AwardCycleProvider = ({ children }) => {
  const [selectedAwardCycle, setSelectedAwardCycle] = useState("11");

  const selectAwardCycle = (awardCycle) => {
    setSelectedAwardCycle(awardCycle);
  };

  return (
    <AwardCycleContext.Provider
      value={{ selectAwardCycle, selectedAwardCycle }}
    >
      {children}
    </AwardCycleContext.Provider>
  );
};

export const useAwardCycle = () => {
  return useContext(AwardCycleContext);
};
