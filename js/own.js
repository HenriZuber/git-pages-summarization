var loading_int = 0
var keep_loading = false;

var input = document.getElementById("entry");
input.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("entry_button").click();
    }
});

const get_sheet_request = async () => {
    console.log("Request started ...")
    document.getElementById("entry_button").disabled = true;
    hide_all();
    loading_int = 0;
    var load_per = String(loading_int) + "%";
    document.getElementById('span-load').style.width = load_per;
    document.getElementById('span-load').setAttribute('data-value',load_per);
    keep_loading = true;
    loading_advance();
    toggle_loading_row();

    var text_to_summ = document.getElementById('entry').value;

    var currentDate = new Date();
    var str_curr_date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

    var week_early_date = new Date();
    week_early_date.setTime(currentDate.getTime()-(7*24*3600000));
    var str_week_early_date = week_early_date.getFullYear() + '-' + (week_early_date.getMonth() + 1) + '-' + week_early_date.getDate();

    myBody = {
        "secret_id":"@P@>w]128-.>12]'jRq120y|ap.:HF.)Bqawetgagbfshqwetqegh",
        "data":{
            "tags_list":
                [text_to_summ],
            "start_date":str_week_early_date,
            "end_date":str_curr_date
            }
        }   

    request_body = String(JSON.stringify(myBody));

    var ptag = document.getElementById('entry_button');
    ptag.innerHTML = "Loading ...";

    // https://twitter-sa-keygciauya-lz.a.run.app/twitter_sa
    // http://localhost:9200/twitter_sa
    const response = await fetch('https://twitter-sa-keygciauya-lz.a.run.app/twitter_sa', {
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
    
    var data = myJson.complete_processed_data.results

    var num_tweets = data.twitter_data[Object.keys(data.twitter_data)[0]].length;

    var positive_text = data.most_positive_comment;
    var negative_text = data.most_negative_comment;

    var per_ls = data.percentages[Object.keys(data.percentages)[0]];
    var pos_per = per_ls.positive
    var neu_per = per_ls.neutral
    var neg_per = per_ls.negative

    var better_per_ls = better_percents(pos_per, neu_per, neg_per, num_tweets);
    pos_per = better_per_ls[0]
    neu_per = better_per_ls[1]
    neg_per = better_per_ls[2]

    pos_per = String(pos_per).slice(0,4) + "%";
    neu_per = String(neu_per).slice(0,4) + "%";
    neg_per = String(neg_per).slice(0,4) + "%";

    document.getElementById('text-positif').textContent = positive_text;
    document.getElementById('text-negatif').textContent = negative_text;

    document.getElementById('span-pos').style.width = pos_per;
    document.getElementById('span-neu').style.width = neu_per;
    document.getElementById('span-neg').style.width = neg_per;

    document.getElementById('span-pos').setAttribute('data-value',pos_per);
    document.getElementById('span-neu').setAttribute('data-value',neu_per);
    document.getElementById('span-neg').setAttribute('data-value',neg_per);

    document.getElementById('text-number').textContent = num_tweets;

    ptag.innerHTML = "ENVOYER !";
    document.getElementById("entry_button").disabled = false;

    var hide_var = 0;
    if (typeof positive_text == 'undefined'){
        hide_var = 1;
    }

    load_end();
    keep_loading = false;
    toggle_loading_row();
    unhide_all(hide_var);
} 

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function better_percents(pos_per, neu_per, neg_per, num_tweets){
    var neu_rid_per = (0.5-(0.5%(1/num_tweets)))*100
    if (neu_per >=neu_rid_per){
        neu_per = neu_per-neu_rid_per;
        added_pos_per = neu_rid_per*(pos_per/(pos_per+neg_per));
        added_neg_per = neu_rid_per*(neg_per/(pos_per+neg_per));
        pos_per = pos_per + added_pos_per;
        neg_per = neg_per + added_neg_per;
    }
    return [pos_per, neu_per, neg_per]
}

function load_end(){
    loading_int = 100
    var load_per = String(loading_int) + "%";
    document.getElementById('span-load').style.width = load_per;
    document.getElementById('span-load').setAttribute('data-value',load_per);
}

function loading_advance(){
    if(keep_loading ==true){
        if(loading_int >=90){
            keep_loading=false;
        }else{
            setTimeout(function(){ 
                loading_int += 5
                var load_per = String(loading_int) + "%";
                document.getElementById('span-load').style.width = load_per;
                document.getElementById('span-load').setAttribute('data-value',load_per);
                loading_advance()
            }, 2000+getRandomInt(2000));
        }
    }
}

function unhide_all(hide_var) {
    document.getElementById('bars').hidden = false;
    if (hide_var == 0){
        document.getElementById('per_row').hidden = false;
        setTimeout(function(){ 
            document.getElementById('card-positif').hidden = false;
        }, 700);
        setTimeout(function(){
            document.getElementById('card-negatif').hidden = false;
        }, 1000);
        setTimeout(function(){
            document.getElementById('card-number').hidden = false;
        }, 1300);
    }else if (hide_var==1){
        document.getElementById('per_row').hidden = true;
        setTimeout(function(){
            document.getElementById('card-number').hidden = false;
        }, 700);
    }
}

function toggle_loading_row(){
    var load_hide_bool = document.getElementById('loading_row').hidden;
    if (load_hide_bool == true){
        document.getElementById('load-bar').className = "skill-bars animate__animated animate__slideInUp";
        document.getElementById('loading_row').hidden = !load_hide_bool;
    }else{
        document.getElementById('load-bar').className = "skill-bars animate__animated animate__slideOutRight";
        setTimeout(function(){
            document.getElementById('loading_row').hidden = !load_hide_bool;
        }, 300);
    }
}

function hide_all(){
    document.getElementById('bars').hidden = true;
    document.getElementById('per_row').hidden = true;
    document.getElementById('card-positif').hidden = true;
    document.getElementById('card-negatif').hidden = true;
    document.getElementById('card-number').hidden = true;
}