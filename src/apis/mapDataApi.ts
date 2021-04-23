import axios from "axios";
import { apiBaseUrl, apiPaths } from "../constants/apiConstans";
import { CellData, CellCoordinates, AddElementResponse } from "../globalTypes";

export const getElements = async (boardData: number[]): Promise<CellData[]> => {
  const apiPath = `${apiBaseUrl + apiPaths.getBoard}?x=${boardData[0]}&y=${
    boardData[1]
  }&w=${boardData[2]}&h=${boardData[3]}`;

  const request = axios("aaa", {
    method: "GET",
  });
  return (await request).data;
};

export const getElement = async (
  elementCoords: CellCoordinates
): Promise<CellData> => {
  const apiPath = apiBaseUrl + apiPaths.getCell;
  const request = axios({
    method: "GET",
    url: apiPath,
    data: {
      x: elementCoords.x,
      y: elementCoords.y,
    },
  });
  return (await request).data;
};

export const addElement = async (
  elementData: CellData
): Promise<AddElementResponse> => {
  const apiPath = apiBaseUrl + apiPaths.postBoard;

  const request = axios({
    method: "POST",
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
  const response = await request;
  return { status: response.status, id: response.data.id };
};

export const deleteElement = async (circleId: string): Promise<number> => {
  const apiPath = apiBaseUrl + apiPaths.deleteCell;
  const request = axios({
    method: "POST",
    url: apiPath,
    data: {
      id: circleId,
    },
  });
  return (await request).status;
};
