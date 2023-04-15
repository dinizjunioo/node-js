

let autor = document.getElementById("name");
let email = document.getElementById("email");
let msg = document.getElementById("msg");
let btn_send = document.getElementById("btn");

let dados = [];

btn_send.onclick = function NovosDados()
{
  console.log("clique");
  console.log(autor.textContent);

  dados = {
    "Autor": `${autor.textContent}`,
    "email": `${email.textContent}`,
    "msg": `${msg.textContent}`,
    "msgSensivel": false
  }
  enviarDadosParaJSON(dados);
}

function enviarDadosParaJSON(dados) {
    console.log("entrei aq");
    fetch('http://localhost:3000', {
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


const datas = [];

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
            //commentar.id = "".concat(comment.toString());
            commentar.innerHTML = `             
              <h3>${comment.Autor}</h3>
              <h4>${comment.email}</h4>   
              <div>
                <p>${comment.msg}</p>
              </div>
              `;
            listComments.appendChild(commentar);
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




async function carregarComments() {

  try {
    await receberDadosDoJSON();
    console.log('Dados obtidos:', datas);
    // Continue a execução do código aqui, usando os dados obtidos no array datas
  } catch (error) {
    console.error('Erro ao obter dados:', error);
  }

  
}
carregarComments();


/*
// Comentários de exemplo
var comments = [
    "Esse é um comentário normal.",
    "Esse comentário contém uma palavra sensível.",
    "Esse é outro comentário normal.",
    "Esse comentário também contém uma palavra sensível."
  ];

  // Função para verificar se uma palavra é sensível
  function isSensitive(word) {
    var sensitiveWords = ["sensível", "palavra", "outra palavra"]; // Lista de palavras sensíveis
    return sensitiveWords.includes(word.toLowerCase());
  }

  // Função para exibir os comentários no HTML
  function showComments() {

    var commentsContainer = document.getElementById("comments-container");

    commentsContainer.innerHTML = ""; // Limpa o conteúdo existente

    comments.forEach(function(comment)
     {
      var commentElement = document.createElement("div");
      commentElement.className = "comment";
      if (isSensitive(comment)) {
        var sensitiveMsgElement = document.createElement("span");
        sensitiveMsgElement.className = "sensitive";
        sensitiveMsgElement.textContent = "Frase de baixo calão";
        commentElement.appendChild(sensitiveMsgElement);
        var showButton = document.createElement("button");
        showButton.textContent = "Mostrar Mesmo Assim";
        showButton.onclick = function() {
          sensitiveMsgElement.style.display = "none";
          showButton.style.display = "none";
          commentElement.textContent = comment;
        };
        commentElement.appendChild(showButton);
      } else {
        commentElement.textContent = comment;
      }
      commentsContainer.appendChild(commentElement);
    });
  }


  // Função para adicionar um novo comentário
  function adicionarComentario() {
    var novoComentario = prompt("Digite um novo comentário:");
    if (novoComentario !== null && novoComentario.trim() !== "") {
      comments.push(novoComentario);
      showComments();
    }
  }

  // Chama a função para exibir os comentários
  showComments();
  */