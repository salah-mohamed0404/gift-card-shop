const { MongoClient } = require('mongodb');

async function main() {
       const uri = "mongodb+srv://sarga:A111a111@cluster0.fjdnf.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected correctly to server");

        // The collection you want to update
        const collection = client.db("test").collection("cards");

       

        // The array of new brands to set in each document
        const newBrands = ["HEZEL", "2 GETHER", "ELCT", "THE POP UP", "DURMA", "FUN VIBES", "RUMORS", "KIN", "SHAHIN", "4 TWINS", "CROWD", "MOVEN", "NAJD", "VEO"];

        // Fetch all the documents that need updating
        const documents = await collection.find({}).toArray();

        // Keep track of the index for newBrands array
        let brandIndex = 0;

        // Update each document
        for (let doc of documents) {
            // Check if we've reached the end of the newBrands array
            if (brandIndex >= newBrands.length) {
                brandIndex = 0; // Reset the index if you want to start over, or break; to stop updating.
            }

            // Set the brand to the corresponding item from newBrands
            const brandToSet = newBrands[brandIndex];
            const result = await collection.updateOne({ _id: doc._id }, { $set: { brand: brandToSet } });
            console.log(`Updated document with _id ${doc._id}: ${result.modifiedCount} document(s) updated.`);

            // Move to the next brand item
            brandIndex++;
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
// async function updateDocuments(client) {

//     const result = await client.db("test").collection("cards")
//         .updateMany({}, 
//             { $set: { "cards.$[].brand": ["HEZEL", "2 GETHER", "ELCT", "THE POP UP", "DURMA", "FUN VIBES", "RUMORS", "KIN", "SHAHIN", "4 TWINS", "CROWD", "MOVEN", "NAJD", "VEO"] } }
//         );


//     console.log(`${result.matchedCount} document(s) matched the query criteria.`);
//     console.log(`${result.modifiedCount} document(s) was/were updated.`);
// }

// main().catch(console.error);
