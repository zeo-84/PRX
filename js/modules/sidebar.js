var Sidebar = {
    init: function() {
        this.menuToggle = document.getElementById("menuToggle");
        this.sidebar = document.getElementById("sidebar");
        this.createOverlay();
        var self = this;
        if (this.menuToggle) {
            this.menuToggle.addEventListener("click", function() { self.toggle(); });
        }
        if (this.overlay) {
            this.overlay.addEventListener("click", function() { self.close(); });
        }
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") self.close();
        });
    },
    createOverlay: function() {
        this.overlay = document.createElement("div");
        this.overlay.className = "sidebar-overlay";
        this.overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99;opacity:0;pointer-events:none;transition:opacity 0.25s ease;";
        document.body.appendChild(this.overlay);
    },
    toggle: function() {
        this.sidebar.classList.toggle("open");
        this.overlay.style.opacity = this.sidebar.classList.contains("open") ? "1" : "0";
        this.overlay.style.pointerEvents = this.sidebar.classList.contains("open") ? "all" : "none";
    },
    close: function() {
        this.sidebar.classList.remove("open");
        this.overlay.style.opacity = "0";
        this.overlay.style.pointerEvents = "none";
    }
};