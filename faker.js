
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function faker() {
    console.log("Generating fake Zurich data...")
    
    const categories = await create_categories()
    console.log("✔️ Categories")

    const lines = await create_lines(categories)
    console.log("✔️ Lines")

    await create_stops(lines)
    console.log("✔️ Stops")

    console.log("All done!")
}

async function create_categories() {
    const categories = await prisma.category.createMany({
        data: [
            { color: '#ffb700', name: "Metro" },
            { color: '#c6505a', name: "Tramway" },
            { color: '#4e7026', name: "Bus" }
        ]
    })
    
    return await prisma.category.findMany()
}


async function create_lines(categories) {
    const lines = await prisma.line.createMany({
        data: [
            { name: "A", categoryId:1, firstDeparture: "05:30", lastDeparture: "02:00"},
            { name: "B", categoryId:1, firstDeparture: "05:30", lastDeparture: "02:00"},
            { name: "C", categoryId:1, firstDeparture: "05:30", lastDeparture: "02:00"},
            { name: "T1", categoryId:2, firstDeparture: "05:30", lastDeparture: "02:25"},
            { name: "T2", categoryId:2, firstDeparture: "05:30", lastDeparture: "02:35"},
            { name: "27", categoryId:3, firstDeparture: "06:20", lastDeparture: "23:25"},
            { name: "28", categoryId:3, firstDeparture: "06:21", lastDeparture: "23:25"},
            { name: "29", categoryId:3, firstDeparture: "05:55", lastDeparture: "00:14"},
            { name: "30", categoryId:3, firstDeparture: "06:30", lastDeparture: "00:03"},
            { name: "31", categoryId:3, firstDeparture: "06:46", lastDeparture: "00:25"},
            { name: "32", categoryId:3, firstDeparture: "05:44", lastDeparture: "22:21"},
            { name: "33", categoryId:3, firstDeparture: "05:44", lastDeparture: "22:35"},
            { name: "34", categoryId:3, firstDeparture: "06:18", lastDeparture: "22:30"},
            { name: "35", categoryId:3, firstDeparture: "06:10", lastDeparture: "21:47"}
        ]
    })

    const allLines = await prisma.line.findMany()
    return allLines
}





async function create_stops(lines) {
    const stopsData = [
        // Stops for Metro lines (A, B, C)
        { name: "Technopark", order:1, lineId:1, lat: 47.389302, long: 8.515709 },
        { name: "Central", order:2, lineId:1, lat: 47.3769, long: 8.5417 },
        { name: "HB", order:3, lineId:1, lat: 47.378, long: 8.540 },
        { name: "Hardplatz", order:4, lineId:1, lat: 47.387, long: 8.524 },
        { name: "Sihlquai", order:5, lineId:1, lat: 47.386, long: 8.517 },
        { name: "Stadelhofen", order:6, lineId:1, lat: 47.3735, long: 8.544 },
        { name: "Lake Zurich", order:7, lineId:1, lat: 47.3645, long: 8.542 },

        { name: "HB", order:1, lineId: 2, lat: 47.378, long: 8.540 },
        { name: "Kreis 4", order:2, lineId: 2, lat: 47.380, long: 8.528 },
        { name: "Limmatplatz", order:3, lineId: 2, lat: 47.3815, long: 8.519 },
        { name: "Sihlcity", order:4, lineId: 2, lat: 47.377, long: 8.522 },
        { name: "Weststrasse", order:5, lineId: 2, lat: 47.373, long: 8.525 },
        { name: "Stauffacher", order:6, lineId: 2, lat: 47.379, long: 8.526 },
        { name: "Zurichberg", order:7, lineId: 2, lat: 47.3805, long: 8.533 },

        { name: "Zoo", order:1, lineId: 3, lat: 47.398, long: 8.541 },
        { name: "Eth", order:2, lineId: 3, lat: 47.392, long: 8.543 },
        { name: "Kunsthaus", order:3, lineId: 3, lat: 47.373, long: 8.531 },
        { name: "Seefeld", order:4, lineId: 3, lat: 47.369, long: 8.534 },
        { name: "Bellevue", order:5, lineId: 3, lat: 47.374, long: 8.540 },
        { name: "Opera", order:6, lineId: 3, lat: 47.3775, long: 8.543 },
        { name: "Limmatquai", order:7, lineId: 3, lat: 47.380, long: 8.544 },

        // Stops for Tram lines (T1, T2)
        { name: "Sihlcity", order:1, lineId: 4, lat: 47.377, long: 8.522 },
        { name: "Uetliberg", order:2, lineId: 4, lat: 47.392, long: 8.489 },
        { name: "Zürichberg", order:3, lineId: 4, lat: 47.385, long: 8.522 },
        { name: "Tramstrasse", order:4, lineId: 4, lat: 47.390, long: 8.516 },
        { name: "Platzspitz", order:5, lineId: 4, lat: 47.3755, long: 8.539 },
        { name: "Universität", order:6, lineId: 4, lat: 47.388, long: 8.526 },
        { name: "Hönggerstrasse", order:7, lineId: 4, lat: 47.398, long: 8.505 },

        { name: "Bahnhofquai", order:1, lineId: 5, lat: 47.375, long: 8.538 },
        { name: "Seebach", order:2, lineId: 5, lat: 47.413, long: 8.531 },
        { name: "Zürich Nord", order:3, lineId: 5, lat: 47.4205, long: 8.528 },
        { name: "Schwammendingen", order:4, lineId: 5, lat: 47.411, long: 8.518 },
        { name: "Oerlikon", order:5, lineId: 5, lat: 47.409, long: 8.537 },
        { name: "Zürich Flughafen", order:6, lineId: 5, lat: 47.454, long: 8.561 },
        { name: "Glattpark", order:7, lineId: 5, lat: 47.445, long: 8.549 },

        // Stops for Bus lines (27, 28, 29, 30, 31, 32, 33, 34, 35)
        { name: "HB", order:1, lineId: 6, lat: 47.378, long: 8.540 },
        { name: "Kreis 5", order:2, lineId: 6, lat: 47.384, long: 8.520 },
        { name: "Friesenberg", order:3, lineId: 6, lat: 47.389, long: 8.514 },
        { name: "Zürichberg", order:4, lineId: 6, lat: 47.388, long: 8.518 },
        { name: "Wipkingen", order:5, lineId: 6, lat: 47.398, long: 8.513 },
        { name: "Seebach", order:6, lineId: 6, lat: 47.413, long: 8.531 },
        { name: "Schwammendingen", order:7, lineId: 6, lat: 47.411, long: 8.518 },

        { name: "Schaffhauserplatz", order:1, lineId: 7, lat: 47.392, long: 8.520 },
        { name: "Kloten", order:2, lineId: 7, lat: 47.448, long: 8.560 },
        { name: "Flughafen", order:3, lineId: 7, lat: 47.454, long: 8.561 },
        { name: "Zurich Nord", order:4, lineId: 7, lat: 47.4205, long: 8.528 },
        { name: "Hardplatz", order:5, lineId: 7, lat: 47.387, long: 8.524 },
        { name: "HB", order:6, lineId: 7, lat: 47.378, long: 8.540 },
        { name: "Oerlikon", order:7, lineId: 7, lat: 47.409, long: 8.537 },

        { name: "Wollishofen", order:1, lineId: 8, lat: 47.356, long: 8.539 },
        { name: "Zürichsee", order:2, lineId: 8, lat: 47.350, long: 8.545 },
        { name: "Bellevue", order:3, lineId: 8, lat: 47.374, long: 8.540 },
        { name: "Limmatquai", order:4, lineId: 8, lat: 47.380, long: 8.544 },
        { name: "Stadelhofen", order:5, lineId: 8, lat: 47.3735, long: 8.544 },
        { name: "HB", order:6, lineId: 8, lat: 47.378, long: 8.540 },
        { name: "Seefeld", order:7, lineId: 8, lat: 47.369, long: 8.534 },

        { name: "Bahnhofquai", order:1, lineId: 9, lat: 47.375, long: 8.538 },
        { name: "Zürichsee", order:2, lineId: 9, lat: 47.350, long: 8.545 },
        { name: "Lake Zurich", order:3, lineId: 9, lat: 47.3645, long: 8.542 },
        { name: "Bellevue", order:4, lineId: 9, lat: 47.374, long: 8.540 },
        { name: "Opera", order:5, lineId: 9, lat: 47.3775, long: 8.543 },
        { name: "HB", order:6, lineId: 9, lat: 47.378, long: 8.540 },
        { name: "Seefeld", order:7, lineId: 9, lat: 47.369, long: 8.534 },

        { name: "Zurich Airport", order:1, lineId: 10, lat: 47.450, long: 8.560 },
        { name: "Oerlikon", order:2, lineId: 10, lat: 47.409, long: 8.537 },
        { name: "Schwammendingen", order:3, lineId: 10, lat: 47.411, long: 8.518 },
        { name: "Kloten", order:4, lineId: 10, lat: 47.448, long: 8.560 },
        { name: "Friesenberg", order:5, lineId: 10, lat: 47.389, long: 8.514 },
        { name: "Zürichberg", order:2, lineId: 10, lat: 47.388, long: 8.518 },
        { name: "Wipkingen", order:7, lineId: 10, lat: 47.398, long: 8.513 },

        { name: "Hardplatz", order:1, lineId: 11, lat: 47.387, long: 8.524 },
        { name: "Weststrasse", order:2, lineId: 11, lat: 47.373, long: 8.525 },
        { name: "Sihlquai", order:3, lineId: 11, lat: 47.386, long: 8.517 },
        { name: "Zurich Hauptbahnhof", order:4, lineId: 11, lat: 47.3769, long: 8.5417 },
        { name: "HB", order:5, lineId: 11, lat: 47.378, long: 8.540 },
        { name: "Kreis 4", order:6, lineId: 11, lat: 47.380, long: 8.528 },
        { name: "Stadelhofen", order:7, lineId: 11, lat: 47.3735, long: 8.544 },

        { name: "Zürichberg", order:1, lineId: 12, lat: 47.385, long: 8.522 },
        { name: "Uetliberg", order:2, lineId: 12, lat: 47.392, long: 8.489 },
        { name: "Tramstrasse", order:3, lineId: 12, lat: 47.390, long: 8.516 },
        { name: "Hönggerstrasse", order:4, lineId: 12, lat: 47.398, long: 8.505 },
        { name: "Universität", order:5, lineId: 12, lat: 47.388, long: 8.526 },
        { name: "Platzspitz", order:6, lineId: 12, lat: 47.3755, long: 8.539 },
        { name: "Zürichsee", order:7, lineId: 12, lat: 47.350, long: 8.545 },

        { name: "Wollishofen", order:1, lineId: 13, lat: 47.356, long: 8.539 },
        { name: "Seebach", order:2, lineId: 13, lat: 47.413, long: 8.531 },
        { name: "Schwammendingen", order:3, lineId: 13, lat: 47.411, long: 8.518 },
        { name: "Schaffhauserplatz", order:4, lineId: 13, lat: 47.392, long: 8.520 },
        { name: "Limmatplatz", order:5, lineId: 13, lat: 47.3815, long: 8.519 },
        { name: "Kloten", order:6, lineId: 13, lat: 47.448, long: 8.560 },
        { name: "Zurich Nord", order:7, lineId: 13, lat: 47.4205, long: 8.528 },

        { name: "Bellevue", order:1, lineId: 14, lat: 47.374, long: 8.540 },
        { name: "Limmatquai", order:2, lineId: 14, lat: 47.380, long: 8.544 },
        { name: "HB", order:3, lineId: 14, lat: 47.378, long: 8.540 },
        { name: "Stadelhofen", order:4, lineId: 14, lat: 47.3735, long: 8.544 },
        { name: "Zurichberg", order:5, lineId: 14, lat: 47.385, long: 8.522 },
        { name: "Opera", order:6, lineId: 14, lat: 47.3775, long: 8.543 },
        { name: "Seefeld", order:7, lineId: 14, lat: 47.369, long: 8.534 }
    ]

    await prisma.stop.createMany({
        data: stopsData
    })
}


faker()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
