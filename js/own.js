const get_sheet_request = async () => {
    document.getElementById("entry_button").disabled = true;

    var form_arr = $('form').serializeArray()
    console.log('logito')
    var text_to_summ = form_arr[0].value

    myBody = {
        "secret_id":"]4j[5-S]Z-?%]meay{@6k9Jfxj=4xuZ52EF)?YK:crYekX8*xj;rCYkf79(#",
        "entry":text_to_summ
    }   

    request_body = JSON.stringify(myBody)

    var ptag = document.getElementById('texte_requete');
    ptag.innerHTML = "Loading ...";

    const response = await fetch('https://sheets-chatbot-keygciauya-ew.a.run.app/sheets_bot', {
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
        var summarized_text = myJson.complete_processed_data
    }
    console.log("heyoo")
    console.log(summarized_text)

    if (summarized_text == null){
        console.log("je n'ai pas compris")
        summarized_text = "Votre requête n'a pas été comprise. Pouvez-vous réessayer ?"
    }
    ptag.innerHTML = summarized_text;

    document.getElementById("entry_button").disabled = false;
} 
