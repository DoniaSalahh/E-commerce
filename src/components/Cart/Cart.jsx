import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let [cartData, setcartData] = useState(null);
  let [isloading, setisloading] = useState(false);

  let { getAllCartData, deleteproduct, UpdateProductQuantity } =
    useContext(CartContext);
  useEffect(() => {
    getAllData();
  }, []);
  async function Deleteproduct(id) {
    let { data } = await deleteproduct(id);
    setcartData(data.data);
  }
  async function updateCount(id, count) {
    let { data } = await UpdateProductQuantity(id, count);
    console.log(data.data);
    setcartData(data.data);
  }
  async function getAllData() {
    setisloading(true);
    let { data } = await getAllCartData();
    console.log(data);
    setisloading(false);
    setcartData(data.data);
  }
  return isloading ? (
    <>
      <div className="d-flex justify-content-center align-items-center my-5 py-5">
        <i className="fas fa-spin fa-spinner fa-2x"></i>
      </div>
    </>
  ) : (
    <>
      <div className="cart bg-light">
        <div className="container">
          <div className="bg-light p-5">
            {cartData?.products.map((ele) => {
              return (
                <>
                  <div
                    className="row border-bottom py-4 justify-content-between"
                    key={ele._id}
                  >
                    <div className="col-md-6">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img
                            src={ele.product.imageCover}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-md-9">
                          <h6>{ele.product.title}</h6>
                          <p className="text-main">{ele.price}</p>
                          <span
                            className="cursor-pointer"
                            onClick={() => Deleteproduct(ele.product._id)}
                          >
                            <i class="fa-solid fa-trash-can text-danger me-2"></i>
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <span
                        onClick={() =>
                          updateCount(ele.product._id, ele.count + 1)
                        }
                        className="btn btn-sm btn-success"
                      >
                        +
                      </span>
                      <span className="mx-2">{ele.count}</span>
                      <span
                        onClick={() =>
                          updateCount(ele.product._id, ele.count - 1)
                        }
                        className="btn btn-sm btn-danger"
                      >
                        -
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
            <h3>
              <span className="text-main">Total Price:</span>
              {cartData?.totalCartPrice}
            </h3>

            <Link to={"/checkOut/" + cartData?._id}>
              <span className="bg-main btn mt-3 text-white">CheckOut</span>
            </Link>
          </div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Cart</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
        </div>
      </div>
    </>
  );
}
