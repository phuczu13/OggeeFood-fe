import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import logoShipper from '../../users/assets/png/R.png'; // Import logo shipper
mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaGFuZHNvbWUxMjMiLCJhIjoiY20zZzA4YWQxMDFmYzJsbmQ5Zjl1aDRpbiJ9.zR3FeYl23tlgGMluLkISIQ';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const shipperMarker = useRef(null);
    const [route, setRoute] = useState(null);

    const storeLocation = { longitude: 106.700981, latitude: 10.77689 };
    const customerLocation = { longitude: 106.695871, latitude: 10.7798 };

    // Fetch route data
    useEffect(() => {
        const getRoute = async () => {
            const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${storeLocation.longitude},${storeLocation.latitude};${customerLocation.longitude},${customerLocation.latitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
            try {
                const response = await fetch(routeUrl);
                const data = await response.json();
                if (data.routes && data.routes.length > 0) {
                    setRoute(data.routes[0].geometry);
                } else {
                    console.error("No valid route found.");
                }
            } catch (error) {
                console.error("Error fetching route data:", error);
            }
        };
        

        getRoute();
    }, []); // Fetch route only once when component mounts

    // Initialize Mapbox map
    useEffect(() => {
        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [storeLocation.longitude, storeLocation.latitude],
                zoom: 13,
            });

            map.current.on('load', () => {
                // Add store and customer markers
                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat([storeLocation.longitude, storeLocation.latitude])
                    .setPopup(new mapboxgl.Popup().setText('Cửa hàng'))
                    .addTo(map.current);

                new mapboxgl.Marker({ color: 'green' })
                    .setLngLat([customerLocation.longitude, customerLocation.latitude])
                    .setPopup(new mapboxgl.Popup().setText('Bạn đang ở đây'))
                    .addTo(map.current);

                // Add shipper marker
                const shipperElement = document.createElement('div');
                shipperElement.style.backgroundImage = `url(${logoShipper})`;
                shipperElement.style.backgroundSize = 'contain';
                shipperElement.style.width = '40px';
                shipperElement.style.height = '33px';

                shipperMarker.current = new mapboxgl.Marker(shipperElement)
                    .setLngLat([storeLocation.longitude, storeLocation.latitude])
                    .setPopup(new mapboxgl.Popup().setText('Shipper'))
                    .addTo(map.current);
            });
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []); // Initialize map only once when component mounts

    // Add route and animate shipper when route is ready
    useEffect(() => {
        if (route && route.coordinates && !map.current.getSource('route')) {
            map.current.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: route,
                },
            });
        
            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                paint: {
                    'line-color': '#FF5733',
                    'line-width': 5,
                },
            });
    
            // Animate the shipper marker
            const duration = 40000; // 40 seconds
            const totalDistance = route.coordinates.length - 1;
    
            if (totalDistance > 0) {
                let step = 0;
                let startTime = null;
    
                const moveShipper = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = (timestamp - startTime) / duration;
                
                    if (progress < 1) {
                        // Calculate step based on progress
                        step = Math.min(Math.floor(progress * totalDistance), totalDistance - 1);
                        const [longitude, latitude] = route.coordinates[step];
                
                        if (shipperMarker.current) {
                            shipperMarker.current.setLngLat([longitude, latitude]);
                            map.current.flyTo({
                                center: [longitude, latitude],
                                essential: true,
                            });
                        }
                
                        // Request next frame
                        requestAnimationFrame(moveShipper);
                    } else {
                        // Final position at customer location
                        shipperMarker.current.setLngLat([customerLocation.longitude, customerLocation.latitude]);
                        map.current.flyTo({
                            center: [customerLocation.longitude, customerLocation.latitude],
                            essential: true,
                        });
                    }
                };
                
    
                requestAnimationFrame(moveShipper);
            } else {
                console.error("Route has no valid coordinates.");
            }
        }
    }, [route, map.current, shipperMarker.current]); // Depend on route and marker initialization
    

    return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default MapComponent;
