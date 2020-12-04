import React from 'react'
import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'three/examples/jsm/libs/dat.gui.module'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default  class Robot extends React.Component{
    constructor(props){
        super(props)
        this.divRef = React.createRef()
    }

    componentDidMount(){
        let stats, clock, gui, mixer, actions, activeAction, previousAction
        let camera, scene, renderer, model, face
        let container = this.divRef.current

        const api={state:'Walking'}
        init(container)
        animate()

        function init(container){
            
            camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.25, 100)
            camera.position.set(-5, 3, 10)
            camera.lookAt(new THREE.Vector3(0,2.0))

            scene = new THREE.Scene()
            scene.background = new THREE.Color(0xe0e0e0)
            scene.fog = new THREE.Fog(0xe0e0e0, 20, 100)

            clock = new THREE.Clock()

            const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444)
            hemiLight.position.set(0, 20, 0)
            scene.add(hemiLight)

            const dirLight = new THREE.DirectionalLight(0xffffff)
            dirLight.position.set(0,20,0)
            scene.add(dirLight)

            const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000,2000), new THREE.MeshPhongMaterial({color:0x999999, depthWrite:false}))
            mesh.rotation.x = - Math.PI/2 
            scene.add(mesh)

            const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
            grid.material.opacity = 0.2
            grid.material.transparent = true

            scene.add(grid)

            const loader = new GLTFLoader()
            loader.load('RobotExpressive.glb', (gltf)=>{
                model = gltf.scene
                scene.add(model)

                createGUI(model, gltf.animations)
            }, undefined, (e)=>{
                console.log(e)
            })

            renderer = new THREE.WebGLRenderer({antialias:true})
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.outputEncoding = THREE.sRGBEncoding
            container.appendChild(renderer.domElement)

            window.addEventListener('resize', onWindowResize, false)

            stats = new Stats()
            container.appendChild(stats.dom)
        }

        function createGUI(model, animations){
            const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
            const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']
    
            gui = new GUI()
            mixer = new THREE.AnimationMixer(model)
            actions = {}
            for(let i=0; i< animations.length; i++){
                const clip = animations[i]
                const action= mixer.clipAction(clip)
                actions[clip.name]=action
                if(emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >=4){
                    action.clampWhenFinished = true
                    action.loop = THREE.LoopOnce
                }
            }
    
            const statesFolder = gui.addFolder('States')
            const clipCtrl = statesFolder.add(api, 'state').options(states)
            clipCtrl.onChange(()=>{
                fadeToAction(api.state, 0.5)
            })
            
            statesFolder.open()
    
            const emoteFolder = gui.addFolder('Emotes')
    
            const createEmoteCallBack = (name)=>{
                api[name]=()=>{
                    fadeToAction(name, 0.2)
                    mixer.addEventListener('finished', restoreState)
                }
                emoteFolder.add(api,name)
            }
            
            function restoreState(){
                mixer.removeEventListener('finished', restoreState)
                fadeToAction(api.state, 0.2)
            }
    
            for(let i=0; i<emotes.length; i++){
                createEmoteCallBack(emotes[i])
            }
    
            emoteFolder.open()
    
            face=model.getObjectByName('Head_4')
    
            const expressions = Object.keys(face.morphTargetDictionary)
            const expressionFolder = gui.addFolder('Expressions')
    
            for(let i=0; i<expressions.length; i++){
                expressionFolder.add(face.morphTargetInfluences, i, 0, 1, 0.01).name(expressions[i])
            }
    
            activeAction = actions['Walking']
            activeAction.play()
            expressionFolder.open()
        }

        function fadeToAction(name, duration){
            previousAction = activeAction 
            activeAction = actions[name]
            if(previousAction != activeAction){
                previousAction.fadeOut(duration)
            }
            activeAction
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(duration)
            .play()
        }
        
        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        function animate(){
            const dt = clock.getDelta()
            if(mixer){
                mixer.update(dt)
            }
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            stats.update()
        }
    }

    render(){
        return(
            <div>
                <p>
                    <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a>webgl-skinning and morphing <br />
                    The animation system allows clips to be played individually, looped, ....
                </p>
                <div ref={this.divRef}/>
            </div>
        )
    }
}

