import { useState } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { postData } from "../../server_utils/fetchData";
import { error, success } from "../../components/Notify";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";

function Help() {
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state;
  const [formData, setFormData] = useState({
    issue: "",
    email: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("help", formData, auth.token);

    if (res.err) return error(res.err);
    return success(res.msg);
  };

  return (
    <DashboardLayout>
      <div className="container mt-30">
        <div className="row">
          <form className="col-lg-6" onSubmit={handleSubmit}>
            <div className=" product_input-container">
              <h4>Raise a Ticket</h4>

              <div className=" input-group-prepend px-0 my-2">
                <label htmlFor="" className="my-2">
                  Type of Concern
                </label>
                <select
                  name="issue"
                  id="issue"
                  value={formData.issue}
                  onChange={(e) =>
                    setFormData({ ...formData, issue: e.target.value })
                  }
                  className="custom-select text-capitalize product_input"
                >
                  <option value="all">Concern</option>
                  {[
                    "Book listing error",
                    "Payments related issue",
                    "Orders related issue",
                    "Printing related Queries",
                    "Others",
                  ].map((item, i) => (
                    <option key={item + i + "ticketType"} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-2">
                <label htmlFor="" className="my-2">
                  Alternate Email / Phone Number
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="E-mail / Phone Number"
                  pattern="^([0-9]{10})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$"
                  className="d-block w-100 p-2 product_input"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="my-2">
                <label htmlFor="" className="my-2">
                  Issue Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="6"
                  placeholder="Elaborate your issue (mention Order ID for faster processing)"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="d-block mb-4 w-100 p-2 product_input"
                  value={formData.description}
                />
              </div>
              <button className="btn btn-info my-2 px-4" type="submit">
                Raise Ticket
              </button>
            </div>
          </form>
          <div className="col-lg-6 p-5 d-flex flex-column justify-content-center  ">
            <h5>
              <i class="fas fa-building"></i> Office Address
            </h5>
            <p className="text-left ml-30" style={{ color: "#000" }}>
              Office Address - Plot No D222, 20, Shiravane, Nerul, Navi Mumbai,
              Maharashtra 400706
            </p>
            <h5 className="mt-20">
              <i class="fas fa-envelope"></i> Contact Support
            </h5>
            <p className="text-left ml-30" style={{ color: "#000" }}>
              <a href="mailto:mail@paperhood.in">mail@paperhood.in</a>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Help;
