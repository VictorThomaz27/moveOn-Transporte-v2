<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Caminho absoluto para o arquivo de dados
$dataDir = dirname(__DIR__) . '/data';
$dataFile = $dataDir . '/clientes.json';

// Criar diretório se não existir
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

// Função para ler dados
function readData() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        file_put_contents($dataFile, '[]');
    }
    $json = file_get_contents($dataFile);
    return json_decode($json, true);
}

// Função para salvar dados
function saveData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Listar todos os clientes
        $clientes = readData();
        echo json_encode($clientes);
        break;
    
    case 'POST':
        // Criar novo cliente
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        
        $novoCliente = [
            'id' => count($clientes) > 0 ? max(array_column($clientes, 'id')) + 1 : 1,
            'nome' => $input['nome'],
            'email' => $input['email'],
            'telefone' => $input['telefone']
        ];
        
        $clientes[] = $novoCliente;
        saveData($clientes);
        
        echo json_encode(['success' => true, 'data' => $novoCliente]);
        break;
    
    case 'PUT':
        // Atualizar cliente
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        
        foreach ($clientes as $key => $cliente) {
            if ($cliente['id'] == $input['id']) {
                $clientes[$key] = [
                    'id' => $input['id'],
                    'nome' => $input['nome'],
                    'email' => $input['email'],
                    'telefone' => $input['telefone']
                ];
                break;
            }
        }
        
        saveData($clientes);
        echo json_encode(['success' => true]);
        break;
    
    case 'DELETE':
        // Deletar cliente
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        
        $clientes = array_filter($clientes, function($cliente) use ($input) {
            return $cliente['id'] != $input['id'];
        });
        
        saveData(array_values($clientes));
        echo json_encode(['success' => true]);
        break;
}
?>
