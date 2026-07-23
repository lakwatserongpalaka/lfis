let fragrances = [];

/*
=====================================================
LFIS v2.0
Luxury Fragrance Intelligence System
=====================================================
*/


/*
=====================================================
LIBRARY LOADER
=====================================================
*/

fetch("data/fragrances.json")

.then(response=>{

    if(!response.ok){

        throw new Error("Unable to load LFIS Library");

    }

    return response.json();

})

.then(data=>{

    fragrances=data;

    console.log(

        "LFIS Library Loaded",

        fragrances.length,

        "fragrances"

    );

})

.catch(error=>{

    console.error(error);

});


/*
=====================================================
LFIS CONSULTATION ENGINE
=====================================================
*/

function ask(){


    const input=document

    .getElementById("q")

    .value

    .toLowerCase()

    .trim();



    const out=document.getElementById("out");



    const button=document.querySelector(

        "button:not(.chip)"

    );



    if(input===""){

        out.innerHTML=`

        <div class="empty">

            <h3>

                Tell me what you're looking for.

            </h3>

            <p>

                Try things like...

                <br><br>

                luxury office

                <br>

                beach vacation

                <br>

                quiet luxury

                <br>

                date night

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

        "Reviewing fragrance personalities...",

        "Analyzing scent preferences...",

        "Preparing your consultation..."

    ];



    let loadingIndex=0;



    out.innerHTML=`

    <div class="loading">

        ${loading[0]}

    </div>

    `;



    const timer=setInterval(()=>{

        loadingIndex++;

        if(loadingIndex<loading.length){

            out.innerHTML=`

            <div class="loading">

                ${loading[loadingIndex]}

            </div>

            `;

        }

    },450);



/*
=====================================================
CONSULTATION PREFERENCES
=====================================================
*/

const selectedGender=document.querySelector(

'input[name="gender"]:checked'

).id;



const selectedSeason=document.querySelector(

'input[name="season"]:checked'

).id;



const selectedPerformance=document.querySelector(

'input[name="performance"]:checked'

).id;



/*
=====================================================
SYNONYM ENGINE
=====================================================
*/

const synonymMap={

office:"office",

corporate:"office",

work:"office",

meeting:"office",

business:"office",

executive:"executive",

ceo:"executive",

boss:"executive",

manager:"executive",

expensive:"luxury",

classy:"luxury",

premium:"luxury",

elegant:"luxury",

hotel:"hotel lobby",

lobby:"hotel lobby",

beach:"vacation",

tropical:"vacation",

island:"vacation",

holiday:"vacation",

summer:"summer",

winter:"winter",

autumn:"autumn",

fall:"autumn",

spring:"spring",

romantic:"date",

date:"date",

dinner:"date",

fresh:"fresh",

clean:"fresh",

crisp:"fresh"

};



const words=input

.split(/\s+/)

.filter(Boolean)

.map(word=>synonymMap[word]||word);
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

    /*
==========================================
LFIS SYNONYM ENGINE
==========================================
*/

const synonymMap = {

    corporate: "office",
    work: "office",
    working: "office",
    business: "office",
    boardroom: "office",

    classy: "luxury",
    expensive: "luxury",
    premium: "luxury",
    elegant: "luxury",

    ceo: "executive",
    boss: "executive",
    manager: "executive",

    sexy: "date",
    romantic: "date",
    dinner: "date",

    beach: "vacation",
    tropical: "vacation",
    island: "vacation",
    holiday: "vacation",

    clean: "fresh",
    crisp: "fresh",

    masculine: "men",
    feminine: "women"
};

const words = input
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => synonymMap[word] || word);



   const results = fragrances.map(f=>{

    let score = 0;

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



    /*
    ==========================
    Keyword Matching
    ==========================
    */

    words.forEach(word=>{

        if(searchable.includes(word)){

            score += 12;

        }

    });



    /*
    ==========================
    Brand Bonus
    ==========================
    */

    if(

        input.includes((f.brand||"").toLowerCase())

    ){

        score += 40;

    }



    /*
    ==========================
    Exact Name Bonus
    ==========================
    */

    if(

        input.includes((f.name||"").toLowerCase())

    ){

        score += 80;

    }



    /*
    ==========================
    Gender Filter
    ==========================
    */

    const gender=(f.gender||"unisex").toLowerCase();

    if(

        selectedGender!="all"

        &&

        gender!=selectedGender

    ){

        score=-999;

    }



    /*
    ==========================
    Season Filter
    ==========================
    */

    if(

        selectedSeason!="season-any"

    ){

        const season=

        (f.season||[])

        .join(" ")

        .toLowerCase();



        if(

            !season.includes(

                selectedSeason

            )

        ){

            score-=35;

        }

    }



    /*
    ==========================
    Performance Filter
    ==========================
    */

    if(

        selectedPerformance!="performance-any"

    ){

        if(

            (f.performance||"")

            .toLowerCase()

            !=

            selectedPerformance

        ){

            score-=25;

        }

    }



    /*
    ==========================
    LFIS Recommendation Bonus
    ==========================
    */

    if(

        f.recommendationScore

    ){

        score +=

        f.recommendationScore/4;

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



      out.innerHTML = `

<div class="recommendation">

    <p class="label">
        LFIS RECOMMENDATION
    </p>

    <h2>${best.name}</h2>

    <h3>${best.brand}</h3>

    <p><strong>${best.family}</strong></p>

    <div class="match">

        <span>LFIS Match</span>

        <div class="bar">
            <div class="fill" style="width:${percent}%"></div>
        </div>

        <strong>${percent}% Match</strong>

    </div>

    <hr>

    <h4>Your Scent Profile</h4>

    <p>

        Based on your search for
        "<strong>${input}</strong>",
        LFIS analyzed your preferred mood, occasion, fragrance family and overall style to find the closest match.

    </p>

    <hr>

    <h4>Fragrance Personality</h4>

    <p>

        ${best.personality || "Modern, refined and versatile."}

    </p>

    <hr>

    <h4>Perfect For</h4>

    <p>

        ${(best.occasion || []).map(x => "✓ " + x).join(" • ")}

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

    <h4>Editorial</h4>

    <p class="editorial">

        ${best.editorial}

    </p>

    <hr>

    <h4>Consultant's Recommendation</h4>

    <p class="consultant">

        ${best.consultant}

    </p>

    <hr>

    <h4>Why LFIS Chose This Fragrance</h4>

    <ul>

        ${
        (best.occasion || [])
            .slice(0,2)
            .map(x=>`<li>Excellent for <strong>${x}</strong>.</li>`)
            .join("")
        }

        ${
        (best.style || [])
            .slice(0,2)
            .map(x=>`<li>Matches a <strong>${x}</strong> fragrance style.</li>`)
            .join("")
        }

        ${
        (best.mood || [])
            .slice(0,2)
            .map(x=>`<li>Creates a <strong>${x}</strong> impression.</li>`)
            .join("")
        }

    </ul>

    <hr>

    <h4>LFIS Verdict</h4>

    <p>

        ${
            best.recommendationScore

            ?

            `With an LFIS Recommendation Score of <strong>${best.recommendationScore}/100</strong>, this fragrance is one of the strongest matches currently available in the LFIS fragrance library.`

            :

            `A highly recommended fragrance based on your consultation profile.`
        }

    </p>

    ${
        top3.length > 1

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



function fill(text){

    document.getElementById("q").value = text;

    ask();

}
