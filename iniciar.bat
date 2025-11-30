@echo off
echo ========================================
echo     MoveOn Transportes - Iniciando
echo ========================================
echo.
echo Verificando PHP...
php --version
if errorlevel 1 (
    echo.
    echo ERRO: PHP nao encontrado!
    echo Instale o PHP ou use XAMPP/WAMP
    pause
    exit
)

echo.
echo Iniciando servidor PHP na porta 8000...
echo.
echo Acesse no navegador:
echo http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

php -S localhost:8000
