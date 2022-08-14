function coordenadas(inside) {
  let value = Math.random();

  if (value > 0.5 && inside != "left") value = value - 0.45;

  if (value < 0.15 && inside != "left") value = value + 0.02;

  if (value > 0.85 && inside == "left") value = value - 0.05;

  if (value < 0.15 && inside == "left") value = value + 0.05;

  return value * 1800;
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
    ```
    <div 
      id='point'${Math.abs(Math.round(pontos[i][0]))}
      class='point' 
      style='margin-left: ${pontos[i][0]}px; margin-top: ${pontos[i][1]}px; z-index: ${i}'
    ></div>
    ```;
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
