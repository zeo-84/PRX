var FormHandler = {
    init: function() {
        console.log('FormHandler initialized');
    },
    val: function(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
    },
    getFormData: function(mode) {
        var data = {};
        if (mode === "app") {
            data.projectName = this.val("projectName");
            data.projectType = this.val("projectType");
            data.frontendFramework = this.val("frontendFramework");
            data.backendFramework = this.val("backendFramework");
            data.database = this.val("database");
            data.language = this.val("language");
            data.complexity = this.val("complexity");
            data.designStyle = this.val("designStyle");
            data.description = this.val("projectDesc");
            data.pages = this.val("pages");
            data.additionalNotes = this.val("additionalNotes");
            data.features = [];
            var checkboxes = document.querySelectorAll("#appForm .checkbox-item input[type=checkbox]:checked");
            for (var i = 0; i < checkboxes.length; i++) {
                data.features.push(checkboxes[i].value);
            }
        }
        if (mode === "skill") {
            data.skillName = this.val("skillName");
            data.currentLevel = this.val("currentLevel");
            data.learningGoal = this.val("learningGoal");
            data.dailyTime = this.val("dailyTime");
            data.timeline = this.val("timeline");
            data.prerequisites = this.val("prerequisites");
            data.challenges = this.val("challenges");
        }
        if (mode === "image") {
            data.description = this.val("imageDesc");
            data.aiTool = this.val("aiTool");
            data.artStyle = this.val("artStyle");
            data.mood = this.val("mood");
            data.lighting = this.val("lighting");
            data.aspectRatio = this.val("aspectRatio");
            data.quality = this.val("quality");
            data.negativePrompt = this.val("negativePrompt");
        }
        if (mode === "education") {
            var eduData = SmartEducation.collectData();
            data.role = eduData.role;
            data.task = eduData.task;
            data.context = eduData.context;
            data.constraints = eduData.constraints;
            data.example = eduData.example;
            data.thinking = eduData.thinking;
            data.review = eduData.review;
            data.format = eduData.format;
            data.dynamicFields = eduData.dynamicFields;
        }
        return data;
    },
    validate: function(mode) {
        var data = this.getFormData(mode);
        if (mode === "app") {
            if (!data.projectName) return { valid: false, message: "Project name is required." };
            if (!data.projectType) return { valid: false, message: "Please select a project type." };
            if (!data.description) return { valid: false, message: "Project description is required." };
        }
        if (mode === "skill") {
            if (!data.skillName) return { valid: false, message: "Skill name is required." };
        }
        if (mode === "image") {
            if (!data.description) return { valid: false, message: "Image description is required." };
        }
        if (mode === "education") {
            if (!data.role) return { valid: false, message: "Please select a role first." };
            if (!data.task) return { valid: false, message: "Task is required." };
        }
        return { valid: true };
    },
    showError: function(message) {
        var toast = document.createElement("div");
        toast.style.cssText = "position:fixed;top:24px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ef4444,#dc2626);color:white;padding:14px 28px;border-radius:12px;font-family:Inter,sans-serif;font-size:14px;font-weight:600;z-index:10000;box-shadow:0 8px 30px rgba(239,68,68,0.3);";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s";
            setTimeout(function() { toast.remove(); }, 300);
        }, 3000);
    }
};