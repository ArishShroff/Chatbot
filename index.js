document.addEventListener("DOMContentLoaded",()=>{
	const inputfield=document.getElementById("input");
	inputfield.addEventListener("keydown",(e)=>{
		if(e.code=="Enter"){
			let input=inputfield.value;
			inputfield.value="";
			output(input);
		}
	});
});
function output(input){
	let product;
	let text=input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
	text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");
if(compare(prompts,replies,text)){
	product=compare(prompts,replies,text);
}
else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}
function compare(promptsArray,repliesArray,string){
	let reply;
	let replyfound=false;
	for(let x=0;x<promptsArray.length;x++){
		for(let y=0;y<promptsArray[x].length;y++){
			if(promptsArray[x][y]===string){
				let replies=repliesArray[x];
				reply=replies[Math.floor(Math.random() * replies.length)];
				replyfound=true;
				break;
			}
		}
		if(replyfound){
			break;
		}
	}
	return reply;
}
function addChat(input,product){
	const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="https://w7.pngwing.com/pngs/893/641/png-transparent-sushi-care-sushi-food-thumbnail.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "https://www.kindpng.com/picc/m/13-130453_robot-png-image-hd-transparent-background-hd-robot.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product);
},2000);

}