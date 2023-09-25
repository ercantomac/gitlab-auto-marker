var autoMarkButton, message, buttonImage, title;
var firstClick = true;

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');

    autoMarkButton = document.getElementById("autoMarkButton");
    message = document.getElementById("message");
    buttonImage = document.getElementById("buttonImage");
    title = document.getElementById("title");

    initialAnimation();

    autoMarkButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" });
        });

        message.innerText = "Hacking..."
        if (firstClick) {
            message.style.opacity = "1";
            message.style.fontSize = "1.5em";
            message.style.filter = "none";
            firstClick = false;
        }
        buttonImage.src = "gus1.jpg";
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.greeting === "finished") {
                if (request.checkedTasks > 0) {
                    message.innerText = "Hacked " + request.checkedTasks + " items!";
                } else {
                    message.innerText = "There is nothing to hack!";
                }

                buttonImage.src = "gus2.jpg";
            }
        }
    );
});

function initialAnimation() {
    title.style.opacity = "1";
    title.style.transform = "none";
    title.style.filter = "none";

    autoMarkButton.style.opacity = "1";
    autoMarkButton.style.transform = "none";
    autoMarkButton.style.filter = "none";
}
