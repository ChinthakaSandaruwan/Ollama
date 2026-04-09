async function test() {
    let prompt = document.getElementById("x").value;
    console.log(prompt);

    let url = "http://localhost:11434/api/generate";
    let data = {
        model: "qwen3.5:0.8b",
        prompt: "why is the sky blue?",
    };

    let request = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );

}



// curl http://localhost:11434/api/generate -d '{
//   "model": "gemma3",
//   "prompt": "Why is the sky blue?"
// }'