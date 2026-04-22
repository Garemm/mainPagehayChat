Set-Location -Path 'C:\Users\Desarollador\Documents\Jonathan Garcia\mock\mainPage\mainPage'
Write-Output 'PWD:'
Get-Location
if (-not (Test-Path -Path .\node_modules -PathType Container)) {
    Write-Output 'NODE_MODULES_MISSING'
    npm install --no-audit --no-fund
} else {
    Write-Output 'NODE_MODULES_EXISTS'
}
$env:PORT = '5173'
Write-Output "Starting dev server with PORT=$env:PORT"
npm run dev
