const axios = require('axios');
const NodeCache = require('node-cache');
const aiCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

const generateItinerary = async (tripDetails) => {
    const { destination, budget, days, travelStyle, foodPreferences, accessibilityNeeds } = tripDetails;

    const prompt = `
    Generate a detailed day-wise travel itinerary for a trip to ${destination}.
    Details:
    - Duration: ${days} days
    - Budget: ${budget}
    - Style: ${travelStyle}
    - Food: ${foodPreferences}
    - Accessibility: ${accessibilityNeeds}

    Return the response as a valid JSON object with the following structure:
    {
        "totalEstimatedCost": number,
        "days": [
            {
                "day": number,
                "activities": [
                    {
                        "name": "string",
                        "description": "string",
                        "startTime": "HH:MM",
                        "endTime": "HH:MM",
                        "location": { "name": "string", "address": "string" },
                        "cost": number,
                        "category": "string"
                    }
                ]
            }
        ],
        "localTips": ["string"],
        "packingChecklist": ["string"]
    }
    Include optimized routes between activities. Focus on ${travelStyle} experiences.
    Only return the JSON object, nothing else.
    `;

    const cacheKey = JSON.stringify(tripDetails);
    const cachedResponse = aiCache.get(cacheKey);
    if (cachedResponse) {
        console.log('Serving from cache:', cacheKey);
        return cachedResponse;
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;
        // Clean the response (sometimes Gemini wraps JSON in markdown blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0]);
            aiCache.set(cacheKey, result);
            return result;
        }
        throw new Error('Invalid AI response format');
    } catch (error) {
        console.error('AI Generation Error:', error.response?.data || error.message);
        throw new Error('Failed to generate itinerary');
    }
};

const chatWithAssistant = async (message, context) => {
    const prompt = `
    You are a professional travel assistant. 
    User Question: "${message}"
    Trip Context: ${JSON.stringify(context)}

    Provide a helpful, concise response. If the user asks for recommendations, give 3-5 specific places.
    If the user asks to modify the itinerary, explain how they should do it or provide suggestions.
    Return the response as a plain string.
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('AI Chat Error:', error.response?.data || error.message);
        throw new Error('Failed to get AI response');
    }
};

module.exports = { generateItinerary, chatWithAssistant };
