
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
            { name: "A", categoryId: categories.find(category => category.name === "Metro")?.id },
            { name: "B", categoryId: categories.find(category => category.name === "Metro")?.id },
            { name: "C", categoryId: categories.find(category => category.name === "Metro")?.id },
            { name: "T1", categoryId: categories.find(category => category.name === "Tramway")?.id },
            { name: "T2", categoryId: categories.find(category => category.name === "Tramway")?.id },
            { name: "27", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "28", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "29", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "30", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "31", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "32", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "33", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "34", categoryId: categories.find(category => category.name === "Bus")?.id },
            { name: "35", categoryId: categories.find(category => category.name === "Bus")?.id }
        ]
    })

    const allLines = await prisma.line.findMany()
    return allLines
}





async function create_stops(lines) {
    const stopsData = [
        // Stops for Metro lines (A, B, C)
        { name: "Technopark", lineId:lines.find(line => line.name === "A")?.id, lat: 47.389302, long: 8.515709 },
        { name: "Central", lineId:lines.find(line => line.name === "A")?.id, lat: 47.3769, long: 8.5417 },
        { name: "HB", lineId:lines.find(line => line.name === "A")?.id, lat: 47.378, long: 8.540 },
        { name: "Hardplatz", lineId:lines.find(line => line.name === "A")?.id, lat: 47.387, long: 8.524 },
        { name: "Sihlquai", lineId:lines.find(line => line.name === "A")?.id, lat: 47.386, long: 8.517 },
        { name: "Stadelhofen", lineId:lines.find(line => line.name === "A")?.id, lat: 47.3735, long: 8.544 },
        { name: "Lake Zurich", lineId:lines.find(line => line.name === "A")?.id, lat: 47.3645, long: 8.542 },

        { name: "HB", lineId: lines.find(line => line.name === "B")?.id, lat: 47.378, long: 8.540 },
        { name: "Kreis 4", lineId: lines.find(line => line.name === "B")?.id, lat: 47.380, long: 8.528 },
        { name: "Limmatplatz", lineId: lines.find(line => line.name === "B")?.id, lat: 47.3815, long: 8.519 },
        { name: "Sihlcity", lineId: lines.find(line => line.name === "B")?.id, lat: 47.377, long: 8.522 },
        { name: "Weststrasse", lineId: lines.find(line => line.name === "B")?.id, lat: 47.373, long: 8.525 },
        { name: "Stauffacher", lineId: lines.find(line => line.name === "B")?.id, lat: 47.379, long: 8.526 },
        { name: "Zurichberg", lineId: lines.find(line => line.name === "B")?.id, lat: 47.3805, long: 8.533 },

        { name: "Zoo", lineId: lines.find(line => line.name === "C")?.id, lat: 47.398, long: 8.541 },
        { name: "Eth", lineId: lines.find(line => line.name === "C")?.id, lat: 47.392, long: 8.543 },
        { name: "Kunsthaus", lineId: lines.find(line => line.name === "C")?.id, lat: 47.373, long: 8.531 },
        { name: "Seefeld", lineId: lines.find(line => line.name === "C")?.id, lat: 47.369, long: 8.534 },
        { name: "Bellevue", lineId: lines.find(line => line.name === "C")?.id, lat: 47.374, long: 8.540 },
        { name: "Opera", lineId: lines.find(line => line.name === "C")?.id, lat: 47.3775, long: 8.543 },
        { name: "Limmatquai", lineId: lines.find(line => line.name === "C")?.id, lat: 47.380, long: 8.544 },

        // Stops for Tram lines (T1, T2)
        { name: "Sihlcity", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.377, long: 8.522 },
        { name: "Uetliberg", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.392, long: 8.489 },
        { name: "Zürichberg", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.385, long: 8.522 },
        { name: "Tramstrasse", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.390, long: 8.516 },
        { name: "Platzspitz", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.3755, long: 8.539 },
        { name: "Universität", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.388, long: 8.526 },
        { name: "Hönggerstrasse", lineId: lines.find(line => line.name === "T1")?.id, lat: 47.398, long: 8.505 },

        { name: "Bahnhofquai", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.375, long: 8.538 },
        { name: "Seebach", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.413, long: 8.531 },
        { name: "Zürich Nord", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.4205, long: 8.528 },
        { name: "Schwammendingen", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.411, long: 8.518 },
        { name: "Oerlikon", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.409, long: 8.537 },
        { name: "Zürich Flughafen", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.454, long: 8.561 },
        { name: "Glattpark", lineId: lines.find(line => line.name === "T2")?.id, lat: 47.445, long: 8.549 },

        // Stops for Bus lines (27, 28, 29, 30, 31, 32, 33, 34, 35)
        { name: "HB", lineId: lines.find(line => line.name === "27")?.id, lat: 47.378, long: 8.540 },
        { name: "Kreis 5", lineId: lines.find(line => line.name === "27")?.id, lat: 47.384, long: 8.520 },
        { name: "Friesenberg", lineId: lines.find(line => line.name === "27")?.id, lat: 47.389, long: 8.514 },
        { name: "Zürichberg", lineId: lines.find(line => line.name === "27")?.id, lat: 47.388, long: 8.518 },
        { name: "Wipkingen", lineId: lines.find(line => line.name === "27")?.id, lat: 47.398, long: 8.513 },
        { name: "Seebach", lineId: lines.find(line => line.name === "27")?.id, lat: 47.413, long: 8.531 },
        { name: "Schwammendingen", lineId: lines.find(line => line.name === "27")?.id, lat: 47.411, long: 8.518 },

        { name: "Schaffhauserplatz", lineId: lines.find(line => line.name === "28")?.id, lat: 47.392, long: 8.520 },
        { name: "Kloten", lineId: lines.find(line => line.name === "28")?.id, lat: 47.448, long: 8.560 },
        { name: "Flughafen", lineId: lines.find(line => line.name === "28")?.id, lat: 47.454, long: 8.561 },
        { name: "Zurich Nord", lineId: lines.find(line => line.name === "28")?.id, lat: 47.4205, long: 8.528 },
        { name: "Hardplatz", lineId: lines.find(line => line.name === "28")?.id, lat: 47.387, long: 8.524 },
        { name: "HB", lineId: lines.find(line => line.name === "28")?.id, lat: 47.378, long: 8.540 },
        { name: "Oerlikon", lineId: lines.find(line => line.name === "28")?.id, lat: 47.409, long: 8.537 },

        { name: "Wollishofen", lineId: lines.find(line => line.name === "29")?.id, lat: 47.356, long: 8.539 },
        { name: "Zürichsee", lineId: lines.find(line => line.name === "29")?.id, lat: 47.350, long: 8.545 },
        { name: "Bellevue", lineId: lines.find(line => line.name === "29")?.id, lat: 47.374, long: 8.540 },
        { name: "Limmatquai", lineId: lines.find(line => line.name === "29")?.id, lat: 47.380, long: 8.544 },
        { name: "Stadelhofen", lineId: lines.find(line => line.name === "29")?.id, lat: 47.3735, long: 8.544 },
        { name: "HB", lineId: lines.find(line => line.name === "29")?.id, lat: 47.378, long: 8.540 },
        { name: "Seefeld", lineId: lines.find(line => line.name === "29")?.id, lat: 47.369, long: 8.534 },

        { name: "Bahnhofquai", lineId: lines.find(line => line.name === "30")?.id, lat: 47.375, long: 8.538 },
        { name: "Zürichsee", lineId: lines.find(line => line.name === "30")?.id, lat: 47.350, long: 8.545 },
        { name: "Lake Zurich", lineId: lines.find(line => line.name === "30")?.id, lat: 47.3645, long: 8.542 },
        { name: "Bellevue", lineId: lines.find(line => line.name === "30")?.id, lat: 47.374, long: 8.540 },
        { name: "Opera", lineId: lines.find(line => line.name === "30")?.id, lat: 47.3775, long: 8.543 },
        { name: "HB", lineId: lines.find(line => line.name === "30")?.id, lat: 47.378, long: 8.540 },
        { name: "Seefeld", lineId: lines.find(line => line.name === "30")?.id, lat: 47.369, long: 8.534 },

        { name: "Zurich Airport", lineId: lines.find(line => line.name === "31")?.id, lat: 47.450, long: 8.560 },
        { name: "Oerlikon", lineId: lines.find(line => line.name === "31")?.id, lat: 47.409, long: 8.537 },
        { name: "Schwammendingen", lineId: lines.find(line => line.name === "31")?.id, lat: 47.411, long: 8.518 },
        { name: "Kloten", lineId: lines.find(line => line.name === "31")?.id, lat: 47.448, long: 8.560 },
        { name: "Friesenberg", lineId: lines.find(line => line.name === "31")?.id, lat: 47.389, long: 8.514 },
        { name: "Zürichberg", lineId: lines.find(line => line.name === "31")?.id, lat: 47.388, long: 8.518 },
        { name: "Wipkingen", lineId: lines.find(line => line.name === "31")?.id, lat: 47.398, long: 8.513 },

        { name: "Hardplatz", lineId: lines.find(line => line.name === "32")?.id, lat: 47.387, long: 8.524 },
        { name: "Weststrasse", lineId: lines.find(line => line.name === "32")?.id, lat: 47.373, long: 8.525 },
        { name: "Sihlquai", lineId: lines.find(line => line.name === "32")?.id, lat: 47.386, long: 8.517 },
        { name: "Zurich Hauptbahnhof", lineId: lines.find(line => line.name === "32")?.id, lat: 47.3769, long: 8.5417 },
        { name: "HB", lineId: lines.find(line => line.name === "32")?.id, lat: 47.378, long: 8.540 },
        { name: "Kreis 4", lineId: lines.find(line => line.name === "32")?.id, lat: 47.380, long: 8.528 },
        { name: "Stadelhofen", lineId: lines.find(line => line.name === "32")?.id, lat: 47.3735, long: 8.544 },

        { name: "Zürichberg", lineId: lines.find(line => line.name === "33")?.id, lat: 47.385, long: 8.522 },
        { name: "Uetliberg", lineId: lines.find(line => line.name === "33")?.id, lat: 47.392, long: 8.489 },
        { name: "Tramstrasse", lineId: lines.find(line => line.name === "33")?.id, lat: 47.390, long: 8.516 },
        { name: "Hönggerstrasse", lineId: lines.find(line => line.name === "33")?.id, lat: 47.398, long: 8.505 },
        { name: "Universität", lineId: lines.find(line => line.name === "33")?.id, lat: 47.388, long: 8.526 },
        { name: "Platzspitz", lineId: lines.find(line => line.name === "33")?.id, lat: 47.3755, long: 8.539 },
        { name: "Zürichsee", lineId: lines.find(line => line.name === "33")?.id, lat: 47.350, long: 8.545 },

        { name: "Wollishofen", lineId: lines.find(line => line.name === "34")?.id, lat: 47.356, long: 8.539 },
        { name: "Seebach", lineId: lines.find(line => line.name === "34")?.id, lat: 47.413, long: 8.531 },
        { name: "Schwammendingen", lineId: lines.find(line => line.name === "34")?.id, lat: 47.411, long: 8.518 },
        { name: "Schaffhauserplatz", lineId: lines.find(line => line.name === "34")?.id, lat: 47.392, long: 8.520 },
        { name: "Limmatplatz", lineId: lines.find(line => line.name === "34")?.id, lat: 47.3815, long: 8.519 },
        { name: "Kloten", lineId: lines.find(line => line.name === "34")?.id, lat: 47.448, long: 8.560 },
        { name: "Zurich Nord", lineId: lines.find(line => line.name === "34")?.id, lat: 47.4205, long: 8.528 },

        { name: "Bellevue", lineId: lines.find(line => line.name === "35")?.id, lat: 47.374, long: 8.540 },
        { name: "Limmatquai", lineId: lines.find(line => line.name === "35")?.id, lat: 47.380, long: 8.544 },
        { name: "HB", lineId: lines.find(line => line.name === "35")?.id, lat: 47.378, long: 8.540 },
        { name: "Stadelhofen", lineId: lines.find(line => line.name === "35")?.id, lat: 47.3735, long: 8.544 },
        { name: "Zurichberg", lineId: lines.find(line => line.name === "35")?.id, lat: 47.385, long: 8.522 },
        { name: "Opera", lineId: lines.find(line => line.name === "35")?.id, lat: 47.3775, long: 8.543 },
        { name: "Seefeld", lineId: lines.find(line => line.name === "35")?.id, lat: 47.369, long: 8.534 }
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
