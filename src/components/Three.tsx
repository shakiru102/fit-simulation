import { useFrame, useThree } from '@react-three/fiber'
import { GUI } from 'dat.gui'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import createFbx from './classes/Fbx'
import { gsap } from 'gsap'


const gui: GUI = new GUI()
let 
planeGeometry: THREE.PlaneGeometry,
planeMaterial: THREE.MeshStandardMaterial,
planeMesh: THREE.Mesh,
directionaLight: THREE.DirectionalLight,
directionaLightHelper: THREE.DirectionalLightHelper,
ambientLight: THREE.AmbientLight



const Three = () => {

  const { scene, clock , gl, camera } = useThree()
  

let prevtime = 0
 

 
  useEffect(() => {
    // Ground
    planeGeometry = new THREE.PlaneGeometry(1, 1)
    planeMaterial = new THREE.MeshStandardMaterial()
    planeMesh = new THREE.Mesh(
      planeGeometry,
      planeMaterial
    )

    const textureloader = new THREE.TextureLoader()

    // const grass = textureloader.load('')


    planeMesh.rotation.x =  - Math.PI * 0.5
    planeMesh.scale.set(100, 100, 100)
    planeMesh.receiveShadow = true

    // Light
    directionaLight = new THREE.DirectionalLight()
    directionaLight.color = new THREE.Color('white')
    directionaLight.intensity = 8
    directionaLight.position.set(4, 3, 3)
    directionaLightHelper = new THREE.DirectionalLightHelper(directionaLight)
    directionaLight.castShadow = true

    ambientLight = new THREE.AmbientLight()
    ambientLight.color = new THREE.Color('white') 
    ambientLight.intensity = 0.5

    const fbx = new createFbx(scene, gui)

    // Listeners
//     window.addEventListener('keydown', event => {
//       fbx.keypressed[event.key.toLowerCase()] = true
//       if(fbx.keypressed.w) {
//         if(fbx.keypressed.shift) fbx.setAnimation('Run')
//         else fbx.setAnimation('Jog')

//         if(fbx.keypressed.d){
          
//           fbx.rotation = fbx.rotation >= 1.5 ? fbx.rotation - 0.1 : fbx.rotation
//            fbx.moveX =  fbx.james.position.x + ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//            fbx.moveZ = fbx.rotation >= 1.5 ? fbx.james.position.z - ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3) : fbx.james.position.z
           
           
          
//         }
//         else if(fbx.keypressed.a){

//           fbx.rotation =  fbx.rotation <= 4.5 ? fbx.rotation + 0.1 : fbx.rotation
//           fbx.moveX = fbx.james.position.x - ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//           fbx.moveZ = fbx.rotation <= 4.5 ? fbx.james.position.z - ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3) : fbx.james.position.z
          
          
//         }else {
//           fbx.rotation = Math.PI
//            fbx.moveZ = fbx.james.position.z - ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//            console.log('running');
           
//         }
//       } 
//       else if(fbx.keypressed.x) {
//         if(fbx.keypressed.shift) fbx.setAnimation('Run')
//         else fbx.setAnimation('Jog')

//         if(fbx.keypressed.d){
//           fbx.rotation = fbx.rotation <= 1.5 ? fbx.rotation + 0.1 : fbx.rotation

//           fbx.moveX =  fbx.james.position.x + ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//            fbx.moveZ = fbx.rotation <= 1.5 ? fbx.james.position.z + ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3) : fbx.james.position.z
//         }
//         else if(fbx.keypressed.a){
//           fbx.rotation = fbx.rotation >= -1.5 ? fbx.rotation - 0.1 : fbx.rotation

//           fbx.moveX = fbx.james.position.x - ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//           fbx.moveZ = fbx.rotation >= -1.5 ? fbx.james.position.z + ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3) : fbx.james.position.z

//         }else {
//           fbx.rotation = 0
//           fbx.moveZ = fbx.james.position.z + ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//         }
//       }
      
//       else if(fbx.keypressed.d) {
//         if(fbx.keypressed.shift) fbx.setAnimation('Run')
//         else fbx.setAnimation('Jog')
//         fbx.rotation = Math.PI * 0.5
//         fbx.moveX = fbx.james.position.x + ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)
//       } 
      
//       else if(fbx.keypressed.a) {
//         if(fbx.keypressed.shift) fbx.setAnimation('Run')
//         else fbx.setAnimation('Jog')
//         fbx.rotation = Math.PI * - 0.5
//         fbx.moveX = fbx.james.position.x - ( fbx.currentAnimation === 'Jog' ? 0.1 : 0.3)

//       }
      
// }) 



// window.addEventListener('keyup', event => {
//           fbx.keypressed[event.key.toLowerCase()] = false
//           // if(event.shiftKey) fbx.toggle = !fbx.toggle
//           if(!fbx.keypressed.shift) fbx.setAnimation('Jog')
//           if(!fbx.keypressed.w){
//              fbx.setAnimation('Idle') 
//           }
//     }) 


    const tick = () => {
      const elapsedtime = clock.getElapsedTime()
      const deltatime = elapsedtime - prevtime
      prevtime = elapsedtime
      
      // if(fbx.mixer) {

      //   let tl = gsap.timeline()
      //   camera.lookAt(fbx.james.position)

      //   tl.to(fbx.james.rotation, {
      //     y: fbx.rotation
      //   })
      //   tl.to(fbx.james.position, {
      //     z: fbx.moveZ,
      //     x: fbx.moveX
      //   },'<')
      //   tl.to(camera.position, {
      //     z: fbx.moveZ + 2,
      //     x: fbx.moveX 
      //   }, '<')



        
      // }
  
      if(fbx.mixer) fbx.mixer.update(deltatime)
  
  
      gl.render(scene, camera)
  
      window.requestAnimationFrame(tick)
  
    }

    tick()

    
    scene.add(
      planeMesh, 
      directionaLight, 
      // directionaLightHelper,
      ambientLight,
      // fbx.james
      )
    
      // GUI
      gui.add(fbx.jamesAnimationGui, 'idle')
      gui.add(fbx.jamesAnimationGui, 'situp').name('sit up')
      gui.add(fbx.jamesAnimationGui, 'jogForward').name('jog forward')
      gui.add(fbx.jamesAnimationGui, 'run')
      gui.add(fbx.jamesAnimationGui, 'dance')



    return () => {
      planeGeometry.dispose()
      planeMaterial.dispose()
      directionaLight.dispose()
      directionaLightHelper.dispose()
      ambientLight.dispose()
      fbx.boxGeometry.dispose()
      fbx.boxMaterial.dispose()
      scene.remove(planeMesh, directionaLight, directionaLightHelper, fbx.boxMesh, fbx.james)
      gui.destroy()
    }
  },[])

  

  return null
}

export default React.memo(Three)