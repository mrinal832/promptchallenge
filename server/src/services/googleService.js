const { google } = require('googleapis');
const axios = require('axios');

const calendar = google.calendar('v3');

/**
 * Sync trip itinerary to Google Calendar
 * @param {Object} trip - The trip object
 * @param {string} accessToken - User's Google OAuth access token
 */
const syncToCalendar = async (trip, accessToken) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    try {
        const events = trip.itinerary.days.flatMap(day => 
            day.activities.map(activity => ({
                summary: activity.name,
                location: activity.location.address,
                description: activity.description,
                start: {
                    dateTime: new Date(`${trip.startDate.toISOString().split('T')[0]}T${activity.startTime}:00Z`),
                    timeZone: 'UTC',
                },
                end: {
                    dateTime: new Date(`${trip.startDate.toISOString().split('T')[0]}T${activity.endTime}:00Z`),
                    timeZone: 'UTC',
                },
            }))
        );

        for (const event of events) {
            await calendar.events.insert({
                auth,
                calendarId: 'primary',
                resource: event,
            });
        }
        return { success: true, count: events.length };
    } catch (error) {
        console.error('Google Calendar Sync Error:', error);
        throw new Error('Failed to sync with Google Calendar');
    }
};

/**
 * Get place photos from Google Places API
 * @param {string} placeName - The name of the place
 */
const getPlaceDetails = async (placeName) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${apiKey}`
        );
        
        if (response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0];
        }
        return null;
    } catch (error) {
        console.error('Google Places API Error:', error);
        return null;
    }
};

module.exports = { syncToCalendar, getPlaceDetails };
