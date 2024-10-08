import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';

const databases = new Databases(client);

export async function getAllDocuments(databaseId, collectionId) {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      console.log(response.documents); // Array of documents
      return response.documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }