import { useRouter } from "next/dist/client/router";
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from "react";

export default function withAuthentication(
  Component:
    | JSXElementConstructor<Record<string, any>>
    | JSXElementConstructor<any>
) {
  return function Render(
    props: Record<string, any>
  ): ReactElement<unknown> | null {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.replace(`/`);
      }
    }, []);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
