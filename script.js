let quizData = [];

window.onload = async () => {
    try {
        const res = await fetch("https://backend-2-ivk0.onrender.com/api/questions");
        const data = await res.json();

        quizData = data;

        // ✅ Handle empty data
        if (!quizData.length) {
            document.getElementById("quiz").innerHTML = "<p>No questions available</p>";
            return;
        }

        let html = "";

        quizData.forEach((q, i) => {
            html += `
                <div class='q-box'>
                    <p><b>${i + 1}. ${q.question}</b></p>

                    <label>
                        <input type="radio" name="q${i}" value="${q.option1}">
                        ${q.option1}
                    </label><br>

                    <label>
                        <input type="radio" name="q${i}" value="${q.option2}">
                        ${q.option2}
                    </label><br>

                    <label>
                        <input type="radio" name="q${i}" value="${q.option3}">
                        ${q.option3}
                    </label><br>

                    <label>
                        <input type="radio" name="q${i}" value="${q.option4}">
                        ${q.option4}
                    </label>
                </div>
                <hr>
            `;
        });

        document.getElementById("quiz").innerHTML = html;

    } catch (err) {
        console.error("Error loading questions:", err);
        document.getElementById("quiz").innerHTML = "<p>Failed to load quiz</p>";
    }
};


// ✅ Check answers
function check() {
    let score = 0;
    let attempted = 0;

    quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);

        if (selected) {
            attempted++;

            if (selected.value === q.answer) {
                score++;
            }
        }
    });

    const resultElement = document.getElementById("score");

    resultElement.innerText = `Score: ${score} / ${quizData.length} (Attempted: ${attempted})`;

    resultElement.style.fontWeight = "bold";
    resultElement.style.fontSize = "20px";
    resultElement.style.marginTop = "15px";

    // ✅ Better result coloring
    if (score === quizData.length) {
        resultElement.style.color = "green";
    } else if (score >= quizData.length / 2) {
        resultElement.style.color = "orange";
    } else {
        resultElement.style.color = "red";
    }
}