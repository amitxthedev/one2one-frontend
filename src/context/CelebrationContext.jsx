import { createContext, useContext, useState } from "react";

const CelebrationContext = createContext();

export function CelebrationProvider({ children }) {
  const [active, setActive] = useState(true);   // ON initially
  const [type, setType] = useState("new_year");

  return (
    <CelebrationContext.Provider
      value={{ active, setActive, type, setType }}
    >
      {children}
    </CelebrationContext.Provider>
  );
}

export function useCelebration() {
  return useContext(CelebrationContext);
}
