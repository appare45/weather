import React from "react";
import Button from "./button";

export type PermissionStatus = "granted" | "denied" | "prompt";

interface Props {
  setNewPermissionStatus: (e: PermissionStatus) => void;
  setPermissionErrorStatus: (e: string) => void;
}

export const GeoLocationErrorHandler = (
  e: GeolocationPositionError
): string => {
  let errorMessage = "";
  switch (e.code) {
    case 1:
      errorMessage += "権限がありません";
      break;

    case 2:
      errorMessage += "内部エラーが発生しました";
      break;

    case 3:
      errorMessage += "タイムアウトが発生しました";
      break;

    default:
      errorMessage += "不明のエラーが発生しました";
      break;
  }
  if (!navigator.onLine && e.code != 1)
    errorMessage += "\n オフラインでは現在地の取得できない場合があります";
  return errorMessage;
};

const GrantPermission = (props: Props) => {
  const getPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => props.setNewPermissionStatus("granted"),
        (e) => {
          props.setPermissionErrorStatus(GeoLocationErrorHandler(e));
          props.setNewPermissionStatus("denied");
        }
      );
    }
  };
  return <Button onClick={getPermission}>現在地を取得</Button>;
};

export default GrantPermission;
