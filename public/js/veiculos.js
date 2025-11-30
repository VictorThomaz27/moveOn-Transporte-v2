const API_URL = '/api/veiculos.php';

// Carregar veículos ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarVeiculos);

function carregarVeiculos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelaVeiculos');
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhum veículo cadastrado</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            data.forEach(veiculo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${veiculo.id}</td>
                    <td>${veiculo.marca}</td>
                    <td>${veiculo.modelo}</td>
                    <td>${veiculo.cor}</td>
                    <td>${veiculo.placa}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarVeiculo(${veiculo.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletarVeiculo(${veiculo.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar veículos:', error);
            mostrarMensagem('Erro ao carregar veículos', 'error');
        });
}

function abrirModal(veiculoId = null) {
    const modal = document.getElementById('modalVeiculo');
    const titulo = document.getElementById('modalTitulo');
    const form = document.getElementById('formVeiculo');
    
    form.reset();
    
    if (veiculoId) {
        titulo.textContent = 'Editar Veículo';
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const veiculo = data.find(v => v.id === veiculoId);
                if (veiculo) {
                    document.getElementById('veiculoId').value = veiculo.id;
                    document.getElementById('marca').value = veiculo.marca;
                    document.getElementById('modelo').value = veiculo.modelo;
                    document.getElementById('cor').value = veiculo.cor;
                    document.getElementById('placa').value = veiculo.placa;
                }
            });
    } else {
        titulo.textContent = 'Novo Veículo';
        document.getElementById('veiculoId').value = '';
    }
    
    modal.style.display = 'block';
}

function fecharModal() {
    const modal = document.getElementById('modalVeiculo');
    modal.style.display = 'none';
}

function salvarVeiculo(event) {
    event.preventDefault();
    
    const veiculoId = document.getElementById('veiculoId').value;
    const veiculo = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        cor: document.getElementById('cor').value,
        placa: document.getElementById('placa').value
    };
    
    if (veiculoId) {
        veiculo.id = parseInt(veiculoId);
    }
    
    const method = veiculoId ? 'PUT' : 'POST';
    
    fetch(API_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(veiculo)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensagem('Veículo salvo com sucesso!', 'success');
            fecharModal();
            carregarVeiculos();
        }
    })
    .catch(error => {
        console.error('Erro ao salvar veículo:', error);
        mostrarMensagem('Erro ao salvar veículo', 'error');
    });
}

function editarVeiculo(id) {
    abrirModal(id);
}

function deletarVeiculo(id) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
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
                mostrarMensagem('Veículo excluído com sucesso!', 'success');
                carregarVeiculos();
            }
        })
        .catch(error => {
            console.error('Erro ao excluir veículo:', error);
            mostrarMensagem('Erro ao excluir veículo', 'error');
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
    const modal = document.getElementById('modalVeiculo');
    if (event.target === modal) {
        fecharModal();
    }
}
