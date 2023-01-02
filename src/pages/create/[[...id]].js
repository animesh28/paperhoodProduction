import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../server_utils/imageUpload";
import { postData, getData, putData } from "../../server_utils/fetchData";
import { useRouter } from "next/router";
import DashboardLayout from "../../layouts/dashboard-layout";
import { error, success } from "../../components/Notify";
import priceList from "../../data/price.json";
import { IconButton } from "@mui/material";
import { UploadIcon } from "../../components/AllSvgs";

const ProductsManager = () => {
  const initialState = {
    title: "",
    price: 0,
    disPrice: 0,
    description: "",
    category: "",
    author: "",
    dimension: "",
    color: "",
    isbn: "",
    binding: "",
    language: "",
  };
  const [product, setProduct] = useState(initialState);
  const {
    title,
    price,
    description,
    category,
    author,
    dimension,
    color,
    isbn,
    binding,
    language,
    disPrice,
  } = product;

  const [images, setImages] = useState([]);

  const [state, dispatch] = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0) return error("Files does not exist.");

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) error(err);

    const imgCount = images.length;
    if (imgCount + newImages.length > 5) return error("Select up to 5 images.");
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return error("Authentication is not valid.");

    if (
      !title ||
      !price ||
      !description ||
      !author ||
      !dimension ||
      !color ||
      !isbn ||
      !binding ||
      !language ||
      category === "all" ||
      images.length === 0
    )
      return error("Please add all the fields.");

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media], reviews: [] },
        auth.token
      );
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }
    }

    dispatch({ type: "NOTIFY", payload: { loading: false } });
    return success(res.msg);
  };

  const openFilePicker = () => {
    document.querySelector("#image_inp").click();
  };

  return (
    <DashboardLayout className="dashboard">
      <div className="products_manager">
        <Head>
          <title>Products Manager</title>
        </Head>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <div class="accordion mt-30" id="accordionExample">
              <div class="accordion-item">
                <h3 id="headingOne">
                  <button
                    class="accordion-button product_input-head"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-controls="collapseOne"
                  >
                    Product Description
                  </button>
                </h3>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <label htmlFor="pro_title" className="my-2">
                      Title Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Title"
                      className="d-block mb-4 w-100 p-2 product_input"
                      onChange={handleChangeInput}
                      id="pro_title"
                    />

                    <label htmlFor="description" className="mb-10">
                      Book Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="6"
                      placeholder="Description"
                      onChange={handleChangeInput}
                      className="d-block mb-4 w-100 p-2 product_input"
                      value={description}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion mt-30" id="accordionExample2">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed product_input-head"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Product Specifications
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample2"
                >
                  <div class="accordion-body row">
                    <div className="col-lg-6">
                      <div className=" input-group-prepend px-0 my-2">
                        <label htmlFor="" className="my-2">
                          Genre
                        </label>
                        <select
                          name="category"
                          id="category"
                          value={category}
                          onChange={handleChangeInput}
                          className="custom-select text-capitalize product_input"
                        >
                          <option value="all">Categories</option>
                          {categories.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="my-2">
                        <label htmlFor="" className="my-2">
                          Author Name
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={author}
                          placeholder="Author"
                          className="d-block w-100 p-2 product_input"
                          onChange={handleChangeInput}
                        />
                      </div>

                      <div className=" input-group-prepend px-0 my-2">
                        <label htmlFor="" className="my-2">
                          Page Color
                        </label>
                        <select
                          name="color"
                          id="color"
                          value={color}
                          onChange={handleChangeInput}
                          className="custom-select text-capitalize product_input"
                        >
                          <option value="all">Book Size</option>
                          {["Black & White", "Multicolor"].map((color, i) => (
                            <option key={color + i + "color"} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="my-2">
                        <label htmlFor="" className="my-2">
                          Language
                        </label>
                        <input
                          name="language"
                          value={language}
                          placeholder="Language"
                          className="d-block w-100 p-2 product_input"
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className=" input-group-prepend px-0 my-2">
                        <label htmlFor="" className="my-2">
                          Book Size
                        </label>
                        <select
                          name="dimension"
                          id="dimension"
                          value={dimension}
                          onChange={handleChangeInput}
                          className="custom-select text-capitalize product_input"
                        >
                          <option value="all">Book Size</option>
                          {[
                            '5.00" x 8.00"',
                            '5.50" x 8.50"',
                            '6.00" x 9.00"',
                            '7.25" x 9.50"',
                            '8.00" x 11.00"',
                            '8.50" x 11.00"',
                            '8.50" x 11.75"',
                          ].map((item, i) => (
                            <option key={item + i} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className=" input-group-prepend px-0 my-2">
                        <label htmlFor="" className="my-2">
                          Book Binding
                        </label>
                        <select
                          name="binding"
                          id="binding"
                          value={binding}
                          onChange={handleChangeInput}
                          className="custom-select text-capitalize product_input"
                        >
                          <option value="all">Book Size</option>
                          {["HardCover", "Paperback"].map((bind, i) => (
                            <option key={bind + i + "bind"} value={bind}>
                              {bind}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="my-2">
                        <label htmlFor="" className="my-2">
                          ISBN
                        </label>
                        <input
                          name="isbn"
                          value={isbn}
                          placeholder="ISBN"
                          className="d-block w-100 p-2 product_input"
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-info my-2 px-4">
              {onEdit ? "Update" : "Create"}
            </button>
          </div>

          <div className="col-md-6 my-4">
            <div className="input-group mb-3" style={{ width: "100%" }}>
              <div
                className="custom-file border rounded"
                style={{ width: "100%" }}
              >
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Shop Image Section
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body">
                        <input
                          type="file"
                          className="custom-file-input"
                          onChange={handleUploadInput}
                          multiple
                          accept="image/*"
                          id="image_inp"
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
                              <div>Upload Images</div>
                            </IconButton>
                          </div>
                          {images.map((img, index) => (
                            <div key={index} className="file_img my-1">
                              <img
                                src={
                                  img.url ? img.url : URL.createObjectURL(img)
                                }
                                alt=""
                                className="img-thumbnail rounded"
                              />

                              <span onClick={() => deleteImage(index)}>X</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion mt-30" id="accordionExample3">
              <div class="accordion-item">
                <h3 id="headingThree">
                  <button
                    class="accordion-button product_input-head"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-controls="collapseThree"
                  >
                    Price
                  </button>
                </h3>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample3"
                >
                  <div class="accordion-body">
                    <div className="row">
                      <div className="col-lg-6 my-4">
                        <label htmlFor="" className="my-2">
                          Discounted Price (Optional)
                        </label>
                        <input
                          type="number"
                          name="disPrice"
                          value={disPrice}
                          placeholder="Discounted Price"
                          className="d-block w-100 p-2 product_input"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="col-lg-6 my-4">
                        <label htmlFor="" className="my-2">
                          Original Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={price}
                          placeholder="Price"
                          className="d-block w-100 p-2 product_input"
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps() {
  // const res = await getData(`priceList`);
  // console.log(res);
  return {
    props: {
      // priceList: res,
    }, // will be passed to the page component as props
  };
}

export default ProductsManager;
