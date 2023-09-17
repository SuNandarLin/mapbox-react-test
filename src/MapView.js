import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './index.css'
import geoJson from './SingaporePlaces.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3UtbmFuZGFyLWxpbm4iLCJhIjoiY2xtbXhmY3R0MG5tdzJ6cGI3M3A0Ymt6eCJ9.0dQellOaGn7MXzGko3nXSg';

export default function MapView() {
  const mapContainer = useRef(null);
//   const map = useRef(null);
  const [lng, setLng] = useState(-87.65);
  const [lat, setLat] = useState(41.84);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
   const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // map.current.on('move', () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });

    geoJson.features.map((feature) =>
      new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    );
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return() => map.remove();
  });

  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
