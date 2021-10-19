export interface UnsignedUserProps {
  isSignedIn: false;
  isAdmin?: boolean;
  uid: undefined
}

export interface SignedUserProps {
  isSignedIn: true;
  uid: string;
  isAdmin: boolean;
}

export interface FirebaseUserProps {
  uid: string;
  isAdmin: boolean;
}
