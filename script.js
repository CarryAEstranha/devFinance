// Objeto que contem os valores atuais do formulário
const data = {
    title: "",  value: 0, incoming: true, outcoming: false, category: "", date: ""
};
// Vetor que contem os valores de ids do formulário
var ids = ["title", "date"]

// Verifica se os metadados existem
if(localStorage.getItem("metadataArray") == null){
    // Cria o metadata
    metadata = [];
}
else{
    // Recebe os dados
    metadata = JSON.parse(localStorage.getItem("metadataArray"));

    // Laço que transforma os valores em reais
    for(var i = 0; i < metadata.length; i++){
        // Transforma o valor para real
        metadata[i].value = parseFloat(metadata[i].value);
    }
}

///////////////////////////////////
// CALCULO DOS VALORES DOS CARDS //
///////////////////////////////////

// Vetor que armazena os valores de dinheiro
var dinheiro = [0, 0, 0];    // [Entrada, Saída, Total]

// Verifica se existem dados no metadata
if(metadata.length != 0){
    // Laço que percorre os metadados
    for(var i = 0; i < metadata.length; i++){
        // Verifica o valor de entrada
        if(metadata[i].incoming == true){
            // Soma o valor de entrada
            dinheiro[0] = dinheiro[0] + metadata[i].value;
        }
        else{   // Valor de saída
            // Soma o valor de saída
            dinheiro[1] = dinheiro[1] + metadata[i].value;
        }
    }

    // Calcula o valor total
    dinheiro[2] = dinheiro[0] - dinheiro[1];
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// Função preload
window.onload = function()
{
    // Informa o valor de entrada ao HTML
    document.getElementById("incomingValue").innerHTML = dinheiro[0].toLocaleString("pt-br", {style: "currency", currency: "BRL"});

    // Informa o valor de saída ao HTML
    document.getElementById("outcomingValue").innerHTML = dinheiro[1].toLocaleString("pt-br", {style: "currency", currency: "BRL"});

    // Informa o valor total ao HTML
    document.getElementById("totalValue").innerHTML = dinheiro[2].toLocaleString("pt-br", {style: "currency", currency: "BRL"});

    // Verifica se o metadata existe
    if(metadata.length != 0){
        // Cria a primeira lista
        createList();
    }
}

// Função que cria a lista de despesas
function createList(props)
{
    // Laço que percorre os dados
    for(var i = 0; i < metadata.length; i++){
        // Cria um elemento tr
        var tr = document.createElement("tr");
        // Gera um id para o tr
        tr.id = "list-id-" + i;
        // Gera uma classe para o tr
        tr.className = "tableRow"
        // Adiciona o elemento tr ao tbody
        document.getElementById("tableBody").appendChild(tr);

        // Cria um elemento td
        var td = document.createElement("td");
        // Cria o texto do elemento td
        var texto = document.createTextNode(metadata[i].title);
        // Adiciona o texto no td
        td.appendChild(texto);
        // Adiciona uma classe ao td
        td.className = "firstColumm";
        // Adiciona o texto ao tr atual
        document.getElementById("list-id-"+i).appendChild(td);

        // Cria um elemento td
        var td = document.createElement("td");
        // Verifica se o valor é de entrada ou saída
        if(metadata[i].incoming == true){
            // Cria o texto do elemento td
            var texto = document.createTextNode(metadata[i].value.toLocaleString("pt-br", {style: "currency", currency: "BRL"}));
            // Adiciona as classes ao elemento td
            td.className = "secondColumm green"
        }
        else{   // Se saída
            // Cria o texto do elemento td
            var texto = document.createTextNode("-" + metadata[i].value.toLocaleString("pt-br", {style: "currency", currency: "BRL"}));
            // Adiciona as classes ao elemento td
            td.className = "secondColumm red"
        }
        // Adiciona o texto no td
        td.appendChild(texto);
        // Adiciona o texto ao tr atual
        document.getElementById("list-id-"+i).appendChild(td);

        // Cria um elemento td
        var td = document.createElement("td");
        // cria um elemento div
        var div = document.createElement("div");
        // Verifica qual é o tipo
        if(metadata[i].category == "Alimentacao"){
            // Define a classe a div
            div.className = "alimentacao";
        }
        else if(metadata[i].category == "Casa"){    // Caso seja casa
            // Define a classe a div
            div.className = "casa";
        }
        else if(metadata[i].category == "Venda"){   // Caso seja venda
            // Define a classe a div
            div.className = "venda";
        }
        // Adiciona a div ao td
        td.appendChild(div);
        // Cria o texto do elemento td
        var texto = document.createTextNode(metadata[i].category);
        // Adiciona o texto no td
        td.appendChild(texto);
        // Adiciona uma classe ao td
        td.className = "thirdColumm thirdColummFix";
        // Adiciona o texto ao tr atual
        document.getElementById("list-id-"+i).appendChild(td);

        // Cria um elemento td
        var td = document.createElement("td");
        // Variável que armazena a string da data
        var data = metadata[i].date;
        // Formata a data
        var dataFormat = data.substring(8, 10) + "/" + data.substring(5, 7) + "/" + data.substring(0, 4);
        // Cria o texto do elemento td
        var texto = document.createTextNode(dataFormat);
        // Laço que modifica o formmato da data
        // Adiciona o texto no td
        td.appendChild(texto);
        // Adiciona uma classe ao td
        td.className = "fourthColumm";
        // Adiciona o texto ao tr atual
        document.getElementById("list-id-"+i).appendChild(td);

        // Cria um elemento botão
        var button = document.createElement("button");
        // Cria um texto para o button
        var texto = document.createTextNode("x");
        // Adiciona o texto ao botão
        button.appendChild(texto);
        // Cria um id para o botão
        button.id = "button-id-" + i;
        // Gera um parametro para o botão
        button.setAttribute("onClick", "getID(this)");
        // Adiciona o botão ao tr atual
        document.getElementById("list-id-"+i).appendChild(button);
    }
}


// Função que fecha e abre o modal
function toggleModal(props)
{
    // Verifica se é para abrir o modal
    if(props == true){
        // Recebe o modal por ID
        var modal = document.getElementById("modal");
        // Adiciona a classe modal ao elemento div
        modal.classList.remove("remove");
    }
    else{   // Verifica se é para fechar
        // Recebe o modal por ID
        var modal = document.getElementById("modal");
        // Remove a classe modal ao elemento div
        modal.classList.add("remove");
    }
}

// Função que muda a cor dos radios no modal
function toggleRadio(props)
{
    // Verifica se é o primeiro radio
    if(props == 0){
        // Recebe o primeiro rádio por ID
        var radioOne = document.getElementById("radioIncome");
        // Recebe o segundo rádio por ID
        var radioTwo = document.getElementById("radioOutcome");
        // Adiciona o fundo do primeiro radio
        radioOne.classList.add("incomeActive");
        // Remove o fundo do segundo radio
        radioTwo.classList.remove("outcomeActive");

        // Muda o income para true
        data.incoming = true
        // Muda o outcome para false
        data.outcoming = false
    }
    else{   // Se for o segundo radio
        // Recebe o primeiro rádio por ID
        var radioOne = document.getElementById("radioIncome");
        // Recebe o segundo rádio por ID
        var radioTwo = document.getElementById("radioOutcome");
        // Remove o fundo do primeiro radio
        radioOne.classList.remove("incomeActive");
        // Adiciona o fundo do segundo radio
        radioTwo.classList.add("outcomeActive");

        // Muda o income para false
        data.incoming = false
        // Muda o outcome para verdadeiro
        data.outcoming = true
    }
}

// Função que valida os dados de cadastro
function register(props)
{
    // Define uma variável contadora para saber se todos os campos foram preenchidos
    var contador = 0;

    // Laço que conta quantos campos estão preenchidos
    for(var i = 0; i < ids.length; i++){
        // Verifica se o campo está preenchido
        if(document.getElementById(ids[i]).value != ""){
            // Aumenta o contador
            contador = contador + 1;
        }
    }
    // Verifica o caso do preço
    if(document.getElementById("price").value != ""){
        // Verifica se o valor digitado não é menor que zero
        if(parseFloat(document.getElementById("price").value) >= 0){
            // Aumenta o contador
            contador = contador + 1;
        }
    }

    // Verifica se o contador está correto
    if(contador == 3){
        // Atualiza o valor do título no objeto
        data.title = document.getElementById("title").value
        // Atualiza o valor do preço no objeto
        data.value = document.getElementById("price").value
        // Atualiza o valor da categoria no objeto
        data.category = document.getElementById("category").value
        // Atualiza o valor da data no objeto
        data.date = document.getElementById("date").value

        // Adiciona os dados ao vetor de metadata
        metadata.push(data);

        // Salva os dados no local storage
        localStorage.setItem("metadataArray", JSON.stringify(metadata));
    }
}

var teste = [1, 2, 3, 4]

function getID(props){
    // Declara o id
    var id = parseFloat(props.id.substring(10, props.id.length));

    // Remove a lista do vetor
    metadata.splice(id, 1);

    // Salva os dados no local storage
    localStorage.setItem("metadataArray", JSON.stringify(metadata));

    // Recarrega a página
    location.reload();
}