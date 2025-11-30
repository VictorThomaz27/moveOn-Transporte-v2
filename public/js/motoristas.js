const API_URL = '/api/motoristas.php';
const VEICULOS_API_URL = '/api/veiculos.php';

let veiculos = [];

// Carregar motoristas e veículos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarVeiculos();
    carregarMotoristas();
});

function carregarVeiculos() {
    fetch(VEICULOS_API_URL)
        .then(response => response.json())
        .then(data => {
            veiculos = data;
        })
        .catch(error => {
            console.error('Erro ao carregar veículos:', error);
        });
}

function carregarMotoristas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelaMotoristas');
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhum motorista cadastrado</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            data.forEach(motorista => {
                const veiculo = veiculos.find(v => v.id === motorista.veiculoId);
                const veiculoNome = veiculo ? `${veiculo.marca} ${veiculo.modelo} - ${veiculo.placa}` : 'N/A';
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${motorista.id}</td>
                    <td>${motorista.nome}</td>
                    <td>${motorista.cnh}</td>
                    <td>${motorista.telefone}</td>
                    <td>${veiculoNome}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarMotorista(${motorista.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletarMotorista(${motorista.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar motoristas:', error);
            mostrarMensagem('Erro ao carregar motoristas', 'error');
        });
}

function abrirModal(motoristaId = null) {
    const modal = document.getElementById('modalMotorista');
    const titulo = document.getElementById('modalTitulo');
    const form = document.getElementById('formMotorista');
    const selectVeiculo = document.getElementById('veiculoId');
    
    form.reset();
    
    // Preencher select de veículos
    selectVeiculo.innerHTML = '<option value="">Selecione um veículo</option>';
    veiculos.forEach(veiculo => {
        const option = document.createElement('option');
        option.value = veiculo.id;
        option.textContent = `${veiculo.marca} ${veiculo.modelo} - ${veiculo.placa}`;
        selectVeiculo.appendChild(option);
    });
    
    if (motoristaId) {
        titulo.textContent = 'Editar Motorista';
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const motorista = data.find(m => m.id === motoristaId);
                if (motorista) {
                    document.getElementById('motoristaId').value = motorista.id;
                    document.getElementById('nome').value = motorista.nome;
                    document.getElementById('cnh').value = motorista.cnh;
                    document.getElementById('telefone').value = motorista.telefone;
                    document.getElementById('veiculoId').value = motorista.veiculoId;
                }
            });
    } else {
        titulo.textContent = 'Novo Motorista';
        document.getElementById('motoristaId').value = '';
    }
    
    modal.style.display = 'block';
}

function fecharModal() {
    const modal = document.getElementById('modalMotorista');
    modal.style.display = 'none';
}

function salvarMotorista(event) {
    event.preventDefault();
    
    const motoristaId = document.getElementById('motoristaId').value;
    const motorista = {
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        telefone: document.getElementById('telefone').value,
        veiculoId: parseInt(document.getElementById('veiculoId').value)
    };
    
    if (motoristaId) {
        motorista.id = parseInt(motoristaId);
    }
    
    const method = motoristaId ? 'PUT' : 'POST';
    
    fetch(API_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(motorista)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensagem('Motorista salvo com sucesso!', 'success');
            fecharModal();
            carregarMotoristas();
        }
    })
    .catch(error => {
        console.error('Erro ao salvar motorista:', error);
        mostrarMensagem('Erro ao salvar motorista', 'error');
    });
}

function editarMotorista(id) {
    abrirModal(id);
}

function deletarMotorista(id) {
    if (confirm('Tem certeza que deseja excluir este motorista?')) {
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
                mostrarMensagem('Motorista excluído com sucesso!', 'success');
                carregarMotoristas();
            }
        })
        .catch(error => {
            console.error('Erro ao excluir motorista:', error);
            mostrarMensagem('Erro ao excluir motorista', 'error');
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
    const modal = document.getElementById('modalMotorista');
    if (event.target === modal) {
        fecharModal();
    }
}
