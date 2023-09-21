var autoMarkButton, runningText, buttonImage, title;

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');

    autoMarkButton = document.getElementById("autoMarkButton");
    runningText = document.getElementById("running");
    buttonImage = document.getElementById("buttonImage");
    title = document.getElementById("title");

    title.style.opacity = "1";
    title.style.transform = "none";
    title.style.filter = "none";

    autoMarkButton.style.opacity = "1";
    autoMarkButton.style.transform = "none";
    autoMarkButton.style.filter = "none";

    autoMarkButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" });
        });
        runningText.style.display = "block";
        buttonImage.src = "gus1.jpg";
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.greeting === "finished") {
                if (request.checkedTasks > 0) {
                    runningText.innerText = "Hacked " + request.checkedTasks + " items!";
                } else {
                    runningText.innerText = "There is nothing to hack!";
                }

                buttonImage.src = "gus2.jpg";
            }
        }
    );
});
