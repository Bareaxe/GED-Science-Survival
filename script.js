document.addEventListener("DOMContentLoaded", () => {

  const scenarios = [
    {
      title: "🌡️ Lab Emergency: Melting Candy",
      text: "A student tests how temperature affects the time it takes candy to melt. The candy melts faster at higher temperatures.",
      question: "Which is the independent variable in this experiment?",
      choices: [
        "Time it takes the candy to melt",
        "Temperature of the environment",
        "Type of candy being tested",
        "The size of the candy pieces"
      ],
      correct: 1,
      explanation: "The independent variable is what is changed. The student changes the temperature."
    },
    {
      title: "📊 Data Alert: Plant Growth",
      text: "A plant grows from 10 cm to 22 cm in 4 weeks.",
      question: "What is the average growth per week?",
      choices: [
        "2 cm per week",
        "3 cm per week",
        "6 cm per week",
        "12 cm per week"
      ],
      correct: 1,
      explanation: "Growth = 22 - 10 = 12 cm total. Divide by 4 weeks: 12 ÷ 4 = 3 cm/week."
    },
    {
      title: "🧬 Cell Mystery",
      text: "A cell must control what enters and leaves in order to survive.",
      question: "Which cell structure controls what enters and leaves the cell?",
      choices: [
        "Nucleus",
        "Cell membrane",
        "Ribosome",
        "Mitochondria"
      ],
      correct: 1,
      explanation: "The cell membrane regulates what enters and leaves the cell."
    },
    {
      title: "⚡ Energy Challenge",
      text: "A roller coaster reaches the top of a hill, then speeds downward.",
      question: "What energy transformation is happening as it moves downhill?",
      choices: [
        "Chemical energy to thermal energy",
        "Kinetic energy to potential energy",
        "Potential energy to kinetic energy",
        "Thermal energy to chemical energy"
      ],
      correct: 2,
      explanation: "At the top it has high potential energy. As it falls, potential energy becomes kinetic energy."
    },
    {
      title: "🌍 Earth Science Storm Warning",
      text: "Warm ocean water can add energy to storms, making hurricanes stronger.",
      question: "Which statement best explains why hurricanes strengthen over warm water?",
      choices: [
        "Warm water decreases evaporation",
        "Warm water increases evaporation and energy in the atmosphere",
        "Warm water reduces wind speed",
        "Warm water lowers air pressure everywhere equally"
      ],
      correct: 1,
      explanation: "Warm water increases evaporation, adding heat energy and moisture that fuels storms."
    },
    {
      title: "🧪 Experimental Design Failure",
      text: "A student tests fertilizer effects but uses different amounts of water for each plant.",
      question: "What is the biggest problem with this experiment?",
      choices: [
        "There is no dependent variable",
        "There are multiple variables changing at once",
        "Fertilizer is not measurable",
        "Plants cannot be used in experiments"
      ],
      correct: 1,
      explanation: "Changing fertilizer AND water means results cannot be linked to one cause."
    },
    {
      title: "📈 Correlation Trap",
      text: "A study shows that as sunscreen sales increase, sunburn cases also increase.",
      question: "What is the most logical explanation?",
      choices: [
        "Sunscreen causes sunburn",
        "Sunburn causes people to buy sunscreen",
        "Hot sunny weather increases both sunscreen use and sunburn",
        "Sunscreen prevents all sunburn completely"
      ],
      correct: 2,
      explanation: "A third factor (sunny weather) increases both. Correlation does not prove causation."
    },
    {
      title: "🪨 Tectonic Shift",
      text: "Two tectonic plates grind past each other along a fault line.",
      question: "What natural event is most likely to occur?",
      choices: [
        "Tornado",
        "Earthquake",
        "Tsunami always occurs",
        "Drought"
      ],
      correct: 1,
      explanation: "Plate movement along faults releases energy as earthquakes."
    },
    {
      title: "🌡️ Heat Capacity Challenge",
      text: "Land heats up faster than water during the day and cools down faster at night.",
      question: "Which statement best explains this?",
      choices: [
        "Water has a lower specific heat than land",
        "Water has a higher specific heat than land",
        "Land is always colder than water",
        "Water blocks sunlight completely"
      ],
      correct: 1,
      explanation: "Water has higher specific heat, meaning it changes temperature more slowly."
    },
    {
      title: "🧮 Density Checkpoint",
      text: "A metal block has a mass of 200 g and a volume of 50 cm³.",
      question: "What is its density?",
      choices: [
        "4 g/cm³",
        "0.25 g/cm³",
        "150 g/cm³",
        "250 g/cm³"
      ],
      correct: 0,
      explanation: "Density = mass ÷ volume = 200 ÷ 50 = 4 g/cm³."
    }
  ];

  // GAME STATE
  let score = 0;
  let health = 3;
  let streak = 0;
  let level = 1;
  let progress = 0;

  let currentScenario = null;
  let usedIndexes = new Set();

  // ELEMENTS
  const scoreEl = document.getElementById("score");
  const healthEl = document.getElementById("health");
  const streakEl = document.getElementById("streak");
  const levelEl = document.getElementById("level");
  const progressBar = document.getElementById("progressBar");

  const scenarioTitle = document.getElementById("scenarioTitle");
  const scenarioText = document.getElementById("scenarioText");
  const questionText = document.getElementById("questionText");
  const choicesDiv = document.getElementById("choices");

  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");

  // SAFETY CHECK (prevents infinite loading bugs)
  if (!scoreEl || !scenarioTitle || !choicesDiv) {
    console.error("Missing required HTML elements. Check index.html IDs.");
    return;
  }

  function updateHUD() {
    scoreEl.textContent = score;
    healthEl.textContent = health;
    streakEl.textContent = streak;
    levelEl.textContent = level;
  }

  function updateProgress() {
    const percent = Math.floor((progress / scenarios.length) * 100);
    progressBar.style.width = percent + "%";
  }

  function getRandomScenario() {
    if (usedIndexes.size === scenarios.length) return null;

    let index;
    do {
      index = Math.floor(Math.random() * scenarios.length);
    } while (usedIndexes.has(index));

    usedIndexes.add(index);
    return scenarios[index];
  }

  function endGame(win) {
    choicesDiv.innerHTML = "";
    nextBtn.classList.add("hidden");

    if (win) {
      feedbackEl.textContent = "🏆 You survived the Science Lab! You’re GED-ready!";
      feedbackEl.style.color = "#27ae60";
    } else {
      feedbackEl.textContent = "💥 Lab Failure! You ran out of health. Try again!";
      feedbackEl.style.color = "#e74c3c";
    }

    restartBtn.classList.remove("hidden");
  }

  function renderChoices() {
    choicesDiv.innerHTML = "";

    currentScenario.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;

      btn.addEventListener("click", () => handleAnswer(idx, btn));
      choicesDiv.appendChild(btn);
    });
  }

  function loadScenario() {
    currentScenario = getRandomScenario();

    if (!currentScenario) {
      endGame(true);
      return;
    }

    scenarioTitle.textContent = currentScenario.title;
    scenarioText.textContent = currentScenario.text;
    questionText.textContent = currentScenario.question;

    feedbackEl.textContent = "";
    feedbackEl.style.color = "#111";

    nextBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");

    renderChoices();
    updateProgress();
  }

  function handleAnswer(selected, btnClicked) {
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach(b => b.disabled = true);

    if (selected === currentScenario.correct) {
      btnClicked.classList.add("correct");

      score += 100;
      streak += 1;

      if (streak % 3 === 0) {
        score += 50;
        feedbackEl.textContent = `✅ Correct! Bonus +50 for streak! ${currentScenario.explanation}`;
      } else {
        feedbackEl.textContent = `✅ Correct! ${currentScenario.explanation}`;
      }

      feedbackEl.style.color = "#27ae60";
    } else {
      btnClicked.classList.add("wrong");
      buttons[currentScenario.correct].classList.add("correct");

      health -= 1;
      streak = 0;

      feedbackEl.textContent = `❌ Incorrect. ${currentScenario.explanation}`;
      feedbackEl.style.color = "#e74c3c";
    }

    progress += 1;

    if (progress % 3 === 0) {
      level += 1;
    }

    updateHUD();
    updateProgress();

    if (health <= 0) {
      endGame(false);
    } else {
      nextBtn.classList.remove("hidden");
    }
  }

  // BUTTON EVENTS
  nextBtn.addEventListener("click", () => {
    loadScenario();
  });

  restartBtn.addEventListener("click", () => {
    score = 0;
    health = 3;
    streak = 0;
    level = 1;
    progress = 0;
    usedIndexes.clear();

    restartBtn.classList.add("hidden");
    updateHUD();
    updateProgress();
    loadScenario();
  });

  // START GAME
  updateHUD();
  updateProgress();
  loadScenario();

});
