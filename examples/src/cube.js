import {Mesh, MeshStandardMaterial, BoxGeometry} from 'three';
import ThreeJSOverlayView from '@ubilabs/threejs-overlay-view';

import {getMapsApiOptions, loadMapsApi} from '../jsm/load-maps-api';

const VIEW_PARAMS = {
  center: {
    lat: -18.934096,
    lng: -48.288711
  },
  tilt: 67.5,
  heading: 60,
  zoom: 18
};

async function main() {
  const map = await initMap();

  const overlay = new ThreeJSOverlayView({
    ...VIEW_PARAMS.center
  });
  overlay.setMap(map);

  const scene = overlay.getScene();
  const cube = new Mesh(
    new BoxGeometry(5, 20, 5),
    new MeshStandardMaterial({color: 0xff0000})
  );

  const cubeLocation = {...VIEW_PARAMS.center, altitude: 0};
  overlay.latLngAltToVector3(cubeLocation, cube.position);

  scene.add(cube);
}

async function initMap() {
  const {mapId} = getMapsApiOptions();
  await loadMapsApi();

  return new google.maps.Map(document.querySelector('#map'), {
    mapId,
    disableDefaultUI: true,
    clickableIcons: false,
    backgroundColor: 'transparent',
    gestureHandling: 'greedy',
    ...VIEW_PARAMS
  });
}

main().catch(err => {
  console.error('uncaught error in main: ', err);
});
