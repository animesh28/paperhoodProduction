import Head from "next/head";
import React, { useEffect } from "react";

function NewsLetter() {
  useEffect(() => {
    if (jQuery) {
      (function ($) {
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = "EMAIL";
        ftypes[0] = "email";
        fnames[1] = "FNAME";
        ftypes[1] = "text";
        fnames[2] = "LNAME";
        ftypes[2] = "text";
        fnames[3] = "ADDRESS";
        ftypes[3] = "address";
        fnames[4] = "PHONE";
        ftypes[4] = "phone";
        fnames[5] = "BIRTHDAY";
        ftypes[5] = "birthday";
      })(jQuery);
      var $mcj = jQuery.noConflict(true);
    }
  }, [jQuery]);

  return (
    <>
      <Head>
        <link
          href="//cdn-images.mailchimp.com/embedcode/classic-071822.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <section className="subscribe-area pb-50 pt-70">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="subscribe-text mb-15">
                <span>JOIN OUR NEWSLETTER</span>
                <h2>subscribe newsletter</h2>
              </div>
            </div>
            <div className="col-md-8">
              <div id="mc_embed_signup" style={{ width: "100%" }}>
                <form
                  action="https://paperhood.us11.list-manage.com/subscribe/post?u=9c6860a3c30e8015e174eb2bd&amp;id=0b2aee6c24&amp;f_id=00b99ae0f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  class="validate"
                  target="_blank"
                  novalidate
                >
                  <div
                    id="mc_embed_signup_scroll"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div class="mc-field-group p-0">
                      <input
                        type="email"
                        name="EMAIL"
                        class="required email"
                        id="mce-EMAIL"
                        placeholder="E-mail"
                        required
                      />
                      <span
                        id="mce-EMAIL-HELPERTEXT"
                        style={{ display: "none" }}
                        class="helper_text"
                      ></span>
                    </div>
                    <div
                      id="mce-responses"
                      className="clear foot"
                      style={{ display: "none" }}
                    >
                      <div
                        className="response"
                        id="mce-error-response"
                        style={{ display: "none" }}
                      ></div>
                      <div
                        className="response"
                        id="mce-success-response"
                        style={{ display: "none" }}
                      ></div>
                    </div>
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_9c6860a3c30e8015e174eb2bd_0b2aee6c24"
                        tabindex="-1"
                        value=""
                      />
                    </div>
                    <div className="optionalParent">
                      <button
                        id="mc-embedded-subscribe"
                        type="submit"
                        className="button my-0 cursor-pointer"
                      >
                        subscribe{" "}
                        <i
                          class="fas fa-long-arrow-alt-right"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsLetter;
