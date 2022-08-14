


function coordenadas(inside) {
  let value = Math.random();

  if (value > 0.5 && inside != "left") value = value - 0.45;
  
  if (value < 0.15 && inside != "left") value = value + 0.02;

  if (value > 0.85 && inside == "left") value = value - 0.05;
  
  if (value < 0.15 && inside == "left") value = value + 0.05;
  
  return value * 1800;
}