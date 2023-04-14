// variaveis
let button = document.getElementById("open-btn");
let xis = document.getElementById("close-btn");
let modal = document.getElementById("container");
   
// funcoes
button.onclick = function()
{
    modal.style.display = "block";
} 


xis.onclick = function(){
    modal.style.display = "none";
}

// posso clicar em qualquer parte da "janela" que volta ao normal 
// sem isso só volta ao normal se clica no "x".
window.addEventListener('click', function(e)
{
    if(e.target === modal)
    {
        modal.style.display = 'none';
    }
})