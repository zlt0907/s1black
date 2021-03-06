var id = chrome.contextMenus.create({
    "title": "加入黑名单", "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    save(info.selectionText.trim());
});

chrome.storage.local.get(["s1blacklist"], function (item) {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
        url: "http://bbs.saraba1st.com/2b/*"
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'remove'
        });
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        if (key == 's1blacklist') {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
                url: "http://bbs.saraba1st.com/2b/*"
            }, function (tabs) {
                console.log(tabs);
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'remove'
                });
            });
        }
    }
});


function save(theValue) {
    if (!theValue) {
        return;
    }

    chrome.storage.local.get(["s1blacklist"], function (item) {
        var list;
        if (!item.s1blacklist) {
            list = [];
        } else {
            list = item.s1blacklist;
        }
        for (var i = 0; i < list.length; i++) {
            var name = list[i];
            if (name == theValue) {
                return;
            }
        }
        list.push(theValue);
        chrome.storage.local.set({ 's1blacklist': list });
    });
}