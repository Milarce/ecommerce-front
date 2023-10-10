import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

//This is a custom context hook using the real useContext hook
export const useStoreContex = () => {
  const context = useContext(StoreContext);

  if (context === undefined)
    throw Error("Opsss we don't seem to be insede the Provider");

  return context;
};

//The Provider is the component parent that provides the context to all children
export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return;
    const items = { ...basket.items };
    const itemIndex = items.findIndex((it) => it.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setBasket((prevState) => {
        return { ...prevState!, items };
      });
    }
  };

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
};
