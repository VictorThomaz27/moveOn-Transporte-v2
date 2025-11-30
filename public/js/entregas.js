const API_URL = '/api/entregas.php';
const CLIENTES_API_URL = '/api/clientes.php';
const MOTORISTAS_API_URL = '/api/motoristas.php';

let clientes = [];
let motoristas = [];

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarClientes();
    carregarMotoristas();
    carregarEntregas();
});

function carregarClientes() {
    fetch(CLIENTES_API_URL)
        .then(response => response.json())
        .then(data => {
            clientes = data;
        })
        .catch(error => {
            console.error('Erro ao carregar clientes:', error);
        });
}

function carregarMotoristas() {
    fetch(MOTORISTAS_API_URL)
        .then(response => response.json())
        .then(data => {
            motoristas = data;
        })
        .catch(error => {
            console.error('Erro ao carregar motoristas:', error);
        });
}

function carregarEntregas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelaEntregas');
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Nenhuma entrega cadastrada</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            data.forEach(entrega => {
                const cliente = clientes.find(c => c.id === entrega.clienteId);
                const motorista = motoristas.find(m => m.id === entrega.motoristaId);
                
                const clienteNome = cliente ? cliente.nome : 'N/A';
                const motoristaNome = motorista ? motorista.nome : 'N/A';
                
                const origem = `${entrega.enderecoOrigem.cidade} - ${entrega.enderecoOrigem.estado}`;
                const destino = `${entrega.enderecoDestino.cidade} - ${entrega.enderecoDestino.estado}`;
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${entrega.id}</td>
                    <td>${clienteNome}</td>
                    <td>${motoristaNome}</td>
                    <td>${origem}</td>
                    <td>${destino}</td>
                    <td>R$ ${parseFloat(entrega.preco).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarEntrega(${entrega.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletarEntrega(${entrega.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar entregas:', error);
            mostrarMensagem('Erro ao carregar entregas', 'error');
        });
}

function abrirModal(entregaId = null) {
    const modal = document.getElementById('modalEntrega');
    const titulo = document.getElementById('modalTitulo');
    const form = document.getElementById('formEntrega');
    const selectCliente = document.getElementById('clienteId');
    const selectMotorista = document.getElementById('motoristaId');
    
    form.reset();
    
    // Preencher select de clientes
    selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        selectCliente.appendChild(option);
    });
    
    // Preencher select de motoristas
    selectMotorista.innerHTML = '<option value="">Selecione um motorista</option>';
    motoristas.forEach(motorista => {
        const option = document.createElement('option');
        option.value = motorista.id;
        option.textContent = motorista.nome;
        selectMotorista.appendChild(option);
    });
    
    if (entregaId) {
        titulo.textContent = 'Editar Entrega';
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const entrega = data.find(e => e.id === entregaId);
                if (entrega) {
                    document.getElementById('entregaId').value = entrega.id;
                    document.getElementById('clienteId').value = entrega.clienteId;
                    document.getElementById('motoristaId').value = entrega.motoristaId;
                    
                    document.getElementById('ruaOrigem').value = entrega.enderecoOrigem.rua;
                    document.getElementById('numeroOrigem').value = entrega.enderecoOrigem.numero;
                    document.getElementById('cidadeOrigem').value = entrega.enderecoOrigem.cidade;
                    document.getElementById('estadoOrigem').value = entrega.enderecoOrigem.estado;
                    document.getElementById('cepOrigem').value = entrega.enderecoOrigem.cep;
                    
                    document.getElementById('ruaDestino').value = entrega.enderecoDestino.rua;
                    document.getElementById('numeroDestino').value = entrega.enderecoDestino.numero;
                    document.getElementById('cidadeDestino').value = entrega.enderecoDestino.cidade;
                    document.getElementById('estadoDestino').value = entrega.enderecoDestino.estado;
                    document.getElementById('cepDestino').value = entrega.enderecoDestino.cep;
                    
                    document.getElementById('preco').value = entrega.preco;
                }
            });
    } else {
        titulo.textContent = 'Nova Entrega';
        document.getElementById('entregaId').value = '';
    }
    
    modal.style.display = 'block';
}

function fecharModal() {
    const modal = document.getElementById('modalEntrega');
    modal.style.display = 'none';
}

function salvarEntrega(event) {
    event.preventDefault();
    
    const entregaId = document.getElementById('entregaId').value;
    const entrega = {
        clienteId: parseInt(document.getElementById('clienteId').value),
        motoristaId: parseInt(document.getElementById('motoristaId').value),
        ruaOrigem: document.getElementById('ruaOrigem').value,
        numeroOrigem: document.getElementById('numeroOrigem').value,
        cidadeOrigem: document.getElementById('cidadeOrigem').value,
        estadoOrigem: document.getElementById('estadoOrigem').value,
        cepOrigem: document.getElementById('cepOrigem').value,
        ruaDestino: document.getElementById('ruaDestino').value,
        numeroDestino: document.getElementById('numeroDestino').value,
        cidadeDestino: document.getElementById('cidadeDestino').value,
        estadoDestino: document.getElementById('estadoDestino').value,
        cepDestino: document.getElementById('cepDestino').value,
        preco: document.getElementById('preco').value
    };
    
    if (entregaId) {
        entrega.id = parseInt(entregaId);
    }
    
    const method = entregaId ? 'PUT' : 'POST';
    
    fetch(API_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entrega)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensagem('Entrega salva com sucesso!', 'success');
            fecharModal();
            carregarEntregas();
        }
    })
    .catch(error => {
        console.error('Erro ao salvar entrega:', error);
        mostrarMensagem('Erro ao salvar entrega', 'error');
    });
}

function editarEntrega(id) {
    abrirModal(id);
}

function deletarEntrega(id) {
    if (confirm('Tem certeza que deseja excluir esta entrega?')) {
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
                mostrarMensagem('Entrega excluída com sucesso!', 'success');
                carregarEntregas();
            }
        })
        .catch(error => {
            console.error('Erro ao excluir entrega:', error);
            mostrarMensagem('Erro ao excluir entrega', 'error');
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
    const modal = document.getElementById('modalEntrega');
    if (event.target === modal) {
        fecharModal();
    }
}
