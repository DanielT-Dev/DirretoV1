import { Client, Account, Databases, Query} from 'appwrite';

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

import { ID } from 'appwrite';

export async function createNewDocument(databaseId, collectionId, data) {
    try {
      const response = await databases.createDocument(
        databaseId, 
        collectionId,
        ID.unique(),             // Unique document ID (or a custom one)
        data,
      );
  
    } catch (error) {
      console.error('Error creating document:', error);
    }
  }

  export const updateDocument = async (databaseId, collectionId, documentId, updatedData) => {
    try {
      const updatedDocument = await databases.updateDocument(
        databaseId,
        collectionId,
        documentId,
        updatedData
      );
      
      return updatedDocument;
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  export async function getDocumentByEmail(databaseId, collectionId, email) {
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [Query.equal('email', email)] // Query to filter by email field
      );

      if (response.documents.length > 0) {;
        return response.documents[0]; // Return the first document found
      } else {
        console.log('No document found with that email');
        return null;
      }
    } catch (error) {
      console.error('Error fetching document by email:', error);
    }
}