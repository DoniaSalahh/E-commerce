import axios from "axios";
import { createContext } from "react";
export let CartContext = createContext();
export default function CartContextProvider(props) {
let headersdata = {
token: localStorage.getItem("usertoken"),
};
function getAllCartData() {
return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: headersdata,
});
}
function deleteproduct(id) {
return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers: headersdata,
});
}

function UpdateProductQuantity(id, count) {
let body = {
    count: count,
};
return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    body,
    {
    headers: headersdata,
    }
);
}
function addcart(id) {
let body = {
    productId: id,
};
return axios.post("https://ecommerce.routemisr.com/api/v1/cart", body, {
    headers: headersdata,
});
}

function checkPayment(id,shippingData){
    let body={
        shippingAddress:shippingData
    }
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:300`,body,{
        headers:headersdata
    })

}

return (
<CartContext.Provider
    value={{checkPayment, addcart, getAllCartData, deleteproduct, UpdateProductQuantity }}
>
    {props.children}
</CartContext.Provider>
);
}
