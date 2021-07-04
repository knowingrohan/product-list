import React from "react";
import StarRatings from "react-star-ratings";

function ProductList({ data }) {
  return (
    <div className="product-list" data-testid="productlist">
      {data &&
        data.map(({ Product }) => (
          <div className="product" key={Product.productId}>
            <div className="img-container">
              <img src={Product.mediumImageUrl} alt={Product.productName} />
            </div>
            <h1>{Product.productName}</h1>
            <div className="description">
              <p className="price">&#8377; {Product.averagePrice}</p>
              <StarRatings
                data-testid="star"
                rating={Product.reviewAverage}
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
                starDimension="16px"
                starSpacing="2px"
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductList;
