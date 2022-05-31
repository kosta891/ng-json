export interface User {
  id: string;
  email: string;
  name: string;
  website: string;
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
  };
}
