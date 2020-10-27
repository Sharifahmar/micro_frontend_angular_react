export class DonarModel {
     private donarId?: number;
     private fullName: string;
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
      * Setter $phoneNumber
      * @param {number} value
      */
     public setPhoneNumber(value: number) {
          this.phoneNumber = value;
     }

     public setStatus(value: boolean) {
          this.status = value;
     }

     public setDonarId(value: number) {
          this.donarId = value;
     }
     public getDonarId(): number {
          return this.donarId;
     }

}