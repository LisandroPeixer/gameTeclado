const canvas = document.getElementById('canvas');
canvas.width = 1100;
canvas.height = 600;
const ctx = canvas.getContext('2d');
let colisao = false;
let torres = 7;

alert("USE A TECLA ESPACO PARA FLUTUAR")

//_4_/////////////////////////////// objetos
	class obj {
		constructor(cor, x, y, larg, alt, raio, vel, velX, velY, placar){
			this.cor = cor;
			this.x = x;
			this.y = y;
			this.larg = larg;
			this.alt = alt;
			this.raio = raio;
			this.vel = vel;
			this.velX = velX;
			this.velY = velY;	
			this.placar = placar;
		}
		retangulo(){
			ctx.fillStyle = this.cor;                                     
			ctx.fillRect(this.x, this.y, this.larg, this.alt); 
			return ctx
		}
		circulo(){
			ctx.fillStyle = this.cor;  
			ctx.beginPath();  
			ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, true);    // x, y, raio, angulo, fimAngulo, rotacao)  
			ctx.fill();
			return ctx;
		}
		text(){                         // função para desenhar placar
			ctx.fillStyle = this.cor;  
			ctx.font = '35px sans-serif';  
			ctx.fillText(this.placar, this.x, this.y,);
			return ctx;
		 }
		 colisao(){
			p1.topo = p1.y - p1.raio;  
			p1.dir = p1.x + p1.raio;  
			p1.fundo = p1.y + p1.raio;  
			p1.esq = p1.x - p1.raio;  
	
			this.topo = this.y;  
			this.dir = this.x + this.larg;  
			this.fundo = this.y + this.alt;  
			this.esq = this.x; 
		
			  	if(	this.topo < p1.fundo &&
					this.dir > p1.esq && 
					this.fundo > p1.topo &&
					this.esq < p1.dir){
						colisao = true;
					}   			
					return colisao
		 }
	}
	//		    		|cor			|x           	|y			|larg		|alt	 	|raio   |vel   |velX |velY  |placar
	let tela = new obj("DeepSkyBlue",	0, 			 	0,			canvas.width, canvas.height,null,null, 	null, null,  null);

	let p1 	   = new obj("yellow", 	    tela.larg/2, 	tela.alt-20,null,		null, 		 20, 	 5,    	null, null,  0);

	let torre = [];
	for(i=0;i<=torres;i++){
		torre[i]  = new obj("white", 	tela.larg,     		 0,		100,		100, 		 null, 	 -1,   	null, null,  null);
	}
	torre[0].x=tela.larg;	 	torre[0].y=0;	torre[0].alt=100;
	torre[1].x=tela.larg;	  	torre[1].y=200;	torre[1].alt=600;

	torre[2].x=tela.larg+300; 	torre[2].y=0;	torre[2].alt=300;
	torre[3].x=tela.larg+300; 	torre[3].y=400;	torre[3].alt=600;

	torre[4].x=tela.larg+600; 	torre[4].y=0;	torre[4].alt=200;
	torre[5].x=tela.larg+600;	torre[5].y=300;	torre[5].alt=600;

	torre[6].x=tela.larg+900; 	torre[6].y=0;	torre[6].alt=400;
	torre[7].x=tela.larg+900;  	torre[7].y=500;	torre[7].alt=600;

	let p1Placar = new obj("blue", 	    tela.larg/8, 	tela.alt/8, null,		null, 		 null, 	 null, 	null, null,  p1.placar);
	
//_3.2_///////////////////////////// movimento p1
	let espaco = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 32){
			espaco = true;   
		}
	} 
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 32){
			espaco = false;    
		}
	}
//_3.1_////////////////////////////// recomeco
	function reset() {  
		//window.location.reload()
		p1.x = tela.larg/2; 	 
		p1.y = tela.alt-20;
		p1Placar.placar = 0;
		torre[0].x = tela.larg;
		torre[1].x = tela.larg;
		torre[2].x = tela.larg+300;
		torre[3].x = tela.larg+300;
		torre[4].x = tela.larg+600;
		torre[5].x = tela.larg+600;
		torre[6].x = tela.larg+900;
		torre[7].x = tela.larg+900;
		espaco = false;
	 } 
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       
 // movimento atualiza
  // movimento p1 
		if (p1.y > 580){
			p1.y = 580;
		} 
		if (espaco && p1.y > 10) { // move p1
			p1.y -= 2;  
		} else { 
			p1.y += 2;
		}		
	// movimento torre
		for(i in torre){
			torre[i].x += torre[i].vel; 
			if (torre[i].x + torre[i].larg == 0){
				torre[i].x = tela.larg;
			};
		}	
  	// Colisao atualiza
		for(i in torre){
			if (torre[i].colisao()) {
				colisao = false;
				alert("voce perdeu!!!");
				reset(); 								
			}
		}									
 	 // pontuacao atualiza
		for(i in torre){
			if (p1.x == torre[i].x){
				p1Placar.placar += 0.5;
			}				
		} 	
	}
//_2.1_///////////////////////////// desenha
	function desenha() {  
		tela.retangulo();
		p1.circulo();
		for(i in torre){
			torre[i].retangulo();
		}
		p1Placar.text();
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);