let velocidade
velocidade = prompt("qual será a velocidade: ")
if(velocidade <= 40 ){
    alert("velocidade baixa")
}else if(velocidade > 40 && velocidade <= 80){
    alert("velocidade ideal")
}else{
    alert("velocidade excessiva")
}