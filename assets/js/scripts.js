const inputQuestion = document.getElementById("question");

const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
if (inputQuestion.value && e.key === "Enter")
sendQuestion();
});

const open_IA = "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";

function sendQuestion() {

var sQuestion = inputQuestion.value;

fetch("https://api.openai.com/v1/completions", {
method: "POST",
headers:{
Accept: "application/json",
"Content-Type": "Application/json",
Authorization: "Bearer " + open_IA,
},
body: JSON.stringify({
model:"text-davinci-003",
prompt: sQuestion,
max_tokens: 2048, // Tamanho da resposta
temperature: 0.5, // Criatividade da resposta
})
})
.then((response) => response.json())
.then((json) => {
if(result.value) result.value += "\n"
if (json.error?.message) {
result.value += `Error: ${json.error.mesage}`
} else if (json.choices?.[0].text) {
var text = json.choices[0].text || "sem resposta";
result.value += "Chat GPT: " + text;
}
result.scrollTop = result.scrollHeight;
})
.catch((error) => console.log("Error: ", error))
.finally(() => {
inputQuestion.value = "";
inputQuestion.disabled = true;
inputQuestion.focus();
});


if (result.value) result,value += "\n\n\n"
result.value += `Mestre essa pessoa gostaria de saber: ${sQuestion}`
inputQuestion.value = "Você vê o mestre e sua respiração imponente pronto a responder"
inputQuestion.disabled = true;
result.scrollTop = result.scrollHeight;
}