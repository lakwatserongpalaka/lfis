/*
==========================================
LFIS v2.0
Luxury Fragrance Intelligence System
==========================================
*/

let fragrances = [];

/*
==========================================
LFIS LIBRARY LOADER
==========================================
*/

fetch("data/fragrances.json")

.then(response=>{

    if(!response.ok){

        throw new Error("Unable to load fragrance library.");

    }

    return response.json();

})

.then(data=>{

    fragrances=data;

    console.log(

        "LFIS Library Loaded:",

        fragrances.length,

        "fragrances"

    );

})

.catch(error=>{

    console.error(

        "LFIS Error:",

        error

    );

});



/*
==========================================
LFIS SYNONYM ENGINE
==========================================
*/

const synonymMap={

    corporate:"office",
    work:"office",
    working:"office",
    business:"office",
    boardroom:"office",

    classy:"luxury",
    luxurious:"luxury",
    premium:"luxury",
    expensive:"luxury",
    elegant:"luxury",

    ceo:"executive",
    boss:"executive",
    manager:"executive",

    sexy:"date",
    romantic:"date",
    dinner:"date",

    beach:"vacation",
    island:"vacation",
    tropical:"vacation",
    holiday:"vacation",

    crisp:"fresh",
    clean:"fresh",

    masculine:"male",
    feminine:"female",

    hotel:"hotel lobby",
    lobby:"hotel lobby"
};



/*
==========================================
LFIS FILTER HELPERS
==========================================
*/

function getSelectedGender(){

    const checked=document.querySelector(

        'input[name="gender"]:checked'

    );

    return checked ? checked.value : "all";

}



function getSelectedSeason(){

    const select=document.getElementById("season");

    return select ? select.value : "season-any";

}



function getSelectedPerformance(){

    const select=document.getElementById("performance");

    return select ? select.value : "performance-any";

}
/*
==========================================
LFIS CONSULTATION ENGINE
==========================================
*/

function ask(){

    const input=document
        .getElementById("q")
        .value
        .trim()
        .toLowerCase();

    const out=document.getElementById("out");

    const button=document.querySelector(
        "button:not(.chip)"
    );



    if(input===""){

        out.innerHTML=`

        <div class="empty">

            <h3>Tell me what you're looking for.</h3>

            <p>

                Examples

                <br><br>

                Quiet luxury

                <br>

                Office fragrance

                <br>

                Summer vacation

                <br>

                Date night

                <br>

                Fresh and expensive

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



    const gender=getSelectedGender();

    const season=getSelectedSeason();

    const performance=getSelectedPerformance();



    const loading=[

        "Consulting the LFIS fragrance library...",

        "Analyzing fragrance personality...",

        "Comparing scent intelligence...",

        "Calculating recommendation score...",

        "Preparing your consultation..."

    ];



    let step=0;



    out.innerHTML=`

    <div class="loading">

        ${loading[0]}

    </div>

    `;



    const timer=setInterval(()=>{

        step++;

        if(step<loading.length){

            out.innerHTML=`

            <div class="loading">

                ${loading[step]}

            </div>

            `;

        }

    },350);



    const words=input

        .split(/\s+/)

        .filter(word=>word.length)

        .map(word=>synonymMap[word]||word);
        /*
    ==========================================
    LFIS MATCH ENGINE
    ==========================================
    */

    const results = fragrances.map(f=>{

        let score = 0;

        const searchable=[

            f.brand || "",
            f.name || "",
            f.family || "",
            f.personality || "",
            ...(f.keywords || []),
            ...(f.searchKeywords || []),
            ...(f.mood || []),
            ...(f.occasion || []),
            ...(f.style || [])

        ]

        .join(" ")

        .toLowerCase();



        /* -------------------------
           Keyword Matching
        ------------------------- */

        words.forEach(word=>{

            if(searchable.includes(word)){

                score += 10;

            }

        });



        /* -------------------------
           Recommendation Score Bonus
        ------------------------- */

        if(f.recommendationScore){

            score += f.recommendationScore / 10;

        }



        /* -------------------------
           Gender Filter
        ------------------------- */

        const fragranceGender=(

            f.gender || "unisex"

        ).toLowerCase();



        if(

            gender !== "all" &&

            fragranceGender !== "unisex" &&

            fragranceGender !== gender

        ){

            score -= 100;

        }



        /* -------------------------
           Season Filter
        ------------------------- */

        if(

            season !== "season-any"

        ){

            const seasons=(

                f.season || []

            ).map(s=>s.toLowerCase());



            if(

                seasons.includes(

                    season.toLowerCase()

                )

            ){

                score += 15;

            }

        }



        /* -------------------------
           Performance Filter
        ------------------------- */

        if(

            performance !== "performance-any"

        ){

            if(

                (f.performance || "")

                .toLowerCase()

                ===

                performance.toLowerCase()

            ){

                score += 15;

            }

        }



        return{

            fragrance:f,

            score:score

        };

    });



    const top3 = results

        .filter(item=>item.score>0)

        .sort((a,b)=>b.score-a.score)

        .slice(0,3);
        setTimeout(()=>{

        clearInterval(timer);

        button.disabled = false;



        if(top3.length===0){

            out.innerHTML=`

            <div class="empty">

                <h3>No perfect match found.</h3>

                <p>

                    Try searching by:

                    <br><br>

                    • Office

                    <br>

                    • Quiet Luxury

                    <br>

                    • Summer

                    <br>

                    • Fresh

                    <br>

                    • Date Night

                    <br>

                    • Bleu de Chanel

                </p>

            </div>

            `;

            return;

        }



        const best = top3[0].fragrance;



        const percent = Math.max(

            72,

            Math.min(

                99,

                Math.round(top3[0].score * 2.5)

            )

        );



        out.innerHTML = `

<div class="recommendation fade-in">

<div class="recommendation-header">

<div>

<p class="label">

LFIS RECOMMENDATION

</p>

<h2>${best.name}</h2>

<h3>${best.brand}</h3>

<p class="family">

${best.family || ""}

</p>

</div>



<div class="match-circle">

${percent}

<span>%</span>

</div>

</div>



<div class="match">

<span>Consultation Match</span>

<div class="bar">

<div

class="fill"

style="width:${percent}%">

</div>

</div>

</div>



<hr>



<h4>Your Scent Profile</h4>

<p>

Based on your consultation for

<strong>"${input}"</strong>,

LFIS analyzed your preferred

mood,

occasion,

style,

and fragrance personality

to identify the closest luxury fragrance.

</p>



<hr>



<h4>Fragrance Personality</h4>

<p>

${best.personality || "Modern, versatile and refined."}

</p>



<hr>



<h4>Perfect For</h4>

<p>

${(best.occasion || []).join(" • ")}

</p>



<hr>



<h4>Mood</h4>

<p>

${(best.mood || []).join(" • ")}

</p>



<hr>



<h4>Style</h4>

<p>

${(best.style || []).join(" • ")}

</p>



<hr>



<h4>Editorial Review</h4>

<p class="editorial">

${best.editorial || ""}

</p>



<hr>



<h4>Consultant's Recommendation</h4>

<p class="consultant">

${best.consultant || ""}

</p>
${

best.recommendationScore

?

`

<hr>

<h4>LFIS Recommendation Score</h4>

<p>

<strong>${best.recommendationScore}/100</strong>

</p>

`

:

""

}



${

top3.length>1

?

`

<hr>

<h4>You May Also Like</h4>

<ol>

${top3.slice(1).map(item=>`

<li>

<strong>${item.fragrance.name}</strong>

<br>

<small>${item.fragrance.brand}</small>

</li>

`).join("")}

</ol>

`

:

""

}



</div>

`;



    },1400);

}



/*
==========================================
Quick Search Buttons
==========================================
*/

function fill(text){

    document.getElementById("q").value = text;

    ask();

}
