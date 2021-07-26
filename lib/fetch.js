export async function sendPost(url, data) {
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    console.log("response", res);
    const json = await res.json();
    console.log("response json", json);
    return json;
}

export async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}