class KickingGame {
    constructor() {
        this.player = {
            name: "Player",
            str: 0,
            exp: 0,
            level: 1
        };

        this.config = {
            baseExpRequired: 10,
            expMultiplier: 1.5,
            strGainPerLevel: 1
        };

        this.elements = {
            kick: document.getElementById("kick"),
            reset: document.getElementById("reset"),
            xpText: document.getElementById("xp"),
            strText: document.getElementById("kicking-str"),
            stats: document.getElementById("stats")
        };

        this.setupEventListeners();
        this.updateDisplay();
        this.setupAutosave();
        this.loadGame();
    }

    setupEventListeners() {
        this.elements.kick.addEventListener("click", () => this.handleKick());
        this.elements.reset.addEventListener("click", () => this.resetGame());
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") this.handleKick();
        });
    }

    handleKick() {
        this.player.exp++;
        this.checkLevelUp();
        this.updateDisplay();
        this.saveGame();
        this.animateKick();
    }

    checkLevelUp() {
        const expRequired = this.getExpRequired();
        if (this.player.exp >= expRequired) {
            this.player.exp -= expRequired;
            this.player.level++;
            this.player.str += this.config.strGainPerLevel;
            this.showLevelUpMessage();
        }
    }

    getExpRequired() {
        return Math.floor(this.config.baseExpRequired * 
            Math.pow(this.config.expMultiplier, this.player.level - 1));
    }

    updateDisplay() {
        const expRequired = this.getExpRequired();
        this.elements.xpText.innerHTML = 
            `XP: ${this.player.exp}/${expRequired} (Level ${this.player.level})`;
        this.elements.strText.innerHTML = `Strength: ${this.player.str}`;
    }

    resetGame() {
        if (confirm("Are you sure you want to reset your progress?")) {
            this.player.str = 0;
            this.player.exp = 0;
            this.player.level = 1;
            this.updateDisplay();
            this.saveGame();
        }
    }

    saveGame() {
        localStorage.setItem('kickingGameSave', JSON.stringify({
            player: this.player,
            lastSave: Date.now()
        }));
    }

    loadGame() {
        const savedGame = localStorage.getItem('kickingGameSave');
        if (savedGame) {
            const { player } = JSON.parse(savedGame);
            this.player = player;
            this.updateDisplay();
        }
    }

    setupAutosave() {
        setInterval(() => this.saveGame(), 30000); // Autosave every 30 seconds
    }

    showLevelUpMessage() {
        const message = document.createElement('div');
        message.textContent = `Level Up! You are now level ${this.player.level}!`;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            animation: fadeOut 2s forwards;
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }

    animateKick() {
        this.elements.kick.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.elements.kick.style.transform = 'scale(1)';
        }, 100);
    }
}

// Add some basic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    #kick {
        transition: transform 0.1s ease;
        background: #4CAF50;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        margin: 10px;
    }
    
    #reset {
        background: #f44336;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    #stats {
        background: rgba(0, 0, 0, 0.8);
        padding: 20px;
        border-radius: 10px;
        margin: 20px auto;
        max-width: 500px;
    }
`;
document.head.appendChild(style);

// Initialize the game
const game = new KickingGame();