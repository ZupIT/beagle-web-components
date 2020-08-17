import React from 'react';
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react';
import BeagleService from './beagle/beagle-service';

function App() {
  const windowUrl = window.location.search;
  const queryParams = new URLSearchParams(windowUrl);
  const path = queryParams.get("path") || '/payload.json'

  return (
    <BeagleProvider value={BeagleService}>
      <BeagleRemoteView path={path} />
    </BeagleProvider>
  );
}

export default App;