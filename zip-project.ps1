# Get the directory where this script is located
$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path

if (!$ProjectDir) {
    $ProjectDir = Get-Location
}

# Define the output zip file path
$ZipPath = Join-Path $ProjectDir "mediak9-studio.zip"

Write-Host "Creating Linux-compatible zip archive of $ProjectDir..." -ForegroundColor Cyan

# Remove old zip if it exists
if (Test-Path $ZipPath) {
    Remove-Item $ZipPath -Force
}

# Change directory to project root
Push-Location $ProjectDir

try {
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem

    $Zip = [System.IO.Compression.ZipFile]::Open($ZipPath, [System.IO.Compression.ZipArchiveMode]::Create)

    # Get all files recursively (including hidden ones)
    $Files = Get-ChildItem -Path . -Recurse -File -Force

    foreach ($File in $Files) {
        $FullName = $File.FullName
        
        # Calculate relative path
        $RelativePath = $FullName.Substring($ProjectDir.Length + 1)

        # Skip IDE metadata, the zip script itself, and the output zip
        if ($RelativePath -match "^.claude" -or $RelativePath -match "zip-project\.ps1" -or $RelativePath -match "mediak9-studio\.zip") {
            continue
        }

        # Force forward slashes for folder structure compatibility on Linux/Hostinger servers
        $ZipPathInArchive = $RelativePath -replace "\\", "/"
        
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($Zip, $FullName, $ZipPathInArchive)
    }

    $Zip.Dispose()
    
    Write-Host "Success! Created zip file at: $ZipPath" -ForegroundColor Green
    Write-Host "You can now upload this zip file to your Hostinger file manager and extract it in public_html." -ForegroundColor Green
}
catch {
    Write-Error "Failed to create zip file: $_"
}
finally {
    Pop-Location
}
