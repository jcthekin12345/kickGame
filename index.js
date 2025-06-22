let user = {
    name: "John",
    age: 22,
    str: 0,
    kicking_exp: 0,
}

const kick = document.getElementById("kick");
const xpText = document.getElementById("xp");
const rst = document.getElementById("reset");
const kickStr = document.getElementById("kicking-str");

// Initialize display values
xpText.innerHTML = `XP: ${user.kicking_exp}`;
kickStr.innerHTML = `Str: ${user.str}`;

let kicking_exp_goal = 10;
let kicking_exp_goal_multiplier = 2;

function upgrade() {
    if (user.kicking_exp >= kicking_exp_goal) {
        user.str += 1;
        user.kicking_exp = 0;
        kicking_exp_goal *= kicking_exp_goal_multiplier;
        updateDisplay();
    }
}

function updateDisplay() {
    xpText.innerHTML = `XP: ${user.kicking_exp}`;
    kickStr.innerHTML = `Str: ${user.str}`;
}

kick.addEventListener("click", () => {
    user.kicking_exp += 1;
    updateDisplay();
    upgrade();
});

rst.addEventListener("click", () => {
    user.kicking_exp = 0;
    user.str = 0;
    kicking_exp_goal = 10;
    updateDisplay();
});