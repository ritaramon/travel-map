import { LeafletEvent } from "leaflet";
import React from "react";
import { Circle } from "react-leaflet";
import { useDispatch } from "react-redux";
import { defaultCircleColor } from "../../constants/other";
import { CircleElement } from "../../types";
import { actions } from "../../state/actions";

type Props = {
  element: CircleElement;
  isSelected: boolean;
  color?: string;
};

const MapElement: React.FC<Props> = ({ element, isSelected, color }) => {
  const dispatch = useDispatch();

  const onCircleClick = (ev: LeafletEvent) => {
    dispatch(actions.circles.setSelectedCircleId(ev.target.options.id));
    dispatch(actions.app.setSidebarVisibility(true));
  };

  return (
    <Circle
      id={element._id}
      center={[element.x, element.y]}
      radius={element.data.data?.radius ?? 100}
      fillOpacity={isSelected ? 0.4 : 0.2}
      weight={isSelected ? 3 : 2}
      color={color ?? defaultCircleColor}
      onClick={onCircleClick}
    />
  );
};

export default React.memo(MapElement);
