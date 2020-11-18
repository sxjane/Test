import React from 'react'
import * as THREE from 'three'
//import ReactDOM from 'react-dom'
// import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
// import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.mount = React.createRef()
    }
   
    render(){
        return <div ref={this.mount}/>
    }

    componentDidMount(){
        console.log('ref:', this.mount.current)
        var scene = new THREE.Scene()
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000)
        var renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        this.mount.current.appendChild(renderer.domElement)
        var geometry = new THREE.BoxGeometry(1,1,1)
        var material = new THREE.MeshBasicMaterial({color:0x00ff00})
        var cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        camera.position.z = 5
        var animate = ()=>{
            requestAnimationFrame(animate)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            renderer.render(scene, camera)
        }
        animate()
    }
}