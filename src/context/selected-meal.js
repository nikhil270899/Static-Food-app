import React from "react";

//**create context hook */
const SelectedMeal = React.createContext({
  cartCount: 0,
  itemSelected: [],
  setItemContext: () => {},
});

export default SelectedMeal;
