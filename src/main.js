async function start(){
    const response = await fetch("https://health-ins-risk-math.azurewebsites.net/")
    const data = await response.json()
}

start()