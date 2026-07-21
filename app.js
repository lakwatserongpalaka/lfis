// ==========================================================
// LFIS v1.0.0-alpha
// Release 4
// Consultation Flow
// ==========================================================

const consultationButton = document.getElementById("beginConsultation");
const textarea = document.getElementById("query");
const results = document.getElementById("results");

consultationButton.addEventListener("click", beginConsultation);

let consultation = {};

function beginConsultation(){

    const input = textarea.value.trim();

    if(input===""){
        showMessage("Tell us a little about the fragrance you're looking for before we begin.");
        return;
    }

    consultation.description=input;

    const understanding=[];

    const text=input.toLowerCase();

    if(text.includes("office")||text.includes("work"))
        understanding.push("Professional and office-friendly");

    if(text.includes("clean"))
        understanding.push("Clean and fresh");

    if(text.includes("fresh"))
        understanding.push("Fresh smelling");

    if(text.includes("hotel"))
        understanding.push("Luxury hotel ambience");

    if(text.includes("vanilla"))
        understanding.push("Warm vanilla");

    if(text.includes("woody"))
        understanding.push("Woody character");

    if(text.includes("date"))
        understanding.push("Suitable for evenings");

    if(understanding.length===0)
        understanding.push("A fragrance tailored to your personal taste");

    consultation.understanding=understanding;

    showUnderstanding();

}

function showUnderstanding(){

    let html=`

    <section class="detail fade">

        <p class="label">Here's what I understood</p>

        <h2>Your preferences</h2>

        <p>
        Based on what you've shared, I believe you're looking for a fragrance that is:
        </p>

        <ul class="understanding-list">
    `;

    consultation.understanding.forEach(item=>{
        html+=`<li>✓ ${item}</li>`;
    });

    html+=`

        </ul>

        <p>
        Did I understand your preferences correctly?
        </p>

        <button id="continueButton">
            Yes, continue
        </button>

    </section>

    `;

    results.innerHTML=html;

    document
    .getElementById("continueButton")
    .addEventListener("click",showFollowUp);

}

function showFollowUp(){

    results.innerHTML=`

    <section class="detail fade">

        <p class="label">
        One more thing...
        </p>

        <h2>
        How noticeable would you like your fragrance to be?
        </h2>

        <div class="choice" data-value="Subtle">

            Close to the skin

        </div>

        <div class="choice" data-value="Balanced">

            Balanced

        </div>

        <div class="choice" data-value="Noticeable">

            Make an impression

        </div>

    </section>

    `;

    document.querySelectorAll(".choice").forEach(card=>{

        card.addEventListener("click",()=>{

            consultation.projection=card.dataset.value;

            prepareRecommendation();

        });

    });

}

function prepareRecommendation(){

    results.innerHTML=`

    <section class="detail fade">

        <p class="label">
        Preparing your recommendation...
        </p>

        <h2>
        Just a moment.
        </h2>

        <p>

        I'm reviewing everything you've shared.

        </p>

    </section>

    `;

    setTimeout(showRecommendation,1000);

}

function showRecommendation(){

    results.innerHTML = `

    <section class="detail fade recommendation">

        <p class="label">
            I have a recommendation I'd like you to consider
        </p>

        <h2 class="fragrance-title">
            Prada L'Homme
        </h2>

        <p class="brand-name">
            by Prada
        </p>

        <div class="confidence">

            <span class="confidence-number">94%</span>

            <span class="confidence-label">
                Editorial Match
            </span>

        </div>

        <hr>

        <h3>
            Why I chose this
        </h3>

        <p>

            You described wanting something clean,
            refined,
            professional,
            and quietly elegant.

            Prada L'Homme reflects those qualities beautifully through its soft iris,
            neroli,
            and clean musks.
            Rather than demanding attention,
            it creates the impression of effortless confidence.

        </p>

        <h3>
            You may enjoy this because...
        </h3>

        <ul class="recommendation-list">

            <li>🌿 Clean and elegant</li>

            <li>💼 Excellent for professional environments</li>

            <li>☀️ Comfortable all year round</li>

            <li>🤍 Refined rather than loud</li>

        </ul>

        <h3>
            Consultant's Note
        </h3>

        <blockquote>

            If you're searching for one fragrance that quietly carries you
            from an important meeting to dinner without ever feeling out of
            place, this is where I'd begin.

        </blockquote>

        <h3>
            What this is <em>not</em>
        </h3>

        <p>

            If you're looking for something sweet,
            playful,
            or designed to command attention the moment you enter a room,
            there are better choices than this.
            Prada L'Homme is intentionally understated.

        </p>

        <div class="recommendation-actions">

            <button>

                Compare Another

            </button>

            <button>

                Refine My Preferences

            </button>

            <button onclick="location.reload()">

                Start Over

            </button>

        </div>

    </section>

    `;

}
function showMessage(message){

    results.innerHTML=`

    <section class="detail">

        <p>${message}</p>

    </section>

    `;

}
