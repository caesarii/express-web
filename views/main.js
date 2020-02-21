function post(url, data, type) {
    xhr = new XMLHttpRequest();
    xhr.open("post", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    data = JSON.stringify(data);

    xhr.send(data);
}