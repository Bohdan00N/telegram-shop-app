// import React, { useState, useCallback, useEffect } from "react";
// import css from "./productList.module.scss";
// import ProductItem from "../ProductItem/ProductItem";
// import { useTG } from "../../hooks/useTG";
// import { Form, useNavigate } from "react-router-dom";
// import { products } from "../utils/products";

// const getTotalPrice = (items = []) => {
//   return items.reduce((acc, item) => {
//     return (acc += item.price);
//   }, 0);
// };

// const ProductList = () => {
//   const navigate = useNavigate();
//   const [addedItems, setAddedItems] = useState([]);
//   const { tg, queryId } = useTG();

//   const onSendData = useCallback(async () => {
//     const data = {
//       products: addedItems,
//       totalPrice: getTotalPrice(addedItems),
//       queryId,
//     };

//     try {
//       const response = await fetch("https://naliva.space/order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send order data");
//       }

//       navigate("/form");
//     } catch (error) {
//       console.error("Error sending order data:", error);
//     }
//   }, [addedItems, navigate, queryId]);

//   useEffect(() => {
//     console.log("Setting up event listener for mainButtonClicked");
//     tg.onEvent("mainButtonClicked", onSendData);
//     return () => {
//       console.log("Removing event listener for mainButtonClicked");
//       tg.offEvent("mainButtonClicked", onSendData);
//     };
//   }, [onSendData, tg]);

//   const onAdd = (product) => {
//     const alreadyAdded = addedItems.find((item) => item.id === product.id);
//     let newItems = [];

//     if (alreadyAdded) {
//       newItems = addedItems.filter((item) => item.id !== product.id);
//     } else {
//       newItems = [...addedItems, product];
//     }

//     setAddedItems(newItems);

//     if (newItems.length === 0) {
//       tg.MainButton.hide();
//     } else {
//       tg.MainButton.show();
//       tg.MainButton.setParams({
//         text: `Купить ${getTotalPrice(newItems)}`,
//       });
//     }
//   };

//   return (
//     <div className={css.list}>
//       {products.map((item) => (
//         <ProductItem product={item} onAdd={onAdd} className={css.item} />
//       ))}
//       <Form/>
//     </div>
//   );
// };

// export default ProductList;
import React, { useState, useCallback, useEffect } from "react";
import css from "./productList.module.scss";
import ProductItem from "../ProductItem/ProductItem";
import { useTG } from "../../hooks/useTG";
import { useNavigate } from "react-router-dom";
import { products } from "../utils/products";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState([]);
  const { tg } = useTG();

  const onShowForm = useCallback(() => {
    navigate("form");
    tg.MainButton.setParams({
      text: "Заполните форму",
    });
  }, [tg, navigate]);

  useEffect(() => {
    console.log("Setting up event listener for mainButtonClicked");
    tg.onEvent("mainButtonClicked", onShowForm);
    return () => {
      console.log("Removing event listener for mainButtonClicked");
      tg.offEvent("mainButtonClicked", onShowForm);
    };
  }, [onShowForm, tg]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={css.list}>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={css.item}
        />
      ))}

      <button onClick={onShowForm}>Далі</button>
    </div>
  );
};

export default ProductList;
