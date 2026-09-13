const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener("mousemove", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle{

    constructor(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.size = Math.random()*3+1;

        this.speedX = (Math.random()-0.5)*2;
        this.speedY = (Math.random()-0.5)*2;

        this.color = `hsl(${Math.random()*360},100%,60%)`;
    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x<0 || this.x>canvas.width) this.speedX*=-1;
        if(this.y<0 || this.y>canvas.height) this.speedY*=-1;

        let dx = mouse.x-this.x;
        let dy = mouse.y-this.y;

        let distance = Math.sqrt(dx*dx+dy*dy);

        if(distance<mouse.radius){

            this.x -= dx/30;
            this.y -= dy/30;

        }

    }

    draw(){

        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();

    }

}

for(let i=0;i<400;i++){
    particles.push(new Particle());
}

function connect(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            let dx=particles[a].x-particles[b].x;
            let dy=particles[a].y-particles[b].y;

            let distance=dx*dx+dy*dy;

            if(distance<9000){

                ctx.strokeStyle="rgba(255,255,255,0.15)";
                ctx.lineWidth=1;

                ctx.beginPath();

                ctx.moveTo(particles[a].x,particles[a].y);

                ctx.lineTo(particles[b].x,particles[b].y);

                ctx.stroke();

            }

        }

    }

}

function animate(){

    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.update();
        p.draw();

    });

    connect();

    requestAnimationFrame(animate);

}

animate();