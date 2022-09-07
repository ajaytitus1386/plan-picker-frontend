export interface User {
  id: string;
  email: string;
  username: string;
}

export function userFromJSON(json: any): User {
  return {
    id: json["_id"],
    email: json["email"],
    username: json["username"],
  };
}
