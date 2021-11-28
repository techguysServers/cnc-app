import { createLocation } from "../../../lib/post";

export default async function handler(req, res) {
  // Get the request method
  let method = req.method;
  console.log(method);

  // GET
  if (method == "GET") {
    let request = req.query.request;
    // Check what is the GET request parameter
    switch (request) {
      case "place_details":
        let placeId = req.query.place_id;
        console.log(placeId);
        let url =
          "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
          placeId +
          "&fields=geometry&key=" +
          process.env.GOOGLE_MAP_API;
        var config = {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
        let apiResponse = await fetch(url, config);
        let placeDetails = await apiResponse.json();
        res.status(200).json({ data: placeDetails });
        break;

      default:
        res.status(200).json({ response: "nothing to see here" });
        break;
    }

    // POST
  } else if (method == "POST") {
    let body = req.body;
    // Check what is the POST request parameter
    let request = body.request;
    switch (request) {
      case "post_location":
        var response = await createLocation(req.body);
        res.status(200).json({ data: response });
        break;

      default:
        break;
    }
  }
}
