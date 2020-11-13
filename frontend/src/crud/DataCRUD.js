
export async function simpleFetch(url = "", method = "GET", data = {}) {
    const response = await fetch(url, {method: method, headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)})
    return response.json()
}

export async function fetchFile(url = "", method = "GET", data = {}) {
    const response = await fetch(url, {method: method, body: data})
    return response.formData()
}
