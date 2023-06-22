interface Driver {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  country: string;
  team: string;
  place?: number; // Assigned random place
}

export default Driver;
