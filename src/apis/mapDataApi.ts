import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { apiBaseUrl, apiPaths } from "../constants/apiConstans";
import { CellData, AddElementResponse } from "../globalTypes";

export const getBoardElements = async (): Promise<CellData[]> => {
  console.log(auth.currentUser?.uid);
  const apiPath = `${
    apiBaseUrl + apiPaths.getBoard
  }?x=-90&y=-180&w=180&h=360&userId=${auth.currentUser?.uid}`;
  console.log(apiPath);

  const request = axios(apiPath, {
    method: "GET",
  });
  return (await request).data;
};

export const addBoardElement = async (
  elementData: CellData
): Promise<AddElementResponse> => {
  console.log;
  const apiPath = apiBaseUrl + apiPaths.postBoard;
  const request = axios({
    method: "POST",
    url: apiPath,
    data: {
      x: elementData.x,
      y: elementData.y,
      userId: elementData.userId,
      name: elementData.data.name,
      color: elementData.data.color,
      data: {
        category: elementData.data.data.category,
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
