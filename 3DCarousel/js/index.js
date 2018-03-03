var angle = 0;
function carouselSpin(left){
  spin = document.querySelector('.spin');
  if(!left){
    angle = angle + 60;
  }
  else{
    angle = angle - 60;
  }
  spin.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform:rotateY("+ angle +"deg); -ms-transform: rotateY("+angle+"deg); transform:rotateY("+ angle +"deg);")
}