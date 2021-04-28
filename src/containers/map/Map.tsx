import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebaseConfig";
import { LeafletMouseEvent } from "leaflet";
import { actions } from "../../state/actions";
import { AppState } from "../../state/reducers";
import { CircleElement } from "../../types";
import { Map as LeafletMap, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Circle from "./Circle";
import { defaultCircleColor } from "../../constants/other";

const Map: React.FC = () => {
  const dispatch = useDispatch();

  const featureGroup = useRef<FeatureGroup<
    {
      children: JSX.Element;
      ref: unknown;
    },
    L.FeatureGroup<unknown>
  > | null>(null);

  const { circles, selectedCircleId, categories } = useSelector(
    (state: AppState) => ({
      circles: state.circlesData.circles,
      selectedCircleId: state.circlesData.selectedCircleId,
      categories: state.categoriesData.categories,
    })
  );

  const handleElementCreation = (event: LeafletMouseEvent) => {
    featureGroup?.current?.leafletElement.removeLayer(event.layer);
    // prevent drawing outside the map
    if (
      -180 <= event.layer._latlng.lng &&
      event.layer._latlng.lng <= 180 &&
      -90 <= event.layer._latlng.lat &&
      event.layer._latlng.lat <= 90
    ) {
      const elementData: CircleElement = {
        x: event.layer._latlng.lat,
        y: event.layer._latlng.lng,
        userId: auth.currentUser?.uid,
        data: {
          name: "user",
          color: "#000000",
          data: {
            radius: event.layer._mRadius,
          },
        },
      };
      dispatch(actions.circles.addCircle(elementData));
    }
  };

  return (
    <LeafletMap center={[50, 50]} zoom={4} minZoom={1}>
      <TileLayer
        noWrap={true}
        attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={featureGroup}>
        <EditControl
          position="topleft"
          onCreated={handleElementCreation}
          draw={{
            polygon: false,
            polyline: false,
            rectangle: false,
            marker: false,
            circlemarker: false,
            circle: {
              shapeOptions: { color: defaultCircleColor, weight: "2" },
              showLength: false,
              metric: false,
              clickable: true,
              showRadius: false,
            },
          }}
          edit={{ edit: false, remove: false }}
        />
      </FeatureGroup>
      {circles.map((element) => {
        const id = element._id;
        const isSelected = id === selectedCircleId;
        const category = categories.find(
          (category) => category.id === element.data.data.category
        );
        return (
          <Circle
            key={id}
            element={element}
            isSelected={isSelected}
            color={category?.color}
          />
        );
      })}
    </LeafletMap>
  );
};

export default Map;
