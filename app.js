// ==========================================================
// LFIS v1.0.0-alpha
// Sprint 1 - Consultation Engine (Release 3)
// ==========================================================

const consultationButton = document.getElementById("beginConsultation");
const textarea = document.getElementById("query");
const results = document.getElementById("results");

consultationButton.addEventListener("click", beginConsultation);

function beginConsultation() {

    const input = textarea.value.trim();

    if (input.length === 0) {

        alert("Please tell us what you're looking for first.");

        return;

    }

    const understanding = [];

    const text = input.toLowerCase();

    if (text.includes("office") || text.includes("work"))
        understanding.push("Professional and office-friendly");

    if (text.includes("clean"))
        understanding.push("Clean and fresh");

    if (text.includes("fresh"))
        understanding.push("Fresh smelling");

    if (text.includes("woody"))
        understanding.push("Woody character");

    if (text.includes("vanilla"))
        understanding.push("Warm vanilla");

    if (text.includes("date"))
        understanding.push("Suitable for evenings or date nights");

    if (text.includes("hotel"))
        understanding.push("Luxury hotel lobby feeling");

    if (text.includes("summer"))
        understanding.push("Comfortable in warm weather");

    if (text.includes("winter"))
        understanding.push("Ideal for cooler weather");

    if (text.includes("signature"))
        understanding.push("Versatile enough as a signature scent");

    if (understanding.length === 0) {

        understanding.push("You're looking for something unique to your preferences.");

    }

    showUnderstanding(understanding);

}

function showUnderstanding(items){

    let html = `

    <section class="detail">

        <p class="label">
            Consultation
        </p>

        <h2>
            Here's what I understood.
        </h2>

        <p>
            Based on what you've shared, I believe you're looking for a fragrance that is:
        </p>

        <ul class="understanding-list">

    `;

    items.forEach(item => {

        html += `<li>✓ ${item}</li>`;

    });

    html += `

        </ul>

        <p>

            Did I understand your preferences correctly?

        </p>

        <button id="continueButton">

            Continue →

        </button>

    </section>

    `;

    results.innerHTML = html;

    results.scrollIntoView({

        behavior: "smooth"

    });

    document
        .getElementById("continueButton")
        .addEventListener("click", nextStep);

}

function nextStep(){

    results.innerHTML = `

    <section class="detail">

        <p class="label">

            Coming Next

        </p>

        <h2>

            One more question...

        </h2>

        <p>

            Before recommending a fragrance, I'd like to understand one final preference.

        </p>

        <p>

            <strong>Do you prefer your fragrance to stay close to the skin or make a noticeable impression?</strong>

        </p>

        <button disabled>

            Coming in the next release

        </button>

    </section>

    `;

}
