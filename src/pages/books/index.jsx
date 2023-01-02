/* eslint-disable @next/next/no-css-tags */
import { useEffect, useState } from "react";
import Head from "next/head";
//= Layout
import MainLightLayout from "../../layouts/main-light";
//= Components
import StickyBar from "../../components/StickyBar";
import FixedSearch from "../../components/FixedSearch";
import Features from "../../components/Books/Features";
import Explore from "../../components/Books/Explore";
import Collection from "../../components/Collection";
import Footer from "../../components/FooterNew";
import AppLayout from "../../layouts/app-layout";
import NewsLetter from "../../components/NewsLetter";
import { getData } from "../../server_utils/fetchData";
import { useRouter } from "next/router";
import filterSearch from "../../server_utils/filterSearch";
import Filter from "../../components/Filter";
import { DataContext } from "../../store/GlobalState";
import { useContext } from "react";

const Home = ({ productList, result }) => {
  const [mobile, setMobile] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [products, setProducts] = useState(null);

  let mq;
  useEffect(() => {
    document.body.classList.add("land-demo2");
    mq = window.matchMedia("(max-width: 50em)").matches;
    setMobile(mq);
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

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return products ? (
    <>
      <Head>
        <title>Paperhood - Marketplace for Books</title>
      </Head>
      <AppLayout
        type="nft-market"
        defaultLogoTheme="dark"
        defaultTheme="dark"
        shopPage={true}
      >
        <StickyBar />
        <FixedSearch />
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
          productList={products.filter((pro) => pro.approval)}
          result={result}
          handleLoadmore={handleLoadmore}
          page={page}
        />

        <NewsLetter />
        <Footer />
      </AppLayout>
    </>
  ) : (
    <>
      <Head>
        <title>Paperhood - Marketplace for Books</title>
      </Head>
      <AppLayout
        type="nft-market"
        defaultLogoTheme="dark"
        defaultTheme="dark"
        shopPage={true}
      ></AppLayout>
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
      page * 6
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
