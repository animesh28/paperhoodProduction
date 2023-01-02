import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";
import { postData, putData } from "../../server_utils/fetchData";
import DashboardLayout from "../../layouts/dashboard-layout";
import { error, success } from "../../components/Notify";
import { IconButton } from "@mui/material";
import { UploadIcon } from "../../components/AllSvgs";

const Categories = () => {
  const [name, setName] = useState("");

  const [state, dispatch] = useContext(DataContext);
  const { categories, auth } = state;

  const [id, setId] = useState("");

  const createCategory = async () => {
    if (auth.user.role !== "admin")
      return error("Authentication is not vaild.");

    if (!name) return error("Name cannot be left blank.");

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(
        `categories/${id}`,
        { name, image, icon },
        auth.token
      );
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
      dispatch({ type: "NOTIFY", payload: { loading: false } });
    } else {
      res = await postData("categories", { name, image, icon }, auth.token);
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCategory],
      });
    }
    setName("");
    setId("");
    dispatch({ type: "NOTIFY", payload: { loading: false } });
    return success(res.msg);
  };

  const handleEditCategory = (category) => {
    setId(category._id);
    setName(category.name);
    setImage(category.image);
    setIcon(category.icon);
  };

  const openFilePicker = () => {
    document.querySelector("#image_inp1").click();
  };
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const openFilePicker2 = () => {
    document.querySelector("#image_inp2").click();
  };
  const [icon, setIcon] = useState(null);
  const handleIcon = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setIcon(e.target.result);
      console.log(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <DashboardLayout className="dashboard">
      <div className="row container">
        <div className="col-md-5 mx-auto my-3 p-4 category_container">
          <label htmlFor="name-add">Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="d-block mb-4 w-100 p-2 product_input mt-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name-add"
          />

          <div className="row">
            <div className="col-md-6">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleImage}
                multiple
                accept="image/*"
                id="image_inp1"
                name="image_inp"
                style={{ display: "none" }}
              />
              <div className="row img-up mx-0">
                <div
                  onClick={openFilePicker}
                  className="d-flex justify-content-center"
                >
                  <IconButton
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "2rem",
                    }}
                  >
                    <div>
                      <UploadIcon />
                    </div>
                    <div>Upload Image</div>
                  </IconButton>
                </div>
                <div className="d-flex w-100 justify-content-center mt-10">
                  {image && <img src={image} style={{ width: "100px" }} />}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleIcon}
                multiple
                accept="image/*"
                id="image_inp2"
                name="image_inp"
                style={{ display: "none" }}
              />
              <div className="row img-up mx-0">
                <div
                  onClick={openFilePicker2}
                  className="d-flex justify-content-center"
                >
                  <IconButton
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "2rem",
                    }}
                  >
                    <div>
                      <UploadIcon />
                    </div>
                    <div>Upload Icon</div>
                  </IconButton>
                </div>
                <div className="d-flex w-100 justify-content-center mt-10">
                  {icon && (
                    <img src={icon} style={{ width: "50px", height: "50px" }} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-center">
            <button className="btn btn-info mt-30" onClick={createCategory}>
              {id ? "Update" : "Create"}
            </button>
          </div>
        </div>
        <div className="col-md-6 mx-auto my-3">
          <Head>
            <title>Categories</title>
          </Head>

          {categories.map((catogory) => (
            <div key={catogory._id} className="card my-2 text-capitalize">
              <div className="card-body d-flex justify-content-between">
                {catogory.name}

                <div style={{ cursor: "pointer" }}>
                  <i
                    className="fas fa-edit mr-10 text-info"
                    onClick={() => handleEditCategory(catogory)}
                  ></i>

                  <i
                    className="fas fa-trash-alt text-danger"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      dispatch({
                        type: "ADD_MODAL",
                        payload: [
                          {
                            data: categories,
                            id: catogory._id,
                            title: catogory.name,
                            type: "ADD_CATEGORIES",
                          },
                        ],
                      });

                      document.querySelector("#open-modal").click();
                    }}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
