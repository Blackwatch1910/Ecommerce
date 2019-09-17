function getAPI() {
    var http = new XMLHttpRequest();
    http.open('GET','https://5d76bf96515d1a0014085cf9.mockapi.io/product',true);
    http.send();
    //console.log(http);
    http.onreadystatechange  = function() {
        if(this.readyState === 4) {
            if(this.status === 200) {
                var response = JSON.parse(this.responseText)
                console.log(response);
            }
            else
                console.log('CALL FAILED');
        }
    }
    
}

getAPI();

