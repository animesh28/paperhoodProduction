import React, { useState } from "react";
import Step1 from "./step/step-1";
import Step2 from "./step/step-2";
import Step3 from "./step/step-3";
import Step4 from "./step/step-4";
import Step5 from "./step/step-5";

const VersionOne = () => {
  const [singleBookCost, setSingleBookCost] = useState();
  return (
    <div className="wrapper">
      <div className="steps-area steps-area-fixed">
        <div className="image-holder">
          <img src={"img/calculator/side-img.jpg"} alt="" />
        </div>
        <div className="steps clearfix">
          <ul className="tablist multisteps-form__progress">
            <li className="multisteps-form__progress-btn js-active current">
              <span>1</span>
            </li>
            <li className="multisteps-form__progress-btn">
              <span>2</span>
            </li>
            <li className="multisteps-form__progress-btn">
              <span>3</span>
            </li>
            <li className="multisteps-form__progress-btn">
              <span>4</span>
            </li>
            <li className="multisteps-form__progress-btn last">
              <span>5</span>
            </li>
          </ul>
        </div>
      </div>
      <form
        className="multisteps-form__form"
        action="#"
        id="wizard"
        method="POST"
      >
        <div className="form-area position-relative">
          <Step1
            singleBookCost={singleBookCost}
            setSingleBookCost={setSingleBookCost}
          />
          <Step2 singleBookCost={singleBookCost} />
          <Step3 />
          <Step4 />
          <Step5 />
        </div>
      </form>
    </div>
  );
};

export default VersionOne;
