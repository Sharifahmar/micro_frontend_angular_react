export class AcceptorModel {
     private acceptorId?: number;
     private fullName: string;
     private email: string;
     private phoneNumber: number;
     private address?: string;
     private city?: string;
     private country?: string;
     private state?: string;
     private zipCode?: number;
     private status?: boolean;


     /**
      * Getter $firstName
      * @return {string}
      */
     public getFullName(): string {
          return this.fullName;
     }

     /**
      * Getter $email
      * @return {string}
      */
     public getEmail(): string {
          return this.email;
     }

     /**
      * Getter $phoneNumber
      * @return {number}
      */
     public getPhoneNumber(): number {
          return this.phoneNumber;
     }

     /**
      * Setter $firstName
      * @param {string} value
      */
     public setFullName(value: string) {
          this.fullName = value;
     }

     /**
      * Setter $email
      * @param {string} value
      */
     public setEmail(value: string) {
          this.email = value;
     }

     /**
      * Setter $phoneNumber
      * @param {number} value
      */
     public setPhoneNumber(value: number) {
          this.phoneNumber = value;
     }

     public setStatus(value: boolean) {
          this.status = value;
     }

     public setAcceptorId(value: number) {
          this.acceptorId = value;
     }
     public getAcceptorIdId(): number {
          return this.acceptorId;
     }

}