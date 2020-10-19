import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
const Product = ({
  product: { id, image, name, rating, numReviews, price },
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img src={`http://localhost:5000/api/products/product/photo/${id}`} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating value={rating} text={`${numReviews} reviews`}  />
          </Card.Text>
          <Card.Text as="h3">${price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
