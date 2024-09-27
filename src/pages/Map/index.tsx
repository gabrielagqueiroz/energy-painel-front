import { Layout } from "antd";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const { Content } = Layout;

const Map = () => {
  const apiKey = import.meta.env.VITE_API_GOOGLE_MAP
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });


  const center = {
    lat: -3.71839,
    lng: -38.5434
  };

  return (
    <Layout>
      <Content className="p-8 min-h-[400px]">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={center}
              zoom={10}
            >
                <Marker position={center} />
            </GoogleMap>
          ) : (
            <></>
          )}
      </Content>
    </Layout>
  );
};

export default Map;
