import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { CircleElement } from "../../types";
import { LeafletEvent } from "leaflet";
import { Circle as LeafletCircle } from "react-leaflet";
import { defaultCircleColor } from "../../constants/other";

type Props = {
  element: CircleElement;
  isSelected: boolean;
  color?: string;
};

const Circle: React.FC<Props> = ({ element, isSelected, color }) => {
  const dispatch = useDispatch();

  const onCircleClick = (ev: LeafletEvent) => {
    dispatch(actions.circles.setSelectedCircleId(ev.target.options.id));
    dispatch(actions.app.setSidebarVisibility(true));
  };

  return (
    <LeafletCircle
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

export default React.memo(Circle);
