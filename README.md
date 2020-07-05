# InternetHealth
Chrome Extension for getting internet connection just like ping command !

# Usage :

Extension uses chrome's navigator api to get internet stats. 
As navigator api's connection stats are updated only when any tab is refreshed, to determine realtime status it also uses a poller to www.google.com at some interval to get realtime status.