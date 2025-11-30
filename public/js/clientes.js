const API_URL = '/api/clientes.php';

// Carregar clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarClientes);

function carregarClientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelaClientes');
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum cliente cadastrado</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            data.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletarCliente(${cliente.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar clientes:', error);
            mostrarMensagem('Erro ao carregar clientes', 'error');
        });
}

function abrirModal(clienteId = null) {
    const modal = document.getElementById('modalCliente');
    const titulo = document.getElementById('modalTitulo');
    const form = document.getElementById('formCliente');
    
    form.reset();
    
    if (clienteId) {
        titulo.textContent = 'Editar Cliente';
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const cliente = data.find(c => c.id === clienteId);
                if (cliente) {
                    document.getElementById('clienteId').value = cliente.id;
                    document.getElementById('nome').value = cliente.nome;
                    document.getElementById('email').value = cliente.email;
                    document.getElementById('telefone').value = cliente.telefone;
                }
            });
    } else {
        titulo.textContent = 'Novo Cliente';
        document.getElementById('clienteId').value = '';
    }
    
    modal.style.display = 'block';
}

function fecharModal() {
    const modal = document.getElementById('modalCliente');
    modal.style.display = 'none';
}

function salvarCliente(event) {
    event.preventDefault();
    
    const clienteId = document.getElementById('clienteId').value;
    const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    };
    
    if (clienteId) {
        cliente.id = parseInt(clienteId);
    }
    
    const method = clienteId ? 'PUT' : 'POST';
    
    fetch(API_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensagem('Cliente salvo com sucesso!', 'success');
            fecharModal();
            carregarClientes();
        }
    })
    .catch(error => {
        console.error('Erro ao salvar cliente:', error);
        mostrarMensagem('Erro ao salvar cliente', 'error');
    });
}

function editarCliente(id) {
    abrirModal(id);
}

function deletarCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarMensagem('Cliente excluído com sucesso!', 'success');
                carregarClientes();
            }
        })
        .catch(error => {
            console.error('Erro ao excluir cliente:', error);
            mostrarMensagem('Erro ao excluir cliente', 'error');
        });
    }
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    mensagem.className = tipo === 'success' ? 'alert alert-success' : 'alert alert-error';
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalCliente');
    if (event.target === modal) {
        fecharModal();
    }
}
