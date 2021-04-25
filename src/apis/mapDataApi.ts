import axios from "axios";
import { apiBaseUrl, apiPaths } from "../constants/apiConstans";
import { CellData, AddElementResponse } from "../globalTypes";

export const getBoardElements = async (
  boardData: number[]
): Promise<CellData[]> => {
  const apiPath = `${apiBaseUrl + apiPaths.getBoard}?x=${boardData[0]}&y=${
    boardData[1]
  }&w=${boardData[2]}&h=${boardData[3]}`;

  const request = axios(apiPath, {
    method: "GET",
  });
  return (await request).data;
};

export const addBoardElement = async (
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

export const deleteBoardElement = async (circleId: string): Promise<number> => {
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
