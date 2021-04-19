import { LeafletEvent } from "leaflet";
import React from "react";
import { Circle } from "react-leaflet";
import { useDispatch } from "react-redux";
import { CellData } from "../../globalTypes";
import { setSelectedCircleId } from "../../state/actions";

interface Props {
  element: CellData;
  isSelected: boolean;
}

const MapElement: React.FC<Props> = ({ element, isSelected }) => {
  const dispatch = useDispatch();

  const onCircleClick = (ev: LeafletEvent) => {
    dispatch(setSelectedCircleId(ev.target.options.id));
  };

  return (
    <Circle
      id={element._id}
      center={[element.x, element.y]}
      radius={element.data.data?.radius ?? 100}
      fillOpacity={isSelected ? 0.4 : 0.2}
      weight={isSelected ? 3 : 2}
      color="#FCA311"
      onClick={onCircleClick}
    />
  );
};

export default React.memo(MapElement);
