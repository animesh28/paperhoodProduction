import Link from "next/link";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function DealOfTheDay() {
  const time = new Date();
  const remainingTime =
    24 * 60 * 60 -
    (time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds());

  const getHMS = (remainingTime) => {
    let date = new Date(null);
    date.setSeconds(remainingTime);
    let hhmmssFormat = date.toISOString().substr(11, 8);
    return (
      <div>
        <p>Hurry Up!</p>
        {hhmmssFormat}
      </div>
    );
  };

  return (
    <section className="services section-padding pt-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 col-md-6">
            <img src="./img/deal.jpg" />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-6 d-flex flex-column text-center align-items-center justify-content-center">
            <div className="simple-head">
              <div className="mt-10">
                <h6 className="sub-head radius mb-20">
                  <span className="fz-12 ls2 text-u">Limited Period Offer</span>
                </h6>
              </div>
              <h2 className="fz-40 fw-800 gr-purple-red-text inline">
                Deal of the Day
              </h2>
            </div>
            <div className="mt-50">
              <CountdownCircleTimer
                isPlaying
                duration={24 * 60 * 60}
                colors={["#0d9db8"]}
                initialRemainingTime={remainingTime}
              >
                {({ remainingTime }) => getHMS(remainingTime)}
              </CountdownCircleTimer>
            </div>
            <div className="mt-50">
              <Link href="/services-creative">
                <a className="butn butn-md gr-purple-red-bg text-light radius-30">
                  <span className="text slide-up">Buy now</span>
                  <span className="text slide-down">Hurry up!</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DealOfTheDay;
