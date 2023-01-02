import React from "react";
import { useEffect } from "react";
import { postData } from "../../server_utils/fetchData";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/main-light";

function Pay({ redirect }) {
  useEffect(() => {
    window.location.href = redirect;
  }, []);

  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      Payment Processing...
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const price = context.req.cookies["price"];

  const res = await postData(`/pay`, { price });

  // server side rendering
  return {
    props: { redirect: res }, // will be passed to the page component as props
  };
}

export default Pay;
