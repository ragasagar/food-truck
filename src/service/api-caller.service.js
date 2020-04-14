class ApiCaller {
    fetchTrucks() {
        return fetch("https://data.sfgov.org/resource/rqzj-sfat.json").then(response => response.json())
    }
}

export default ApiCaller;