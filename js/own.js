const text_summarize = async () => {
    document.getElementById("summ_button").disabled = true;

    var form_arr = $('form').serializeArray()
    console.log('logito')
    var text_to_summ = form_arr[0].value

    myBody = {
        "secret_id":"]4j[5-S]Z-?%]meay{@6k9Jfxj=4xuZ52EF)?YK:crYekX8*xj;rCYkf79(#",
        "data":[
            {
                "text":[text_to_summ]
            }
        ]
    }   

    request_body = JSON.stringify(myBody)

    var ptag = document.getElementById('texte_resume');
    ptag.innerHTML = "Loading ...";

    const response = await fetch('https://news-summarization-keygciauya-ew.a.run.app/summary_generator', {
        method: 'POST',
        body: request_body, // string or object
        headers: {
        'Content-Type': 'application/json'
        }
    });

    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log("response:")
    console.log(myJson)
    if (myJson.success == true){
        // var summarized_text = myJson.complete_processed_data[0].processed_data[0]
        var summarized_text = myJson.complete_processed_data[0].processed_data.gensim[0]
    }
    console.log("heyoo")
    console.log(summarized_text)

    ptag.innerHTML = summarized_text;

    document.getElementById("summ_button").disabled = false;
} 
