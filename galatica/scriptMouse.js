const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth; //1200; 
canvas.height = window.innerHeight; //600;
const ctx = canvas.getContext('2d');
let enemy = 5;
let comeco = 10;
let fim = 50;
let colisao = false;
let destroi = false;

// conexao 
	if(localStorage.hasOwnProperty('bdGal')){
		tabela = JSON.parse(window.localStorage.getItem('bdGal'));
	} else {
		tabela = [
			{nome: "primeiro", placar: 6},
			{nome: "segundo", placar: 5},
			{nome: "terceiro", placar: 4},
			{nome: "quarto", placar: 3},
			{nome: "quinto", placar: 2},
			{nome: "sexto", placar: 1}
		]
	window.localStorage.setItem('bdGal', JSON.stringify(tabela));
	}

alert("toque na aeronave para mover e atirar");

//_4_/////////////////////////////// objetos
	class obj {
		constructor(cor, x, y, larg, alt, raio, vel, nome, res, placar){
			this.cor = cor;
			this.x = x;
			this.y = y;
			this.larg = larg;
			this.alt = alt;
			this.raio = raio;
			this.vel = vel;
			this.nome = nome;
			this.res = res;	
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
			ctx.fillText(this.nome, this.x+100, this.y);
			ctx.fillText(this.res, this.x, this.y);
			ctx.fillText(this.placar, this.x, this.y+50);			
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
	//				  	  |cor		|x    	|y	|larg			|alt			|raio   |vel	|nome  |res   |placar
	let tela 	 = new obj("black",  0, 	0,   canvas.width, 	canvas.height,  null, 	 null, 	 null,	null,  null);
	let p1 	 	 = new obj("yellow", tela.larg/2, 3*tela.alt/4,  null,  null,   	 20, 	 null, 	 null, 	null,  comeco);
	let p1Placar = new obj("white",	tela.larg/8, tela.alt/8,    null,  null,   null, 	 null, 	 tabela[0].nome,	tabela[0].placar,  p1.placar);
	let tiro 	 = new obj("#ff1a1a", 	p1.x, 	p1.y, null,  		null,   		 10, 	 -80,  	 null,  null,  null);

	let cp = [];
	for(i=0;i<=enemy;i++){
		cp[i] =    new obj("#00FF7F",Math.random()*tela.larg, 0,  null, 	 null, 			 20, 	 3, 	 null,	null,  null);
	}
	
//_3.2_///////////////////////////// movimento p1
	
	canvas.addEventListener("mousemove", (e)=>{
		p1.x=e.offsetX;
		p1.y=e.offsetY;
		tiro.x=e.offsetX;
		tiro.y+=tiro.vel;
		if (tiro.y <= tela.y){
			tiro.y = p1.y;
		}
	});

//_3.1_///////////////////////////// recomeco
	function reset() { 
		//window.location.reload()
		p1.x = tela.larg/2; 
		p1.y = 3*tela.alt/4
		tiro.x = p1.x;
		tiro.y = p1.y;
		p1Placar.placar = comeco;
		for(i in  cp){
			cp[i].y = 0;
		};		
	 }	 
	 function lista(){
		alert(	tabela[0].placar+' | '+tabela[0].nome+"\n"+ 
				tabela[1].placar+' | '+tabela[1].nome+"\n"+ 
				tabela[2].placar+' | '+tabela[2].nome+"\n"+ 
				tabela[3].placar+' | '+tabela[3].nome+"\n"+ 
				tabela[4].placar+' | '+tabela[4].nome+"\n"+ 
				tabela[5].placar+' | '+tabela[5].nome		
		);
	 }
//_3_///////////////////////////// ranking
	 function ranking(){
		let resultado = {
			nome: prompt("registre seu nome"),
			placar: p1Placar.placar
			}

			tabela = JSON.parse(window.localStorage.getItem('bdGal'));
			tabela.pop();
			tabela.push(resultado);
			tabela.sort(function (a, b) {
				if (a.placar < b.placar) {
					return 1;
				}
				if (a.placar > b.placar) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
			window.localStorage.setItem('bdGal', JSON.stringify(tabela));
			
			lista();

			p1Placar.nome=tabela[0].nome;
			p1Placar.res=tabela[0].placar;
	 }
//_2.2_///////////////////////////// atualiza	
	function atualiza() {       

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
  // movimento cp
	for(i in cp){
		cp[i].y += cp[i].vel; 
		if (cp[i].y + cp[i].alt == 600){
			cp[i].y = tela.y;
			cp[i].x = tela.x + (Math.random()*tela.larg);
			p1Placar.placar -= 1;
		}	
	}
  // Colisao cp
	for(i in cp){
		if (cp[i].colisao()) {
			colisao = false;
			alert("kabumm!!!");	
			ranking();	
			reset(); 
		}	
	}			
  // regra jogo
		if (p1Placar.placar <= 0){
			alert("voce perdeu")
			lista();
			reset();
		} else if (p1Placar.placar >= fim)	{
			alert("Parabens, voce venceu o desafio!!!");
			ranking();
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