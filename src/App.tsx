import './App.css'
import { Canvas, RootState } from '@react-three/fiber'
import Three from './components/Three'
import * as THREE from 'three'
import React from 'react'
import { OrbitControls } from '@react-three/drei'


function App() {
  

  return (
   <Canvas 
   id='webgl'
   onCreated={(state: RootState) => {
    state.gl.setClearColor(new THREE.Color('white'))
    state.gl.physicallyCorrectLights = true
    state.scene.fog = new THREE.Fog(new THREE.Color('white'), 0.5, 3)
   }}
   camera={{
    position: [0, 0.5, 0.9]
   }}
   shadows
   >
    <OrbitControls />
    <React.Suspense fallback={<div>loading</div>}> 
    <Three  />
    </React.Suspense>
   </Canvas>
  )
}

export default App
