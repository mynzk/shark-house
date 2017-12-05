export default function SnowDay(canvas, width, height){
	
       let ctx = canvas.getContext('2d')
       canvas.width = width;
       canvas.height = height;
     
      

      // create particles
      let circles = []
      for(let x = 0; x < width*0.5; x++) {
          let c = new Circle()
          circles.push(c)
      }


     (function animate() {
          ctx.clearRect(0,0,width,height)
          for(let i in circles) {
              circles[i].draw()
          }
          requestAnimationFrame(animate)
      })()

      function Circle() {
        let _this = this;

        // constructor
        (function() {
            _this.pos = {}
            init()
        })()

        function init() {
            _this.pos.x = Math.random()*width
            _this.pos.y = height+Math.random()*100
            _this.alpha = 0.1+Math.random()*0.3
            _this.scale = 0.1+Math.random()*0.3
            _this.velocity = Math.random()
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init()
            }
            _this.pos.y -= _this.velocity
            _this.alpha -= 0.0005
            ctx.beginPath()
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false)
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')'
            ctx.fill()
        }
    }
}