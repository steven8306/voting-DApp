import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { CreateItem } from "../../components/CreateItem";
import { Layout } from "../../components/Layout";
import { ItemEntity, ProtectedPage } from "../../types";

interface Props {}

const CreateItemPage: ProtectedPage<Props> = () => {
  const { data: items, mutate } = useSWR<ItemEntity[], any>("/api/items");

  const createItemProps = { items, mutate };

  return (
    <>
      <Head>
        <title>Create An Item | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CreateItem {...createItemProps} />
      </Layout>
    </>
  );
};

CreateItemPage.isProtected = true;

export default CreateItemPage;