var isSubmitted =false;
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
            
            })

    }
    else
    {
        var userhandle = prompt("Please enter your Codeforces handle:");
            chrome.storage.sync.set({"userhandle":userhandle},function(){
            //alert(userhandle);
            });
    }
});
chrome.browserAction.onClicked.addListener(function(tab){
    
            var userhandle = prompt("Please enter your Codeforces handle:");
            chrome.storage.sync.set({"userhandle":userhandle},function(){
            //alert(userhandle);
            });

});



chrome.tabs.onCreated.addListener(function(tab) {
    
    if(!isSubmitted)
    {
        //alert(isSubmitted);
        chrome.tabs.update(tab.id, {url: "https://codeforces.com/"});

    }
});



// const tabId = activeInfo.tabId;
// // Add an event listener for tab switching
// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     // Get the ID of the active tab
  
//     // Add an event listener for page navigation in the active tab
//     chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//       // Check if the URL of the new page is different from the previous page
//       if (changeInfo.status === 'complete' && tabId === activeInfo.tabId) {
//         // Redirect the user to codeforces.com
//         chrome.tabs.update(tabId, {url: "https://codeforces.com/"});
//       }
//     });
//   });
  
  
  