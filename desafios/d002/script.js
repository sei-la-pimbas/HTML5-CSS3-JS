function verificarIdade(){
    const idade = document.querySelector("#idade").value
    const img = document.querySelector("#imgPlace");

    const idadeNum = Number(idade)

    if (idadeNum < 0){
        alert("vc errou")
    }
    else if (idadeNum <= 5 ){
        img.src = "bebe vesgo.webp"
        img.alt = "Um bebê vesgo"
    } else if (idadeNum > 5 && idadeNum < 13){
        img.src = "crianca.jpg"
        img.alt = "uma criança bem calma"
    }else if (idadeNum > 13 && idadeNum < 18){
        img.src = "adolecente.jpg"
        img.alt = "adolecente revoltado"
    }else if (idadeNum > 17 && idadeNum < 66){
        img.src = "adulto.jpg"
        img.alt = "adulto"
    }else if (idadeNum > 65 && idadeNum < 96){
        img.src = "velho.webp"
        img.alt = "homem velho"
    }else{
        img.src = "morto.png"
        img.alt = "sei la"
    }
}
