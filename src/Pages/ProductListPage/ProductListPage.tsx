import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MercadoLibreClient from "../../Client/MercadoLibre.client";
import { Product } from "../../Typings/Products/Product";
import { Products } from "../../Typings/Products/Products";
import Loading from "../../Utils/Loading/Loading";
import Card from "./Card/Card";
import "./ProductListPage.scss";

const ProductListPage = () => {
  const [products, setProducts] = useState<Products>({ results: [] });
  const [loading, setLoading] = useState(true);

  let { searchName } = useParams();

  useEffect(() => {
    if (searchName) {
      MercadoLibreClient.getProductList(searchName, setProducts);
      setLoading(false);
    }
  }, [searchName]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="product-list-page">
          {products.results.length === 0 ? (
            <p className="product-list-page-error"> No se encontraron productos</p>
          ) : (
            <div className="prodcut-list">
              {products?.results?.map((product: Product, index) => {
                return <Card key={index} {...product} />;
              })}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ProductListPage;
