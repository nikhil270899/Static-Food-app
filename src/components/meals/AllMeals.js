import React, { useEffect, useState } from "react";
import ButtonComponent from "../../ui/ButtonComponent";
import "../meals/AllMeals.css";

function AllMeals(props) {
  console.log(props);
  const [inputs, setInputs] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  });
  let meals = props.mealsAvailable;
  let loading = props.isLoadingData;

  //   const [addToCart, setAddToCart] = useState([]);

  //Taking values from button component and adding total count to cart
  useEffect(() => {
    let x = inputs.one + inputs.two + inputs.three + inputs.four;

    props.availableItemsInCart(x);
  }, [props, inputs]);

  //**Add meal to cart */
  const addMealToCart = (meal) => {
    let mealId = meal.id;
    //Total amount of food ordered values
    let itemsSelected = {
      value1: mealId === "m1" ? inputs.one + 1 : 1,
      value2: mealId === "m2" ? inputs.two + 1 : 1,
      value3: mealId === "m3" ? inputs.three + 1 : 1,
      value4: mealId === "m4" ? inputs.four + 1 : 1,
    };

    //items count (x{count}) display
    let displayItems = {
      a: inputs.one + 1,
      b: inputs.two + 1,
      c: inputs.three + 1,
      d: inputs.four + 1,
    };

    props.sendMeal({
      ...meal,
      ...itemsSelected,
      ...displayItems,
    });
  };

  return (
    <div className="meals-list">
      <ul>
        {!loading &&
          meals.map((v, index) => {
            return (
              <li key={v.id}>
                <div className="meals-available">
                  <div className="meals-desc">
                    <div className="name">{v.name}</div>
                    <div className="description">{v.description}</div>
                    <div className="price">Rs.{v.price}</div>
                  </div>
                  <div className="add-to-card-btn">
                    <ButtonComponent
                      selectedMeals={v}
                      id={v.id}
                      selectedMealForCheckout={addMealToCart}
                      val1={(s) =>
                        setInputs((prevState) => {
                          return { ...prevState, one: s };
                        })
                      }
                      val2={(t) =>
                        setInputs((prevState) => {
                          return { ...prevState, two: t };
                        })
                      }
                      val3={(u) =>
                        setInputs((prevState) => {
                          return { ...prevState, three: u };
                        })
                      }
                      val4={(v) =>
                        setInputs((prevState) => {
                          return { ...prevState, four: v };
                        })
                      }
                    />
                  </div>
                </div>
                {index !== meals.length - 1 && <hr />}
              </li>
            );
          })}
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      </ul>
    </div>
  );
}

export default AllMeals;
