import { useContext, useState } from "react";
// import Box from "@mui/material/Box";
import "../navbar/Nav.css";
import {
  Button,
  Container,
  Typography,
  Toolbar,
  AppBar,
  Badge,
} from "@mui/material";
import SelectedMeal from "../../context/selected-meal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItemModal from "../cart/CartItemModal";

const Nav = () => {
  const [open, setOpen] = useState(false);
  //Set open and close state on click
  const handleOpen = () => {
    setOpen(true);
  };
  const close = (value) => {
    setOpen(value);
  };

  //using context from parent by useContext hook
  let itemsAddedToCart = useContext(SelectedMeal);
  return (
    <AppBar position="static" id="nav-class">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <div className="header-title">RoyalStreet Meals</div>
          </Typography>
          <div>
            <Button
              variant="contained"
              id="top-nav-cart"
              size="large"
              onClick={handleOpen}
            >
              <div>Cart</div>
              <Badge
                color="secondary"
                badgeContent={
                  !itemsAddedToCart.cartCount ? "0" : itemsAddedToCart.cartCount
                }
                sx={{ ml: 1 }}
              >
                <ShoppingCartIcon />
              </Badge>
            </Button>
          </div>
          {open && <CartItemModal modalOpen={open} modalClose={close} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
