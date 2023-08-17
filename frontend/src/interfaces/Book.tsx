export interface Book {
  id: number;
  title: string;
  description: string;
  authorName: string,
  rentFee: number;
  status: string;
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
