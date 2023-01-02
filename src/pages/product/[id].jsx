import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState, useContext } from "react";
import MainLayout from "../../layouts/main-light";
import { getData } from "../../server_utils/fetchData";
import { addToCart } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookCover from "../../components/BookCover";
import Link from "next/link";
import { Button } from "@mui/material";
import Footer from "../../components/FooterNew";

const DetailProduct = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const [state, dispatch] = useContext(DataContext);
  const { cart, categories, auth, products } = state;

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  const findCategoryName = (id) => {
    if (categories.length > 0)
      return categories.filter((cat) => cat._id === id)[0].name;
  };

  const router = useRouter();

  const addOns = ["language", "binding", "isbn", "dimension", "color"];

  useEffect(() => {
    console.log(product);
    if (
      product &&
      !product.approval &&
      auth &&
      auth.user &&
      auth.user.role != "admin"
    ) {
      router.push("/");
    }
  }, [product, auth]);

  return (
    product && (
      <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
        <div className="row detail_page mt-90 container">
          <Head>
            <title>Detail Product</title>
          </Head>

          <div className="col-md-4" style={{ padding: "4rem" }}>
            <img
              src={product.images[tab].url}
              alt={product.images[tab].url}
              className="d-block img-thumbnail rounded mt-4 w-100"
              style={{ height: "350px" }}
            />

            <div className="row mx-2 my-2" style={{ cursor: "pointer" }}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.url}
                  className={`img-thumbnail rounded mr-20 my-1 ${isActive(
                    index
                  )}`}
                  style={{ height: "80px", width: "20%", padding: 0 }}
                  onClick={() => setTab(index)}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <h2 className="text-uppercase">{product.title}</h2>
            <div>
              <span className="px-3" style={{ borderRight: "2px solid black" }}>
                Author: {product.author}
              </span>
              <span className="px-3">
                Genre: {findCategoryName(product.category)}
              </span>
            </div>

            <h5 className="text-danger my-2">₹ {product.price}</h5>

            <div className="my-2">{product.description}</div>
            <div className="my-2">{product.content}</div>
            <a
              href="#"
              className="butn butn-md gr-purple-red-bg text-light radius-30 mt-20 fz-20"
              onClick={() => dispatch(addToCart(product, cart))}
            >
              <span className="text slide-up">Buy</span>
              <span className="text slide-down d-flex align-items-center justify-content-center">
                <span className="mr-10">Add To Cart</span> <ShoppingCartIcon />
              </span>
            </a>
            <div className="my-4">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Additional Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {addOns.map((item) => (
                    <div
                      style={{
                        textTransform: "capitalize",
                        borderBottom: "2px solid black",
                      }}
                      className="py-2"
                    >
                      {item} : {product[item]}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="row container mb-40 mob-pad">
          <h4>Similar Books</h4>
          <div className="bookContainer">
            {products
              .filter((item, i) => item.category === product.category)
              .map((item, i) => {
                if (item._id != product._id && item.approval && i <= 4) {
                  return <BookCover data={item} />;
                }
              })}
            <Link href="/books">
              <Button
                variant="contained"
                className="margin-decide"
                sx={{ height: "40px", alignSelf: "center" }}
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </MainLayout>
    )
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  };
}

export default DetailProduct;
