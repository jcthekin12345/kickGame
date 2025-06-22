let user = {
    name: "John",
    age: 22,
    str: 0,
    kicking_exp: 0,
}


const kick = document.getElementById("kick");
const xpText = document.getElementById("xp");
const rst = document.getElementById("reset");
const kickStr = document.getElementById("kicking-str")

kick.addEventListener("click", () => {
    upgrade();
    user.kicking_exp += 1;
    xpText.innerHTML = `XP: ${user.kicking_exp}`;
});

rst.addEventListener("click", () => {
    user.kicking_exp = 0;
    xpText.innerHTML = `XP: ${user.kicking_exp}`;
})

let kicking_exp_goal = 10;
let kicking_exp_goal_multiplier = 2;
let strength = 0;

function upgrade() {
    if (user.kicking_exp >= kicking_exp_goal) {
        strength += 1;
        kickStr.innerHTML = `Str: ${strength}`
        user.kicking_exp = 0;
        kicking_exp_goal *= kicking_exp_goal_multiplier;
    }
}


