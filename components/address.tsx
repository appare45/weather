import axios from "axios";
import React, { useMemo, useState } from "react";

interface Props {
  locationCoordinate: [number, number];
}

const YahooReverseGeoCodeApiEndPoint =
  "https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder";

interface ResultInfo {
  ResultInfo: {
    Copyright: string;
  };
  Feature: {
    Country: {
      Code: string;
      Name: string;
    };
    Address: string;
  };
}

const Address = (props: Props) => {
  const [address, setAddress] = useState<string>();
  useMemo(async () => {
    try {
      const { data } = await axios.get<ResultInfo>(
        YahooReverseGeoCodeApiEndPoint,
        {
          params: {
            appid: process.env.NEXT_PUBLIC_YAHOO_API_ID,
            lat: props.locationCoordinate[0],
            lon: props.locationCoordinate[1],
            output: "json",
          },
        }
      );
      setAddress(data.Feature.Address);
    } catch (error) {
      console.error(error);
    }
  }, [props.locationCoordinate]);
  return <p>{address}</p>;
};

export default Address;
