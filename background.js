var isSubmitted=false;


function check() {
    chrome.storage.sync.get("userhandle",function(result){
        
        if(result.userhandle)
        {
            
        var today = new Date().toDateString();
        const handle = result.userhandle; 
        
        
        fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
        .then(response => response.json())
        .then(data => {
            const submissions = data.result;
            for(const submission of submissions)
            {
                
                var verdict = submission.verdict;
                var submitDate = new Date(submission.creationTimeSeconds * 1000).toDateString();
                
                if(verdict==='OK'  && submitDate===today)
                {
                    isSubmitted=true;   
                    alert("Well done you have completed your task today enjoy browsing");
                    break;
                    
                }
            }

            if(!isSubmitted)
            {
                alert(result.userhandle+" go solve a question on codeforces before browsing");
                
            }
            
            })

    }
    else
    {
         var userhandle = prompt("Please enter your Codeforces handle:");
            chrome.storage.sync.set({"userhandle":userhandle},function(){
            //alert(userhandle);
            });
            
    }

    chrome.tabs.onCreated.addListener(function(tab) {
    
    
        if(!isSubmitted)
        {    
            //alert(isSubmitted);
            alert(result.userhandle+" please go solve a question before browsing");
            chrome.tabs.update({url: "https://codeforces.com/problemset/"});
        
        };
    });

});
}


check();

//alert("welcome " +userhandle);

chrome.browserAction.onClicked.addListener(function(tab){
    
    
    var change = prompt("Do want to change your handle for Codeforces-Consistency-Helper (yes/no)");
    if(change==="yes")
    {
        var userhandle = prompt("Please enter your Codeforces handle:");
           chrome.storage.sync.set({"userhandle":userhandle},function(){
           //alert(userhandle);
           });
    }
    chrome.storage.sync.get("userhandle",function(result){
        if(result.userhandle)
        {

            alert("welcome "+result.userhandle+" please close the browser and open again ");
            
            check();
        }  
        else
        {
            var userhandle = prompt("Please enter your Codeforces handle:");
           chrome.storage.sync.set({"userhandle":userhandle},function(){
           //alert(userhandle);
           });
           check();
        } 

    });

});







  
  
  