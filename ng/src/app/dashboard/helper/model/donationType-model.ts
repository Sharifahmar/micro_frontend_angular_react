export class DonationType {

    
    private donationTypeId?: number;
    private donationType: string;
    private donationTypeName?: string;

    public getDonationTypeName(): string {
        return this.donationTypeName;
    }


    public setDonationTypeName(value: string) {
        this.donationTypeName = value;
    }


    public getDonationType(): string {
        return this.donationType;
    }


    public setDonationType(value: string) {
        this.donationType = value;
    }

    
	public setDonationTypeId(value: number) {
		this.donationTypeId = value;
	}

    public getDonationTypeId(): number {
		return this.donationTypeId;
	}




}