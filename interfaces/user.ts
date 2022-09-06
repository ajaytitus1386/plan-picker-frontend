export interface User {
  id: String;
  email: String;
  username: String;
}

export function userFromJSON(json: any): User {
  return {
    id: json["_id"],
    email: json["email"],
    username: json["username"],
  };
}
