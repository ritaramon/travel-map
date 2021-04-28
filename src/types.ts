export type CircleElement = CircleCoordinates & {
  _id?: string;
  userId?: string;
  data: CircleElementRadiusDetails;
};

type CircleElementRadiusDetails = {
  name: string;
  color: string;
  data: {
    radius: number;
    info?: string;
    category?: string;
  };
  createdAt?: string;
};

export type CircleCoordinates = {
  x: number;
  y: number;
};

export type addCircleResponse = {
  status: number;
  id: string;
};

export type Category = {
  color: string;
  name: string;
  userId?: string;
  id?: string;
};

export type Action = {
  type: string;
  payload?: any;
};
