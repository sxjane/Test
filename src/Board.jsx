import React from 'react'
import './styles.css'

export default class Board extends React.Component{
    constructor(props){
        super(props)
        this.boardRef = React.createRef()
    }

    componentDidMount(){
        let canvas = this.boardRef.current
        let ctx = canvas.getContext('2d')
        this.drawFace(canvas,ctx)
       
    }

    drawFace(canvas, ctx){
        ctx.beginPath()
        ctx.arc(150,150,100, 0, 2*Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(150,150,50,Math.PI/4,Math.PI*3/4)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(120,120,5,0,2*Math.PI)
        ctx.fill()
        ctx.arc(180,120,5,0,2*Math.PI)
        ctx.fill()
    }

    drawArrow(canvas, ctx){
        ctx.beginPath()
        ctx.moveTo(100,150)
        ctx.lineTo(120,140)
        ctx.lineTo(120,160)
        ctx.lineTo(100,150)
        ctx.fillStyle='red'
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(120,150)
        ctx.lineTo(200,150)
        ctx.strokeStyle='black'
        ctx.stroke()
    }

    drawLine(canvas, ctx){
        ctx.beginPath()
        ctx.moveTo(150,0)
        ctx.lineTo(0,200)
        ctx.lineTo(300,200)
        ctx.closePath()  
        ctx.fillStyle = 'red'
        ctx.stroke()
      }

    drawRect(canvas, ctx){
        ctx.fillStyle = 'green'
        ctx.fillRect(25, 25, 100, 100)
        ctx.clearRect(45, 45, 60, 60)
        ctx.strokeRect(50, 50, 50, 50)
    }
    render(){
        return(
            <canvas width='300' height='300'ref={this.boardRef}/>
        )
    }
}