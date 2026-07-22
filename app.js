let fragrances = [];

fetch("data/fragrances.json")
  .then(response => response.json())
  .then(data => {
    fragrances = data;
    console.log("LFIS Library Loaded", fragrances);
  });

function ask() {

    const q = document.getElementById("q").value.toLowerCase();

    const result = fragrances.find(f =>
        f.keywords.some(k => q.includes(k))
    );

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

        out.innerHTML=`
            <div class="empty">

                <h3>No recommendation yet.</h3>

                <p>
                    I'm still learning.
                    Try words like:
                    office,
                    fresh,
                    woody,
                    elegant,
                    versatile,
                    hotel lobby,
                    vacation.
                </p>

            </div>
        `;

    }

}

function fill(text){
    document.getElementById("q").value = text;
    ask();
}
