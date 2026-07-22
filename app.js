console.log("LFIS APP.JS CONNECTED");
let fragrances = [];


/*
    LFIS FRAGRANCE LIBRARY LOADER
*/

fetch("data/fragrances.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Cannot load fragrance library");
        }

        return response.json();

    })
    .then(data => {

        fragrances = data;

        console.log(
            "LFIS Library Loaded",
            fragrances.length,
            "fragrances"
        );

    })
    .catch(error => {

        console.error(
            "LFIS Library Error:",
            error
        );

    });



/*
    LFIS CONSULTATION ENGINE
*/

function ask() {


    const q = document
        .getElementById("q")
        .value
        .toLowerCase()
        .trim();


    const out = document.getElementById("out");

    const button = document.querySelector("button");



    if (!q) {

        out.innerHTML = `

        <div class="empty">

        <h3>
        Tell me what you are looking for.
        </h3>

        <p>
        Try:
        fresh • office • woody • luxury • beach • date
        </p>

        </div>

        `;

        return;

    }



    if (fragrances.length === 0) {


        out.innerHTML = `

        <div class="empty">

        <h3>
        The fragrance library is still loading.
        </h3>

        <p>
        Please wait a moment and try again.
        </p>

        </div>

        `;


        return;

    }



    button.disabled = true;



    const messages = [

        "Consulting the fragrance library...",

        "Reviewing fragrance profiles...",

        "Analyzing scent personality...",

        "Preparing your recommendation..."

    ];



    let index = 0;



    out.innerHTML = `

    <div class="loading">

    ${messages[0]}

    </div>

    `;



    const interval = setInterval(() => {


        index++;


        if(index < messages.length){


            out.innerHTML = `

            <div class="loading">

            ${messages[index]}

            </div>

            `;

        }


    },350);





    const result = fragrances.find(f => {


        const searchable = [

            f.brand || "",

            f.name || "",

            f.family || "",

            ...(f.keywords || []),

            ...(f.mood || []),

            ...(f.occasion || []),

            ...(f.style || [])


        ]

        .join(" ")

        .toLowerCase();



        return searchable.includes(q);



    });






    setTimeout(() => {



        clearInterval(interval);



        button.disabled = false;





        if(result) {



            out.innerHTML = `


            <div class="recommendation">


            <p class="label">

            Based on your consultation...

            </p>



            <h2>

            ${result.name || "Unknown Fragrance"}

            </h2>



            <h3>

            ${result.brand || ""}

            </h3>



            <p>

            <strong>

            ${result.family || ""}

            </strong>

            </p>



            <p class="editorial">

            ${result.editorial || 
            "A fragrance selected based on your preferences."}

            </p>



            <hr>



            <p class="consultant">

            ${result.consultant || ""}

            </p>



            </div>



            `;



        } else {



            out.innerHTML = `


            <div class="empty">


            <h3>

            I couldn't find the perfect match yet.

            </h3>



            <p>

            Try searching for:

            <br><br>

            fresh • citrus • woody • luxury • beach • date • executive • office

            </p>



            </div>



            `;


        }



    },1400);



}






/*
    QUICK SEARCH BUTTONS
*/

function fill(text){


    document
        .getElementById("q")
        .value = text;


    ask();


}
