import Link from "next/link";
import { useState, useEffect } from "react";

function BookCover({ data }) {
  const [dataImg, setDataImg] = useState();

  useEffect(() => {
    if (data && data.images && data.images[0]) setDataImg(data.images[0].url);
  }, [data]);
  return (
    <Link href={`/product/${data._id}`}>
      <div className="bookCover">
        <div
          className="imgCover"
          style={{ background: `url(${dataImg})`, backgroundSize: "cover" }}
        ></div>
        <div className="mt-10 mb-20 d-flex justify-content-center">
          <span className="px-2" style={{ borderRight: "2px solid black" }}>
            {data.title}
          </span>
          <span className="px-2">{data.author}</span>
        </div>
      </div>
    </Link>
  );
}

export default BookCover;
