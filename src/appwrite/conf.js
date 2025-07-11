import config from '../config.js';
import { Client,ID,Databases,Storage,Query } from 'appwrite';

export class Service{
  client= new Client()
  databases;
  bucket

  constructor()
  {
    this.client
      .setEndpoint(config.apiUrl) // Your API Endpoint
      .setProject(config.projectId); // Your project ID

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    
  }

  async createPost({title,slug,content,featuredImage,status,userId}) {
    try{
      return await this.databases.createDocument(config.databaseId, config.collectionId, slug, {
        title,
        content,
        featuredImage,
        status,
        userId
      });
    }catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug,{title,content,featuredImage,status,userId}) {
    try{
      return await this.databases.updateDocument(config.databaseId, config.collectionId, slug, {
        title,
        content,
        featuredImage,
        status,
      });
    }catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
  async deletePost(slug) {
    try{
      await this.databases.deleteDocument(config.databaseId, config.collectionId, slug);
      return true;
    }catch (error) {
      console.error("Error deleting post:", error);
      throw error;
      return false;
    }
  }
  async getPost(slug)
  {
    try{
      return await this.databases.getDocument(config.databaseId, config.collectionId, slug);
    }catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status","active")]) {
    try{
      return await this.databases.listDocuments(config.databaseId, config.collectionId, queries);
    }catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  //file upload service
  async uploadFile(file) {
    try{
      return await this.bucket.createFile(config.bucketId, ID.unique(), file);
    }catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  async deleteFile(fileId) {
    try{
      await this.bucket.deleteFile(config.bucketId, fileId);
      return true;
    }catch (error) {
      console.error("Error deleting file:", error);
      throw error;
      return false;
    }
  }

  async grtFilePreview(fileId) {
    try{
      return await this.bucket.getFilePreview(config.bucketId, fileId);
    }catch (error) {
      console.error("Error fetching file preview:", error);
      throw error;
    }
  } 
}

const service=new Service();
export default service;