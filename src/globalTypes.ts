export type CellData = CellCoordinates & {
  _id?: string;
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
