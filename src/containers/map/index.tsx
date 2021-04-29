import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/reducers";
import { actions } from "../../state/actions";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import PageWrapper from "../../components/wrappers/PageWrapper";
import Header from "./Header";
import CategoriesModal from "./categories/CategoriesModal";
import HowToModal from "./HowToModal";
import Message from "../../components/messages/NotificationMessage";
import Loader from "../../components/others/Loader";
import Map from "./Map";

const MapPage: React.FC = () => {
  const dispatch = useDispatch();

  const { selectedCircleId, sidebarVisibility, appLoading } = useSelector(
    (state: AppState) => ({
      selectedCircleId: state.circlesData.selectedCircleId,
      sidebarVisibility: state.appData.isSidebarVisible,
      appLoading: state.appData.loading,
    })
  );

  useEffect(() => {
    dispatch(actions.circles.fetchCirclesAndCategoriesRequest());
  }, []);

  if (appLoading) {
    return <Loader loading={appLoading} />;
  }
  return (
    <>
      <Header />
      <PageWrapper>
        <Message />
        <CategoriesModal />
        {!localStorage.getItem("howToModal") && <HowToModal />}
        <Sidebar
          docked={sidebarVisibility}
          sidebar={
            selectedCircleId ? (
              <SidebarContent selectedCircleId={selectedCircleId} />
            ) : (
              ""
            )
          }
          styles={{
            sidebar: { backgroundColor: "#f5f6f6", width: "240px" },
          }}
        >
          <Map />
        </Sidebar>
      </PageWrapper>
    </>
  );
};

export default MapPage;
