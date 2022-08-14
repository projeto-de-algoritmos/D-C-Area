// para alterar o tempo (em ms)
var time = 5;

function tempo(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function coordenadas(inside) {
  let value = Math.random();

  if (value > 0.5 && inside != "left") value = value - 0.45;

  if (value < 0.15 && inside != "left") value = value + 0.02;

  if (value > 0.85 && inside == "left") value = value - 0.05;

  if (value < 0.15 && inside == "left") value = value + 0.05;

  return value * 1800;
}

function distancia(pontoa, pontob) {
  var res = ((pontob[0] - pontoa[0]) ** 2) + ((pontob[1] - pontoa[1]) ** 2);
  res = Math.sqrt(res);
  return res; 
}

function compara(pontoa, pontob) { 
  var ponto = maisdaborda;
  var o = orientacao(ponto, pontoa, pontob); 
  if (o == 0) 
    return (distancia(ponto, pontob) >= distancia(ponto, pontoa))? -1 : 1; 
 return (o == -1)? -1: 1; 
}


function conecta(entrada, stack, condicao) {
  var x = entrada;
  if (!condicao) {
      for (var i = 0; i < stack.length - 1; i++) {    
          x = x + "<svg width='1800' height='1000' style='position: absolute'><line x1='" + (stack[i][0] + 2)+ "' y1='" + (stack[i][1] + 2) + "' x2='" + (stack[i + 1][0] + 2) + "' y2='" + (stack[i + 1][1] + 2) + "' stroke='black'/></svg>";
      }
  } else {
      for (var i = 0; i < stack.length - 1; i++) {  
          x = x + "<svg width='1800' height='1000' style='position: absolute'><line x1='" + (stack[i][0] + 2)+ "' y1='" + (stack[i][1] + 2) + "' x2='" + (stack[i + 1][0] + 2) + "' y2='" + (stack[i + 1][1] + 2) + "' stroke='green'/></svg>"
      }
  }
  document.getElementById("main").innerHTML = x;
}

function orientacao(a, b, r) {
  var r = (b[1] - a[1]) * (r[0] - b[0]) - (b[0] - a[0]) * (r[1] - b[1]);
  if (r == 0) return 0;
  return (r > 0) ? 1 : -1;
}


async function encontrarAreaSegura(entrada, pontos) {
  // console.log("check");
   //console.log(pontos);
   var stack = [pontos[0], pontos[1]];
   var procura = 2;
   var contador = 2;
   conecta(entrada, stack, false);
   await tempo(time);
   while(true) {
       var check = false;
       if (procura == (pontos.length)) {
           break;
       }
       if (orientacao(stack[contador - 2], stack[contador - 1], pontos[procura]) == -1) {
           stack.push(pontos[procura]);
           contador++;
       } else {
           contador--;
           stack.pop();
           check = true;
       }
       var s = stack.slice();
       
       if (!check) {
           procura++;
       }
       conecta(entrada, stack, false);
       await tempo(time);
       
   }
   stack.push(stack[0]);
   await tempo(time);
   conecta(entrada, stack, true);
   //console.log(procura);
   show();
   return stack;
}



var maisdaborda;
var pontos = [];
var text = "";

function tela() {
  pontos = [];
  element = "";
  var total = 200;
  for (let i = 0; i < total; i++) {
    pontos.push([coordenadas("left"), coordenadas("top")]);
  }

  for (let i = 0; i < total; i++) {
    element =   element + 
    `<div 
      id='point'${Math.abs(Math.round(pontos[i][0]))}
      class='point' 
      style='margin-left: ${pontos[i][0]}px; margin-top: ${pontos[i][1]}px; z-index: ${i}'
    ></div>
    `;
  }

  document.getElementById("main").innerHTML = element;
}

function escondebotao() {
  document.getElementById("menu").style.display = "none";
}

function scanear() {
  document.getElementById("main").innerHTML = "";
  escondebotao();
  tela();
  pontos.sort(function(a, b) {return a[1] - b[1]});
  maisdaborda = pontos[0];
  pontos.splice(0, 1);

  pontos.sort(compara);
  pontos.unshift(maisdaborda);
  var stack = encontrarAreaSegura(element, pontos);
  console.log(stack);
}
