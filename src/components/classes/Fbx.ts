import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

type AnimationType =
 'Situp'  | 
 'Idle'   |
 'Jog'    |
 'Run'    |
 'Dance'    |
 'None'


export default class createFbx {
    
    boxGeometry!: THREE.BoxGeometry
    boxMaterial!: THREE.MeshStandardMaterial
    boxMesh!: THREE.Mesh
    mixer!: THREE.AnimationMixer
    james!: THREE.Group
    currentAnimation: AnimationType = 'Idle'
    prevAnimation: AnimationType = 'Idle' 
    keypressed: any = {}
    rotation: number = 0
    moveX: number = 0
    moveZ: number = 0
   

    // Animations
    idle!: THREE.AnimationAction
    idleToRun!: THREE.AnimationAction
    situp!: THREE.AnimationAction
    startSitUp!: THREE.AnimationAction
    endSitUp!: THREE.AnimationAction
    jogForward!: THREE.AnimationAction
    run!: THREE.AnimationAction
    dance!: THREE.AnimationAction


    jamesAnimationGui = {
        idle: () => {
            this.setAnimation('Idle')
        },
        situp: () => {
            this.setAnimation('Situp')
        },
        jogForward: () => {
            this.setAnimation('Jog')
        },
        run: () => {
            this.setAnimation('Run')
        },
        dance: () => {
            this.setAnimation('Dance')
        }
    }

    constructor(scene: THREE.Scene, gui: GUI) {
       
        this.boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        this.boxMaterial = new THREE.MeshStandardMaterial()
        this.boxMesh = new THREE.Mesh(
            this.boxGeometry,
            this.boxMaterial
        )

       const fbxLoader = new FBXLoader()
        fbxLoader.load(
            '/character.fbx',
            (fbxObject) => {
                fbxObject.traverse(model => model.castShadow = true)
               this.james = fbxObject
               this.james.scale.set(0.003, 0.003, 0.003)
               this.mixer = new THREE.AnimationMixer(this.james)
              

               fbxLoader.load('/Offensive Idle.fbx', (object) => {
                this.idle = this.mixer.clipAction(object.animations[0])
               })

               fbxLoader.load('/Start Bicycle Sit Up.fbx', (object) => {
                this.startSitUp = this.mixer.clipAction(object.animations[0])
               })

               fbxLoader.load('/End Bicycle Sit Up.fbx', (object) => {
                this.endSitUp = this.mixer.clipAction(object.animations[0])
               })

               fbxLoader.load('/Bicycle Crunch.fbx', (object) => {
                this.situp = this.mixer.clipAction(object.animations[0])
                 
            })

            fbxLoader.load('/Jog Forward.fbx', (object) => {
                   this.jogForward = this.mixer.clipAction(object.animations[0])                 
            })
            fbxLoader.load('/Idle To Sprint.fbx', (object) => {
                this.idleToRun = this.mixer.clipAction(object.animations[0])                 
         })
                
         fbxLoader.load('/Running.fbx', (object) => {
            this.run = this.mixer.clipAction(object.animations[0])                 
        })

        fbxLoader.load('/Bboy Hip Hop Move.fbx', object => {
            this.dance = this.mixer.clipAction(object.animations[0])
            scene.add(this.james)
        } )
            }
        )
    }

    setAnimation(animation: AnimationType) {

        switch (animation) {
            case 'Idle':
                if(animation != this.currentAnimation) {
                   

                    if(this.currentAnimation === 'Situp') {
                    this.endAnimation(this.currentAnimation, animation)
                    this.startSitUp.stop()
                    this.endSitUp.reset()
                    this.endSitUp.repetitions = 1
                    this.endSitUp.play()

                    this.mixer.addEventListener('finished', event => {
                        if(this.currentAnimation === animation) {
                        this.endSitUp.stop()
                        this.idle.reset()
                        this.idle.play()
                        }
                    })
                    
                    } else if(this.currentAnimation === 'Jog') {
                        this.endAnimation(this.currentAnimation, animation)
                        this.idle.reset()
                        this.idle.play()
                    }else {
                        this.endAnimation(this.currentAnimation, animation)
                        this.idle.reset()
                        this.idle.play() 
                    }


               }else {
                this.idle.fadeIn(0.5)
                this.idle.play()
               }
                break;
            case 'Situp':
                if (animation !== this.currentAnimation) {
                    this.endAnimation(this.currentAnimation, animation)
                    this.startSitUp.reset()
                    this.startSitUp.repetitions = 1
                    this.startSitUp.play()

                    this.mixer.addEventListener('finished', (event) => {
                        if(this.currentAnimation === animation) {
                        this.startSitUp.stop()
                        this.situp.reset()
                        this.situp.play()
                        }

                    })
                }
            
                break;
            case 'Jog':
               if(animation !== this.currentAnimation) {

                  if (this.currentAnimation === 'Idle') {

                    this.endAnimation(this.currentAnimation, animation)
                    this.idleToRun.stop()
                    this.jogForward.reset()
                    this.jogForward.play()
                    
                } else if(this.currentAnimation === 'Run') {
                    this.endAnimation(this.currentAnimation, animation)
                    this.run.stop()
                    this.jogForward.reset()
                    this.jogForward.play()
                    this.startSitUp.stop()

                }
                
               }
             break
            case 'Run':
                if(animation !== this.currentAnimation) {
                    if(this.currentAnimation !== 'Situp') {
                        this.endAnimation(this.currentAnimation, animation)
                        this.run.reset()
                        this.run.play()
                    }
                    
                }
             break;
             case 'Dance':
                if(animation !== this.currentAnimation) {
                        if(this.currentAnimation !== 'Situp') {
                            this.endAnimation(this.currentAnimation, animation)
                            this.dance.reset()
                            this.dance.play()
                        } else {
                            this.endAnimation(this.currentAnimation, animation)
                            this.startSitUp.stop()
                            this.endSitUp.reset()
                            this.endSitUp.repetitions = 1
                            this.endSitUp.play()
        
                            this.mixer.addEventListener('finished', event => {
                                if(this.currentAnimation === animation) {
                                this.endSitUp.stop()
                                this.dance.reset()
                                this.dance.play()
                                }
                            })
                        }
                    
                }
             break;
            default:
                break;
        }

     
    }
   
    endAnimation(exitAnimation: AnimationType, startAnimation: AnimationType) {
        switch (exitAnimation) {
            case 'Idle' : 
              this.idle.fadeOut(0.5)
              this.idle.stop()
              this.prevAnimation = this.currentAnimation
              this.currentAnimation = startAnimation
            break
            case 'Situp' : 
            this.situp.fadeOut(0.5)
            this.situp.stop()
            this.prevAnimation = this.currentAnimation
            this.currentAnimation = startAnimation
            break
            case 'Jog' :
            this.jogForward.fadeOut(0.5)
            this.jogForward.stop()
            this.prevAnimation = this.currentAnimation
            this.currentAnimation = startAnimation
            break
            case 'Run' :
            this.run.fadeOut(0.5)
            this.run.stop()
            this.prevAnimation = this.currentAnimation
            this.currentAnimation = startAnimation
            break
            case 'Dance':
                this.dance.fadeOut(0.5)
                this.dance.stop()
                this.prevAnimation = this.currentAnimation
                this.currentAnimation = startAnimation
            break;
            default: 

            break;  
        }
    }
}