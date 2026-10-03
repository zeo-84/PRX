var PromptGenerator = {
    init: function() {
        console.log('PromptGenerator.init() called');
        var self = this;
        var btns = document.querySelectorAll(".btn-generate");
        console.log('Generate buttons found:', btns.length);
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var formType = this.getAttribute("data-form");
                console.log('Generate clicked, form:', formType);
                self.generate(formType);
            });
        }
        var copyBtn = document.getElementById("copyBtn");
        if (copyBtn) copyBtn.addEventListener("click", function() { self.copy(); });
        var saveBtn = document.getElementById("saveBtn");
        if (saveBtn) saveBtn.addEventListener("click", function() { self.save(); });
        var clearBtn = document.getElementById("clearBtn");
        if (clearBtn) clearBtn.addEventListener("click", function() { self.clear(); });
        console.log('PromptGenerator initialized');
    },
    generate: function(formType) {
        console.log('PromptGenerator.generate called with:', formType);
        var mode = formType || ModeSelector.getMode();
        console.log('Mode:', mode);
        var validation = FormHandler.validate(mode);
        console.log('Validation:', validation);
        if (!validation.valid) {
            FormHandler.showError(validation.message);
            return;
        }
        var data = FormHandler.getFormData(mode);
        console.log('Form data:', data);
        var prompt = "";
        if (mode === "app") {
            prompt = AppBuilderPrompt.generate(data);
        } else if (mode === "skill") {
            prompt = SkillLearnerPrompt.generate(data);
        } else if (mode === "image") {
            prompt = ImageCreatorPrompt.generate(data);
        } else if (mode === "education") {
            prompt = SmartEducation.generatePrompt(data);
        } else {
            prompt = "Unknown mode: " + mode;
        }
        console.log('Generated prompt length:', prompt.length);
        this.displayOutput(prompt);
    },
    displayOutput: function(prompt) {
        var output = document.getElementById("outputContent");
        if (!output) {
            console.error('outputContent not found!');
            return;
        }
        output.textContent = prompt;
        output.classList.add("has-content");
        output.scrollIntoView({ behavior: "smooth", block: "nearest" });
        console.log('Output displayed');
    },
    copy: function() {
        var output = document.getElementById("outputContent");
        if (!output || !output.classList.contains("has-content")) return;
        var self = this;
        Helpers.copyToClipboard(output.textContent).then(function() {
            var copyBtn = document.getElementById("copyBtn");
            var original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.color = "var(--success)";
            setTimeout(function() {
                copyBtn.innerHTML = original;
                copyBtn.style.color = "";
            }, 2000);
        });
    },
    save: function() {
        var output = document.getElementById("outputContent");
        if (!output || !output.classList.contains("has-content")) return;
        var data = {
            id: Helpers.generateId(),
            mode: ModeSelector.getMode(),
            content: output.textContent,
            createdAt: new Date().toISOString()
        };
        Helpers.saveToStorage("promptforge_prompts", data);
        FormHandler.showError("Prompt saved!");
    },
    clear: function() {
        var output = document.getElementById("outputContent");
        if (!output) return;
        output.innerHTML = '<div class="output-placeholder"><i class="fas fa-wand-magic-sparkles"></i><p>Your generated prompt will appear here</p></div>';
        output.classList.remove("has-content");
    }
};