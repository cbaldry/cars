export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  registrationExpiry: string;
};

export type RegoStatus = "PENDING" | "EXPIRED" | "VALID";

export type CarWithStatus = Car & { status: RegoStatus };
