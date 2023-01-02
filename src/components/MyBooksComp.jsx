/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import FadeInOut from "./FadeInOut";
import NFTCard from "./Books/NFT-Card";
import exploreData from "../data/nfts/explore.json";
import Filter from "./Filter";
import { DataContext } from "../store/GlobalState";
import InfoCard from "./infoCard";
import { useEffect } from "react";

const Explore = ({ productList, sales = false }) => {
  const [explores, setExplores] = useState(exploreData);
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state;
  const [revenue, setRevenue] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [paperhoodRevenue, setPaperhoodRevenue] = useState(0);
  const [myProducts, setMyProducts] = useState(null);

  useEffect(() => {
    if (productList && auth.user) {
      if (auth.user === "seller")
        setMyProducts(
          productList.filter((cardData) => cardData.user === auth.user.id)
        );
      else setMyProducts(productList);
    }
  }, [productList, auth]);

  return (
    <section className="explore tabs-fade mt-30" data-scroll-index="2">
      <div className="container">
        <Filter state={state} />
        <div className="row">
          <div className="col-12">
            {explores.contents.map((tab) => (
              <FadeInOut key={tab.id} show={tab.show}>
                <div
                  className="tab-content feat-card current"
                  id={`tab-${tab.id}`}
                >
                  <div className="row">
                    {myProducts &&
                      myProducts.map((cardData, idx) => (
                        <NFTCard data={cardData} key={idx} sales={sales} />
                      ))}
                  </div>
                </div>
              </FadeInOut>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
