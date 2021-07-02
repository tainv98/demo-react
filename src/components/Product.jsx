import React from "react";
import { Card, Rate } from "antd";

const { Meta } = Card;
const Description = (rating, price) => (
  <div className="desc">
    <Rate defaultValue={rating} />
    <span>{price}</span>
  </div>
);
const Product = ({ product }) => {
  return (
    <>
      <Card
        hoverable
        style={{ padding: 24 }}
        cover={
          <img
            alt="example"
            src={product.image}
            style={{ height: 150, objectFit: "contain" }}
          />
        }
      >
        <Meta
          title={product.name}
          description={Description(product.rating, product.price)}
        />
      </Card>
    </>
  );
};

export default Product;
