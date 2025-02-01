import { Client,Databases,Query,ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount =async(searchTerm,movie)=>{
   //use appwrite to check if the searchTerm exits in the database
   try {
    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm',searchTerm)
    ]);
    //2. If it does, increment the count
    if(result.documents.length > 0){
      const doc = result.documents[0];
      
      await database.updateDocument(DATABASE_ID,COLLECTION_ID,doc.$id,{
        count:doc.count + 1,
      });
   }
   //3. If it doesn't, add it to the database and set the count to 1
   else{
        await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
            searchTerm,
            count:1,
            movie_id:movie.id,
            poster_url :`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });
   }
 } catch (error) {
    console.error(`Error updating search count:${error}`);
   }
   
    
    
}

export const getTrendingMovies = async()=>{
  try {
    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
      Query.limit(10),
      Query.orderDesc("count")
     
    ]);
    return result.documents;
  } catch (error) {
    console.error(`Error fetching trending movies:${error}`);
  }
}