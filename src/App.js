import { useEffect, useReducer, useState } from "react";
import Picture from "./components/imageDecoration/Picture";
import AllMeals from "./components/meals/AllMeals";
import Nav from "./components/navbar/Nav";
import SelectedMeal from "./context/selected-meal";

const initialState = {
  value: [],
  isLoading: false,
};

//USED REDUCER FUNCTION TO HANDLE THE LOADING STATE...
const renderFun = (state, action) => {
  if (action.type === "SET_LOAD") {
    return { ...initialState, isLoading: true };
  }
  if (action.type === "SET_MEALS") {
    return { value: [...action.val] };
  }

  if (action.type === "SET_NO_LOAD") {
    return { value: [...state.value], isLoading: false };
  }
  return initialState;
};
function App() {
  const [itemsInCart, setItems] = useState(0);
  const [itemSelectedByCus, setItem] = useState([]);

  const [availableMeals, dispatchMeals] = useReducer(renderFun, initialState);
  async function fetchMeals() {
    dispatchMeals({ type: "SET_LOAD" });

    let res = await fetch(
      "https://react-app-bdaae-default-rtdb.firebaseio.com/meals.json"
    );

    let data = await res.json();

    let mealsData = [];

    for (let x in data) {
      let meals = {
        id: data[x].id,
        name: data[x].name,
        description: data[x].description,
        price: data[x].price,
      };

      mealsData.push(meals);
      dispatchMeals({ type: "SET_MEALS", val: mealsData });
      dispatchMeals({ type: "SET_NO_LOAD" });
    }

    console.log(mealsData);
    console.log(data);
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  const cartItemCount = (count) => {
    console.log(count);
    setItems(count);
  };

  const mealSelectedByCustomer = (item) => {
    setItem((prevState) => {
      return [...prevState, item];
    });
  };
  return (
    <SelectedMeal.Provider
      value={{
        cartCount: itemsInCart,
        itemSelected: [...itemSelectedByCus],
        setItemContext: setItem,
      }}
    >
      <Nav />
      <Picture />
      <AllMeals
        mealsAvailable={availableMeals.value}
        isLoadingData={availableMeals.isLoading}
        availableItemsInCart={cartItemCount}
        sendMeal={mealSelectedByCustomer}
      />
    </SelectedMeal.Provider>
  );
}

export default App;
