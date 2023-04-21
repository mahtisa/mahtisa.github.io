import "./modalBox.css";

import ExternalStateExample from "./ExternalStateExample";

const ModalBox = ({ showModal, setShowModal, setLong, setWidth }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };
  return (
    <>
      <div
        className={showModal ? "cover" : "cover none"}
        onClick={handleBackdropClick}
      >
        <div className="modal-holder">
          <div
            tabIndex="0"
            className="map-box leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
            id="map"
          >
            <ExternalStateExample setLong={setLong} setWidth={setWidth} setShowModal={setShowModal}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBox;
