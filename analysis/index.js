(function(){
    console.log('++');

    const BROWSER_NOT_SUPPORTED = "Sorry your browser is too old for us to evaluate ! Please update it";
    const connectionStatus = document.getElementById("connectionStatus");
    const connectionSpeed = document.getElementById("connectionSpeed");
    const connectionType = document.getElementById("connnectionType");
    const contentBody = document.getElementById("contentBody");

    const getConnectionSpeed = function(){
        if(!!navigator){
            return navigator.onLine  ? navigator?.connection?.downlink : 0;
        }
    }
    const getConnectionSpeedText = function(){
        if(!!navigator){
            const speed = getConnectionSpeed();
            return `${speed}Mbits/sec`;
        }
    }
    const getConnectionStatus = function(){
        if(!!navigator){
            return navigator.onLine ? 'Online' : 'Offline'; 
        }
    }
    const getConnectionType = function(){
        if(!!navigator){
            return navigator?.connection?.effectiveType;
        }
    }
    const populateNumbers = function(){
        connectionSpeed.innerHTML = getConnectionSpeedText();
        connectionType.innerHTML = getConnectionType();
        connectionStatus.innerHTML = getConnectionStatus();
    }
    if(!navigator){
        if(contentBody){
            contentBody.innerHTML = BROWSER_NOT_SUPPORTED;
        }
    }else{
        navigator.connection.onchange = function(){
            console.log('==');
            populateNumbers();
        }
        populateNumbers();
    }
})();