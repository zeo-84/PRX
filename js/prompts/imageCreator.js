var ImageCreatorPrompt = {
    labels: {
        aiTool: { midjourney: "Midjourney v6", dalle3: "DALL-E 3", "stable-diffusion": "Stable Diffusion XL", firefly: "Adobe Firefly" },
        artStyle: { photorealistic: "Photorealistic", "digital-art": "Digital Art", anime: "Anime", "oil-painting": "Oil Painting", watercolor: "Watercolor", "3d-render": "3D Render", "pixel-art": "Pixel Art", cyberpunk: "Cyberpunk" },
        mood: { bright: "Bright & Cheerful", dark: "Dark & Moody", dramatic: "Dramatic", peaceful: "Peaceful", mysterious: "Mysterious" },
        lighting: { natural: "Natural Light", "golden-hour": "Golden Hour", studio: "Studio", neon: "Neon", dramatic: "Dramatic" },
        quality: { standard: "Standard", high: "High Quality", ultra: "Ultra / Masterpiece" }
    },
    label: function(field, value) {
        return (this.labels[field] && this.labels[field][value]) || value || "N/A";
    },
    styleKeywords: {
        photorealistic: "photorealistic, hyperrealistic, ultra detailed, 8k uhd, DSLR photo",
        "digital-art": "digital art, digital painting, artstation trending",
        anime: "anime style, manga, cel shaded, vibrant colors, studio ghibli inspired",
        "oil-painting": "oil painting, classical art, canvas texture, brush strokes",
        watercolor: "watercolor painting, soft edges, paper texture",
        "3d-render": "3D render, octane render, cinema 4D, unreal engine 5, ray tracing",
        "pixel-art": "pixel art, 16-bit, retro game aesthetic, crisp pixels",
        cyberpunk: "cyberpunk, neon lights, futuristic, blade runner aesthetic, rain"
    },
    moodKeywords: {
        bright: "bright, cheerful, vibrant, uplifting, sunny",
        dark: "dark, moody, somber, mysterious, shadowy",
        dramatic: "dramatic, intense, powerful, cinematic, epic",
        peaceful: "peaceful, calm, serene, tranquil, zen",
        mysterious: "mysterious, enigmatic, foggy, atmospheric, intriguing"
    },
    lightingKeywords: {
        natural: "natural lighting, sunlight, outdoor light",
        "golden-hour": "golden hour lighting, warm sunset glow, long shadows",
        studio: "studio lighting, professional lighting setup, softbox",
        neon: "neon lighting, glowing neon signs, cyberpunk lights, colorful glow",
        dramatic: "dramatic lighting, chiaroscuro, high contrast, strong shadows"
    },
    qualityKeywords: {
        standard: "good quality, detailed",
        high: "high quality, very detailed, sharp focus",
        ultra: "masterpiece, best quality, ultra detailed, 8k, extremely detailed"
    },
    generate: function(data) {
        var styleKw = this.styleKeywords[data.artStyle] || data.artStyle;
        var moodKw = this.moodKeywords[data.mood] || data.mood;
        var lightKw = this.lightingKeywords[data.lighting] || data.lighting;
        var qualKw = this.qualityKeywords[data.quality] || data.quality;

        var optimized = "";
        if (data.aiTool === "midjourney") {
            optimized = data.description + ", " + styleKw + ", " + moodKw + ", " + lightKw + ", " + qualKw + ", --ar " + data.aspectRatio + " --v 6 --style raw";
        } else if (data.aiTool === "dalle3") {
            optimized = "Create a " + this.label("artStyle", data.artStyle) + " image: " + data.description + ". Mood: " + data.mood + ". Lighting: " + data.lighting + ". Quality: " + data.quality + ". Aspect ratio: " + data.aspectRatio + ".";
        } else if (data.aiTool === "stable-diffusion") {
            optimized = "(" + data.description + ":1.3), " + styleKw + ", " + moodKw + ", " + lightKw + ", " + qualKw + ", masterpiece, best quality, highly detailed";
        } else {
            optimized = data.description + ". Style: " + data.artStyle + ". Mood: " + data.mood + ". Lighting: " + data.lighting + ". Quality: " + data.quality + ".";
        }

        var negative = data.negativePrompt || "ugly, blurry, low quality, distorted, deformed, watermark, text";

        return [
            "# AI IMAGE GENERATION PROMPT",
            "# Tool: " + this.label("aiTool", data.aiTool),
            "",
            "---",
            "",
            "## IMAGE DESCRIPTION",
            "",
            data.description,
            "",
            "---",
            "",
            "## SETTINGS",
            "",
            "- **AI Tool:** " + this.label("aiTool", data.aiTool),
            "- **Art Style:** " + this.label("artStyle", data.artStyle),
            "- **Mood:** " + this.label("mood", data.mood),
            "- **Lighting:** " + this.label("lighting", data.lighting),
            "- **Aspect Ratio:** " + data.aspectRatio,
            "- **Quality:** " + this.label("quality", data.quality),
            "",
            "---",
            "",
            "## OPTIMIZED PROMPT",
            "",
            optimized,
            "",
            "---",
            "",
            "## NEGATIVE PROMPT",
            "",
            negative,
            "",
            "---",
            "",
            "## TIPS FOR BEST RESULTS",
            "",
            "- Try different variations of the prompt",
            "- Adjust the aspect ratio for different use cases",
            "- Experiment with different art styles",
            "- Use the negative prompt to exclude unwanted elements",
            "- Generate multiple variations and pick the best"
        ].join("\n");
    }
};