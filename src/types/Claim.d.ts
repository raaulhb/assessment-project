import { User } from "./User";

export interface Claim {
  id: string;
  userId: string;
  status: "active" | "complete";
  createdDate: string;
  updatedDate: string;
  creationIpAddress: string;
  data: Record<string, any>;
  userData: User;
}
