let fragrances = [];


/*
    LFIS LIBRARY LOADER
*/

fetch("data/fragrances.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load fragrance library");
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


    const input = document
        .getElementById("q")
        .value
        .toLowerCase()
        .trim();


    const out = document.getElementById("out");

    const button = document.querySelector("button");



    if (!input) {

        out.innerHTML = `

        <div class="empty">

        <h3>
        Tell me what kind of scent you are looking for.
        </h3>

        <p>
        Try:
        fresh • woody • office • luxury • date • beach
        </p>

        </div>

        `;

        return;

    }



    if (fragrances.length === 0) {


        out.innerHTML = `

        <div class="empty">

        <h3>
        Fragrance library is still loading.
        </h3>

        </div>

        `;

        return;

    }



    button.disabled = true;



    const messages = [

        "Consulting the fragrance library...",

        "Reviewing fragrance profiles...",

        "Analyzing scent personality...",

        "Preparing your consultation..."

    ];



    let index = 0;



    out.innerHTML = `

    <div class="loading">

    ${messages[0]}

    </div>

    `;



    const interval = setInterval(()=>{


        index++;


        if(index < messages.length){


            out.innerHTML = `

            <div class="loading">

            ${messages[index]}

            </div>

            `;

        }


    },400);





    /*
        LFIS SCORING SYSTEM
    */


    const keywords = input
        .split(" ")
        .filter(word => word.length > 0);



    const scored = fragrances.map(f => {


        let score = 0;



        const brand =
            (f.brand || "")
            .toLowerCase();



        const name =
            (f.name || "")
            .toLowerCase();



        const family =
            (f.family || "")
            .toLowerCase();



        const allKeywords = [

            ...keywords,

            ...(f.keywords || []),

            ...(f.mood || []),

            ...(f.occasion || []),

            ...(f.style || [])

        ]
        .map(x => String(x).toLowerCase());





        keywords.forEach(word => {


            if(brand.includes(word)){
                score += 8;
            }


            if(name.includes(word)){
                score += 8;
            }


            if(family.includes(word)){
                score += 6;
            }


            if(allKeywords.some(item =>
                item.includes(word)
            )){
                score += 10;
            }


        });



        return {

            fragrance:f,

            score:score

        };


    });





    const result = scored

        .filter(item => item.score > 0)

        .sort((a,b)=>
            b.score - a.score
        )[0]?.fragrance;







    setTimeout(()=>{


        clearInterval(interval);


        button.disabled=false;




        if(result){



            out.innerHTML = `


            <div class="recommendation">


            <p class="label">
            Based on your consultation...
            </p>



            <h2>
            ${result.name || ""}
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
            "A fragrance selected based on your scent profile."}

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
            I need a little more scent direction.
            </h3>



            <p>

            Try:
            <br><br>

            fresh
            <br>
            woody
            <br>
            luxury
            <br>
            office
            <br>
            date night

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
    .value=text;


    ask();


}
