export interface Account {
    id: number;
    name: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    personId: number;
    personName: string;
    personIsActive: boolean;
    personBirthdate: Date;
    roles: [string]
}
