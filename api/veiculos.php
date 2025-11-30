<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Caminho absoluto para o arquivo de dados
$dataDir = dirname(__DIR__) . '/data';
$dataFile = $dataDir . '/veiculos.json';

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
        // Listar todos os veículos
        $veiculos = readData();
        echo json_encode($veiculos);
        break;
    
    case 'POST':
        // Criar novo veículo
        $input = json_decode(file_get_contents('php://input'), true);
        $veiculos = readData();
        
        $novoVeiculo = [
            'id' => count($veiculos) > 0 ? max(array_column($veiculos, 'id')) + 1 : 1,
            'marca' => $input['marca'],
            'modelo' => $input['modelo'],
            'cor' => $input['cor'],
            'placa' => $input['placa']
        ];
        
        $veiculos[] = $novoVeiculo;
        saveData($veiculos);
        
        echo json_encode(['success' => true, 'data' => $novoVeiculo]);
        break;
    
    case 'PUT':
        // Atualizar veículo
        $input = json_decode(file_get_contents('php://input'), true);
        $veiculos = readData();
        
        foreach ($veiculos as $key => $veiculo) {
            if ($veiculo['id'] == $input['id']) {
                $veiculos[$key] = [
                    'id' => $input['id'],
                    'marca' => $input['marca'],
                    'modelo' => $input['modelo'],
                    'cor' => $input['cor'],
                    'placa' => $input['placa']
                ];
                break;
            }
        }
        
        saveData($veiculos);
        echo json_encode(['success' => true]);
        break;
    
    case 'DELETE':
        // Deletar veículo
        $input = json_decode(file_get_contents('php://input'), true);
        $veiculos = readData();
        
        $veiculos = array_filter($veiculos, function($veiculo) use ($input) {
            return $veiculo['id'] != $input['id'];
        });
        
        saveData(array_values($veiculos));
        echo json_encode(['success' => true]);
        break;
}
?>
