import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import "../cart/CartItemModal.css";
import SelectedMeal from "../../context/selected-meal";

function CartItemModal(props) {
  const inputBtnRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  //   const [state, setState] = useState();

  //Context consuming
  let addedItems = useContext(SelectedMeal);
  console.log(addedItems.itemSelected);

  //********Reveresing and Filtering the latest  added to items count*********
  let filteredItems = addedItems.itemSelected.filter((value, index) => {
    let reveresedArrayIndex = addedItems.itemSelected
      .slice()
      .reverse()
      .findIndex((item) => item.id === value.id);
    let latestItemIndex =
      reveresedArrayIndex >= 0
        ? addedItems.itemSelected.length - 1 - reveresedArrayIndex
        : reveresedArrayIndex;

    return index === latestItemIndex;
  });
  //Setting arrays to content
  let content = [];
  if (filteredItems.length > 0) {
    content = [...filteredItems];
  }

  //*********Calculating the total quantity for items in cart */

  let total = content
    .map((v) => {
      return v.price * v.value1 * v.value2 * v.value3 * v.value4;
    })
    .reduce((accVal, currentVal) => {
      console.log(accVal, currentVal);
      return accVal + currentVal;
    }, 0);
  console.log(total);
  const closeHandler = () => {
    props.modalClose(false);
    setOpenSnack(false);
  };

  //******On click order function*/

  const handleOrder = () => {
    if (filteredItems.length > 0) {
      setOpenDialog(false);
    }
    setOpenSnack(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const addItemsToCart = (val) => {
    console.log(val);

    let arr = filteredItems.map((v) => {
      console.log(v);

      let itemsSelected = {};
      let displayItems = {};
      if (val === "1") {
        debugger;
        displayItems = {
          a: v.id === "m1" ? v.a + 1 : 1,
          b: v.id === "m2" ? v.b + 1 : 1,
          c: v.id === "m3" ? v.c + 1 : 1,
          d: v.id === "m4" ? v.d + 1 : 1,
        };
        itemsSelected = {
          value1: v.id === "m1" ? v.value1 + 1 : 1,
          value2: v.id === "m2" ? v.value2 + 1 : 1,
          value3: v.id === "m3" ? v.value3 + 1 : 1,
          value4: v.id === "m4" ? v.value4 + 1 : 1,
        };
      }
      if (val === "-1") {
        displayItems = {
          a: v.id === "m1" && v.a > 0 ? v.a - 1 : 1,
          b: v.id === "m2" && v.b > 0 ? v.b - 1 : 1,
          c: v.id === "m3" && v.c > 0 ? v.c - 1 : 1,
          d: v.id === "m4" && v.d > 0 ? v.d - 1 : 1,
        };
        itemsSelected = {
          value1: v.id === "m1" && v.value1 > 0 ? v.value1 - 1 : 1,
          value2: v.id === "m2" && v.value2 > 0 ? v.value2 - 1 : 1,
          value3: v.id === "m3" && v.value3 > 0 ? v.value3 - 1 : 1,
          value4: v.id === "m4" && v.value4 > 0 ? v.value4 - 1 : 1,
        };
      }

      //items count (x{count}) display

      return {
        ...v,
        ...itemsSelected,
        ...displayItems,
      };
    });
    addedItems.setItemContext([...arr]);
  };

  //******Open dialoag */
  useEffect(() => {
    setOpenDialog(props.modalOpen);
    //Cleaning up state when unmounting
    return () => {
      setOpenDialog(false);
    };
  }, [props.modalOpen]);
  console.log(content);

  //****J SX */
  return (
    <>
      <Dialog open={openDialog} onClose={closeHandler} id="dialog-box">
        <DialogTitle>
          Checkout
          <hr />
        </DialogTitle>
        <DialogContent>
          {content.length ? (
            content.map((v) => {
              console.log(v);
              return (
                <div key={v.id} className="checkout-items">
                  <div className="checkout">
                    <div className="checkout-items-name">{v.name}</div>
                    <div className="checkout-items-price">
                      Rs.{v.price}
                      <span className="items-count-class">
                        x
                        {v.id === "m1"
                          ? v.a
                          : v.id === "m2"
                          ? v.b
                          : v.id === "m3"
                          ? v.c
                          : v.id === "m4"
                          ? v.d
                          : 0}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="buttons-parent">
                      <Button
                        variant="outlined"
                        id="button-class"
                        onClick={() => {
                          addItemsToCart("-1");
                        }}
                        ref={inputBtnRef}
                      >
                        -
                      </Button>
                      <Button
                        variant="outlined"
                        ref={inputBtnRef}
                        id="button-class"
                        onClick={() => {
                          addItemsToCart("1");
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className="no-cart-items">Your cart is empty</h4>
          )}
          <hr />
          <div>
            <span className="total-title"> Total</span> :
            <span className="total-output">Rs.{total}</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeHandler}
            variant="contained"
            id="dialog-button-class"
          >
            Cancel
          </Button>
          <Button onClick={handleOrder} id="dialog-button-class">
            Order
          </Button>
        </DialogActions>
      </Dialog>
      {content.length > 0 ? (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnack}
          autoHideDuration={3000}
          id="snack-bar-class"
          onClose={closeHandler}
          key={"items"}
        >
          <Alert severity="success"> Items Ordered Successfully</Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openSnack}
          id="snack-bar-class"
          autoHideDuration={3000}
          onClose={closeHandler}
          key={"items"}
        >
          <Alert severity="warning">Cart is empty</Alert>
        </Snackbar>
      )}

      {/* <Snackbar
       
        open={open}
        onClose={closeHandler}
      /> */}
    </>
  );
}

export default CartItemModal;
