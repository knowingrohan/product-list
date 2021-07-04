import "./App.css";
import { DebounceInput } from "react-debounce-input";
import { useRef, useState } from "react";
import ProductList from "./ProductList";

function App() {
  const [products, setProducts] = useState([]);

  const formRef = useRef(null);

  const url =
    "https://rakuten_webservice-rakuten-marketplace-product-search-v1.p.rapidapi.com/services/api/Product/Search/20170426?";

  const handleSearch = (e) => {
    let term = e.target.value;

    formRef.current.reset();

    fetch(`${url}keyword=${term}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f4eeb72b3amsh9592b4243ef21b8p183bbfjsn70bc0c57a27e",
        "x-rapidapi-host":
          "rakuten_webservice-rakuten-marketplace-product-search-v1.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.Products))
      .catch((err) => {
        console.error(err);
      });
  };

  const filterSearch = (e) => {
    let id = e.target.id;
    switch (id) {
      case "low":
        {
          let tempProducts = [...products].sort(function (a, b) {
            let priceA = a["Product"].averagePrice;
            let priceB = b["Product"].averagePrice;
            return priceA - priceB;
          });
          setProducts(tempProducts);
        }
        break;
      case "high":
        {
          let tempProducts = [...products].sort(function (a, b) {
            let priceA = a["Product"].averagePrice;
            let priceB = b["Product"].averagePrice;
            return priceB - priceA;
          });
          setProducts(tempProducts);
        }
        break;
      case "popularity":
        {
          let tempProducts = [...products].sort(function (a, b) {
            let rankA = a["Product"].rank;
            let rankB = b["Product"].rank;
            return rankA - rankB;
          });
          setProducts(tempProducts);
        }
        break;
      default:
        return;
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <DebounceInput
          data-testid="search-bar"
          minLength={2}
          debounceTimeout={300}
          onChange={handleSearch}
          className="search-bar"
          placeholder="Search for tshirt, camera, toys, anything etc.."
        />
      </div>

      <div className="filter-container">
        <form ref={formRef}>
          <div className="form-control">
            <input
              id="low"
              type="radio"
              name="filter"
              onChange={filterSearch}
            />
            <label htmlFor="low">Low Price</label>
          </div>
          <div className="form-control">
            <input
              id="high"
              type="radio"
              name="filter"
              onChange={filterSearch}
            />
            <label htmlFor="high">High Price</label>
          </div>
          <div className="form-control">
            <input
              id="popularity"
              type="radio"
              name="filter"
              onChange={filterSearch}
            />
            <label htmlFor="popularity">Popularity</label>
          </div>
        </form>
      </div>

      <ProductList data={products} />
    </div>
  );
}

export default App;
