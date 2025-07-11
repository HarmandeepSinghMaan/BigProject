import config from "../conf/config";
import { Client, Account , ID } from "appwrite";

export class AuthService{
  client=new Client();
  account;

  constructor(){
    this.client
      .setEndpoint(config.apiUrl)
      .setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const response = await this.account.create(ID.unique(), email, password, name);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async login(email, password) {
    try {
      const response = await this.account.createEmailSession(email, password);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const response = await this.account.deleteSession("current");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getAccount() {
    try {
      const response = await this.account.get();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const response = await this.account.get();
      return response;
    } catch (error) {
      throw error;
    }

    return null;
  }
}

const authService= new AuthService();
export default authService;