import items from "../../../data/nfts/items.json";

const ProcItems = () => {
  return (
    <section className="proc-items" data-scroll-index="3">
      <div className="container">
        <div className="row">
          {items.map((item, idx) => (
            <div className="col-lg-3 col-md-6" key={idx}>
              <div
                className={`item ${idx !== items.length - 1 ? "md-mb50" : ""}`}
              >
                <span className="icon">
                  <i className={`${item.icon} gr-blue-text`}></i>
                </span>
                <div className="cont">
                  <h6>{item.title}</h6>
                  <p>{item.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcItems;
