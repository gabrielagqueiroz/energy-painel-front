import { useAuth } from "../providers/auth";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";

export function Routes() {
  const { user } = useAuth();

  return <>{user ? <PrivateRoutes /> : <PublicRoutes />}</>;
}
