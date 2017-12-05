export default function FireAnimate(canvas, width, height){

	let ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	
	let particles = [];
	let mouse = {};
	
	//Lets create some particles now
	let particle_count = 50;
	for(let i = 0; i < particle_count; i++){
		particles.push(new particle());
	}
	
	
	//finally some mouse tracking
	canvas.addEventListener('mousemove', track_mouse, false);
	
	function track_mouse(e){
		//since the canvas = full page the position of the mouse 
		//relative to the document will suffice
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}
	
	function particle(){
		//speed, life, location, life, colors
		//speed.x range = -2.5 to 2.5 
		//speed.y range = -15 to -5 to make it move upwards
		//lets change the Y speed to make it look like a flame
		this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
		//location = mouse coordinates
		//Now the flame follows the mouse coordinates
		if(mouse.x && mouse.y){
			this.location = {x: mouse.x, y: mouse.y};
		} else {
			this.location = {x: width/2, y: height/2};
		}
		//radius range = 10-30
		this.radius = 10+Math.random()*20;
		//life range = 20-30
		this.life = 20+Math.random()*10;
		this.remaining_life = this.life;
		//colors
		this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*255);
		this.b = Math.round(Math.random()*255);
	}
	
	(function draw(){
		//Painting the canvas black
		//Time for lighting magic
		//particles are painted with "lighter"
		//In the next frame the background is painted normally without blending to the 
		//previous frame
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "transprant";
		ctx.fillRect(0, 0, width,height);
		ctx.globalCompositeOperation = "lighter";
		
		for(let i = 0; i < particles.length; i++){
			let p = particles[i];
			ctx.beginPath();
			//changing opacity according to the life.
			//opacity goes to 0 at the end of life of a particle
			p.opacity = Math.round(p.remaining_life/p.life*100)/100
			//a gradient instead of white fill
			let gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.fill();
			
			//lets move the particles
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;
			
			//regenerate particles
			if(p.remaining_life < 0 || p.radius < 0)
			{
				//a brand new particle replacing the dead one
				particles[i] = new particle();
			}
		}
		requestAnimationFrame(draw)
	})();
}