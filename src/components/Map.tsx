import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { selectPlaces } from '../features/places/placesSlice'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 60.192059,
  lng: 24.945831,
}

function Map(children: React.ReactNode) {
  const { places } = useSelector(selectPlaces)

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY as string}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11.5}>
        {places?.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place?.location?.lat, lng: place?.location?.lon }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
