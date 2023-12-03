export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Post extends PostData {
  userName?: string;
}

interface Reply {
  userName: string;
  text: string;
}

export interface CommentData {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  replies: Reply[];
}
