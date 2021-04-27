import { constants } from "../constants";
import { Action, CellData } from "../../globalTypes";

export type CirclesData = {
  circles: CellData[];
  selectedCircleId: string;
};

const defaultCirclesData: CirclesData = {
  circles: [],
  selectedCircleId: "",
};

export const circlesReducer = (
  state = defaultCirclesData,
  action: Action
): CirclesData => {
  switch (action.type) {
    case constants.circles.SET_DATA:
      return { ...state, circles: action.payload };
    case constants.circles.UPDATE_DATA_BY_ID: {
      const filteredCircles = state.circles.filter(
        (circle) => circle._id !== action.payload._id
      );
      return { ...state, circles: [...filteredCircles, action.payload] };
    }
    case constants.circles.UPDATE_DATA_BY_COORDINATES: {
      const filteredCircles = state.circles.filter(
        (element) =>
          element.x !== action.payload.x && element.y !== action.payload.x
      );
      return { ...state, circles: [...filteredCircles, action.payload] };
    }
    case constants.circles.DELETE_CIRCLE: {
      const filteredCircles = state.circles.filter(
        (x) => x._id !== action.payload
      );
      return { ...state, circles: filteredCircles };
    }
    case constants.circles.SET_SELECTED_CIRCLE_ID:
      return {
        ...state,
        selectedCircleId: action.payload,
        // isSidebarVisible: true,
      };
    default:
      return state;
  }
};
