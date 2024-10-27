document.getElementById('comentarioForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio normal do formulário

    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    fetch('/comentar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nome=${encodeURIComponent(nome)}&comentario=${encodeURIComponent(comentario)}`
    })
    .then(response => response.json())
    .then(data => {
        // Atualiza a lista de comentários
        const comentariosList = document.getElementById('comentariosList');
        comentariosList.innerHTML = ''; // Limpa a lista

        data.forEach(com => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${com.nome}</strong>: ${com.comentario}`;
            comentariosList.appendChild(li);
        });

        // Limpa o formulário
        document.getElementById('comentarioForm').reset();
    })
    .catch(error => console.error('Erro:', error));
});