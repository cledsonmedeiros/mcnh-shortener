var productContainer = document.querySelector('div.product');

var btnEncurtador = document.createElement('button');
btnEncurtador.type = 'button';
btnEncurtador.innerHTML = 'Encurtar';
btnEncurtador.id = 'btnEncurtador';
btnEncurtador.addEventListener("click", function () {
  encurtarLink();
})

productContainer.insertBefore(btnEncurtador, productContainer.firstChild);

var nomeProduto = String(document.querySelector('h3.hide-mobile').firstChild.nodeValue).trim()

function encurtarLink() {
  try {

    var urlModificada = `https://www.magazinevoce.com.br/magazinecuponsnahora/p/${window.location.pathname.slice(0, -1).split('/').pop()}`

    fetch(`https://is.gd/create.php?format=json&url=${urlModificada}`)
      .then((response) => {
        response.json()
          .then((result) => {
            copyTextToClipboard(`${nomeProduto}: ${result.shorturl}`)
            alert(`Texto copiado: ${nomeProduto}: ${result.shorturl}`)
          })
      })
      .catch((err) => {
        console.error('Falha:', err);
      });
  } catch (error) {
    console.error(error)
  }
}

function copyTextToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text);

  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var cliptextarea = document.createElement("textarea");
    cliptextarea.textContent = text;
    cliptextarea.style.position = "fixed";
    document.body.appendChild(cliptextarea);
    cliptextarea.focus();
    cliptextarea.select();
    try {
      return document.execCommand("copy");
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(cliptextarea);
    }
  }
}
