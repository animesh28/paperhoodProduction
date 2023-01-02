/* eslint-disable @next/next/no-css-tags */
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
//= Layout
import MainLightLayout from "../../layouts/main-light";
//= Components
import Header from "../../components/Header";
import Services from "../../components/Services";
import Portfolio from "../../components/Portfolio";
import Explore from "../../components/Books/Explore";
import Footer from "../../components/FooterNew";
import Process from "../../components/Process";
// import StickyBar from "../../components/StickyBar";
import HomeAbout from "../../components/HomeAbout";
import Category from "../../components/Category";
import NewsLetter from "../../components/NewsLetter";
import { useRouter } from "next/router";
import { getData } from "../../server_utils/fetchData";
import filterSearch from "../../server_utils/filterSearch";
import { DataContext } from "../../store/GlobalState";
import MainLayout from "../../layouts/main-light";
import Loading from "../../components/Loading";

const Home = ({ productList, result }) => {
  const [state, dispatch] = useContext(DataContext);
  const { categories } = state;
  const [products, setProducts] = useState(null);
  const [cat, setCat] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (categories && categories.length > 0) {
      console.log(categories.filter((c) => c.name.toLowerCase() === "love"));
      setCat(categories.filter((c) => c.name.toLowerCase() === "love")[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  useEffect(() => {
    document.body.classList.add("land-demo2");
    const removeClasses = [
      "index-bus1",
      "index-corporate",
      "index-restaurant",
      "index-arch",
      "index-freelancer",
      "cr-agency",
      "index-main",
      "mobile-app",
      "gr-orange-bg",
      "nft-market",
    ];

    document.body.classList.remove(...removeClasses);
  }, []);

  const showcase = { new: 1, feat: 2, best: 3 };

  return (
    <>
      <Head>
        <title>Paperhood - Marketplace for Books</title>
      </Head>
      {products && cat ? (
        <MainLightLayout defaultLogoTheme="dark" defaultTheme="dark">
          {/* <StickyBar /> */}
          {/* <FixedSearch /> */}
          <Header btnText="List My Books" />
          <Process />
          <Category />
          <Explore
            productList={products.filter((pro) => pro.approval)}
            result={result}
            page={page}
            sortDefault={"-createdAt"}
            hideFilter={true}
            head1="Newly"
            head2="Launched"
            classes="mb-30"
          />

          <Explore
            productList={products.filter((pro) => pro.approval)}
            result={result}
            page={page}
            sortDefault={"-sold"}
            hideFilter={true}
            head1="Best"
            head2="Sellers"
            classes="mb-30"
          />

          <Explore
            productList={products.filter((pro) => pro.category === cat)}
            result={result}
            page={page}
            hideFilter={true}
            head1="Featured"
            head2="Books"
          />
          {/* <Portfolio filterOp={"new"} curve={false} head="Newly Launched" />
        <Portfolio
          filterOp={"bestSeller"}
          curve={false}
          head="Best Seller"
          mrgTop={true}
        />
        <Portfolio
          filterOp={"featured"}
          curve={false}
          head="Featured"
          mrgTop={true}
        /> */}
          {/* <DealOfTheDay /> */}
          <HomeAbout />
          <Services />
          {/* {!mobile ? <Skills /> : null} */}
          {/* <Testimonials /> */}
          <NewsLetter />
          <Footer />
        </MainLightLayout>
      ) : (
        <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
          <Loading />
        </MainLayout>
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=${
      page * 12
    }&category=${category}&sort=${sort}&title=${search}`
  );
  return {
    props: {
      productList: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
