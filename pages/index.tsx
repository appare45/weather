import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CityWeather } from "../components/cityWeather";
import { Header } from "../components/header";
import { Main } from "../components/main";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather information in japan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main>
        <>
          <CityWeather />
        </>
      </Main>
    </div>
  );
};

export default Home;
