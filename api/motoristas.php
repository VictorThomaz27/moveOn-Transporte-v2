<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Caminho absoluto para o arquivo de dados
$dataDir = dirname(__DIR__) . '/data';
$dataFile = $dataDir . '/motoristas.json';

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
        // Listar todos os motoristas
        $motoristas = readData();
        echo json_encode($motoristas);
        break;
    
    case 'POST':
        // Criar novo motorista
        $input = json_decode(file_get_contents('php://input'), true);
        $motoristas = readData();
        
        $novoMotorista = [
            'id' => count($motoristas) > 0 ? max(array_column($motoristas, 'id')) + 1 : 1,
            'nome' => $input['nome'],
            'cnh' => $input['cnh'],
            'telefone' => $input['telefone'],
            'veiculoId' => $input['veiculoId']
        ];
        
        $motoristas[] = $novoMotorista;
        saveData($motoristas);
        
        echo json_encode(['success' => true, 'data' => $novoMotorista]);
        break;
    
    case 'PUT':
        // Atualizar motorista
        $input = json_decode(file_get_contents('php://input'), true);
        $motoristas = readData();
        
        foreach ($motoristas as $key => $motorista) {
            if ($motorista['id'] == $input['id']) {
                $motoristas[$key] = [
                    'id' => $input['id'],
                    'nome' => $input['nome'],
                    'cnh' => $input['cnh'],
                    'telefone' => $input['telefone'],
                    'veiculoId' => $input['veiculoId']
                ];
                break;
            }
        }
        
        saveData($motoristas);
        echo json_encode(['success' => true]);
        break;
    
    case 'DELETE':
        // Deletar motorista
        $input = json_decode(file_get_contents('php://input'), true);
        $motoristas = readData();
        
        $motoristas = array_filter($motoristas, function($motorista) use ($input) {
            return $motorista['id'] != $input['id'];
        });
        
        saveData(array_values($motoristas));
        echo json_encode(['success' => true]);
        break;
}
?>
