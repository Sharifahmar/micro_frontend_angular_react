export class UserModel {

    private firstName: string;
    private lastName: string;
    private email:string;
    private phoneNumber:number;
    private password?:string;
    private address?:string;
    private city?:string;
    private country?:string;
    private state?:string;
    private zipCode?:number;


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
     * Getter $password
     * @return {string}
     */
	public getPassword(): string {
		return this.password;
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

    /**
     * Setter $password
     * @param {string} value
     */
	public setPassword(value: string) {
		this.password = value;
	}





}