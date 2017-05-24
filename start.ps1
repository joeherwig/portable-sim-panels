Invoke-Command -computer localhost -ScriptBlock {npm start}  -AsJob

$webserver = {
	cd simconnect	
	invoke-expression -Command ./Webserver.ps1
}
Invoke-Command -computer localhost -ScriptBlock $webserver -AsJob