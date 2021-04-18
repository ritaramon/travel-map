import React, { useState, useEffect, useRef } from "react";
import { Map, TileLayer, FeatureGroup, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { getCircles } from "../../apis/mapDataApi";
import Leaflet, { LeafletEvent, LeafletMouseEvent } from "leaflet";
import { addCircle } from "../../apis/mapDataApi";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/reducers";
import { setData, updateData } from "../../state/actions";

const MainPage: React.FC = () => {
  const featureGroup = useRef<FeatureGroup<
    {
      children: JSX.Element;
      ref: unknown;
    },
    L.FeatureGroup<unknown>
  > | null>(null);

  const [clickedCircle, setClickedCircle] = useState<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    getCircles([0, 0, 180, 90]).then((response) => {
      dispatch(setData(response));
    });
  }, []);
  const mapElements = useSelector((state: AppState) => state.apiData.data);
  const sidebarVisibility = useSelector(
    (state: AppState) => state.appData.isSidebarVisible
  );

  const onCircleClick = (ev: LeafletEvent) => {
    if (clickedCircle) {
      clickedCircle.setStyle({ fillOpacity: 0.2, weight: 2 });
    }

    ev.target.setStyle({ fillOpacity: 0.4, weight: 3 });
    setClickedCircle(ev.target);
  };

  const handleElementCreation = (event: LeafletMouseEvent) => {
    const elementData = {
      x: event.layer._latlng.lat,
      y: event.layer._latlng.lng,
      data: {
        name: "user123",
        color: "#000000",
        data: {
          radius: event.layer._mRadius,
          info: "info text",
        },
      },
    };

    addCircle(elementData)
      .then((response: number) => {
        if (response === 200) {
          dispatch(updateData(elementData));
        }
      })

      .finally(() => {
        featureGroup?.current?.leafletElement.removeLayer(event.layer);
      });
  };
  const corner1 = Leaflet.latLng(-180, -90);
  const corner2 = Leaflet.latLng(180, 90);
  const bounds = Leaflet.latLngBounds(corner1, corner2);
  const clickedCircleInfo = mapElements.find(
    (element) => element._id === clickedCircle?.options.id
  );

  return (
    <>
      <PageWrapper>
        <Sidebar
          docked={sidebarVisibility}
          sidebar={<SidebarContent info={clickedCircleInfo} />}
          styles={{
            sidebar: { background: "#EBEBEB", width: "300px" },
          }}
        >
          <div style={{ height: "100%", width: "100%" }}>
            <Map
              worldCopyJump={true}
              center={[54.68715, 25.279652]}
              zoom={13}
              minZoom={3}
              // onClick={onLayerClick}
              maxBoundsViscosity={1.0}
              maxBounds={bounds}
            >
              <TileLayer
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
                      shapeOptions: { color: "#FCA311", weight: "1" },
                      showLength: false,
                      metric: false,
                      clickable: true,
                      showRadius: false,
                    },
                  }}
                  edit={{ edit: false, remove: false }}
                />
              </FeatureGroup>
              {mapElements.map((element) => {
                const id = element._id + "" + element.x + element.y;
                return (
                  <Circle
                    id={element._id}
                    key={id}
                    center={[element.x, element.y]}
                    radius={element.data.data?.radius ?? 100}
                    color="#FCA311"
                    weight={2}
                    onClick={onCircleClick}
                  ></Circle>
                );
              })}
            </Map>
          </div>
        </Sidebar>
      </PageWrapper>
    </>
  );
};

export default MainPage;
