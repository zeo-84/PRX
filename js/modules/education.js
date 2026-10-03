var Education = {
    init: function() {
        this.initTabs();
        this.initLibrary();
    },
    initTabs: function() {
        var tabs = document.querySelectorAll(".edu-tab");
        var contents = document.querySelectorAll(".edu-content");
        tabs.forEach(function(tab) {
            tab.addEventListener("click", function() {
                tabs.forEach(function(t) { t.classList.remove("active"); });
                contents.forEach(function(c) { c.classList.remove("active"); });
                tab.classList.add("active");
                var targetId = "tab-" + tab.dataset.tab;
                var target = document.getElementById(targetId);
                if (target) target.classList.add("active");
            });
        });
    },
    initLibrary: function() {
        var self = this;
        document.querySelectorAll(".btn-copy-library").forEach(function(btn) {
            btn.addEventListener("click", function() {
                self.copyLibraryPrompt(btn.dataset.prompt);
            });
        });
    },
    copyLibraryPrompt: function(type) {
        var prompts = {
            codereview: "You are a senior code reviewer. Review the following code for:\n1. Bugs and logic errors\n2. Security vulnerabilities\n3. Performance issues\n4. Code style and best practices\n5. Missing edge cases\n\nProvide specific, actionable feedback with code examples.",
            debug: "You are an expert debugger. Help me fix this issue:\n\n1. First, analyze the error message and stack trace\n2. Identify the root cause\n3. List 3 possible solutions\n4. Recommend the best solution\n5. Provide the fixed code\n\nError: [paste error]\nCode: [paste code]",
            docs: "You are a technical writer. Generate comprehensive documentation for the following code:\n\n1. Overview and purpose\n2. Installation and setup\n3. API reference (functions, parameters, return types)\n4. Usage examples\n5. Edge cases and error handling\n\nCode: [paste code]",
            tests: "You are a QA engineer. Generate comprehensive unit tests for the following code:\n\n1. Happy path tests\n2. Edge cases\n3. Error scenarios\n4. Mock dependencies\n5. Aim for 90%+ coverage\n\nUse Jest/Vitest. Code: [paste code]"
        };
        var prompt = prompts[type];
        if (prompt) {
            Helpers.copyToClipboard(prompt).then(function() {
                FormHandler.showError("Prompt copied to clipboard!");
            });
        }
    },
    generatePrompt: function(data) {
        var parts = [];
        // Role
        if (data.role) {
            parts.push("## ROLE\n\nYou are " + data.role + ".\n");
        }
        // Task
        if (data.task) {
            parts.push("## TASK\n\n" + data.task + "\n");
        }
        // Context
        if (data.context) {
            parts.push("## CONTEXT\n\n" + data.context + "\n");
        }
        // Constraints
        if (data.constraints) {
            var constraints = data.constraints.split("\n").filter(function(c) { return c.trim(); });
            if (constraints.length > 0) {
                parts.push("## CONSTRAINTS\n\n" + constraints.map(function(c) { return "- " + c.trim(); }).join("\n") + "\n");
            }
        }
        // Example
        if (data.example) {
            parts.push("## EXAMPLE\n\n" + data.example + "\n");
        }
        // Thinking Style
        if (data.thinking && data.thinking !== "none") {
            var thinkingMap = {
                "step-by-step": "Before answering, think step-by-step and show your reasoning.",
                "analyze": "First analyze the problem, then provide your solution."
            };
            parts.push("## THINKING PROCESS\n\n" + thinkingMap[data.thinking] + "\n");
        }
        // Self-Review
        if (data.review && data.review !== "none") {
            var reviewMap = {
                "security": "Before final answer, review for security vulnerabilities (XSS, SQL injection, auth issues).",
                "performance": "Before final answer, review for performance issues (N+1 queries, memory leaks, inefficient algorithms).",
                "both": "Before final answer, review for both security vulnerabilities and performance issues."
            };
            parts.push("## SELF-REVIEW\n\n" + reviewMap[data.review] + "\n");
        }
        // Output Format
        if (data.format) {
            parts.push("## OUTPUT FORMAT\n\n" + data.format + "\n");
        }
        return parts.join("\n---\n\n");
    }
};