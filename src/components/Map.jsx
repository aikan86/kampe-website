import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix per le icone di Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapWrapper = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 2rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CustomMarker = styled(Marker)`
  .leaflet-marker-icon {
    transition: transform 0.3s;
  }

  &:hover .leaflet-marker-icon {
    transform: scale(1.2);
  }
`;

const EventMarkerPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  .leaflet-popup-content {
    margin: 0;
    width: 250px !important;
  }
`;

const PopupContent = styled.div`
  cursor: pointer;
`;

const PopupImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const PopupInfo = styled.div`
  padding: 15px;
`;

const PopupTitle = styled.h3`
  margin: 0 0 5px;
  font-size: 16px;
  color: #2c3e50;
`;

const PopupDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
`;
const EventsMap = ({ events, onSelectEvent }) => {
    const [center, setCenter] = useState([41.9028, 12.4964]); // Roma come default
    
    // Se ci sono eventi, centra la mappa sulla media delle coordinate
    useEffect(() => {
      if (events && events.length > 0) {
        const validEvents = events.filter(event => {
          const coords = event.attributes.coordinate;
          return coords && coords.lat && coords.lng;
        });
        
        if (validEvents.length > 0) {
          const avgLat = validEvents.reduce((sum, event) => sum + event.attributes.coordinate.lat, 0) / validEvents.length;
          const avgLng = validEvents.reduce((sum, event) => sum + event.attributes.coordinate.lng, 0) / validEvents.length;
          setCenter([avgLat, avgLng]);
        }
      }
    }, [events]);
    
    const formatDate = (dateString) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };
    
    return (
      <MapWrapper>
        <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events && events.map(event => {
            const { attributes } = event;
            if (!attributes.coordinate || !attributes.coordinate.lat || !attributes.coordinate.lng) {
              return null;
            }
            
            const imageUrl = attributes.immagine?.data?.attributes?.url 
              ? `http://localhost:1337${attributes.immagine.data.attributes.url}`
              : 'https://via.placeholder.com/400x200?text=Immagine+non+disponibile';
            
            return (
              <Marker 
                key={event.id} 
                position={[attributes.coordinate.lat, attributes.coordinate.lng]}
              >
                <EventMarkerPopup>
                  <PopupContent onClick={() => onSelectEvent(event)}>
                    <PopupImage src={imageUrl} alt={attributes.titolo} />
                    <PopupInfo>
                      <PopupTitle>{attributes.titolo}</PopupTitle>
                      <PopupDate>{formatDate(attributes.data)}</PopupDate>
                    </PopupInfo>
                  </PopupContent>
                </EventMarkerPopup>
              </Marker>
            );
          })}
        </MapContainer>
      </MapWrapper>
    );
  };
  
  export default EventsMap;
  