window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#escolha').addEventListener('click', () => {
        document.querySelector('#fileInput').click()
    })
    document.querySelector('#btn').addEventListener('click', enviaImg)
})

async function enviaImg () {
    const nome = document.querySelector('#nome').value.trim();
    const imgInput = document.querySelector('#fileInput');
    const imgFile = imgInput.files[0];
    const responseMessage = document.querySelector('#responseMessage');

    if (!imgFile) {
        responseMessage.textContent = 'Por Favor Insira uma Imagem'
        return
    }

    let obj = {
        imagem : imgFile,
        nome : nome
    }
    obj = JSON.stringify(obj);

    try {
        const response = await fetch(`http://localhost:8080/upload`, {
            method : 'POST',
            body : obj           
        })
        
        if (response.ok) {
            const data = await response.json()
            responseMessage.textContent = `Imagem Enviada Com Sucesso, ID ${data.id}`
        } else {
            throw new Error('Erro ao Enviar Imagem')
        }
    } catch (error) {
        responseMessage.textContent = `Erro: ${error}`
    }
}