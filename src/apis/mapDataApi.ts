import axios from "axios";
import { apiBaseUrl, apiPaths } from "../constants/apiConstans";
import { CellData } from "../globalTypes";

export const getCircles = async (boardData: number[]): Promise<CellData[]> => {
  const apiPath = `${apiBaseUrl + apiPaths.getBoard}?x=${boardData[0]}&y=${
    boardData[1]
  }&w=${boardData[2]}&h=${boardData[3]}`;

  const request = axios(apiPath, {
    method: "GET",
  });
  return (await request).data;
};

export const addCircle = async (elementData: CellData): Promise<number> => {
  const apiPath = apiBaseUrl + apiPaths.postBoard;

  const request = axios({
    method: "post",
    url: apiPath,
    data: {
      x: elementData.x,
      y: elementData.y,
      name: elementData.data.name,
      color: elementData.data.color,
      data: {
        radius: elementData.data.data.radius,
        info: elementData.data.data.info,
      },
    },
  });
  return (await request).status;
};
