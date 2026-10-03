var ModeSelector = {
    currentMode: "app",
    init: function() {
        this.modeCards = document.querySelectorAll(".mode-card");
        this.navItems = document.querySelectorAll(".nav-item[data-mode]");
        this.formContainers = document.querySelectorAll(".form-container");
        var self = this;
        this.modeCards.forEach(function(card) {
            card.addEventListener("click", function() { self.switchMode(card.dataset.mode); });
        });
        this.navItems.forEach(function(item) {
            item.addEventListener("click", function() { self.switchMode(item.dataset.mode); });
        });
    },
    switchMode: function(mode) {
        this.currentMode = mode;
        this.modeCards.forEach(function(card) {
            card.classList.toggle("active", card.dataset.mode === mode);
        });
        this.navItems.forEach(function(item) {
            item.classList.toggle("active", item.dataset.mode === mode);
        });
        this.formContainers.forEach(function(form) {
            form.classList.remove("active");
        });
        var activeForm = document.getElementById(mode + "Form");
        if (activeForm) activeForm.classList.add("active");
        if (window.innerWidth <= 768) Sidebar.close();
    },
    getMode: function() { return this.currentMode; }
};