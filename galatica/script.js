const canvas = document.getElementById('canvas');
canvas.width = 900;
canvas.height = 600;
const ctx = canvas.getContext('2d');
let enemy = 2;
let colisao = false;
let destroi = false;

alert("USE AS SETAS + ESPACO PARA ATIRAR");

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
		triangulo(){
			ctx.fillStyle = this.cor;  
			ctx.beginPath();
			ctx.moveTo(this.x-30, this.y); // Ponto inicial
			ctx.lineTo(this.x, this.y-70);
			ctx.lineTo(this.x+30, this.y);
			ctx.lineTo(this.x-30, this.y);
			ctx.lineWidth = 2;				// Traçar as linhas do caminho			
			ctx.fill();
			return ctx;
		}
		text() {                         // função para desenhar placar
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

			this.topo = this.y - this.raio; 
			this.dir = this.x + this.raio; 
			this.fundo = this.y + this.raio; 
			this.esq = this.x - this.raio; 

			if(	this.topo < p1.fundo && 
				this.dir > p1.esq && 
				this.fundo > p1.topo && 
				this.esq < p1.dir){
					colisao = true;
			}
			return colisao;
		}
		destroi(){
			tiro.topo = tiro.y - tiro.raio;  
			tiro.dir = tiro.x + tiro.raio;  
			tiro.fundo = tiro.y + tiro.raio;  
			tiro.esq = tiro.x - tiro.raio;  
			
			this.topo = this.y - this.raio; 
			this.dir = this.x + this.raio; 
			this.fundo = this.y + this.raio; 
			this.esq = this.x - this.raio; 
		
				if(	this.topo < tiro.fundo && 	
					this.dir > tiro.esq && 
					this.fundo > tiro.topo && 	
					this.esq < tiro.dir){
					destroi = true;
				 }
			return destroi;
		}
	}
	//				  	  |cor		|x    	|y	|larg			|alt			|raio   |vel	|velX  |velY  |placar
	let tela 	 = new obj("black",  0, 	0,   canvas.width, 	canvas.height,  null, 	 null, 	 null,	null,  null);
	let p1 	 	 = new obj("yellow", tela.larg/2, 3*tela.alt/4,  null,  null,   	 20, 	 null, 	 null, 	null,  20);
	let p1Placar = new obj("white",	tela.larg/8, tela.alt/8,    null,  null,   null, 	 null, 	 null,	null,  p1.placar);
	let tiro 	 = new obj("#ff1a1a", 	p1.x, 	p1.y-200, null,  		null,   		 10, 	 -80,  	 null,  null,  null);

	let cp = [];
	for(i=0;i<=enemy;i++){
		cp[i] =    new obj("#00FF7F",Math.random()*tela.larg, 0,  null, 	 null, 			 20, 	 3, 	 null,	null,  null);
	}
	
//_3.2_///////////////////////////// movimento p1
	let setaCima = false;
	let setaBaixo = false;
	let setaFrente = false;
	let setaTras = false;
	let bttiro = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 38){
			setaCima = true; 
		} else if (e.keyCode == 40){
			setaBaixo = true;      
		} else if (e.keyCode == 37){
			setaFrente = true; 
		} else if (e.keyCode == 39){
			setaTras = true;      
		} else if (e.keyCode == 32){
			bttiro = true;      
		}
	} 
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 38){
			setaCima = false; 
		} else if (e.keyCode == 40){
			setaBaixo = false;      
		} else if (e.keyCode == 37){
			setaFrente = false; 
		} else if (e.keyCode == 39){
			setaTras = false;      
		} else if (e.keyCode == 32){
			bttiro = false;      
		}
	}
//_3.1_///////////////////////////// recomeco
	function reset() { 
		//window.location.reload()
		p1.x = tela.larg/2; 
		p1.y = 3*tela.alt/4
		tiro.x = p1.x;
		tiro.y = p1.y;
		p1Placar.placar = 20;
		for(i in  cp){
			cp[i].y = 0;
		};		
	 }	 
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       
 // movimento atualiza
    // movimento p1 
		if (setaCima && p1.y > 10) {                                          			// move p1
			p1.y -= 10;
			tiro.y -= 10; 
		} else if (setaBaixo && (p1.y < tela.alt - p1.alt)) {    
			p1.y += 10;
			tiro.y += 10;  
		}  else	if (setaFrente && p1.x > 10) {                                          
			p1.x -= 10;
			tiro.x -= 10;  
		} else if (setaTras && (p1.x < tela.larg - p1.larg)) {    
			p1.x += 10;
			tiro.x += 10;  
		} 
	// tiro	
		if (bttiro) {    
				tiro.y += tiro.vel;
			} else if (!bttiro) {
			tiro.y = p1.y;
		}
		if (tiro.y <= tela.y){
			tiro.y = p1.y;
		}
	// movimento cp
	for(i in cp){
		cp[i].y += cp[i].vel; 
		if (cp[i].y + cp[i].alt == 600){
			cp[i].y = tela.y;
			cp[i].x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		}	
	}
  // Colisao atualiza
	for(i in cp){
		if (cp[i].colisao()) {
			reset(); 
			colisao = false;
			alert("voce perdeu!!!");											
		}	
	}		
  // tiro pontuacao		
	for(i in cp){
		if (cp[i].destroi()) {
			destroi = false;
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp[i].y = 0;
			cp[i].x = cp[i].x + (Math.random()*tela.larg);								
		}
	}	
	// regra jogo
		if (p1Placar.placar <= 0){
			alert("voce perdeu")
			reset();
		} else if (p1Placar.placar >= 30)	{
			alert("Parabens, voce venceu!!!");
			reset();
		}
	}			
//_2.1_///////////////////////////// desenha
	function desenha() {  
		tela.retangulo();
		p1.triangulo();
		p1Placar.text();
		tiro.circulo();
		for(i in cp){
			cp[i].circulo();
		};
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);