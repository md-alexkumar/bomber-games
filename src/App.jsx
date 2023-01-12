import React, { Component, Fragment } from 'react'
export default class App extends Component {
   constructor (props) {
      super(props);
      this.state = {
         level: 1,
         columns: '',
         array: [],
         bgColor: [],
         points: 0,
         error: false,
         newGame: false,
         exitKey: null,
         winArray: [],
         win: false
      }
   }

   componentDidMount() {
      this.getPosition(1)
   }
   
   getRandom = n => Math.floor((Math.random() * n) + 1);
   
   getArray = (arrLength) => {
      let arr=[]
      while(arr.length < arrLength) {
         var x = this.getRandom(3)
         arr.push(x);
      }
      return arr
   }
   getPosition = async(level) => {
      let pos=[], dupArr = [], arr=[], winArray = []
      let arrLength = Math.pow((level + 2), 2)
      let posLength = Math.floor(arrLength / 2)
      while(pos.length < posLength) {
         var y = this.getRandom(arrLength - 1)
         if(!dupArr.includes(y)) {
            pos.push(y)
         }
         dupArr.push(y)
      }
      arr = await this.getArray(arrLength)
      pos.map((item, key) => arr[item] = -1)
      arr.map((item, key) => item !== -1 && winArray.push(key))
      let cross = level + 2
      let columns = ``
      while(cross) {
         let update = `${columns} auto`
         columns = update
         cross = cross - 1
      }
      this.setState({ array: arr, bgColor: [], points: 0, error: false, win: false, level, newGame: false, exitKey: null, winArray, columns })
   }
   changeBG = key => {
      let bgColor = this.state.bgColor
      let winArray = this.state.winArray
      console.log('bgColor',bgColor)
      console.log('winArray',winArray)
      console.log('key',key)
      let array = this.state.array
      let win = false
      let points = this.state.points

      if(!bgColor.includes(key)) {
         if(array[key] === -1) {
            bgColor.push(key)
            this.setState({ bgColor, exitKey: key }, () => {
               this.setState({ error: true, })
            })
         } else {
            points += array[key]
            bgColor.push(key)
            console.log('check BG Array', bgColor)
            if((bgColor.length === winArray.length)) {
               win = true
            }
            this.setState({ bgColor, points, win })
         }
      }
   }
   newGame = () => {
      this.getPosition(1)
   }
   nextlevel = () => {
      this.getPosition(this.state.level + 1)
   }
   render() {
      let bgColor = this.state.bgColor
      return (
         <div>
            <div className='points'>
               Your points : {this.state.points}
            </div>
            {
               this.state.error && 
               <div className='gameOver'>
                  Game Over :(
                  <button className='btn btn-warning ml-5' onClick={this.newGame}>
                     NewGame
                  </button>
               </div>
            }
            {
               this.state.win &&
               <div className='gameOver'>
                  You Win :)
                  <button className='btn btn-success ml-5' onClick={this.nextlevel}>
                     NextLevel
                  </button>
               </div>
            }
            <div class="grid-container" style={{ gridTemplateColumns: this.state.columns }}>
               {
                  this.state.array.map((item, key) => {
                     return (
                        <Fragment>
                           <div
                              className="grid-item" 
                              style={{
                                 background : (this.state.exitKey === key || (this.state.win && item === -1)) ? 'orange' : bgColor.includes(key) ? 'white' : 'black',
                              }}
                              onClick={(!this.state.error && !this.state.win) ? () => this.changeBG(key) : null}>
                                 {(this.state.exitKey === key || (this.state.win && item === -1)) ? 'X' :item}
                           </div>
                        </Fragment>
                     ) 
                  })
               }
            </div>
         </div>
      )
   }
}