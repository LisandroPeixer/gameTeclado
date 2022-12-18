const canvas = document.getElementById('canvas');
canvas.width = 1200; //window.innerWidth;
canvas.height = 600 //window.innerHeight;
const ctx = canvas.getContext('2d');

//variaveis globais		elementos			regras
let colisao = false;	let torres = 9;		let velo = 5;		var teto = 220;		var musicaAcao;
						let argolas = 2;	let compra = 0;		let chao = 120;
						let cps = 2;		let troca = 0;		let fundos = 3;
						let moedas = 2;		let vidas = 0;		let f = 1;
											let life = 300;		let dano = 10;
function conexao(){
	// conexao localstorage
	if(localStorage.hasOwnProperty('bdStr')){
		tabela = JSON.parse(window.localStorage.getItem('bdStr'));
	} else {
		tabela = [
			{nome: "primeiro", placar: 6},
			{nome: "segundo", placar: 5},
			{nome: "terceiro", placar: 4},
			{nome: "quarto", placar: 3},
			{nome: "quinto", placar: 2},
			{nome: "sexto", placar: 1}
		]
	window.localStorage.setItem('bdStr', JSON.stringify(tabela));
	}
}
conexao()
antes = new Date().getTime();
function tempo() {  
	
	agora = new Date().getTime();
	decorrido = agora - antes;

	if(decorrido > p1Spr.intervalo){
		//console.log(decorrido)
		if (p1Spr.coluna < p1Spr.numColunas - 1)       
		p1Spr.coluna+=2;       
		else         
		p1Spr.coluna = 0;			 
		antes = new Date().getTime();
	}
	for(i in cpSpr){	
		if(decorrido > cpSpr[i].intervalo){
			//console.log(decorrido)
			if (cpSpr[i].coluna < cpSpr[i].numColunas - 1)       
			cpSpr[i].coluna+=2;       
			else         
			cpSpr[i].coluna = 0;			 
			antes = new Date().getTime();
		}
	}                      		
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
		}		
		sprite(imagem) {
			tempo()			 
			imagem.srcX = imagem.largura *  imagem.coluna;			
			//ctx.clearRect(this.x,this.y,this.larg,this.alt);
	
			if(!setaFrente){			
				imagem.srcY = 0					
			}
			if(setaFrente || setaBaixo){
				imagem.srcY = 100
				//this.x+=this.vel;			
			}
			if(setaTras || setaCima){
				imagem.srcY = 200
				//this.x+=this.vel;			
			}
			if(disparo){
				imagem.srcY = 300
			}
			if(disparo && setaTras){
				imagem.srcY = 400
			}
			ctx.drawImage(imagem,imagem.srcX,imagem.srcY,imagem.largura,   imagem.altura,
								 this.x-20,  this.y-40,  imagem.qLarg,  imagem.qAlt 	 );
			return ctx	
		}	
		spritecp(imagem) {
			tempo()
				for(i in imagem){					
					 imagem.srcX = imagem.coluna * this.larg;				
					//ctx.clearRect(this.x,this.y,this.larg,this.alt);
			
					if(imagem.depois){			
						imagem.srcY = 100					
					}
					if(imagem.antes){
						imagem.srcY = 200
						//this.x+=this.vel;			
					}
					if(imagem.depois && disparo){
						imagem.srcY = 300
						//this.x+=this.vel;			
					}
					if(imagem.antes && disparo){
						imagem.srcY = 400
						//this.x+=this.vel;			
					}	
					if(colisao){
						imagem.srcY = 500
						//this.x+=this.vel;			
					}	
				ctx.drawImage(imagem,imagem.srcX,imagem.srcY,imagem.larg,imagem.alt,
			 					this.x-20, 	 this.y-40,  imagem.qLarg,  imagem.qAlt  	 );
				return ctx		
			}
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
			ctx.font = '20px sans-serif';

			ctx.fillText(tela.nome, 	this.x-130,	this.y-50);	

			ctx.fillText(this.placar, 	this.x,		this.y-50);
			ctx.fillText("HI", 			this.x+50, 	this.y-50);
			ctx.fillText(this.res, 		this.x+100,	this.y-50);

			//ctx.fillText(cp[0].vida, 	this.x+20,	this.y-40);
			//ctx.fillText(cp[1].vida, 	this.x+80,	this.y-40);
			//ctx.fillText(cp[2].vida, 	this.x+140,	this.y-40);

			//ctx.fillText("LIFE: "+p1.vida+"%",	 	this.x+70,	this.y+40);
		
			return ctx;
		}
		colisao(colide){
			colide.topo = colide.y;
			colide.dir = colide.x + colide.larg;
			colide.fundo = colide.y + colide.alt;
			colide.esq = colide.x;

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
	}
	//		    		|cor			|x           	|y			|larg		|alt	 	|raio   |vel   	|nome 				|res   			|placar		|vida
	let fundo = [];
	for(i=0;i<=fundos;i++){
		fundo[i] = new Image();		
	}
	fundo[0].src ="fundo.png"; 
	fundo[1].src ="1fundo.png"; 
	fundo[2].src ="2fundo.png"; 
	fundo[3].src ="3fundo.png";

	let moeda = [];
	for(i=0;i<=moedas;i++){
		moeda[i] = new Image();
	}
	moeda[0].src ="moeda.png";
	moeda[1].src ="moeda.png";
	moeda[2].src ="moeda.png";
		
	let tela = new obj("#FFFFCC",		0, 			 	0,		canvas.width, canvas.height, null,   null, 	null, 				null,  			null,		null);
	let porta = new obj("#00000000",	tela.larg+5000,	0,			100,		700, 		 null, 	 velo,   null, 				null,			null,		null);


	let argola = [];
	for(i=0;i<=argolas;i++){
		argola[i]  = new obj("yellow", 	tela.larg,		 0,			null,		null, 		 30, 	 velo,   null, 				null, 			null);
	}
	var bonus = new Audio();
	bonus.src = 'bonus.mp3';
	bonus.volume = 0.4;
	bonus.load();

	let torre = [];
	for(i=0;i<=torres;i++){
		torre[i]  = new obj("#FFCC00", 	tela.larg,  	 0,			200,		50, 		 null, 	 velo,   null, 				null,			null,		null);
	}
	
	let cp = [];
	let cpSpr = [];
	for(i=0;i<=cps;i++){
		cpSpr[i] = new Image();
		cpSpr[i].src = "kit.png";	
		cpSpr[i].spritealtura = 500;
		cpSpr[i].spritelargura = 300;
		cpSpr[i].numLinhas = 5;       
		cpSpr[i].numColunas = 6;  		
		cpSpr[i].altura = cpSpr.spritealtura/cpSpr.numLinhas;
		cpSpr[i].largura =  cpSpr.spritelargura/cpSpr.numColunas;

		cpSpr[i].linha = 0;       
		cpSpr[i].coluna = 0; 
		cpSpr[i].intervalo = 1000/10; 
		
		cpSpr[i].srcX;
		cpSpr[i].srcY;		


		cpSpr[i].qLarg = 100;
		cpSpr[i].qAlt = 200;	
		cpSpr[i].larg = 50;	//recorte
		cpSpr[i].alt = 100;
		cpSpr[i].praDir = 0; //direcao
		cpSpr[i].praEsq = 1;
		cpSpr[i].frameA = 0; //quadro
		cpSpr[i].frameT = 5;		
		
		cpSpr[i].antes = false;
		cpSpr[i].depois = false;
		cp[i]  = new obj("#FFCC00", 	tela.larg,  	 0,			50,			50,	 		null, 	 velo,   null, 				null, 		null,			200);
	
	}
	var SOM_EXPLOSAO = new Audio();
	SOM_EXPLOSAO.src = 'explosao.mp3';
	SOM_EXPLOSAO.volume = 0.2;
	SOM_EXPLOSAO.load();

	//imagem
	var p1Spr = new Image();
	p1Spr.src = "ken.png";

	p1Spr.spritelargura = 250;
	p1Spr.spritealtura = 500;
	p1Spr.numLinhas = 5;       
	p1Spr.numColunas = 5;  
	p1Spr.largura =  p1Spr.spritelargura/p1Spr.numColunas;
	p1Spr.altura = p1Spr.spritealtura/p1Spr.numLinhas;

	p1Spr.linha = 0;       
	p1Spr.coluna = 0; 
	p1Spr.intervalo = 1000/10; 


	p1Spr.qLarg = 100;
	p1Spr.qAlt = 200;	
	p1Spr.larg = 50;	// total/frame
	p1Spr.alt = 100;
	p1Spr.praDir = 0;
	p1Spr.praEsq = 1;
	p1Spr.frameA = 0;
	p1Spr.frameT = 5;		
	p1Spr.srcX;
	p1Spr.srcY;
	//		    		|cor			|x           	|y					|larg		|alt	 	|raio   |vel   	|nome 				|res   			|placar		|vida
	let p1 	   = new obj("#ffff00",	tela.larg/2, 	tela.alt/2, 			30,			50, 		60, 	 5,    null, 				null,  			0,			life);
	let tiro   = new obj("#000000",	p1.x, 			p1.y, 					30,			50, 	 	10, 	 50,    null, 				null,  			0,			null);
	
	var SOM_TIRO = new Audio();
	SOM_TIRO.src = 'tiro.mp3';
	SOM_TIRO.volume = 0.2;
	SOM_TIRO.load();

	
	let p1Placar = new obj("#6B4226", 	tela.larg/8, 	tela.alt/8, null,		null,  		null,	 null,  tabela[0].nome,	 tabela[0].placar, 	p1.placar,	null);
	
	var passou = new Audio();
	passou.src = 'passou.mp3';
	passou.volume = 0.2;
	passou.load();
	
//_3.2_///////////////////////////// teclado
	var setaFrente = false;
	var setaTras = false;
	var setaCima = false;
	var setaBaixo = false;
	var disparo = false;
	
	window.addEventListener('keydown', teclaOn);
	function teclaOn(e) {    
		if (e.keyCode == 39){
			setaFrente = true; 
		} else if (e.keyCode == 37){
			setaTras = true; 
		} else if (e.keyCode == 38){
			setaCima = true;    
		} else if (e.keyCode == 40){
			setaBaixo = true; 
		} else if (e.keyCode == 32){
			disparo = true; 	     
		}
	} 
	window.addEventListener('keyup', teclaOff);
	function teclaOff(e) {    
		if (e.keyCode == 39){
			setaFrente = false; 
		} else if (e.keyCode == 37){
			setaTras = false;     
		} else if (e.keyCode == 38){
			setaCima = false;    
		} else if (e.keyCode == 40){
			setaBaixo = false;    	
		} else if (e.keyCode == 32){
			disparo = false;    		 
		}
	}	

//_3.1_///////////////////////////// roteiro do game
	alert(	"STREET"+"\n\n"+
			"Para sobreviver nestas ruas"+"\n"+
			"Voce deverar coletar os moedas"+"\n"+
			"lutando contra uma gangue"+"\n"+
			"DA PESADA!!!"+"\n"+
			"Entre pro nosso ranking de melhores jogadores"+"\n\n"+
			"USE as SETAS + ESPACO para ataque"
			)
	
	musicaAcao = new Audio();
	musicaAcao.src = 'musica-acao.mp3';
	musicaAcao.load();
	musicaAcao.volume = 0.2;	

	function clear(){
		colisao = false;
		p1.x = tela.larg/2;
		p1.y = tela.alt/2;
		setaCima = false;
		setaBaixo = false;
		setaFrente = false;
		setaTras = false;
		disparo = false;
	}
	function reset() {
		//window.location.reload()
		clear();		
		p1.vida = 300;
		p1Placar.placar = 0;	
	}
	function comprar(compra, troca){
		colisao = false;
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
	function fase(){
		clear();
		
		porta.x=tela.larg + 15000;

		torre[0].x=100;			torre[0].y=	0;   	torre[0].alt=600; torre[0].larg=15000; torre[0].cor="#00000000";
		
		torre[1].x=tela.x;		torre[1].y=	tela.y;		torre[1].alt=130; 	torre[1].larg=420;  torre[1].cor="#00000066";

		torre[2].x=tela.x;		torre[2].y=	tela.y+30; 	torre[2].alt=30; 	torre[2].larg=p1.vida;  torre[2].cor="red";	
		torre[3].x=tela.x;		torre[3].y=	tela.y+30; 	torre[3].alt=30;	torre[3].larg=p1.vida;  torre[3].cor="yellow";	

		torre[4].x=tela.x;		torre[4].y=	tela.y+70; 	torre[4].alt=20; 	torre[4].larg=cp[0].vida;  torre[4].cor="red";	
		torre[5].x=tela.x;		torre[5].y=	tela.y+70; 	torre[5].alt=20;	torre[5].larg=cp[0].vida;  torre[5].cor="yellow";	

		torre[6].x=tela.x;		torre[6].y=	tela.y+100; 	torre[6].alt=20; 	torre[6].larg=cp[1].vida;  torre[6].cor="red";	
		torre[7].x=tela.x;		torre[7].y=	tela.y+100; 	torre[7].alt=20;	torre[7].larg=cp[1].vida;  torre[7].cor="yellow";	

		torre[8].x=tela.x;		torre[8].y=	tela.y+130; 	torre[8].alt=20; 	torre[8].larg=cp[2].vida;  torre[8].cor="red";	
		torre[9].x=tela.x;		torre[9].y=	tela.y+130; 	torre[9].alt=20;	torre[9].larg=cp[2].vida;  torre[9].cor="yellow";	

		cp[0].x=tela.larg+ 100; 	cp[0].y=200;	/*cp[0].alt=100;	   cp[0].larg=70;*/	  cp[0].cor="#FFCC00";
		cp[1].x=tela.larg+ 150;		cp[1].y=250;	/*cp[1].alt=100;	   cp[1].larg=70;*/	  cp[1].cor="#FFCC00";
		cp[2].x=tela.larg+ 200; 	cp[2].y=300;	/*cp[2].alt=100;	   cp[2].larg=70;*/	  cp[2].cor="#FFCC00";

		cpSpr[0].src = "axel.png";	cpSpr[0].spritelargura = 300;	cpSpr[0].spritealtura = 500;	cpSpr[0].qAlt = 300;	cpSpr[0].qLarg = 200;	
		cpSpr[1].src = "cami.png";	cpSpr[1].spritelargura = 300;	cpSpr[1].spritealtura = 500; 		cpSpr[2];frameT = 6;
		cpSpr[2].src = "kit.png";	cpSpr[2].spritelargura = 300;	cpSpr[2].spritealtura = 500;

		cpSpr[0].intervalo = 1000/10; cpSpr[0].numLinhas = 5;     cpSpr[0].numColunas = 6;   
		cpSpr[1].intervalo = 1000/10; cpSpr[1].numLinhas = 5;		cpSpr[1].numColunas = 4;
		cpSpr[2].intervalo = 1000/10; cpSpr[2].numLinhas = 5;		cpSpr[2].numColunas = 5;

		argola[0].x=tela.larg+ 	100;	argola[0].y=300;
		argola[1].x=tela.larg;			argola[1].y=350;
		argola[2].x=tela.larg+ 	300;	argola[2].y=400;
	}
	function fase1(){
		clear();
	// cenario
		tela.nome="USNAVI";
		tela.cor="#FFFFCC"; 
		p1Placar.cor="#ffffff";
		f = 0;			
	}
	function fase2(){
		clear();
		tela.nome="YAKUZA";
		tela.cor = "#009900";
		p1Placar.cor = "white";
		porta.x=tela.larg + 15000;
		f = 1;	
	}	
	function fase3(){
		clear();
		tela.nome="VIETNA";
		tela.cor = "#999900";
		p1Placar.cor = "white";
		porta.x=tela.larg + 15000;
		f = 2;	
		torre[0].x=100;			torre[0].y=	0;   	torre[0].alt=600; torre[0].larg=15000; torre[0].cor="#00000000";
	}
	function faseF(){
		clear();
		tela.nome="GERMAIN";
		tela.cor = "#8FBC8F";
		p1Placar.cor = "white";
		porta.x=tela.larg + 15000;
		teto=300;
		f = 3;	

		cp[0].x=tela.larg+ 100; 	cp[0].y=350;	/*cp[0].alt=100;	   cp[0].larg=70;*/	  cp[0].cor="#FFCC00";
		cp[1].x=tela.larg+ 200;		cp[1].y=425;	/*cp[1].alt=100;	   cp[1].larg=70;*/	  cp[1].cor="#FFCC00";
		cp[2].x=tela.larg+ 350; 	cp[2].y=500;	/*cp[2].alt=100;	   cp[2].larg=70;*/	  cp[2].cor="#FFCC00";
		
		argola[0].x=tela.larg+ 	200;	argola[0].y=500;
		
		alert("fase final!!!");
	}
	fase();
	fase1();

	function trocaFase(callback){
		if(tela.nome=="USNAVI"){
			comprar(callback)
			fase2();
		} else if(tela.nome=="YAKUZA"){
			comprar(callback)
			fase3();
		} else if(tela.nome=="VIETNA"){
			comprar(callback)
			faseF();			
		} else if(tela.nome=="GERMAIN"){
			colisao = false;
			alert('Parabens'+"\n"+'Voce venceu o desafio final!!!');
			ranking();
			window.location.reload()			
		}
	}
	function mesmaFase(){
		if(tela.nome=="USNAVI"){
			fase1();
		} else if(tela.nome=="YAKUZA"){
			fase2();
		} else if(tela.nome=="VIETNA"){
			fase3();			
		} else if(tela.nome=="GERMAIN"){
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

			tabela = JSON.parse(window.localStorage.getItem('bdStr'));
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
			window.localStorage.setItem('bdStr', JSON.stringify(tabela));

			lista();

			p1Placar.nome=tabela[0].nome;
			p1Placar.res=tabela[0].placar;
			colisao = false;
			fase1();
	 }
//_2.2_///////////////////////////// atualiza
	 function movimento(){
		// movimento atualiza  
		if (p1.y < tela.y+teto){ //barrera de teto
			p1.y = tela.y+teto;
			tiro.y = tela.y+teto	;
		}
		if (p1.y > tela.alt - p1.alt-chao){ //barrera de chao
			p1.y = tela.alt-p1.alt-chao;
			tiro.y = tela.alt-p1.alt-chao;
		}
		if (p1.x < torre[0].x + 600){ //barrera de chao
			clear()
			torre[0].x = 0;
		}
	// movimento cenario		
		if (setaFrente ) { 
			torre[0].x -= torre[0].vel;
			for(i in argola){
				//torre[i].x -= torre[i].vel;
				argola[i].x -= argola[i].vel;
				cp[i].x -= cp[i].vel;
				porta.x -= porta.vel;					
			}       
		}
		if (setaTras) { 
			torre[0].x += torre[0].vel;	
			for(i in argola){
				//torre[i].x += torre[i].vel;
				argola[i].x += argola[i].vel;
				cp[i].x += cp[i].vel;
				porta.x += porta.vel;								    
			}		  
		} 		
	// movimento p1
		if(setaCima){
			p1.y -= p1.vel;
			tiro.y -= p1.vel;		
		}
		if(setaBaixo){
			p1.y +=p1.vel;
			tiro.y += p1.vel;	
		}	
	//soco		
		if(disparo){
			tiro.x = tela.larg/2 + 20;
		}
		if(disparo && setaTras){
			tiro.x = tela.larg/2 - 20;
		} 
		else if (!disparo){
			tiro.x = p1.x;
			tiro.y = p1.y;
		}			
	//progressao do cenario
		if (porta.x + porta.larg == 0){
			porta.x = tela.larg + 500;
		};
		// for(i in torre){
		// 	if (torre[i].x + torre[i].larg == 0){
		// 		torre[i].x = tela.larg;
		// 	};
		// }
		for(i in argola){
			if (argola[i].x + argola[i].larg == 0){
				argola[i].x = tela.larg;
			};
		}
		for(i in cp){
			cp[i].x += ((p1.x - (cp[i].x + cp[i].larg / 2)) * 0.01);
			cp[2].y += ((p1.y - (cp[2].y + cp[2].alt / 2)) * 0.01);	
			if (cp[i].x + cp[i].larg == 0){
				cp[i].x = tela.larg;
			};
			if(p1.x > cp[i].x){
				cpSpr[i].srcY = 100
				cpSpr[i].antes = false;
				cpSpr[i].depois = true;
			}
			if(p1.x < cp[i].x){
				cpSpr[i].srcY = 200
				cpSpr[i].antes = true;
				cpSpr[i].depois = false;
			}
		}
	 }
	function kabum(){
	//	Colisao atualiza
		for(i in cp){
			if (cp[i].colisao(p1)) {				
				colisao = false;
				p1.vida -= dano;
				//placar
				torre[3].larg=p1.vida
				torre[5].larg=cp[0].vida
				torre[7].larg=cp[1].vida
				torre[9].larg=cp[2].vida			
			}
			if (p1.vida == 0){
				SOM_EXPLOSAO.currentTime = 0.0;
				SOM_EXPLOSAO.play();
				alert("Voce perdeu!!!");
				ranking();
				reset();
				fase1();				
			}
			if (cp[i].colisao(tiro)) {
				colisao = false;
				cp[i].vida -= dano;
				cp[i].x += 50; 
				//placar
				torre[3].larg=p1.vida
				torre[5].larg=cp[0].vida
				torre[7].larg=cp[1].vida
				torre[9].larg=cp[2].vida				
				p1Placar.placar += 10;	
				SOM_TIRO.currentTime = 0.0;
				SOM_TIRO.play();							
			}
			if (cp[i].vida == 0){
				SOM_EXPLOSAO.currentTime = 0.0;
				SOM_EXPLOSAO.play();
				cp[i].vida = 200;
				//alert("foi")
				cp[i].x += 800;
				cp[0].y = 350;
				cp[1].y = 400;
				cp[2].y = 500;
			}

		}
 	 // pontuacao atualiza
		for(i in argola){
			if (argola[i].colisao(p1)) {
				bonus.currentTime = 0.0;
				bonus.play();
				colisao = false;
				p1Placar.placar += 10;
				p1.vida = life;
				argola[i].x = tela.larg;
				torre[3].larg=p1.vida
			}
		}
	//troca de fases	
		if(porta.colisao(p1)){
			passou.currentTime = 0.0;
			passou.play();
			alert('Parabens'+"\n"+'Voce passou esta fase!!!');
			trocaFase();
		}				
	 }
	function atualiza() {
		movimento();
		kabum();
	}	
	
//_2.1_///////////////////////////// desenha
	function desenha() {
		musicaAcao.loop = true;
		musicaAcao.play();

		tela.retangulo();
		
		
		for(i in torre){
			torre[i].retangulo();
		}
		for(i in cp){
			cp[i].retangulo();
			//cp[i].spritecp(cpSpr[i]);
		}
		tiro.retangulo();
		p1.retangulo();		
		porta.retangulo();

		ctx.drawImage(fundo[f], torre[0].x-300, torre[0].y, 15000, 600);
		for(i in argola){
			//argola[i].circulo();
			ctx.drawImage(moeda[i], argola[i].x-argola[i].raio, argola[i].y+100, argola[i].raio*2, argola[i].raio*2);
		}

		p1.sprite(p1Spr);
		for(i in cp){
			//cp[i].retangulo();
			cp[i].spritecp(cpSpr[i]);
		}
		for(i in torre){
			torre[i].retangulo();
		}
		p1Placar.text();
	}
//_1_/////////////////////////////// loop
	requestAnimationFrame(Loop)
	function Loop() {
		tempo()
		desenha()
		atualiza()
		requestAnimationFrame(Loop)
	}
	//setInterval(Loop, 1000/10);