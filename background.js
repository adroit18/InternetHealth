(function(){

    const INTERNET_STATUS = {
        "OFFLINE" : "offline",
        "slow2g":"slow-2g",
        "2G" : "2g",
        "3G": "3g",
        "4G": "4g"
    } 
    const POLL_TIME = 1000 * 2;

    const isBrowserCompatible = function(){
        return !!navigator;
    }
    const getOnlineStatus = function(){
        if(navigator){
            return navigator.onLine;
        }
    }
    const getConnectionType = function(){
        if(navigator){
            return navigator?.connection?.effectiveType;
        }
    }
    const makeChanges = function(onlineStatus,connectionType){
        if(onlineStatus){
            if(connectionType == INTERNET_STATUS["4G"]){
                chrome.browserAction.setIcon({path: "/images/4gOnline32.png"});
            }else if(connectionType == INTERNET_STATUS["3G"]){
                chrome.browserAction.setIcon({path: "/images/3gOnline32.png"});
            }else if(connectionType == INTERNET_STATUS["2G"] 
                || connectionType == INTERNET_STATUS["slow2g"]){
                chrome.browserAction.setIcon({path: "/images/2gOnline32.png"});
            }
        }else{
            chrome.browserAction.setIcon({path: "/images/offline32.png"});
        }
    }
    const determineChanges = function(){
        const connectionType = getConnectionType();
        const onlineStatus = getOnlineStatus();
        makeChanges(onlineStatus, connectionType);
    }
    const pollConnection = function(){
        // setTimeout(function(){
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://www.google.com'
            fetch(proxyUrl + targetUrl).then((onlineStatus)=>{
                const connectionType = !!onlineStatus ? INTERNET_STATUS["3G"]:false;
                makeChanges(!!onlineStatus,connectionType);
                // if(onlineStatus.status != 429){
                    // pollConnection();
                // }
            }).catch((err)=>{
                makeChanges(false,null);
                // pollConnection();
            });
        // },POLL_TIME);
    }

    if(navigator){
        determineChanges();
        navigator.connection.onchange = function(){
            determineChanges();
        }
        
    }
    setInterval(()=>{
        pollConnection();
    },POLL_TIME)
})()