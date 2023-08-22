export interface Book {
  id: number;
  title: string;
  rentedQuantity: number;
  stock: number;
  authorName: string;
  rentFee: number;
  status: string;
  RentedBooks: [];
  image: {
    public_id: string;
    url: string;
  };
  comments: [
    {
      id: number;
      comment: string;
      memberId: number;
      User: { username: '' };
      DateTime: '';
    }
  ];
}
