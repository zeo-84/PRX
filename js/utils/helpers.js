var Helpers = {
    initParticles: function() {
        var container = document.getElementById("particles");
        if (!container) return;
        var count = window.innerWidth < 768 ? 15 : 30;
        for (var i = 0; i < count; i++) {
            var p = document.createElement("div");
            p.className = "particle";
            p.style.left = Math.random() * 100 + "%";
            p.style.animationDuration = (Math.random() * 15 + 10) + "s";
            p.style.animationDelay = (Math.random() * 10) + "s";
            var size = (Math.random() * 3 + 1) + "px";
            p.style.width = size;
            p.style.height = size;
            container.appendChild(p);
        }
    },
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },
    saveToStorage: function(key, data) {
        try {
            var existing = JSON.parse(localStorage.getItem(key) || "[]");
            existing.unshift(data);
            localStorage.setItem(key, JSON.stringify(existing));
            return true;
        } catch (e) { return false; }
    },
    copyToClipboard: function(text) {
        return navigator.clipboard.writeText(text).then(function() { return true; }).catch(function() {
            var ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            return true;
        });
    }
};