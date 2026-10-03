var Roles = {
    definitions: {
        frontend: {
            title: "Frontend Developer",
            icon: "fab fa-react",
            description: "Build user interfaces with modern frameworks",
            fields: [
                { id: "framework", label: "Framework", type: "select", options: ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Vanilla JS"] },
                { id: "language", label: "Language", type: "select", options: ["TypeScript", "JavaScript"] },
                { id: "uiLibrary", label: "UI Library", type: "select", options: ["Tailwind CSS", "Material UI", "Chakra UI", "shadcn/ui", "Bootstrap", "Ant Design", "None"] },
                { id: "stateManagement", label: "State Management", type: "select", options: ["Redux", "Zustand", "Context API", "Pinia", "Vuex", "None"] },
                { id: "responsive", label: "Responsive Design", type: "checkbox" },
                { id: "accessibility", label: "Accessibility (a11y)", type: "checkbox" },
                { id: "testing", label: "Testing (Jest/Cypress)", type: "checkbox" },
                { id: "performance", label: "Performance Optimization", type: "checkbox" }
            ]
        },
        backend: {
            title: "Backend Developer",
            icon: "fas fa-server",
            description: "Build APIs and server-side logic",
            fields: [
                { id: "language", label: "Language", type: "select", options: ["Node.js", "Python", "Go", "Rust", "Java", "C#", "PHP"] },
                { id: "framework", label: "Framework", type: "select", options: ["Express", "FastAPI", "Django", "Flask", "Spring Boot", "Laravel", "Gin", "Actix"] },
                { id: "database", label: "Database", type: "select", options: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"] },
                { id: "auth", label: "Authentication", type: "select", options: ["JWT", "OAuth", "Session", "API Key", "None"] },
                { id: "api", label: "API Type", type: "select", options: ["REST", "GraphQL", "gRPC", "WebSocket"] },
                { id: "caching", label: "Caching", type: "checkbox" },
                { id: "queue", label: "Message Queue", type: "checkbox" },
                { id: "microservices", label: "Microservices", type: "checkbox" }
            ]
        },
        database: {
            title: "Database Engineer",
            icon: "fas fa-database",
            description: "Design and optimize databases",
            fields: [
                { id: "dbType", label: "Database Type", type: "select", options: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra"] },
                { id: "orm", label: "ORM/ODM", type: "select", options: ["Prisma", "TypeORM", "Sequelize", "Mongoose", "SQLAlchemy", "None"] },
                { id: "migration", label: "Migration Tool", type: "select", options: ["Prisma Migrate", "TypeORM Migrations", "Alembic", "Flyway", "None"] },
                { id: "indexing", label: "Indexing Strategy", type: "checkbox" },
                { id: "partitioning", label: "Partitioning", type: "checkbox" },
                { id: "replication", label: "Replication", type: "checkbox" },
                { id: "backup", label: "Backup Strategy", type: "checkbox" }
            ]
        },
        blockchain: {
            title: "Blockchain Developer",
            icon: "fas fa-link",
            description: "Build decentralized applications",
            fields: [
                { id: "platform", label: "Platform", type: "select", options: ["Ethereum", "Solana", "Polygon", "BSC", "Avalanche", "Arbitrum"] },
                { id: "language", label: "Language", type: "select", options: ["Solidity", "Rust", "Move", "Vyper"] },
                { id: "framework", label: "Framework", type: "select", options: ["Hardhat", "Foundry", "Truffle", "Anchor", "Aptos SDK"] },
                { id: "standard", label: "Token Standard", type: "select", options: ["ERC-20", "ERC-721", "ERC-1155", "SPL", "None"] },
                { id: "testing", label: "Testing", type: "checkbox" },
                { id: "security", label: "Security Audit", type: "checkbox" },
                { id: "gas", label: "Gas Optimization", type: "checkbox" }
            ]
        },
        solidity: {
            title: "Solidity Developer",
            icon: "fab fa-ethereum",
            description: "Write smart contracts in Solidity",
            fields: [
                { id: "version", label: "Solidity Version", type: "select", options: ["0.8.x", "0.7.x", "0.6.x"] },
                { id: "contractType", label: "Contract Type", type: "select", options: ["Token", "NFT", "DEX", "Lending", "DAO", "Custom"] },
                { id: "standard", label: "Standard", type: "select", options: ["ERC-20", "ERC-721", "ERC-1155", "ERC-4626"] },
                { id: "security", label: "Security Patterns", type: "checkbox" },
                { id: "gas", label: "Gas Optimization", type: "checkbox" },
                { id: "upgradeable", label: "Upgradeable Pattern", type: "checkbox" },
                { id: "testing", label: "Testing (Hardhat/Foundry)", type: "checkbox" }
            ]
        },
        security: {
            title: "Security Engineer",
            icon: "fas fa-shield-halved",
            description: "Secure applications and infrastructure",
            fields: [
                { id: "domain", label: "Domain", type: "select", options: ["Web App", "API", "Cloud", "Network", "Mobile", "Smart Contract"] },
                { id: "audit", label: "Audit Type", type: "select", options: ["Penetration Test", "Code Review", "Vulnerability Assessment", "Compliance"] },
                { id: "standard", label: "Standard", type: "select", options: ["OWASP", "ISO 27001", "SOC 2", "GDPR", "HIPAA"] },
                { id: "scanning", label: "Automated Scanning", type: "checkbox" },
                { id: "encryption", label: "Encryption", type: "checkbox" },
                { id: "auth", label: "Authentication Review", type: "checkbox" },
                { id: "report", label: "Detailed Report", type: "checkbox" }
            ]
        },
        devops: {
            title: "DevOps Engineer",
            icon: "fas fa-infinity",
            description: "Automate deployment and infrastructure",
            fields: [
                { id: "cloud", label: "Cloud Provider", type: "select", options: ["AWS", "GCP", "Azure", "DigitalOcean", "Self-hosted"] },
                { id: "container", label: "Container", type: "select", options: ["Docker", "Kubernetes", "Both"] },
                { id: "ci", label: "CI/CD", type: "select", options: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI"] },
                { id: "iac", label: "Infrastructure as Code", type: "select", options: ["Terraform", "Pulumi", "CloudFormation", "Ansible"] },
                { id: "monitoring", label: "Monitoring", type: "checkbox" },
                { id: "logging", label: "Logging", type: "checkbox" },
                { id: "scaling", label: "Auto-scaling", type: "checkbox" }
            ]
        },
        mobile: {
            title: "Mobile Developer",
            icon: "fas fa-mobile-screen",
            description: "Build mobile applications",
            fields: [
                { id: "platform", label: "Platform", type: "select", options: ["iOS", "Android", "Cross-platform"] },
                { id: "framework", label: "Framework", type: "select", options: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"] },
                { id: "state", label: "State Management", type: "select", options: ["Redux", "Riverpod", "BLoC", "Provider", "None"] },
                { id: "navigation", label: "Navigation", type: "select", options: ["React Navigation", "Flutter Navigator", "SwiftUI", "None"] },
                { id: "offline", label: "Offline Support", type: "checkbox" },
                { id: "push", label: "Push Notifications", type: "checkbox" },
                { id: "analytics", label: "Analytics", type: "checkbox" }
            ]
        },
        uiux: {
            title: "UI/UX Designer",
            icon: "fas fa-pen-ruler",
            description: "Design user interfaces and experiences",
            fields: [
                { id: "tool", label: "Design Tool", type: "select", options: ["Figma", "Sketch", "Adobe XD", "Framer"] },
                { id: "style", label: "Design Style", type: "select", options: ["Modern", "Minimal", "Glassmorphism", "Neumorphism", "Material", "iOS"] },
                { id: "system", label: "Design System", type: "checkbox" },
                { id: "prototype", label: "Interactive Prototype", type: "checkbox" },
                { id: "responsive", label: "Responsive Design", type: "checkbox" },
                { id: "darkmode", label: "Dark Mode", type: "checkbox" },
                { id: "accessibility", label: "Accessibility", type: "checkbox" }
            ]
        },
        fullstack: {
            title: "Full-Stack Developer",
            icon: "fas fa-layer-group",
            description: "Build complete applications",
            fields: [
                { id: "frontend", label: "Frontend", type: "select", options: ["React", "Vue", "Angular", "Next.js", "Svelte"] },
                { id: "backend", label: "Backend", type: "select", options: ["Node.js", "Python", "Go", "Rust"] },
                { id: "database", label: "Database", type: "select", options: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"] },
                { id: "auth", label: "Authentication", type: "select", options: ["NextAuth", "Clerk", "Firebase", "Custom JWT"] },
                { id: "deployment", label: "Deployment", type: "select", options: ["Vercel", "AWS", "Docker", "Railway"] },
                { id: "testing", label: "Testing", type: "checkbox" },
                { id: "ci", label: "CI/CD", type: "checkbox" },
                { id: "docs", label: "Documentation", type: "checkbox" }
            ]
        },
        ai: {
            title: "AI/ML Engineer",
            icon: "fas fa-robot",
            description: "Build AI and machine learning models",
            fields: [
                { id: "framework", label: "Framework", type: "select", options: ["PyTorch", "TensorFlow", "JAX", "scikit-learn"] },
                { id: "task", label: "Task", type: "select", options: ["Classification", "Regression", "NLP", "Computer Vision", "Generative"] },
                { id: "model", label: "Model Type", type: "select", options: ["Transformer", "CNN", "RNN", "GAN", "Diffusion"] },
                { id: "training", label: "Training Strategy", type: "select", options: ["From Scratch", "Fine-tuning", "Transfer Learning"] },
                { id: "deployment", label: "Deployment", type: "select", options: ["FastAPI", "Flask", "TorchServe", "TensorFlow Serving"] },
                { id: "evaluation", label: "Evaluation Metrics", type: "checkbox" },
                { id: "monitoring", label: "Model Monitoring", type: "checkbox" }
            ]
        },
        data: {
            title: "Data Scientist",
            icon: "fas fa-chart-line",
            description: "Analyze data and build insights",
            fields: [
                { id: "language", label: "Language", type: "select", options: ["Python", "R", "SQL"] },
                { id: "library", label: "Library", type: "select", options: ["Pandas", "NumPy", "Polars", "Dask"] },
                { id: "visualization", label: "Visualization", type: "select", options: ["Matplotlib", "Seaborn", "Plotly", "D3.js"] },
                { id: "analysis", label: "Analysis Type", type: "select", options: ["Exploratory", "Statistical", "Predictive", "Prescriptive"] },
                { id: "reporting", label: "Reporting", type: "checkbox" },
                { id: "automation", label: "Automation", type: "checkbox" },
                { id: "dashboard", label: "Dashboard", type: "checkbox" }
            ]
        }
    },
    get: function(roleId) {
        return this.definitions[roleId] || null;
    },
    getAll: function() {
        var self = this;
        return Object.keys(this.definitions).map(function(key) {
            var def = self.definitions[key];
            return { id: key, title: def.title, icon: def.icon, description: def.description, fields: def.fields };
        });
    }
};