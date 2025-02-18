const API_URL = "https://back-festa.vercel.app/api";
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#escolha').addEventListener('click', () => {
        document.querySelector('#fileInput').click()
    })
    document.querySelector('#btn').addEventListener('click', enviaImg)
    allImgs()
})

async function allImgs () {
    try {
        await fetch(`${API_URL}/getAllImgs`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao Enviar Imagem')
            }
            return res.json()
        })
        .then(res => {
            let resposta = res.resp;
            if(resposta.sucesso == false) {
                throw new Error('Erro ao Carregar Imgs')
            }
            resposta = resposta.resp;
            exibeImgs(resposta)
        })
        .catch(erro => {
            console.log(erro);
        })
    } catch (error) {
        responseMessage.textContent = `Erro: ${error}`       
    }
}

function exibeImgs(objs, mimeType = 'image/png') {
    const container = document.querySelector('#container');

    objs.forEach(obj => {
        // Converter os dados para Uint8Array antes de criar o Blob
        let byteArray = new Uint8Array(obj.img.data);  
        let blob = new Blob([byteArray], { type: mimeType });

        let url = URL.createObjectURL(blob);

        let html = `
            <div class="card">
                <img src="${url}" alt="Imagem de ${obj.autor}">
                <p>Por: ${obj.autor}</p>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", html);
    });
}


async function enviaImg () {
    const nome = document.querySelector('#nome').value.trim();
    const imgInput = document.querySelector('#fileInput');
    const imgFile = imgInput.files[0];
    const responseMessage = document.querySelector('#responseMessage');

    if (!imgFile) {
        responseMessage.textContent = 'Por Favor Insira uma Imagem'
        return
    }

    const formData = new FormData();
    formData.append('image', imgFile); // Adiciona o arquivo de imagem
    formData.append('nome', nome); // Adiciona o nome da pessoa


    try {
       await fetch(`${API_URL}/upload`, {
            method : 'POST',
            body : formData           
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Erro ao Enviar Imagem')
                }
                return res.json()
            })
            .then(res => {
                console.log(res);
            })
            .catch(erro => {
                console.log(erro);
            })
             
    } catch (error) {
        responseMessage.textContent = `Erro: ${error}`
    }
}