import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

router.get("/distance/stops/:id1/:id2", async (req, res) => {
  // Get distance between two stops, :id1 and :id2
  const stop1 = await prisma.stop.findFirstOrThrow({
    where: {
      id: parseInt(req.params.id1),
    },
  });

  const stop2 = await prisma.stop.findFirstOrThrow({
    where: {
      id: parseInt(req.params.id2),
    },
  });

  const distance = getDistanceFromLatLonInKm(
    stop1.lat,
    stop1.long,
    stop2.lat,
    stop2.long
  ).toFixed(3);
  res.status(200).json({ distance: distance });
});

router.get("/distance/lines/:id", async (req, res) => {
  // Get total distance of a line
  const allStops = await prisma.stop.findMany({
    where: {
      lineId: parseInt(req.params.id),
    },
    orderBy: {
      order: "asc",
    },
  });

  let totalDistance = 0;
  for (let i = 0; i < Object.keys(allStops).length - 1; i++) {
    console.log(allStops[i]);

    const distance = getDistanceFromLatLonInKm(
      allStops[i].lat,
      allStops[i].long,
      allStops[i + 1].lat,
      allStops[i + 1].long
    );
    totalDistance += distance;
    console.log(
      "calc between " +
        allStops[i].name +
        " and " +
        allStops[i + 1].name +
        ", distance is " +
        distance +
        " (total " +
        totalDistance +
        " )"
    );
  }

  res.status(200).json({ distance: totalDistance.toFixed(3) });
});

export default router;
