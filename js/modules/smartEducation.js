var SmartEducation = {
    currentRole: null,
    init: function() {
        console.log('SmartEducation.init() called');
        this.renderRoleSelector();
        this.initTabs();
        this.initLibrary();
        console.log('SmartEducation initialized');
    },
    renderRoleSelector: function() {
        var container = document.getElementById("role-selector-container");
        console.log('role-selector-container:', container);
        if (!container) {
            console.error('role-selector-container not found!');
            return;
        }
        var roles = Roles.getAll();
        console.log('Roles loaded:', roles.length);
        var html = '<div class="role-grid">';
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            html += '<div class="role-card" data-role="' + role.id + '">';
            html += '<i class="' + role.icon + '"></i>';
            html += '<h4>' + role.title + '</h4>';
            html += '<p>' + role.description + '</p>';
            html += '</div>';
        }
        html += '</div>';
        container.innerHTML = html;
        var self = this;
        var cards = container.querySelectorAll(".role-card");
        console.log('Role cards created:', cards.length);
        for (var j = 0; j < cards.length; j++) {
            cards[j].addEventListener("click", function() {
                var roleId = this.getAttribute("data-role");
                console.log('Role clicked:', roleId);
                self.selectRole(roleId);
            });
        }
    },
    selectRole: function(roleId) {
        console.log('selectRole called with:', roleId);
        this.currentRole = roleId;
        var role = Roles.get(roleId);
        if (!role) {
            console.error('Role not found:', roleId);
            return;
        }
        var cards = document.querySelectorAll(".role-card");
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove("active");
        }
        var activeCard = document.querySelector('.role-card[data-role="' + roleId + '"]');
        if (activeCard) activeCard.classList.add("active");
        this.renderDynamicFields(role);
    },
    renderDynamicFields: function(role) {
        var container = document.getElementById("dynamic-fields-container");
        console.log('dynamic-fields-container:', container);
        if (!container) {
            console.error('dynamic-fields-container not found!');
            return;
        }
        var html = '<h3><i class="' + role.icon + '"></i> ' + role.title + ' Configuration</h3>';
        html += '<div class="form-grid">';
        for (var i = 0; i < role.fields.length; i++) {
            var field = role.fields[i];
            html += '<div class="form-group">';
            if (field.type === "select") {
                html += '<label>' + field.label + '</label>';
                html += '<select id="edu_' + field.id + '">';
                for (var j = 0; j < field.options.length; j++) {
                    html += '<option value="' + field.options[j] + '">' + field.options[j] + '</option>';
                }
                html += '</select>';
            } else if (field.type === "checkbox") {
                html += '<label class="checkbox-item">';
                html += '<input type="checkbox" id="edu_' + field.id + '">';
                html += '<span>' + field.label + '</span>';
                html += '</label>';
            }
            html += '</div>';
        }
        html += '</div>';
        container.innerHTML = html;
        console.log('Dynamic fields rendered for:', role.title);
    },
    collectData: function() {
        var data = {
            role: this.currentRole,
            task: document.getElementById("eduTask") ? document.getElementById("eduTask").value : "",
            context: document.getElementById("eduContext") ? document.getElementById("eduContext").value : "",
            constraints: document.getElementById("eduConstraints") ? document.getElementById("eduConstraints").value : "",
            example: document.getElementById("eduExample") ? document.getElementById("eduExample").value : "",
            thinking: document.getElementById("eduThinking") ? document.getElementById("eduThinking").value : "none",
            review: document.getElementById("eduReview") ? document.getElementById("eduReview").value : "none",
            format: document.getElementById("eduFormat") ? document.getElementById("eduFormat").value : ""
        };
        if (this.currentRole) {
            var role = Roles.get(this.currentRole);
            if (role) {
                data.dynamicFields = {};
                for (var i = 0; i < role.fields.length; i++) {
                    var field = role.fields[i];
                    var el = document.getElementById("edu_" + field.id);
                    if (el) {
                        if (field.type === "checkbox") {
                            data.dynamicFields[field.id] = el.checked;
                        } else {
                            data.dynamicFields[field.id] = el.value;
                        }
                    }
                }
            }
        }
        return data;
    },
    generatePrompt: function(data) {
        var parts = [];
        var role = Roles.get(data.role);
        if (role) {
            parts.push("## ROLE\n\nYou are an expert " + role.title + " with deep knowledge of industry best practices, modern tools, and real-world experience.\n");
        }
        if (data.task) {
            parts.push("## TASK\n\n" + data.task + "\n");
        }
        if (data.dynamicFields && Object.keys(data.dynamicFields).length > 0) {
            parts.push("## TECHNICAL REQUIREMENTS\n");
            for (var key in data.dynamicFields) {
                var val = data.dynamicFields[key];
                if (typeof val === "boolean") {
                    if (val) parts.push("- " + key + ": Enabled");
                } else {
                    parts.push("- " + key + ": " + val);
                }
            }
            parts.push("");
        }
        if (data.context) {
            parts.push("## CONTEXT\n\n" + data.context + "\n");
        }
        if (data.constraints) {
            var constraints = data.constraints.split("\n").filter(function(c) { return c.trim(); });
            if (constraints.length > 0) {
                parts.push("## CONSTRAINTS\n");
                for (var i = 0; i < constraints.length; i++) {
                    parts.push("- " + constraints[i].trim());
                }
                parts.push("");
            }
        }
        if (data.example) {
            parts.push("## EXAMPLE\n\n" + data.example + "\n");
        }
        if (data.thinking && data.thinking !== "none") {
            var thinkingMap = {
                "step-by-step": "Before answering, think step-by-step and show your reasoning process.",
                "analyze": "First analyze the problem thoroughly, then provide your solution with justification."
            };
            parts.push("## THINKING PROCESS\n\n" + thinkingMap[data.thinking] + "\n");
        }
        if (data.review && data.review !== "none") {
            var reviewMap = {
                "security": "Before final answer, review for security vulnerabilities and best practices.",
                "performance": "Before final answer, review for performance optimization opportunities.",
                "both": "Before final answer, review for both security and performance issues."
            };
            parts.push("## SELF-REVIEW\n\n" + reviewMap[data.review] + "\n");
        }
        if (data.format) {
            parts.push("## OUTPUT FORMAT\n\n" + data.format + "\n");
        }
        return parts.join("\n\n");
    },
    initTabs: function() {
        var tabs = document.querySelectorAll(".edu-tab");
        var contents = document.querySelectorAll(".edu-content");
        console.log('Tabs found:', tabs.length);
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", function() {
                for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove("active");
                for (var k = 0; k < contents.length; k++) contents[k].classList.remove("active");
                this.classList.add("active");
                var targetId = "tab-" + this.getAttribute("data-tab");
                var target = document.getElementById(targetId);
                if (target) target.classList.add("active");
            });
        }
    },
    initLibrary: function() {
        var self = this;
        var btns = document.querySelectorAll(".btn-copy-library");
        console.log('Library buttons found:', btns.length);
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                self.copyLibraryPrompt(this.getAttribute("data-prompt"));
            });
        }
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
    }
};