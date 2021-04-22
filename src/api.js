export const extractLocations = events => {
    let extractLocations = events.map(event => event.location);
    // Set object stores unique values of any type ie will remove duplicates in extractLocations array
    let locations = [...new Set(extractLocations)];
    return locations;
}