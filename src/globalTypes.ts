export type CellData = {
  _id?: string;
  x: number;
  y: number;
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
