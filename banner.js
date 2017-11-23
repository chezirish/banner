// поддержка для IE
function createRequestObject() {
    var obj;
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        obj = new XMLHttpRequest();
    }
    return obj;
}

// ajax запрос на сервер и ставим обработчик на ответ 
function sendReq(req) {   
    http = createRequestObject();
    http.open('get', req);
    http.onreadystatechange = handleResponse;
    http.send(null);
}


// если есть ответ от сервера
function handleResponse() {    
    if (http.readyState == 4) {
        // создаем родительский блок для html контента
        var banner = document.createElement('div');
        banner.id = 'banner';
        // вставляем его в начало body
        var body = document.getElementsByTagName('body')[0];
        body.insertBefore(banner, body.firstChild);

        
        // добавляем html контент в banner блок
        var response = http.responseText;
        document.getElementById('banner').innerHTML=response;
        // создаем link для css файла и указываем ссылку на него
        var link = document.createElement('link');
        link.href = "banner_style.css"; // здесь ссылка на css файл с сервера
        link.rel = "stylesheet";
        document.getElementsByTagName('head')[0].appendChild(link);

        // ставим обработчик на закрытие баннера
        var closeBtn = document.getElementsByClassName('banner_close')[0];
        closeBtn.addEventListener('click', function(){
            var element = document.getElementsByClassName('banner_wrapper')[0];
            element.parentNode.removeChild(element);
        });
    }
}


// ссылка на которую осущевстляется ajax запрос
sendReq('http://localhost/banner/ajax.php'); // здесь ссылка на ajax.php с сервера


