import { useState, useEffect, useTransition, useRef, useMemo, Suspense } from 'react';
import { useControls } from 'leva';
import { Canvas, useLoader, useFrame, useThree, extend } from '@react-three/fiber';
import { Vector3 } from 'three'
import {
  AccumulativeShadows,
  RandomizedLight,
  Center,
  Environment,
  OrbitControls,
  SpotLight,
  Lightformer,
  useDepthBuffer,
  MeshReflectorMaterial,
  ScrollControls,
  Sky,
  useScroll,
  Bounds, useBounds, ContactShadows
} from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper'
import * as THREE from 'three'

// Material Base
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Material Icons
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import InfoIcon from '@mui/icons-material/Info';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SwipeIcon from '@mui/icons-material/Swipe';
import TouchAppIcon from '@mui/icons-material/TouchApp';

// Models

import { Water } from 'three-stdlib'

extend({ Water })



export default function App() {


  const [camera_focus, setFocus] = useState("0");

  return (
    <div className='full_vh'>
      <Canvas shadows flat dpr={[1, 2]}>
        <ambientLight intensity={0.125} />

        <OrbitControls autoRotate={false} enableZoom={true} makeDefault minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.1} />

        <pointLight position={[100, 100, 100]} intensity={.2} />

        <color attach="background" args={['black']} onClick={() => setFocus(4)} />
        <group position={[0, 0, 0]}>

          <Suspense fallback={null}>
            <Bounds fit clip observe damping={6} margin={1.2}>
              <SelectToZoom>

                <mesh>
                  <boxGeometry args={[2, 2, 2]} />

                </mesh>

                {/* Select to Zoom Elements */}

              </SelectToZoom>
            </Bounds>
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -35, 0]} opacity={0.2} width={200} height={200} blur={1} far={50} />
          </Suspense>




          <pointLight position={[5, 10, 5]} intensity={.8} />

        </group>

      </Canvas>

    </div>

  )
}


// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom({ children }) {
  const api = useBounds()
  return (
    <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
    </group>
  )
}