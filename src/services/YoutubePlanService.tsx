import placeDB from '../models/Place';
import youtube from '../api/youtube';
import googleMapTextSearch from '../api/google/MapTextSearch';

interface Location {
    nation?: string;
    city?: string;
}

interface YouTubeData {
    place: string;
    [key: string]: any; // Other properties can be added dynamically
}

interface GooglePlaceInfo {
    name: string;
    formatted_address: string;
    rating: number;
    user_ratings_total: number;
    place_id: string;
    types: string[];
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

interface PlaceData {
    platform: string;
    place: string;
    address: string;
    city: string;
    nation: string;
    url: string;
    rate: number;
    rate_count: number;
    place_id: string;
    types: string[];
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export const createPlan = async (location: Location = {}): Promise<void> => {
    const { nation, city } = location;
    const url = 'BwUx4iAWiIo';
    const places = await getPlacesFromYoutube(nation || '', city || '', url);
};

const getPlacesFromYoutube = async (nation: string, city: string, url: string): Promise<PlaceData[]> => {
    const youTubeData: YouTubeData[] = await youtube(url); // Get Youtube data
    const placesFromYoutube = await addInformationUsingGoogleMapApi(youTubeData, nation, city, url); // Get enhanced data
    await savePlaces(placesFromYoutube); // Save to Database
    return placesFromYoutube;
};

const addInformationUsingGoogleMapApi = async (youTubeData: YouTubeData[], nation: string, city: string, url: string): Promise<PlaceData[]> => {
    const newDataArray = await Promise.all(
        youTubeData.map(async (element): Promise<PlaceData[] | null> => {
            const googlePlaceInfos: GooglePlaceInfo[] = await googleMapTextSearch(element.place, city);
            if (!googlePlaceInfos || googlePlaceInfos.length === 0) return null;
            return googlePlaceInfos.map((googlePlaceInfo): PlaceData => ({
                ...element,
                platform: 'youtube',
                place: googlePlaceInfo.name,
                address: googlePlaceInfo.formatted_address,
                city: city,
                nation: nation,
                url: url,
                rate: googlePlaceInfo.rating,
                rate_count: googlePlaceInfo.user_ratings_total,
                place_id: googlePlaceInfo.place_id,
                types: googlePlaceInfo.types,
                coordinates: {
                    latitude: googlePlaceInfo.geometry.location.lat,
                    longitude: googlePlaceInfo.geometry.location.lng,
                },
            }));
        })
    );
    return newDataArray.flat().filter((item): item is PlaceData => item !== null);
};

const savePlaces = async (placesFromYoutube: PlaceData[]): Promise<void> => {
    try {
        for (const placeFromApi of placesFromYoutube) {
            await placeDB.create(placeFromApi);
        }
    } catch (error) {
        throw error;
    }
};
