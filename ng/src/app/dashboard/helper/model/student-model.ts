export class StudentModel {
    private studentId?:number;
    private subId?:number;
    private idNumber?:number;
    private firstName: string;
    private lastName: string;
    private aadhaarNumber:string;
    private motherName:string;
    private fatherName:string;
    private schoolName:string;
    private className:string;
    private grade:string;
    private email:string;
    private phoneNumber:number;
    private address?:string;
    private city?:string;
    private country?:string;
    private state?:string;
    private zipCode?:number;
    private status?:boolean;


    /**
     * Getter $firstName
     * @return {string}
     */
	public getFirstName(): string {
		return this.firstName;
	}

    /**
     * Getter $lastName
     * @return {string}
     */
	public getLastName(): string {
		return this.lastName;
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
	public setFirstName(value: string) {
		this.firstName = value;
	}

    /**
     * Setter $lastName
     * @param {string} value
     */
	public setLastName(value: string) {
		this.lastName = value;
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

     public setAadhaarNumber(value: string) {
		this.aadhaarNumber = value;
     }
     public getAadhaarNumber():string {
		return this.aadhaarNumber ;
     }

     public setStudentId(value: number) {
		this.studentId = value;
     }
     public getStudentId():number {
		return this.studentId ;
     }
     
}