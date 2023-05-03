import { useContext } from "react";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import {
  Footer,
  ImageTag,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  return (
    <ProductCardContainer>
      <ImageTag src={imageUrl} alt={`${name}`} />

      <Footer className="footer">
        <Name className="name">{name}</Name>
        <Price className="price">{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={() => addItemToCart(product)}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
