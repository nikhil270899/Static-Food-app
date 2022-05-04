import { Button } from "@mui/material";
import React, { useState } from "react";
import "../ui/ButtonComponent.css";

function ButtonComponent({
  selectedMeals,
  id,
  val1,
  val2,
  val3,
  val4,
  selectedMealForCheckout,
}) {
  const [selectedMealCount, setSelectedMealToCart] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
  });

  //   const [countCart, dispatch] = useReducer(initialState, countAddToCart);

  //Added items to cart
  const addToCart = (e) => {
    if (id === "m1") {
      val1(selectedMealCount.input1 + 1);
      console.log(selectedMealCount.input1);

      setSelectedMealToCart((prevState) => {
        return { ...prevState, input1: selectedMealCount.input1 + 1 };
      });
    }
    if (id === "m2") {
      val2(selectedMealCount.input2 + 1);
      setSelectedMealToCart({
        ...selectedMealCount,
        input2: selectedMealCount.input2 + 1,
      });
    }
    if (id === "m3") {
      val3(selectedMealCount.input3 + 1);

      setSelectedMealToCart({
        ...selectedMealCount,
        input3: selectedMealCount.input3 + 1,
      });
    }
    if (id === "m4") {
      val4(selectedMealCount.input4 + 1);

      setSelectedMealToCart({
        ...selectedMealCount,
        input4: selectedMealCount.input4 + 1,
      });
    }

    selectedMealForCheckout({
      ...selectedMeals,
    });
  };
  //Setting the value to count input
  const setQuantity = (e, id) => {
    id === "m1"
      ? setSelectedMealToCart({
          ...selectedMealCount,
          input1: e.target.value,
        })
      : id === "m2"
      ? setSelectedMealToCart({ ...selectedMealCount, input2: e.target.value })
      : id === "m3"
      ? setSelectedMealToCart({ ...selectedMealCount, input3: e.target.value })
      : id === "m4"
      ? setSelectedMealToCart({ ...selectedMealCount, input4: e.target.value })
      : setSelectedMealToCart({ ...selectedMealCount });
  };

  //**JSX */
  return (
    <>
      <div className="input-amount">
        <label htmlFor="amount">Count</label>
        <input
          type="text"
          placeholder="0"
          className="text-class"
          value={
            id === "m1"
              ? selectedMealCount.input1
              : id === "m2"
              ? selectedMealCount.input2
              : id === "m3"
              ? selectedMealCount.input3
              : selectedMealCount.input4
          }
          name="itemCount"
          onChange={(e) => setQuantity(e, id)}
        />
      </div>
      <Button variant="contained" id="button-component" onClick={addToCart}>
        + Add
      </Button>
    </>
  );
}

export default ButtonComponent;
