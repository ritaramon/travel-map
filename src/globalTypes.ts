export type CellData = CellCoordinates & {
  _id?: string;
  pending?: boolean;
  data: CellDataRadiusDetails;
};

type CellDataRadiusDetails = {
  name: string;
  color: string;
  data: {
    radius: number;
    info?: string;
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
