import useAuth from "@/Hooks/useAuth";
import { JSXElementConstructor, ReactElement } from "react";

export default function withAuthentication(
  Component:
    | JSXElementConstructor<Record<string, any>>
    | JSXElementConstructor<any>
) {
  return function Render(
    props: Record<string, any>
  ): ReactElement<unknown> | null {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
