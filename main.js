function fetch() {
    chrome.storage.sync.set({ 'driverName': document.getElementById("driverName").value }, function () {
        chrome.storage.sync.set({ 'licenseName': document.getElementById("licenseName").value }, function () {
            chrome.storage.sync.set({ 'licenseValue': document.getElementById("licenseValue").value }, function () {

                var fetchUrl = 'http://mvd.gov.by/Ajax.asmx/GetExt'
                var guid = 2091
                var req = new Object();
            
                req.GuidControl = guid
                req.Param1 = document.getElementById("driverName").value
                req.Param2 = document.getElementById("licenseName").value
                req.Param3 = document.getElementById("licenseValue").value
            
                postAjax(fetchUrl, req, function (data) { document.getElementById("results").innerHTML = data.responseText });

            });
        });
    });   
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}

function preload() {
    chrome.storage.sync.get(['driverName'], function (result) {
        if (result.driverName) {
            document.getElementById("driverName").value = result.driverName
        }
    });
    chrome.storage.sync.get(['licenseName'], function (result) {
        if (result.licenseName) {
            document.getElementById("licenseName").value = result.licenseName
        }
    });
    chrome.storage.sync.get(['licenseValue'], function (result) {
        if (result.licenseValue) {
            document.getElementById("licenseValue").value = result.licenseValue
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    preload();
    document.querySelector('#btnCheck').addEventListener('click', fetch);
});