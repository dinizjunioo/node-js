

let autor = document.querySelector("#name");
let email = document.getElementById("email");
let msg = document.getElementById("msg");
let btn_send = document.getElementById("btn");

var dados = [];

btn_send.onclick = function()
{
  console.log("clique" + autor.value);
  dados = {
    "Autor": `${autor.value}`,
    "email": `${email.value}`,
    "msg": `${msg.value}`,
    "msgSensivel": false
  }
  enviarDadosParaJSON(dados);
}

function enviarDadosParaJSON(dados) {
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(function (response) {
        if (response.ok) {
            dados = [];
            alert("Dados enviados com sucesso!");
            receberDadosDoJSON();
        }
        else {
            alert("Ocorreu um erro ao enviar os dados.");
        }
    })
        .catch(function (error) {
        console.error("Erro ao enviar os dados:", error);
    });
}


//const datas = [];

function receberDadosDoJSON() {
  console.log("entrei aqui");
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        var listComments = document.getElementById("comentarios");

        if (listComments) {
          data.forEach(function (comment)
          {   
            var commentar = document.createElement("div");
            commentar.classList.add("item");
            commentar.className = "item";
            if (isSensitive(comment.msg)) {
              comment.msgSensivel = true;

              commentar.innerHTML = `  
             <hr hight="1" size="100">           
              <h3>Autor: ${comment.Autor}</h3>
              <h4>Email: ${comment.email}</h4>   
              </hr>
              `;
              listComments.appendChild(commentar);
              var sensitiveMsgElement = document.createElement("span");
              sensitiveMsgElement.className = "sensitive";
              sensitiveMsgElement.textContent = "Frase de baixo calão";
              
              var showButton = document.createElement("button");
              showButton.textContent = "Mostrar Mesmo Assim";
              
              showButton.onclick = function() {
                sensitiveMsgElement.style.display = "none";
                showButton.style.display = "none";
                commentar.innerHTML = `  
             <hr hight="1" size="100">           
              <h3>Autor: ${comment.Autor}</h3>
              <h4>Email: ${comment.email}</h4>   
              <div>
                <p>Comentário: ${comment.msg}</p>
              </div>
              </hr>
              `;
              };
              listComments.appendChild(sensitiveMsgElement);
              listComments.appendChild(showButton);
            } else {
            

            commentar.innerHTML = `  
             <hr hight="1" size="100">           
              <h3>Autor: ${comment.Autor}</h3>
              <h4>Email: ${comment.email}</h4>   
              <div>
                <p>Comentário: ${comment.msg}</p>
              </div>
              </hr>
              `;
              listComments.appendChild(commentar);
            }
            
          });
        }
        resolve(); // Resolve a Promise após preencher o array
      })
      .catch(error => {
        if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
          console.error('A resposta não está em formato JSON válido.');
        } else {
          console.error('Erro na requisição:', error);
        }
        reject(error); // Rejeita a Promise em caso de erro
      });
  });
}

receberDadosDoJSON();




  // Função para verificar se uma palavra é sensível
  function isSensitive(word) {
    var sensitiveWords = ["bicha", "buceta", "bosta",
    "efecar",
    "caralho",
    "cagar",
    "pênis",
    "cacete",
    "pica",
    "cu",
    "anus",
    "foda-se",
    "fodase",
    "copular", 
    "meter",
    "pingolar", 
    "trepar",
    "pênis",
    "esperma",
    "energúmeno",
    "piroca",
    "pau",
    "lixo",
    "pênis",
    "puta que o pariu",
    "pqp",
    "prostituta",
    "merda",	
    "porcaria",
    "pessoa imprestável",
    "Viado"]; // Lista de palavras sensíveis

    var frase = word.split(' ');
    console.log(word);
    console.log(frase);

    for(var  i=0; i < frase.length; i++)
    {
      console.log(frase[i]);
      if (sensitiveWords.includes(frase[i].toLowerCase()) == true) return true;
    }
    return false;
  }

  