export interface Member {
  id: number;
  name: 'string';
  email: string;
  isDefaulter: boolean;
  RentedBooks: [];
  isMonthlySubscribed: boolean;
  image: {
    public_id: string;
    url: string;
  };
}
