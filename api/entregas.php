<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Caminho absoluto para o arquivo de dados
$dataDir = dirname(__DIR__) . '/data';
$dataFile = $dataDir . '/entregas.json';

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
        // Listar todas as entregas
        $entregas = readData();
        echo json_encode($entregas);
        break;
    
    case 'POST':
        // Criar nova entrega
        $input = json_decode(file_get_contents('php://input'), true);
        $entregas = readData();
        
        $novaEntrega = [
            'id' => count($entregas) > 0 ? max(array_column($entregas, 'id')) + 1 : 1,
            'clienteId' => $input['clienteId'],
            'motoristaId' => $input['motoristaId'],
            'enderecoOrigem' => [
                'rua' => $input['ruaOrigem'],
                'numero' => $input['numeroOrigem'],
                'cidade' => $input['cidadeOrigem'],
                'estado' => $input['estadoOrigem'],
                'cep' => $input['cepOrigem']
            ],
            'enderecoDestino' => [
                'rua' => $input['ruaDestino'],
                'numero' => $input['numeroDestino'],
                'cidade' => $input['cidadeDestino'],
                'estado' => $input['estadoDestino'],
                'cep' => $input['cepDestino']
            ],
            'preco' => $input['preco']
        ];
        
        $entregas[] = $novaEntrega;
        saveData($entregas);
        
        echo json_encode(['success' => true, 'data' => $novaEntrega]);
        break;
    
    case 'PUT':
        // Atualizar entrega
        $input = json_decode(file_get_contents('php://input'), true);
        $entregas = readData();
        
        foreach ($entregas as $key => $entrega) {
            if ($entrega['id'] == $input['id']) {
                $entregas[$key] = [
                    'id' => $input['id'],
                    'clienteId' => $input['clienteId'],
                    'motoristaId' => $input['motoristaId'],
                    'enderecoOrigem' => [
                        'rua' => $input['ruaOrigem'],
                        'numero' => $input['numeroOrigem'],
                        'cidade' => $input['cidadeOrigem'],
                        'estado' => $input['estadoOrigem'],
                        'cep' => $input['cepOrigem']
                    ],
                    'enderecoDestino' => [
                        'rua' => $input['ruaDestino'],
                        'numero' => $input['numeroDestino'],
                        'cidade' => $input['cidadeDestino'],
                        'estado' => $input['estadoDestino'],
                        'cep' => $input['cepDestino']
                    ],
                    'preco' => $input['preco']
                ];
                break;
            }
        }
        
        saveData($entregas);
        echo json_encode(['success' => true]);
        break;
    
    case 'DELETE':
        // Deletar entrega
        $input = json_decode(file_get_contents('php://input'), true);
        $entregas = readData();
        
        $entregas = array_filter($entregas, function($entrega) use ($input) {
            return $entrega['id'] != $input['id'];
        });
        
        saveData(array_values($entregas));
        echo json_encode(['success' => true]);
        break;
}
?>
