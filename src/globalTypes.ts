export type CellData = CellCoordinates & {
  _id?: string;
  pending?: boolean;
  userId?: string;
  data: CellDataRadiusDetails;
};

type CellDataRadiusDetails = {
  name: string;
  color: string;
  data: {
    radius: number;
    info?: string;
    category?: string;
  };
  createdAt?: string;
};

export type CellCoordinates = {
  x: number;
  y: number;
};

export type AddElementResponse = {
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
