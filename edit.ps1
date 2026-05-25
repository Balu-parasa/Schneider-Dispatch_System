$file = $args[0]
$content = Get-Content $file
$content = $content -replace '^pick', 'edit'
Set-Content $file $content
