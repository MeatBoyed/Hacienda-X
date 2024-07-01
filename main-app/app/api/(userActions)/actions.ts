import { honoClient } from "../[[...route]]/route";

export async function getServerUser(userId: string) {
  const res = await honoClient.user[":public_id"].$get({
    param: { public_id: userId },
  });
  if (res.ok) {
    return await res.json();
  }
}
