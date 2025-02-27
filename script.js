// Variables
let desc = document.getElementById("story"); // This is the story description on each .html page.
let Button1 = document.getElementById("Button1"); // This is the first option to proceed to the next story beat
let Button2 = document.getElementById("Button2") || null; // This is the second option which proceeds to an alternative story beat; some screens only have one button.
let canProceed = false;

let Sound = new Audio("sound.mp3")
Sound.loop = true

// Sometimes, button2 is not needed as some screens only have one button.
Button1.style.opacity = '0'
if (Button2) {
    Button2.style.opacity = '0'
}

// When the button is clicked, it transports the user to the next page.
function decorateButtonFunctionality(button, scene) {
    console.log("leaked")
    let Button = button == "Button1" && Button1 || button == "Button2" && Button2 || null
    if (Button == null) {
        return
    }

    // unfortunately this makes it so the button is a double-click 
    Button.addEventListener("click", () => {
        if (!canProceed) {
            console.log("NOPE!")
            return
        }

        goToScene(scene)
        // TODO: Disconnect this connection to prevent a memory leak? not sure how connections are handled in JS.
    })


 
}
// switches the .html page
function goToScene(scene) {
    window.location.href = scene + ".html"; 


    let desc = document.getElementById("story")
    desc.innerHTML = ""
    // Typewrite(desc.innerHTML, desc)
}

// function used to begin the Typewriter effect
async function startTyping() {
    if (desc) {
        await Typewrite(desc.innerHTML, desc);
        Button1.style.opacity = '1'
        if (Button2) {
            Button2.style.opacity = '1'
        }

        canProceed = true;
    }
    
}
// Function for the description of the Typewriter effect. The usage of "async" is necessary so that I can yield execution.   
async function Typewrite(message, element) {
    element.innerHTML = ""; // Clear existing content
    let keepgoing = true // just in case you wanna skip the typewriter effect.

    window.addEventListener("keydown", () => {

        keepgoing = false
        element.innerHTML = ""
        for (let i = 0; i < message.length; i++) {
            if (message[i] == "\n") {
                console.log(message)
                element.innerHTML += "<br>"; // Replaces new lines with the valid code for the HTML line break
            } else {
                element.innerHTML += message[i]; 
            } 
        }
    })

    for (let i = 0; i < message.length && keepgoing; i++) {
        if (message[i] == "\n") {
            console.log(message)
            element.innerHTML += "<br>"; // Insert line break
        } else {
            element.innerHTML += message[i]; 
        }
        await new Promise(resolve => setTimeout(resolve, 35));
        Sound.play()
    }
    Sound.pause()
}

let commence = document.getElementById("commence")
commence.innerHTML = "Click anywhere to begin the dialogue.<br>Note: Once the story beat begins, press any key to skip the typewriter effect if you wish to skip."
window.addEventListener("click", commenceText)

desc.style.opacity = '0'

function commenceText() {
    // Start the typing effect
    desc.style.opacity = '1'
    commence.innerHTML = ""
    startTyping()
    window.removeEventListener("click", commenceText)
}



