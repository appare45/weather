import { useEffect, useState } from "react";
import Address from "./address";
import GrantPermission, {
  GeoLocationErrorHandler,
  PermissionStatus,
} from "./grantPermission";

export const CityWeather = () => {
  const [permission, setPermissionStatus] = useState<PermissionStatus>();
  const [permissionError, setPermissionErrorStatus] = useState<string>();
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition>();
  // const { data, error } = useSWR(
  //   [
  //     {
  //       appId: process.env.NEXT_PUBLIC_YAHOO_API_ID,
  //       coordinates: "12",
  //       output: "json",
  //       date: "string",
  //       past: 2,
  //       interval: 5,
  //     },
  //   ],
  //   YahooWeatherFetcher
  // );
  // console.info(data, error);
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then((e) => {
          setPermissionStatus(e.state);
          e.onchange = function () {
            setPermissionStatus(this.state);
          };
        });
    }
  }, []);

  useEffect(() => {
    if (permission === "granted") {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          console.info(e);
          setCurrentLocation(e);
        },
        (e) => {
          console.error(e.message);
          setPermissionErrorStatus(GeoLocationErrorHandler(e));
          setPermissionErrorStatus("denied");
        }
      );
    }
  }, [permission]);

  return (
    <>
      <h2>Tokyo</h2>
      {/* {navigator?.geolocation && <GrantPermission />} */}
      {(permission === "prompt" || !permission) && (
        <GrantPermission
          setNewPermissionStatus={setPermissionStatus}
          setPermissionErrorStatus={setPermissionErrorStatus}
        />
      )}
      {(permissionError || permission === "denied") && (
        <div className="bg-red-100 text-red-700 px-2 py-1">
          <p>{permissionError ?? "権限がありません"}</p>
        </div>
      )}
      {currentLocation && (
        <Address
          locationCoordinate={[
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
          ]}
        />
      )}

      {/* <p>{data?.ResultInfo.copyright}</p>
      <p>{error}</p> */}
    </>
  );
};
