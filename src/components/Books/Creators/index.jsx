/* eslint-disable @next/next/no-img-element */
import creators from "../../../data/nfts/creators.json";

const Creators = () => {
  return (
    <section className="collection-box selrs section-padding pt-0">
      <div className="container">
        <div className="sec-head-bord mb-50">
          <div className="container">
            <div className="row">
              <div className="col-md-8 rest">
                <div className="sec-head">
                  <h4>
                    <span className="icon">
                      <i className="fas fa-fire"></i>
                    </span>{" "}
                    Top Creators
                  </h4>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {creators.map((creator, idx) => (
            <div className="col-lg col-md-4" key={idx}>
              <div className="coll-item ${idx !== creators.length - 1 ? 'md-mb50':''}">
                <div className="imgs">
                  <div className="img">
                    <img src={creator.image} alt="" />
                  </div>
                </div>
                <div className="cont">
                  <div className="se-img">
                    <img src={creator.author.image} alt="" />
                    <span className="icon">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                  <div className="text text-center">
                    <h6>
                      <a href="#0">{creator.author.name}</a>
                    </h6>
                    <div className="item-calc mt-10">
                      <span className="fz-12">{creator.items} Items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creators;
