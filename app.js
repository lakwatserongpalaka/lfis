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

    if(result){

        out.innerHTML = `
            <div class="recommendation">

                <h4>Recommended for You</h4>

                <h2>${result.name}</h2>

                <p><strong>${result.brand}</strong></p>

                <p>${result.editorial}</p>

                <hr>

                <p><em>${result.consultant}</em></p>

            </div>
        `;

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
