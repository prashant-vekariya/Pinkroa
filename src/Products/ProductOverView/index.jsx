import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import data from "../../dats";
import Categories from "../../Categories";
import Navbar from "../../components/Navbar";
import HeaderModal from "../../components/HeaderModal";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";

const allcategories = ["all", ...new Set(data.map((data) => data.category))];
const allcompany = ["all", ...new Set(data.map((data) => data.company))];

const Products = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuIteams] = useState(data);
  const [previewType, setPreviewType] = useState(true);
  // const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState(309999);
  // USEEFFECT USE IN USESTATE
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedFreeShipping, setSelectedFreeShipping] = useState(true);

  // SEARCH INPUT FIELD
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value) {
      const abc = data.filter((country) => {
        return country.name.match(e.target.value);
      });
      setMenuIteams(abc);
    } else {
      setMenuIteams(data);
    }
    if (e.target.value === "all") {
      return setMenuIteams(data);
    }
  };

  // CATEGORY FILTER
  const filterItems = (arr) => {
    // console.log("filterItems", arr);
    if (selectedCategory === "all") {
      return arr;
    } else {
      const newItems = arr.filter((item) => item.category === selectedCategory);
      return newItems;
    }
  };

  //  COMPANY FILTER
  const filterbrand = (arr) => {
    // console.log(arr, "filterbrand");
    if (selectedCompany === "all") {
      return arr;
    } else {
      const newbrand = arr.filter((item) => item.company === selectedCompany);
      return newbrand;
    }
  };

  // COLOR FILTER
  // ARRAY IN ARRAY USE INCLUDES ARRAY METHOD
  const filterColors = (colors) => {
    // console.log("first", colors);
    if (selectedColor === "all") {
      return colors;
    } else {
      const colorList = colors.filter((item) =>
        item.colors.includes(selectedColor)
      );
      return colorList;
    }
  };

  // COLOR FILTER FOR MAP (SHOW COLOR)
  let array = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].colors.length; j++) {
      array.push(data[i].colors[j]);
    }
  }
  const unique = array.filter(
    (value, index, array) => array.indexOf(value) === index
  );

  //===== PRICE RANGE =====
  const handleInput = (arr) => {
    setPrice(selectedPrice);
    const abcd = arr.filter((item) => item.price <= selectedPrice);
    return abcd;
  };

  // PRICE MAP
  // MAXIMUM PRISE
  const arr = data.map((item) => item.price);
  // const maxprice = arr.reduce((a, b) => Math.max(a, b));
  const maxprice = Math.max(...arr);
  // MINMUM PRISE
  // const minprice = arr.reduce((a, b) => Math.min(a, b));
  const minprice = Math.min(...arr);
  //Filter options updated so apply all filters here

  //  FREE SHIPPING FILTER FUNCTIONALITY
  const filterFreeShipping = (arr) => {
    if (selectedFreeShipping === false) {
      setSelectedFreeShipping(true);
      const newshipping = arr.filter((item) => item.shipping === true);
      return newshipping;
    } else if (selectedFreeShipping === true) {
      setSelectedFreeShipping(false);
      return arr;
    }
  };

  //  FREE SHIPPING
  // const freeshipping = () => {
  //   if (isChecked === false) {
  //     setIsChecked(true);
  //     filterFreeShipping();
  //   } else if (isChecked === true) {
  //     setIsChecked(false);
  //     setMenuIteams(data);
  //   }
  // };

  useEffect(() => {
    let result = data;
    if (selectedCategory) {
      result = filterItems(result);
    }
    if (selectedCompany) {
      result = filterbrand(result);
    }
    if (selectedColor) {
      result = filterColors(result);
    }
    if (selectedPrice) {
      result = handleInput(result);
    }
    if (selectedFreeShipping) {
      result = filterFreeShipping(result);
    }
    setMenuIteams(result);
  }, [
    selectedCategory,
    selectedCompany,
    selectedColor,
    selectedPrice,
    selectedFreeShipping,
  ]);

  return (
    <>
      <Navbar />
      <HeaderModal />
      <Row className="m-0 p-0 mt-5 mb-5">
        <Col sm={12} lg={3} className={`${styles.fcol} px-5`}>
          {/* ======= SEARCH FILTER ======= */}
          <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            // value={searchInput}
            className={`${styles.searchfield} `}
            size="20"
          />
          {/* ======= CATEGORY FILTER ======= */}
          <h6 className="mt-5">Category</h6>
          <Categories
            selectedCategory={selectedCategory}
            categories={allcategories}
            categoriesItems={setSelectedCategory}
          />
          {/* ======= COMPANY FILTER ======= */}
          <h6 className="mt-2">Company</h6>
          <select
            name="select"
            onChange={(e) => setSelectedCompany(e.target.value)}
            className={styles.dropdown}
          >
            {allcompany.map((companies, index) => {
              return <option key={index}>{companies}</option>;
            })}
          </select>
          {/* ======= COLOR FILTER ======= */}
          <h6 className="mt-3">Colors</h6>
          <div className="d-flex align-items-baseline">
            <p
              onClick={() => setSelectedColor("all")}
              style={{ cursor: "pointer" }}
            >
              ALL
            </p>
            {unique.map((colors, index) => {
              return (
                <button
                  className={styles.dottedbtn}
                  style={{ backgroundColor: colors }}
                  key={index}
                  onClick={() => setSelectedColor(colors)}
                ></button>
              );
            })}
          </div>
          {/* ======= PRICE FILTER ======= */}
          <h6 className="mt-2">
            Price
            <span id="demo"> {price}</span>
          </h6>
          <div class="slidecontainer">
            <input
              type="range"
              id="myRange"
              max={maxprice}
              min={minprice}
              value={price}
              onInput={(e) => setSelectedPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="checkbox" className="me-5">
              Free Shipping
            </label>
            <input
              id="topping"
              type="checkbox"
              name="topping"
              value="Paneer"
              checked={selectedFreeShipping}
              onClick={setSelectedFreeShipping}
            />
          </div>
          {/*  ======= CLEAR DATA ======= */}
          <button
            className={`mt-3 ${styles.clearbtn} mb-5`}
            onClick={() => {
              setMenuIteams(data);
              setSelectedFreeShipping(false);
            }}
          >
            Clear Filters
          </button>
        </Col>
        <Col sm={12} lg={9}>
          <Row className="m-0 p-0">
            <div className={`${styles.displayrow} mb-5`}>
              <button
                className={
                  previewType
                    ? `${styles.windowsbtn} w-auto bg-black text-white`
                    : `${styles.windowsbtn} w-auto bg-white text-black`
                }
                onClick={() => setPreviewType(true)}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
                </svg>
              </button>
              <button
                className={
                  previewType
                    ? `${styles.windowsbtn} w-auto bg-white text-black`
                    : `${styles.windowsbtn} w-auto bg-black text-white`
                }
                onClick={() => setPreviewType(false)}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
              </button>
              <p className={styles.productlength}>
                {menuItems.length}&nbsp; Products Found
              </p>
              <hr className={styles.hrline} />
              <p className={styles.foundproducts}>Sort By</p>
              <div style={{ display: "grid", alignContent: "center" }}>
                <select
                  name="select"
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className={styles.dropdown}
                >
                  {allcompany.map((companies, index) => {
                    return <option key={index}>{companies}</option>;
                  })}
                </select>
              </div>
            </div>
            {menuItems.length === 0 && (
              <h6 className="text-center text-danger">
                Oops we could not find matching Data
              </h6>
            )}
            {menuItems.map((item) => {
              const { id, image, name, price } = item;
              return (
                <>
                  {previewType ? (
                    <Col sm={4}>
                      <article key={id} className="menu-item">
                        <div className="containersclass">
                          <img
                            src={image}
                            alt="image"
                            className={`${styles.imgsize} image`}
                          />
                          <div
                            className="middle"
                            onClick={() => navigate(`/products/${id}`)}
                          >
                            <div className="text">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <p>{name}</p>
                          <p className="text-gray">${price}</p>
                        </div>
                      </article>
                    </Col>
                  ) : (
                    <Row className="m-0 p-0 mb-4">
                      <Col sm={4} lg={4}>
                        <article key={id} className="menu-item">
                          <div className="containersclass">
                            <img
                              src={image}
                              alt="image"
                              className={`${styles.imagesize} image`}
                            />
                          </div>
                        </article>
                      </Col>
                      <Col sm={8} lg={8}>
                        <h5
                          className="fw-bold"
                          style={{ textTransform: "capitalize" }}
                        >
                          {name}
                        </h5>
                        <p className="text-gray fw-bold">${price}</p>
                        <p>
                          Cloud bread VHS hell of banjo bicycle rights jianbing
                          umami mumblecore etsy 8-bit pok pok +1 wolf.
                          Vexillologist yr dreamcatcher waistcoat, authentic ...
                        </p>
                        <button
                          className={styles.detailsbtn}
                          onClick={() => navigate(`/products/${id}`)}
                        >
                          Details
                        </button>
                      </Col>
                    </Row>
                  )}
                </>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Products;
