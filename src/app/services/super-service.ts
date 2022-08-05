export class SuperService {

  public getBaseUrl(): string {
    // return 'http://localhost:3000/api';
    return 'http://ec2-3-111-113-150.ap-south-1.compute.amazonaws.com:3000/api';
    
  }
  public getEmailUrl(): string {
    // return 'http://localhost:3000/';
    return 'http://ec2-3-111-113-150.ap-south-1.compute.amazonaws.com:3000/';
  }
}
