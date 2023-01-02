/* eslint-disable @next/next/no-img-element */
import { useState, useContext } from "react";
import FadeInOut from "../../FadeInOut";
import NFTCard from "../NFT-Card";
import exploreData from "../../../data/nfts/explore.json";
import Filter from "../../Filter";
import { DataContext } from "../../../store/GlobalState";
import BookCover from "../../BookCover";

const Explore = ({
  productList,
  result,
  handleLoadmore = () => {},
  page,
  cat = null,
  sortDefault = null,
  hideFilter = false,
  head1 = "Explore",
  head2 = "Books",
  classes = "",
}) => {
  const [explores, setExplores] = useState(exploreData);
  const [state, dispatch] = useContext(DataContext);

  const openTab = (tabId) => {
    // Remove class 'current' from all tab-links
    document
      .querySelectorAll(`.explore .item-link[data-tab]`)
      .forEach((el) => el.classList.remove("current"));
    // Add class 'current' to clicked tab-link
    document
      .querySelector(`.explore .item-link[data-tab="tab-${tabId}"]`)
      .classList.add("current");

    // Close all tabs and open tab with id == tabId
    setExplores((prev_explores) => {
      let newExplores = structuredClone(prev_explores);

      let newContents = newExplores.contents.map((tab) => {
        tab.show = false;
        return tab;
      });

      let idx = newContents.findIndex((tab) => tab.id === tabId);

      newContents[idx].show = true;

      newExplores.contents = newContents;

      return newExplores;
    });
  };

  return (
    <section className={`explore tabs-fade ${classes}`} data-scroll-index="2">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-head-bord mb-50">
              <div className="container">
                <div className="row">
                  <div className="col-12 rest flex md-no-flex">
                    <div className="sec-head mr-20 md-mb30">
                      <h4 className="fw-800">
                        <span className="icon">
                          <i className="fas fa-fire"></i>
                        </span>{" "}
                        {head1}{" "}
                        <span className="gr-purple-red-text">{head2}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Filter
          state={state}
          cat={cat}
          sortDefault={sortDefault}
          hideFilter={hideFilter}
        />
        <div className="row">
          <div className="col-12">
            {explores.contents.map((tab) => (
              <FadeInOut key={tab.id} show={tab.show}>
                <div
                  className="tab-content feat-card current"
                  id={`tab-${tab.id}`}
                >
                  <div className="bookContainer">
                    {productList &&
                      productList.map((cardData, idx) => (
                        <BookCover data={cardData} key={idx} />
                      ))}
                  </div>
                </div>
              </FadeInOut>
            ))}
          </div>
        </div>
        {result < page * 6 || hideFilter ? (
          ""
        ) : (
          <button
            className="btn btn-outline-info d-block mx-auto mb-4 mt-40"
            onClick={handleLoadmore}
          >
            Load more
          </button>
        )}
      </div>
    </section>
  );
};

export default Explore;
