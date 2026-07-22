let fragrances = [];

fetch("data/fragrances.json")
  .then(response => response.json())
  .then(data => {
    fragrances = data;
    console.log("LFIS Library Loaded", fragrances);
  });

function ask() {

    const q = document.getElementById("q").value.toLowerCase();

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

    const out = document.getElementById("out");
const button = document.querySelector("button");

button.disabled = true;

const messages = [

    "Consulting the fragrance library...",

    "Reviewing fragrance profiles...",

    "Finding your closest recommendation...",

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

        out.innerHTML=`
        <div class="loading">
        ${messages[index]}
        </div>
        `;

    }

},350);
    if(result){

        setTimeout(()=>{

clearInterval(interval);

button.disabled=false;

if(result){

out.innerHTML=`

<div class="recommendation">

<p class="label">

Based on your consultation...

</p>

<h2>${result.name}</h2>

<h3>${result.brand}</h3>

<p><strong>${result.family}</strong></p>

<p class="editorial">

${result.editorial}

</p>

<hr>

<p class="consultant">

${result.consultant}

</p>

</div>

`;

}else{

out.innerHTML=`

<div class="empty">

<h3>

I couldn't find the perfect match just yet.

</h3>

<p>

Try searching for:

office • fresh • woody • luxury • beach • date • executive

</p>

</div>

`;

}

},1400);
    }else{

        out.innerHTML = `
<div class="recommendation">

    <p class="label">
        Based on your consultation, I recommend
    </p>

    <h2>${result.name}</h2>

    <h3>${result.brand}</h3>

    <p><strong>${result.family}</strong></p>

    <p class="editorial">
        ${result.editorial}
    </p>

    <hr>

    <p class="consultant">
        ${result.consultant}
    </p>

</div>
`;

    }

}

function fill(text){
    document.getElementById("q").value = text;
    ask();
}
