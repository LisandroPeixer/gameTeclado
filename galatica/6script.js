const canvas = document.getElementById('canvas');
canvas.width = 900;
canvas.height = 600;
const ctx = canvas.getContext('2d');

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
	}
	//				  	  |cor		|x    	|y	|larg			|alt			|raio   |vel	|velX  |velY  |placar
	let tela 	 = new obj("black",  0, 	0,   canvas.width, 	 canvas.height,  null, 	 null, 	 null,	null,  null);

	let cp 		 = new obj("#00FF7F",150,   	50,  null, 			 null, 			 20, 	 3, 	 null,	null,  null);
	let cp1 	 = new obj(cp.cor,  250,  	100, null, 			 null, 			 20, 	 3, 	 null,	null,  null);
	let cp2 	 = new obj(cp.cor, 	350,  	150, null, 			 null, 			 20, 	 3, 	 null,	null,  null);
	let cp3 	 = new obj(cp.cor, 	550,  	150, null, 			 null, 			 20, 	 3, 	 null,	null,  null);
	let cp4 	 = new obj(cp.cor, 	650,  	100, null, 			 null, 			 20, 	 3, 	 null,	null,  null);
	let cp5  	 = new obj(cp.cor, 	750,  	50,  null, 			 null, 			 20, 	 3, 	 null,	null,  null);

	let p1 	 	 = new obj("yellow", tela.larg/2, tela.alt-20, null,  null,   	 20, 	 null, 	 null, 	null,  20);
	let p1Placar = new obj("white",	tela.larg/8, tela.alt/8,  null,  null,   null, 	 null, 	 null,	null,  p1.placar);

	let tiro 	 = new obj("red", 	p1.x, 	p1.y,null,  		 null,   		 10, 	 -20,    null,  null,  	null);

//_3.3_///////////////////////////// movimento p1
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
//_3.2_///////////////////////////// recomeco
	function reset() {  
		window.location.reload()
	 }	 
//_3.1_///////////////////////////// colisoes
 // Colisao cp detecta
	function detectaColisaocp(p1, cp) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		cp.topo = cp.y - cp.raio;  
		cp.dir = cp.x + cp.raio;  
		cp.fundo = cp.y + cp.raio;  
		cp.esq = cp.x - cp.raio; 

	return  cp.topo < p1.fundo &&
			cp.dir > p1.esq && 
			cp.fundo > p1.topo &&
			cp.esq < p1.dir;   			
	}
 // Colisao cp1 detecta
	function detectaColisaocp1(p1, cp1) { 
 		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		cp1.topo = cp1.y - cp1.raio;  
		cp1.dir = cp1.x + cp1.raio;  
		cp1.fundo = cp1.y + cp1.raio;  
		cp1.esq = cp1.x - cp1.raio; 

		return  cp1.topo < p1.fundo &&
				cp1.dir > p1.esq && 
				cp1.fundo > p1.topo &&
				cp1.esq < p1.dir;   			
	}
 // Colisao cp2 detecta
	function detectaColisaocp2(p1, cp2) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		cp2.topo = cp2.y - cp2.raio;  
		cp2.dir = cp2.x + cp2.raio;  
		cp2.fundo = cp2.y + cp2.raio;  
		cp2.esq = cp2.x - cp2.raio; 

		return  cp2.topo < p1.fundo &&
				cp2.dir > p1.esq && 
				cp2.fundo > p1.topo &&
				cp2.esq < p1.dir;   			
	}
 // Colisao cp3 detecta
	function detectaColisaocp3(p1, cp3) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		cp3.topo = cp3.y - cp3.raio;  
		cp3.dir = cp3.x + cp3.raio;  
		cp3.fundo = cp3.y + cp3.raio;  
		cp3.esq = cp3.x - cp3.raio; 

		return  cp3.topo < p1.fundo &&
				cp3.dir > p1.esq && 
				cp3.fundo > p1.topo &&
				cp3.esq < p1.dir;   			
	}
 // Colisao cp4 detecta
	function detectaColisaocp4(p1, cp4) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		cp4.topo = cp4.y - cp4.raio;  
		cp4.dir = cp4.x + cp4.raio;  
		cp4.fundo = cp4.y + cp4.raio;  
		cp4.esq = cp4.x - cp4.raio; 

		return  cp4.topo < p1.fundo &&
				cp4.dir > p1.esq && 
				cp4.fundo > p1.topo &&
				cp4.esq < p1.dir;   			
	}
 // Colisao cp5 detecta
	function detectaColisaocp5(p1, cp5) { 
		p1.topo = p1.y - p1.raio;  
		p1.dir = p1.x + p1.raio;  
		p1.fundo = p1.y + p1.raio;  
		p1.esq = p1.x - p1.raio;  

		cp5.topo = cp5.y - cp5.raio;  
		cp5.dir = cp5.x + cp5.raio;  
		cp5.fundo = cp5.y + cp5.raio;  
		cp5.esq = cp5.x - cp5.raio; 

		return  cp5.topo < p1.fundo &&
				cp5.dir > p1.esq && 
				cp5.fundo > p1.topo &&
				cp5.esq < p1.dir;   			
	}	

 // Colisao tiro detecta
	function detectaColisaoTiro(tiro, cp) { 
		tiro.topo = tiro.y - tiro.raio;  
		tiro.dir = tiro.x + tiro.raio;  
		tiro.fundo = tiro.y + tiro.raio;  
		tiro.esq = tiro.x - tiro.raio;  

		cp.topo = cp.y - cp.raio;  
		cp.dir = cp.x + cp.raio;  
		cp.fundo = cp.y + cp.raio;  
		cp.esq = cp.x - cp.raio; 

	return  cp.topo < tiro.fundo &&
			cp.dir > tiro.esq && 
			cp.fundo > tiro.topo &&
			cp.esq < tiro.dir;   			
	}
 // Colisao tiro1 detecta
	function detectaColisaoTiro1(tiro, cp1) { 
		tiro.topo = tiro.y - tiro.raio;  
		tiro.dir = tiro.x + tiro.raio;  
		tiro.fundo = tiro.y + tiro.raio;  
		tiro.esq = tiro.x - tiro.raio;  

		cp1.topo = cp1.y - cp1.raio;  
		cp1.dir = cp1.x + cp1.raio;  
		cp1.fundo = cp1.y + cp1.raio;  
		cp1.esq = cp1.x - cp1.raio; 

		return  cp1.topo < tiro.fundo &&
				cp1.dir > tiro.esq && 
				cp1.fundo > tiro.topo &&
				cp1.esq < tiro.dir;   			
	}
 // Colisao tiro2 detecta
	function detectaColisaoTiro2(tiro, cp2) { 
		tiro.topo = tiro.y - tiro.raio;  
		tiro.dir = tiro.x + tiro.raio;  
		tiro.fundo = tiro.y + tiro.raio;  
		tiro.esq = tiro.x - tiro.raio;  

		cp2.topo = cp2.y - cp2.raio;  
		cp2.dir = cp2.x + cp2.raio;  
		cp2.fundo = cp2.y + cp2.raio;  
		cp2.esq = cp2.x - cp2.raio; 

		return  cp2.topo < tiro.fundo &&
				cp2.dir > tiro.esq && 
				cp2.fundo > tiro.topo &&
				cp2.esq < tiro.dir;   			
	}
 // Colisao tiro3 detecta
	function detectaColisaoTiro3(tiro, cp3) { 
		tiro.topo = tiro.y - tiro.raio;  
		tiro.dir = tiro.x + tiro.raio;  
		tiro.fundo = tiro.y + tiro.raio;  
		tiro.esq = tiro.x - tiro.raio;  

		cp3.topo = cp3.y - cp3.raio;  
		cp3.dir = cp3.x + cp3.raio;  
		cp3.fundo = cp3.y + cp3.raio;  
		cp3.esq = cp3.x - cp3.raio; 

		return  cp3.topo < tiro.fundo &&
				cp3.dir > tiro.esq && 
				cp3.fundo > tiro.topo &&
				cp3.esq < tiro.dir;   			
	}
 // Colisao tiro4 detecta
	function detectaColisaoTiro4(tiro, cp4) { 
		tiro.topo = tiro.y - tiro.raio;  
		tiro.dir = tiro.x + tiro.raio;  
		tiro.fundo = tiro.y + tiro.raio;  
		tiro.esq = tiro.x - tiro.raio;  

		cp4.topo = cp4.y - cp4.raio;  
		cp4.dir = cp4.x + cp4.raio;  
		cp4.fundo = cp4.y + cp4.raio;  
		cp4.esq = cp4.x - cp4.raio; 

		return  cp4.topo < tiro.fundo &&
				cp4.dir > tiro.esq && 
				cp4.fundo > tiro.topo &&
				cp4.esq < tiro.dir;   			
	}
 // Colisao tiro5 detecta
	function detectaColisaoTiro5(tiro, cp4) { 
		tiro.topo = tiro.y - tiro.raio;  
		tiro.dir = tiro.x + tiro.raio;  
		tiro.fundo = tiro.y + tiro.raio;  
		tiro.esq = tiro.x - tiro.raio;  

		cp5.topo = cp5.y - cp5.raio;  
		cp5.dir = cp5.x + cp5.raio;  
		cp5.fundo = cp5.y + cp5.raio;  
		cp5.esq = cp5.x - cp5.raio; 

		return  cp5.topo < tiro.fundo &&
				cp5.dir > tiro.esq && 
				cp5.fundo > tiro.topo &&
				cp5.esq < tiro.dir;   			
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
	// movimento cp
		cp.y += cp.vel; 
		if (cp.y + cp.alt == 600){
			cp.y = tela.y;
			cp.x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		};
		cp1.y += cp1.vel;
		if (cp1.y + cp1.alt == 600){
			cp1.y = tela.y;
			cp1.x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		};
		cp2.y += cp2.vel;
		if (cp2.y + cp2.alt == 600){
			cp2.y = tela.y 
			cp2.x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		};
		cp3.y += cp3.vel; 
		if (cp3.y + cp3.alt == 600){
			cp3.y = tela.y;
			cp3.x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		}; 
		cp4.y += cp4.vel;
		if (cp4.y + cp4.alt == 600){
			cp4.y = tela.y;
			cp4.x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		};
		cp5.y += cp5.vel; 
		if (cp5.y + cp5.alt == 600){
			cp5.y = tela.y;
			cp5.x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		};  
  // Colisao atualiza
	// Colisao cp p1 atualiza
		if (detectaColisaocp(p1, cp)) {
			alert("voce perdeu!!!");
			reset(); 								
		}			
	// Colisao cp1 p1 atualiza
		if (detectaColisaocp1(p1, cp1)) {
			alert("voce perdeu!!!");
			reset(); 								
		}
	// Colisao cp2 p1 atualiza
		if (detectaColisaocp2(p1, cp2)) {
			alert("voce perdeu!!!");
			reset(); 		
		}						
	// Colisao cp3 p1 atualiza
		if (detectaColisaocp3(p1, cp3)) {
			alert("voce perdeu!!!");
			reset(); 
		}
	// Colisao cp4 p1 atualiza
		if (detectaColisaocp4(p1, cp4)) {
			alert("voce perdeu!!!");
			reset(); 
		}
	// Colisao cp5 p1 atualiza
		if (detectaColisaocp5(p1, cp5)) {
			alert("voce perdeu!!!");
			reset(); 
		}	

  // colisao tiro pontuacao		
	// Colisao cp tiro atualiza
		if (detectaColisaoTiro(tiro, cp)) {
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp.y = 0;
			cp.x = cp.x + (Math.random()*tela.larg);								
		}			
	// Colisao cp1 tiro atualiza
		if (detectaColisaoTiro1(tiro, cp1)) {
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp1.y = 0;
			cp1.x = cp.x + (Math.random()*tela.larg);											
		}
	// Colisao cp2 tiro atualiza
		if (detectaColisaoTiro2(tiro, cp2)) {
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp2.y = 0;	
			cp2.x = cp.x + (Math.random()*tela.larg);				
		}						
	// Colisao cp3 tiro atualiza
		if (detectaColisaoTiro3(tiro, cp3)) {
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp3.y = 0;
			cp3.x = cp.x + (Math.random()*tela.larg);								
		}
	// Colisao cp4 p1 atualiza
		if (detectaColisaoTiro4(tiro, cp4)) {
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp4.y = 0;
			cp4.x = cp.x + (Math.random()*tela.larg);								
		}
	// Colisao cp5 p1 atualiza
		if (detectaColisaoTiro5(tiro, cp5)) {
			p1Placar.placar += 1;
			tiro.y = p1.y; 
			cp5.y = 0;
			cp5.x = cp.x + (Math.random()*tela.larg);									
		}
	// regra jogo
		if (p1Placar.placar == 0){
			alert("voce perdeu")
			reset();
		} else if (p1Placar.placar == 30)	{
			alert("Parabens, voce venceu!!!");
			reset();
		}
	}			
//_2.1_///////////////////////////// desenha
	function desenha() {  
		tela.retangulo();
		cp.circulo();
		cp1.circulo();
		cp2.circulo();
		cp3.circulo();
		cp4.circulo();
		cp5.circulo();
		p1.triangulo();
		p1Placar.text();
		tiro.circulo();
	}
//_1_/////////////////////////////// loop
	function Loop() { 
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);