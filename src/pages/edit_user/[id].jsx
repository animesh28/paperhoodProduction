import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";

import { useRouter } from "next/router";
import { patchData } from "../../server_utils/fetchData";
import { error, success } from "../../components/Notify";
import DashboardLayout from "../../layouts/dashboard-layout";
import PreviewRegisterForm from "../../components/PreviewRegisterForm";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [state, dispatch] = useContext(DataContext);
  const { auth, users } = state;

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  const handleSubmit = () => {
    let role = checkAdmin ? "admin" : "user";
    if (num % 2 !== 0) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData(
        `user/${editUser._id}`,
        { role, role_descrip: role },
        auth.token
      ).then((res) => {
        if (res.err) {
          dispatch({ type: "NOTIFY", payload: { loading: false } });
          return error(res.err);
        }

        dispatch(
          updateItem(
            users,
            editUser._id,
            {
              ...editUser,
              role,
            },
            "ADD_USERS"
          )
        );
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return success(res.msg);
      });
    }
  };

  const sellerDetails = () => {
    const fields = [
      "role_descrip",
      "accountHolderName",
      "bankName",
      "accountNo",
      "ifscCode",
      "bankBranchAddress",
      "upi",
    ];

    return fields.map((field) => (
      <div className="form-group my-2">
        <label htmlFor="email" className="d-block">
          {field}
        </label>
        <input type="text" id="email" defaultValue={editUser[field]} disabled />
      </div>
    ));
  };

  return (
    <DashboardLayout className="dashboard">
      <div className="edit_user my-3">
        <Head>
          <title>Edit User</title>
        </Head>

        <div>
          <button className="btn btn-dark" onClick={() => router.back()}>
            <i className="fas fa-long-arrow-alt-left" aria-hidden></i> Go Back
          </button>
        </div>
        <PreviewRegisterForm formData={editUser} />
        <div className="col-md-12 my-4 d-flex justify-content-center align-items-center">
          <div style={{ width: "fit-content" }}>
            <div className="form-group my-2">
              <input
                type="checkbox"
                id="isAdmin"
                checked={checkAdmin}
                style={{ width: "20px", height: "20px" }}
                onChange={handleCheck}
              />

              <label
                htmlFor="isAdmin"
                style={{ transform: "translate(4px, -3px)" }}
              >
                isAdmin
              </label>
            </div>

            <button className="btn btn-dark" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditUser;
