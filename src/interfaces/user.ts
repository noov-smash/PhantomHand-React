export interface UnsignedUserProps {
  isSignedIn: false;
  isAdmin?: boolean;
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
