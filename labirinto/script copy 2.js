const canvas = document.getElementById('canvas');
canvas.width = 1200; //window.innerWidth;
canvas.height = 600 //window.innerHeight;
const ctx = canvas.getContext('2d');
let colisao = false;
let projecao = false;
let torres = 3;
let argolas = 3;
let cps = 3;
let velo = -5;
let compra = 0;
let troca = 0;
let vidas = 0;

// conexao localstorage
if(localStorage.hasOwnProperty('bdAdv')){
	tabela = JSON.parse(window.localStorage.getItem('bdAdv'));
} else {
	tabela = [
		{nome: "primeiro", placar: 6},
		{nome: "segundo", placar: 5},
		{nome: "terceiro", placar: 4},
		{nome: "quarto", placar: 3},
		{nome: "quinto", placar: 2},
		{nome: "sexto", placar: 1}
	]
window.localStorage.setItem('bdAdv', JSON.stringify(tabela));
}

//_4_/////////////////////////////// objetos
	class obj {
		constructor(cor, x, y, larg, alt, raio, vel, nome, res, placar, vida){
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
			this.vida = vida
			//this.imagem = imagem;
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
			ctx.fillText(p1.vida,	 	this.x,		this.y);
			ctx.fillText(tela.nome, 	this.x+100,	this.y);
			ctx.fillText(this.nome, 	this.x+100, this.y+50);
			ctx.fillText(this.res, 		this.x, 	this.y+50);
			ctx.fillText(this.placar, 	this.x, 	this.y+100);
			return ctx;
		 }
		 colisao(colide){
			colide.topo = colide.y - colide.raio;
			colide.dir = colide.x + colide.raio;
			colide.fundo = colide.y + colide.raio;
			colide.esq = colide.x - colide.raio;

			this.topo = this.y;
			this.dir = this.x + this.larg;
			this.fundo = this.y + this.alt;
			this.esq = this.x;

			if(	this.topo < colide.fundo &&
				this.dir > colide.esq &&
				this.fundo > colide.topo &&
				this.esq < colide.dir){
					colisao = true;
				}
				return colisao
		 }
		 projetar(limite){
			if (this.x + limite.x == 1200){ //esquerda
				this.x = limite.x;
			};
			if (this.x + this.larg == 0){ //direita
				this.x = limite.larg;
			};
			if (this.y + limite.y == 660){ //cima
				this.y = limite.y;
			};
			if (this.y + this.alt == 0){ //baixo
				this.y = limite.alt;
			};
			projecao = true;
			return projecao
		 }
	}
	//		    		|cor			|x           	|y			|larg		|alt	 	|raio   |vel   	|nome 				|res   			|placar		|vida
	let tela = new obj("#FFFFCC",		0, 			 	0,		canvas.width, canvas.height, null,   null, 	null, 				null,  			null,		null);
	let porta = new obj("#CC0000",   		tela.larg-100,	50,			100,		100, 		 null, 	 velo,   null, 				null,			null,		null);


	let argola = [];
	for(i=0;i<=argolas;i++){
		argola[i]  = new obj("yellow", 	tela.larg,		 0,			null,		null, 		 30, 	 velo,   null, 				null, 			null);
	}
	let torre = [];
	for(i=0;i<=torres;i++){
		torre[i]  = new obj("#FFCC00", 	tela.larg,  	 0,			200,		50, 		 null, 	 velo,   null, 				null,			null,		null);
	}
	let cp = [];
	for(i=0;i<=cps;i++){
		cp[i]  = new obj("#FFCC00", 	tela.larg,  	 0,			100,		100, 		 null, 	 velo,   null, 				null, 		null,			null);
	}

	let p1 	   = new obj("#666600", 	tela.larg/2, 	tela.alt/2,	null,		null, 		 30, 	 velo,    null, 			null,  			0,			3);
	let tiro   = new obj("#666600",	    tela.larg/2, 	tela.alt/2,	null,		null, 		 10, 	 velo,    null, 			null,  			0,			null);

	let p1Placar = new obj("#6B4226", 	tela.larg/8, 	tela.alt/8, null,		null,  		null,	 null,  tabela[0].nome,	 tabela[0].placar, 	p1.placar,	null);

//_3.2_///////////////////////////// movimento p1
	let espaco = false;
	let setaCima = false;
	let	setaBaixo = false; 
	let setaFrente = false;
	let setaTras = false;	
	let disparo = false;

	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {
		if (e.keyCode == 32){ //backspace
			espaco = true;
		} else if (e.keyCode == 38){
			setaCima = true; 
		} else if (e.keyCode == 40){
			setaBaixo = true;      
		} else if (e.keyCode == 39){
			setaFrente = true; 
		} else if (e.keyCode == 37){
			setaTras = true;      
		} else if (e.keyCode == 67){ // letra c do teclado
			disparo = true;
		}
	}
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {
		if (e.keyCode == 32){ //backspace
			espaco = false;
		} else if (e.keyCode == 38){
			setaCima = false; 
		} else if (e.keyCode == 40){
			setaBaixo = false;      
		} else if (e.keyCode == 39){
			setaFrente = false; 
		} else if (e.keyCode == 37){
			setaTras = false;  
		} else if (e.keyCode == 67){ // letra c do teclado
			disparo = false;
		}
	}

	//_3.1_///////////////////////////// roteiro do game
	alert(	"Bem vindo ao LABIRINTO!!!"+"\n\n"+
			"Neste jogo, Voce é um aventureiro"+"\n"+
			"E terá que passar por varios labirintos perigosos"+"\n"+
			"Coletando itens valiosos, Esquivando-se das armadilhas"+"\n"+
			"Para encontrar a saida!!!"+"\n"+
			"Entre pro nosso ranking de melhores jogadores"+"\n\n"+
			"USE as SETAS + C para soco + espaco para calibrar")


	function clear(){
		p1.x = tela.larg/2;
		p1.y = tela.alt/2;
		tiro.x = tela.larg/2;
		tiro.y = tela.alt/2;
		espaco = false;
		setaCima = false;
		setaBaixo = false; 
		setaFrente = false;
		setaTras = false;
		disparo = false;
	}
	function reset() {
		//window.location.reload()
		clear();		
		p1.vida = 3;
		p1Placar.placar = 0;	
	}
	function comprar(compra, troca){
		compra = prompt("Cuidado com as armadilhas!!!"+"\n\n"+
						'deseja comprar mais vidas?'+"\n"+
						'digite' +"\n"+
						'1 para SIM');
		if(compra == 1){
			troca = prompt(	"Cada vida custa 100 pontos"+"\n"+
							"Digite quantas vidas quer comprar"
						  );			
				if((troca*100)<p1Placar.placar){
				p1Placar.placar -= (troca*100);
				p1.vida += parseInt(troca);	
			} else {
				alert("Voce nao tem pontos suficientes!!!");
			}
		}
	}


	function fase1(){		
	// cenario
		tela.nome="DESERTO";
		tela.cor="#FFFFCC"; 
		p1Placar.cor="#6B4226";
		porta.x=tela.larg+2000;	
		
		//posicao							//tamanho								//cor
		torre[0].x=200;	torre[0].y=	 50; 	torre[0].alt=200; torre[0].larg=300; 	torre[0].cor="#FFCC00";
		torre[1].x=750;	torre[1].y=	 50; 	torre[1].alt=200; torre[1].larg=300; 	torre[1].cor="#FFCC00";	
		torre[2].x=200;	torre[2].y=	350; 	torre[2].alt=200; torre[2].larg=300; 	torre[2].cor="#FFCC00";
		torre[3].x=750;	torre[3].y=	350; 	torre[3].alt=200; torre[3].larg=300; 	torre[3].cor="#FFCC00";

		cp[0].x=200;	cp[0].y=100;		cp[0].alt=100;	 	cp[0].larg=100;		cp[0].cor="#FFCC00";
		cp[1].x=800;	cp[1].y=400;		cp[1].alt=100;	 	cp[1].larg=100;		cp[1].cor="#FFCC00";
		cp[2].x=300;	cp[2].y=400;		cp[2].alt=100;	 	cp[2].larg=100;		cp[2].cor="#FFCC00";
		cp[3].x=900;	cp[3].y=100;		cp[3].alt=100;	 	cp[3].larg=100;		cp[3].cor="#FFCC00";
		
		argola[0].x= 100; argola[0].y=300;
		argola[1].x= 600; argola[1].y=100;
		argola[2].x=1000; argola[2].y=300;
		argola[3].x= 600; argola[3].y=500;

		//clear();
	}
	function fase2(){
		tela.nome="FLORESTA";
		tela.cor = "#009900";
		p1Placar.cor = "white";
		porta.y=tela.y-1000;	

		//posicao							//tamanho								//cor
		torre[0].x=100;	 torre[0].y=0;	 	torre[0].alt=400; torre[0].larg=100; 	torre[0].cor="#003300";
		torre[1].x=300;	 torre[1].y=100; 	torre[1].alt=100; torre[1].larg=500; 	torre[1].cor="#003300";
		torre[2].x=1000; torre[2].y=300; 	torre[2].alt=400; torre[2].larg=100; 	torre[2].cor="#003300";
		torre[3].x=400;  torre[3].y=500; 	torre[3].alt=100; torre[3].larg=500; 	torre[3].cor="#003300";

		cp[0].x=200;	cp[0].y=400; 		cp[0].alt=100; 							cp[0].cor="#003300";
		cp[1].x=300;	cp[1].y=100; 		cp[1].alt=100; 							cp[1].cor="#003300";
		cp[2].x=300;	cp[2].y=400; 		cp[2].alt=100; 							cp[2].cor="#003300";
		cp[3].x=1000;	cp[3].y=500; 		cp[3].alt=100; 							cp[3].cor="#003300";

		argola[0].x=250;	argola[0].y=150;
		argola[1].x=600;	argola[1].y=50;
		argola[2].x=900;	argola[2].y=250;
		argola[3].x=600;	argola[3].y=450;

		clear();
	}	
	function fase3(){
		tela.nome="LABIRINTO";
		tela.cor = "#C0C0C0";
		p1Placar.cor = "white";
		porta.y=tela.alt+1000;	

		//posicao							//tamanho								//cor
		torre[0].x=100;	torre[0].y=	100; 	torre[0].alt=200; torre[0].larg=200; 	torre[0].cor="#333333";
		torre[1].x=400;	torre[1].y=	400; 	torre[1].alt=200; torre[1].larg=200; 	torre[1].cor="#333333";
		torre[2].x=700; torre[2].y=	200; 	torre[2].alt=200; torre[2].larg=200; 	torre[2].cor="#333333";
		torre[3].x=1000;torre[3].y=	0;	 	torre[3].alt=200; torre[3].larg=200; 	torre[3].cor="#333333";

		cp[0].x=100; cp[0].y=100; 			cp[0].alt=100; 	cp[0].larg=200;			cp[0].cor="#333333";
		cp[1].x=100; cp[1].y=200; 			cp[1].alt=100; 	cp[1].larg=200;			cp[1].cor="#333333";
		cp[2].x=100; cp[2].y=300; 			cp[2].alt=100; 	cp[2].larg=200;			cp[2].cor="#333333";
		cp[3].x=100; cp[3].y=400; 			cp[3].alt=100; 	cp[3].larg=200;			cp[3].cor="#333333";

		argola[0].x=100; argola[0].y=150;
		argola[1].x=600; argola[1].y=50;
		argola[2].x=1000;argola[2].y=250;
		argola[3].x=800; argola[3].y=450;

		clear();
	}
	function faseF(){
		tela.nome="CASTELO";
		tela.cor = "#8FBC8F";
		p1Placar.cor = "white";
		porta.x=tela.larg+2000;	

		//posicao							//tamanho								//cor
		torre[0].x=100;	torre[0].y=	100; 	torre[0].alt=200; torre[0].larg=200;	torre[0].cor="#426F42";
		torre[1].x=100;	torre[1].y=	400; 	torre[1].alt=200; torre[1].larg=200;	torre[1].cor="#426F42"; 
		torre[2].x=500;	torre[2].y=	200; 	torre[2].alt=200; torre[2].larg=200;	torre[2].cor="#426F42";
		torre[3].x=800;	torre[3].y=	150; 	torre[3].alt=300; torre[3].larg=200; 	torre[3].cor="#426F42";

		cp[0].x=100; 	cp[0].y=200; 		cp[0].alt=100;		cp[0].larg=200;		cp[0].cor="#426F42";
		cp[1].x=200;	cp[1].y=400; 		cp[1].alt=100;		cp[1].larg=200;		cp[1].cor="#426F42";
		cp[2].x=500; 	cp[2].y=400; 		cp[2].alt=100;		cp[2].larg=200;		cp[2].cor="#426F42";
		cp[3].x=900;	cp[3].y=100;		cp[3].alt=100;	 	cp[3].larg=100;		cp[3].cor="#426F42";

		argola[0].x=300;argola[0].y=50;
		argola[1].x=600;argola[1].y=50;
		argola[2].x=900;argola[2].y=550;
		argola[3].x=600;argola[3].y=550;

		clear();
		alert("fase final!!!");
	}
	fase1();


	function trocaFase(callback){
		if(tela.cor == "#FFFFCC"){
			comprar(callback)
			fase2();
		} else if(tela.cor == "#009900"){
			comprar(callback)
			fase3();
		} else if(tela.cor == "#999900"){
			comprar(callback)
			faseF();			
		} else if(tela.cor == "#8FBC8F"){
			alert('Parabens'+"\n"+'Voce venceu o desafio final!!!');
			ranking();
			reset();
			fase1();
		}
	}
	function mesmaFase(){
		if(tela.cor == "#FFFFCC"){
			fase1();
		} else if(tela.cor == "#009900"){
			fase2();
		} else if(tela.cor == "#999900"){
			fase3();			
		} else if(tela.cor == "#8FBC8F"){
			faseF();
		}
	}

//_3_///////////////////////////// ranking
	 function lista(){
		alert(	tabela[0].placar+' | '+tabela[0].nome+"\n"+
				tabela[1].placar+' | '+tabela[1].nome+"\n"+
				tabela[2].placar+' | '+tabela[2].nome+"\n"+
				tabela[3].placar+' | '+tabela[3].nome+"\n"+
				tabela[4].placar+' | '+tabela[4].nome+"\n"+
				tabela[5].placar+' | '+tabela[5].nome
		);
	 }
	 function ranking(){
		let resultado = {
			nome: prompt("registre seu nome"),
			placar: p1Placar.placar
			}

			tabela = JSON.parse(window.localStorage.getItem('bdAdv'));
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
			window.localStorage.setItem('bdAdv', JSON.stringify(tabela));

			lista();

			p1Placar.nome=tabela[0].nome;
			p1Placar.res=tabela[0].placar;
	 }
//_2.2_///////////////////////////// atualiza
	function atualiza() {
 // movimento atualiza
  // movimento p1
	if (setaCima) {  // movimento cenario	
		for(i in torre){
			torre[i].y -= torre[i].vel;
			argola[i].y -= argola[i].vel;
			cp[i].y -= cp[i].vel;
			porta.y -= porta.vel/4;	
			if(disparo){
					tiro.y += tiro.vel;
				} else if (!disparo){
					tiro.y = p1.y;
			}
			if (tiro.y <= p1.y - p1.raio*4){
				tiro.y = p1.y;
		}
		}
	} else if (setaBaixo) {  // movimento cenario	
		for(i in torre){
			torre[i].y += torre[i].vel;
			argola[i].y += argola[i].vel;
			cp[i].y += cp[i].vel;
			porta.y += porta.vel/4;	
			if(disparo){
					tiro.y -= tiro.vel;
				} else if (!disparo){
					tiro.y = p1.y;
			}
			if (tiro.y >= p1.y + p1.raio*4){
				tiro.y = p1.y;
		}
		}	
	} else if (setaFrente) {  // movimento cenario	
		for(i in torre){			
			torre[i].x += torre[i].vel;
			argola[i].x += argola[i].vel;
			cp[i].x += cp[i].vel;
			porta.x += porta.vel/4;	
			if(disparo){
					tiro.x -= tiro.vel;
				} else if (!disparo){
					tiro.x = p1.x;
					tiro.y = p1.y;
			}
			if (tiro.x >= p1.x + p1.raio*4){
				tiro.x = p1.x;
				tiro.y = p1.y;
			}			
		}
	} else if (setaTras) {
		for(i in torre){
			torre[i].x -= torre[i].vel;
			argola[i].x -= argola[i].vel;
			cp[i].x -= cp[i].vel;
			porta.x -= porta.vel/4;	
			if(disparo){
					tiro.x += tiro.vel;
				} else if (!disparo){
					tiro.x = p1.x;
					tiro.y = p1.y;
			}
			if (tiro.x <= p1.x - p1.raio*3){
				tiro.x = p1.x;
				tiro.y = p1.y;
			}
		}	
	}
	// disparo padrao
	if(disparo){
		tiro.y += tiro.vel;
		} else if (!disparo){
			tiro.x = p1.x;
			tiro.y = p1.y;
		}
		if (tiro.y <= p1.y - p1.raio*3){
			tiro.x = p1.x;
			tiro.y = p1.y;
	}	
	if (espaco){
		clear()
	}
	//progressao do cenario

	if (porta.x + porta.larg == 0){
		porta.x = tela.larg + 100;
	};
	
	for(i in torre){
		torre[i].projetar(tela);
	}
	for(i in argola){
		argola[i].projetar(tela);
	}
	for(i in cp){
		cp[i].projetar(tela);
	}

	//movimento cp
	for(i=0; i<=1; i++){
		cp[i].x += ((p1.x - (cp[i].x + cp[i].alt / 2)) * 0.01);
	}
	for(i=2; i<=3; i++){
		cp[i].y += ((p1.y - (cp[i].y + cp[i].alt / 2)) * 0.01);
	}	
	
  	// Colisao atualiza
		for(i in torre){
			if (torre[i].colisao(p1)) {
				colisao = false;
				p1.y = torre[i].y - p1.raio;
				tiro.y = torre[i].y - p1.raio;
			}
		}
	// pontuacao atualiza
		for(i in cp){
			if (cp[i].colisao(p1)) {
				colisao = false;
				p1.vida -= 1;
				alert("kabum!!!");	
				mesmaFase()
				//reset();			
			}
			if (p1.vida == 0){
				alert("Voce perdeu!!!");
				ranking();
				reset();
				fase1();
			}
			if (cp[i].colisao(tiro)) {
				colisao = false;
				cp[i].x = 3*tela.larg/2;
				p1Placar.placar += 10;
			}
		
		}
		for(i in argola){
			if (argola[i].colisao(p1)) {
				colisao = false;
				p1Placar.placar += 10;
				argola[i].x = tela.larg;
			}
		}
	//troca de fases	
		if(porta.colisao(p1)){
			alert('Parabens'+"\n"+'Voce passou esta fase!!!');
			trocaFase();
		}
	}	
//_2.1_///////////////////////////// desenha
	function desenha() {
		tela.retangulo();
		for(i in argola){
			argola[i].circulo();
		}
		for(i in torre){
			torre[i].retangulo();
		}
		for(i in cp){
			cp[i].retangulo();
		}
		p1.circulo();
		tiro.circulo();
		p1Placar.text();
		porta.retangulo();
	}
//_1_/////////////////////////////// loop
	function Loop() {
		desenha()
		atualiza()
	}
	setInterval(Loop, 1000 / 60);