import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import { imageUpload } from "../../server_utils/imageUpload";
import valid from "../../server_utils/valid";
import { getData, patchData } from "../../server_utils/fetchData";
import { error, success } from "../../components/Notify";
import MainLayout from "../../layouts/main-light";
import DashboardLayout from "../../layouts/dashboard-layout";

const Profile = () => {
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialSate);
  const { avatar, name, password, cf_password } = data;

  const [state, dispatch] = useContext(DataContext);
  const { auth, notify, orders } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      console.log(auth.user.email);
      const errMsg = valid(
        name,
        82101186769,
        auth.user.email,
        password,
        cf_password
      );
      if (errMsg) error(errMsg);
      updatePassword();
    }

    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return error("File does not exist.");

    if (file.size > 1024 * 1024)
      //1mb
      return error("The largest image size is 1mb.");

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return error("Image format is incorrect.");

    setData({ ...data, avatar: file });
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  if (!auth.user) return null;
  return (
    <DashboardLayout className="dashboard">
      <div className="profile_page container">
        <Head>
          <title>Profile</title>
        </Head>

        <section className="row text-secondary my-3 justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center text-uppercase">
              {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
            </h3>

            <div className="avatar">
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt="avatar"
              />
              <span>
                <i className="fas fa-camera"></i>
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>

            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                className="form-control"
                placeholder="Your name"
                onChange={handleChange}
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                defaultValue={auth.user.email}
                className="form-control"
                disabled={true}
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                placeholder="Your new password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="cf_password">Confirm New Password</label>
              <input
                type="password"
                name="cf_password"
                value={cf_password}
                className="form-control"
                placeholder="Confirm new password"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn"
              style={{ background: "#0d9db8", color: "#fff" }}
              disabled={notify.loading}
              onClick={handleUpdateProfile}
            >
              Update
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps() {
  //   const res = await getData(`order`);
  //   console.log(res);
  // server side rendering
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Profile;
