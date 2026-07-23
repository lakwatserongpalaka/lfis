let fragrances = [];

/*
==========================================
LFIS LIBRARY LOADER
==========================================
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
            "LFIS Library Loaded:",
            fragrances.length,
            "fragrances"
        );

    })
    .catch(error => {

        console.error(error);

    });




/*
==========================================
LFIS CONSULTATION ENGINE
==========================================
*/

function ask(){

    const input=document
        .getElementById("q")
        .value
        .toLowerCase()
        .trim();

    const out=document.getElementById("out");

    const button=document.querySelector("button");



    if(input===""){

        out.innerHTML=`

        <div class="empty">

        <h3>Tell me what you're looking for.</h3>

        <p>

        Examples:

        fresh luxury office

        woody date

        beach vacation

        executive

        </p>

        </div>

        `;

        return;

    }



    if(fragrances.length===0){

        out.innerHTML=`

        <div class="loading">

        Loading LFIS Library...

        </div>

        `;

        return;

    }



    button.disabled=true;



    const loading=[

        "Consulting the fragrance library...",

        "Analyzing fragrance personality...",

        "Comparing scent profiles...",

        "Preparing recommendation..."

    ];



    let i=0;



    out.innerHTML=`

    <div class="loading">

    ${loading[0]}

    </div>

    `;



    const timer=setInterval(()=>{

        i++;

        if(i<loading.length){

            out.innerHTML=`

            <div class="loading">

            ${loading[i]}

            </div>

            `;

        }

    },350);





    /*
    ==========================================
    LFIS MATCH ENGINE
    ==========================================
    */

    const words=input
        .split(" ")
        .filter(x=>x.length>0);



    const results=fragrances.map(f=>{

        let score=0;

        const searchable=[

            f.brand,

            f.name,

            f.family,

            f.personality,

            ...(f.keywords||[]),

            ...(f.mood||[]),

            ...(f.occasion||[]),

            ...(f.style||[]),

            ...(f.searchKeywords||[])

        ]
        .join(" ")
        .toLowerCase();



        words.forEach(word=>{

            if(searchable.includes(word)){

                score+=10;

            }

        });



        if(f.recommendationScore){

            score+=f.recommendationScore/10;

        }



        return{

            fragrance:f,

            score

        };

    });



    const top3=results

        .filter(x=>x.score>0)

        .sort((a,b)=>b.score-a.score)

        .slice(0,3);





    setTimeout(()=>{

        clearInterval(timer);

        button.disabled=false;



        if(top3.length===0){

            out.innerHTML=`

            <div class="empty">

            <h3>No recommendation found.</h3>

            <p>

            Try:

            office

            luxury

            woody

            beach

            executive

            fresh

            </p>

            </div>

            `;

            return;

        }



        const best=top3[0].fragrance;

        const percent=Math.min(
            99,
            Math.round(top3[0].score*3)
        );



        out.innerHTML=`

        <div class="recommendation">

        <p class="label">

        BEST MATCH

        </p>



        <h2>

        ${best.name}

        </h2>



        <h3>

        ${best.brand}

        </h3>



        <p>

        <strong>${best.family}</strong>

        </p>



        <div class="match">

        <span>LFIS Match</span>

        <div class="bar">

        <div class="fill"

        style="width:${percent}%">

        </div>

        </div>

        <strong>${percent}%</strong>

        </div>



        <p class="editorial">

        ${best.editorial}

        </p>



        <hr>



        <p>

        <strong>Consultant's Recommendation</strong>

        </p>

        <p>

        ${best.consultant}

        </p>



        <hr>



        <p>

        <strong>Why LFIS chose this fragrance</strong>

        </p>

        <ul>

        <li>Matches your search keywords.</li>

        <li>Fits the requested mood and occasion.</li>

        <li>High recommendation score.</li>

        </ul>

        ${
        top3.length>1?

        `

        <hr>

        <p>

        <strong>You may also like</strong>

        </p>

        <ol>

        ${top3.slice(1).map(x=>

        `<li>${x.fragrance.brand} — ${x.fragrance.name}</li>`

        ).join("")}

        </ol>

        `

        :""

        }

        </div>

        `;

    },1400);

}





function fill(text){

    document.getElementById("q").value=text;

    ask();

}
